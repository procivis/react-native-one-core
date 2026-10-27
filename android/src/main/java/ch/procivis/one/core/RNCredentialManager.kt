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
import androidx.credentials.exceptions.GetCredentialUnknownException
import androidx.credentials.provider.PendingIntentHandler
import androidx.credentials.registry.provider.selectedEntryId
import ch.procivis.one.core.Serialize.convertToRN
import ch.procivis.one.core.nfc.ActivityAccessor
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import java.lang.ref.WeakReference

/**
 * DC-API functionality
 */
@SuppressLint("LogNotTimber")
class RNCredentialManager(
    private val context: Context, private val activityAccessor: ActivityAccessor
) {
    companion object {
        private const val TAG = "ch.procivis.one.core.CredentialManager"
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

        val responseHandler = object : DcApiResponseHandler {
            private val resultData = Intent()
            private val activityRef = WeakReference(activity)

            @Volatile
            private var responded = false

            override fun onSubmit(response: String) {
                Log.d(TAG, "onSubmit")
                val hostActivity = activityRef.get() ?: return
                if (responded) return
                val response = GetCredentialResponse(DigitalCredential(response))
                PendingIntentHandler.setGetCredentialResponse(
                    resultData, response, pendingRequest
                )
                hostActivity.setResult(RESULT_OK, resultData)
                hostActivity.finish()
                responded = true
            }

            override fun onReject() {
                Log.d(TAG, "onReject")
                onError(GetCredentialCancellationException())
            }

            fun onError(exception: GetCredentialException) {
                Log.d(TAG, "onError", exception)
                val hostActivity = activityRef.get() ?: return
                if (responded) return
                PendingIntentHandler.setGetCredentialException(
                    resultData, exception
                )
                hostActivity.setResult(RESULT_OK, resultData)
                hostActivity.finish()
                responded = true
            }
        }

        val proofResponse = try {
            core.handleInvitation(
                request = HandleInvitationRequest(
                    data = HandleInvitationRequestData.OpenId4vpDcApi(
                        requestJson = credentialRequest.requestJson,
                        origin = origin,
                        responseHandler = responseHandler
                    ),
                    organisationId = request.organisationId,
                    transport = listOf(request.transport),
                    redirectUri = null,
                    ecosystem = request.ecosystem
                )
            )
        } catch (err: Throwable) {
            Log.w(TAG, "Handle invitation failure", err)
            responseHandler.onError(GetCredentialUnknownException(err.toString()))
            throw err
        }

        val result = convertToRN(proofResponse) as WritableMap
        selectedCredentialId?.let {
            result.putString("preselectedCredentialId", it)
        }

        return result
    }
}

data class DcApiCheckRequest(
    val organisationId: String, val transport: String, val ecosystem: String?
)