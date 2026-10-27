package ch.procivis.one.core

import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.credentials.DigitalCredential
import androidx.credentials.ExperimentalDigitalCredentialApi
import androidx.credentials.GetCredentialResponse
import androidx.credentials.GetDigitalCredentialOption
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException
import androidx.credentials.provider.PendingIntentHandler
import androidx.credentials.provider.ProviderGetCredentialRequest
import androidx.credentials.registry.provider.selectedEntryId
import ch.procivis.one.core.Serialize.convertToRN
import ch.procivis.one.core.nfc.ActivityAccessor
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

/**
 * DC-API functionality
 */
@SuppressLint("LogNotTimber")
class RNCredentialManager(
    private val context: Context, private val activityAccessor: ActivityAccessor
) : DcApiResponseHandler {
    companion object {
        private const val TAG = "ch.procivis.one.core.CredentialManager"
    }

    private var activeRequest: ProviderGetCredentialRequest? = null

    @OptIn(ExperimentalDigitalCredentialApi::class)
    @Synchronized
    override fun onSubmit(response: String) {
        Log.d(TAG, "onSubmit")
        val pendingRequest = activeRequest ?: return
        val activity = activityAccessor.getCurrentActivity() ?: return
        val resultData = Intent()
        val response = GetCredentialResponse(DigitalCredential(response))
        PendingIntentHandler.setGetCredentialResponse(
            resultData, response, pendingRequest
        )
        activity.setResult(RESULT_OK, resultData)
        activity.finish()
        activeRequest = null
    }

    override fun onReject() {
        Log.d(TAG, "onReject")
        onError(GetCredentialCancellationException())
    }

    @Synchronized
    fun onError(exception: GetCredentialException) {
        Log.d(TAG, "onError", exception)
        val activity = activityAccessor.getCurrentActivity() ?: return
        if (activeRequest == null) {
            return
        }
        val resultData = Intent()
        PendingIntentHandler.setGetCredentialException(
            resultData, exception
        )
        activity.setResult(RESULT_OK, resultData)
        activity.finish()
        activeRequest = null
    }

    @OptIn(ExperimentalDigitalCredentialApi::class)
    suspend fun checkDcApi(
        core: OneCoreInterface, request: DcApiCheckRequest
    ): ReadableMap? {
        val activity = activityAccessor.getCurrentActivity()
            ?: throw IllegalStateException("No activity found")

        val pendingRequest =
            PendingIntentHandler.retrieveProviderGetCredentialRequest(activity.intent)
                ?: return null
        Log.d(TAG, "GetCredentialRequest")

        synchronized(this) {
            if (activeRequest != null) {
                throw IllegalStateException("Another request active")
            }
            activeRequest = pendingRequest
        }

        val selectedCredentialId = pendingRequest.selectedEntryId
            ?: pendingRequest.sourceBundle?.getString("androidx.credentials.registry.provider.extra.CREDENTIAL_SET_ELEMENT_ID_0")
        Log.d(TAG, "selectedCredentialId: $selectedCredentialId")

        val origin = pendingRequest.callingAppInfo.getOrigin(
            // list taken from: https://www.gstatic.com/gpm-passkeys-privileged-apps/apps.json
            privilegedAllowlist = context.resources.openRawResource(R.raw.privileged_apps)
                .bufferedReader().use { it.readText() })
            ?: throw IllegalArgumentException("Missing origin")
        Log.d(TAG, "Origin: $origin")

        val credentialRequest = pendingRequest.credentialOptions.firstNotNullOfOrNull {
            it as? GetDigitalCredentialOption
        } ?: throw IllegalArgumentException("Unknown request type")
        Log.d(TAG, "requestJson: ${credentialRequest.requestJson}")

        val proofResponse = core.handleInvitation(
            request = HandleInvitationRequest(
                data = HandleInvitationRequestData.OpenId4vpDcApi(
                    requestJson = credentialRequest.requestJson,
                    origin = origin,
                    responseHandler = this
                ),
                organisationId = request.organisationId,
                transport = listOf(request.transport),
                redirectUri = null,
                ecosystem = request.ecosystem
            )
        )

        val result = convertToRN(proofResponse) as WritableMap
        selectedCredentialId?.let {
            result.putString("preselectedCredentialId", it)
        }

        return result
    }

    @Synchronized
    fun isDcApiRequestActive(): Boolean {
        return activeRequest != null
    }

    fun cancelDcApiRequest() {
        Log.d(TAG, "cancelDcApiRequest")
        onError(GetCredentialCancellationException())
    }
}

data class DcApiCheckRequest(
    val organisationId: String, val transport: String, val ecosystem: String?
)