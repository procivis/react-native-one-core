package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.HandleInvitationResponseBindingEnum
import uniffi.one_core.KeyRequestBindingDto
import uniffi.one_core.ListQueryBindingDto
import uniffi.one_core.PresentationSubmitCredentialRequestBindingDto

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ProcivisOneCoreModule"

    override fun getName() = "ProcivisOneCoreModule"

    private val oneCore: uniffi.one_core.OneCoreBindingInterface

    init {
        oneCore = uniffi.one_core.initializeCore(this.reactApplicationContext.filesDir.absolutePath, AndroidKeyStoreKeyStorage())
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
    fun generateKey(keyRequest: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall oneCore.generateKey(
                Deserialize.keyRequest(keyRequest)
            )
        }
    }

    @ReactMethod
    fun createDid(didRequest: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall oneCore.createDid(Deserialize.didRequest(didRequest))
        }
    }

    @ReactMethod
    fun handleInvitation(url: String, holderDidId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val invitationResult = oneCore.handleInvitation(url, holderDidId)
            return@asyncCall Util.convertToRN(
                when (invitationResult) {
                    is HandleInvitationResponseBindingEnum.CredentialIssuance -> invitationResult
                    is HandleInvitationResponseBindingEnum.ProofRequest -> invitationResult
                }
            )
        }
    }

    @ReactMethod
    fun holderAcceptCredential(interactionId: String, promise: Promise) {
        Util.asyncCall(promise) {
            oneCore.holderAcceptCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderRejectCredential(interactionId: String, promise: Promise) {
        Util.asyncCall(promise) {
            oneCore.holderRejectCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getPresentationDefinition(proofId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val presentationDefinition = oneCore.getPresentationDefintion(proofId)
            return@asyncCall Util.convertToRN(presentationDefinition)
        }
    }

    @ReactMethod
    fun holderRejectProof(interactionId: String, promise: Promise) {
        Util.asyncCall(promise) {
            oneCore.holderRejectProof(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderSubmitProof(interactionId: String, credentials: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val submitCredentials =
                mutableMapOf<String, PresentationSubmitCredentialRequestBindingDto>()
            for (entry in credentials.entryIterator) {
                val credential = entry.value as ReadableMap

                val submitClaims = credential.getArray("submitClaims") as ReadableArray
                val claims = mutableListOf<String>()
                for (n in 0 until submitClaims.size()) {
                    claims.add(submitClaims.getString(n))
                }

                submitCredentials[entry.key] = PresentationSubmitCredentialRequestBindingDto(
                    credential.getString("credentialId").toString(),
                    claims
                )
            }
            oneCore.holderSubmitProof(interactionId, submitCredentials)
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

    @ReactMethod
    fun getProof(proofId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val proof = oneCore.getProof(proofId)
            return@asyncCall Util.convertToRN(proof)
        }
    }

    @ReactMethod
    fun checkRevocation(credentialIds: ReadableArray, promise: Promise) {
        Util.asyncCall(promise) {
            val ids = mutableListOf<String>()
            for (n in 0 until credentialIds.size()) {
                ids.add(credentialIds.getString(n))
            }

            val results = oneCore.checkRevocation(ids)
            return@asyncCall Util.convertToRN(results)
        }
    }
}
