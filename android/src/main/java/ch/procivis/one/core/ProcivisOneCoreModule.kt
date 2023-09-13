package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.HandleInvitationResponseBindingEnum
import uniffi.one_core.ListQueryBindingDto

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ProcivisOneCoreModule"

    override fun getName() = "ProcivisOneCoreModule"

    private val oneCore: uniffi.one_core.OneCoreBindingInterface

    init {
        oneCore = uniffi.one_core.initializeCore(this.reactApplicationContext.filesDir.absolutePath)
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        Util.asyncCall(promise) {
            val version = oneCore.version()
            return@asyncCall Util.convertToRN(version)
        }
    }

    @ReactMethod
    fun createOrganisation(uuid: String?, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall oneCore.createOrganisation(uuid)
        }
    }

    @ReactMethod
    fun createLocalDid(did: String, organisationId: String, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall oneCore.createLocalDid(did, organisationId)
        }
    }

    @ReactMethod
    fun handleInvitation(url: String, holderDidId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val invitationResult = oneCore.handleInvitation(url, holderDidId)
            return@asyncCall Util.convertToRN(
                when (invitationResult) {
                    is HandleInvitationResponseBindingEnum.CredentialIssuance -> invitationResult
                    is HandleInvitationResponseBindingEnum.ProofRequest -> invitationResult.proofRequest
                }
            )
        }
    }

    @ReactMethod
    fun holderRejectProof(promise: Promise) {
        Util.asyncCall(promise) {
            oneCore.holderRejectProof()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderSubmitProof(credentialIds: ReadableArray, promise: Promise) {
        Util.asyncCall(promise) {
            val list = mutableListOf<String>()
            for (n in 0 until credentialIds.size()) {
                list.add(credentialIds.getString(n))
            }
            oneCore.holderSubmitProof(list)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getCredentials(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = ListQueryBindingDto(
                query.getInt("page").toUInt(),
                query.getInt("pageSize").toUInt(),
                query.getString("organisationId").toString()
            )

            val credentials = oneCore.getCredentials(listQuery)
            return@asyncCall Util.convertToRN(credentials)
        }
    }

    @ReactMethod
    fun getCredential(credentialId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val credential = oneCore.getCredential(credentialId)
            return@asyncCall Util.convertToRN(credential)
        }
    }
}
