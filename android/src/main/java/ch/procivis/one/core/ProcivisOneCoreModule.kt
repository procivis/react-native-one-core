package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.BindingException
import uniffi.one_core.HandleInvitationResponseBindingEnum
import uniffi.one_core.ListQueryBindingDto
import uniffi.one_core.OneCoreBindingInterface
import uniffi.one_core.PresentationSubmitCredentialRequestBindingDto

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ProcivisOneCoreModule"

    override fun getName() = "ProcivisOneCoreModule"

    private var oneCore: OneCoreBindingInterface? = null;

    private fun getCore(): OneCoreBindingInterface {
        return oneCore ?: throw BindingException.Uninitialized("core not initialized")
    }

    @ReactMethod
    fun initialize(promise: Promise) {
        Util.asyncCall(promise) {
            val dataDirPath = this.reactApplicationContext.filesDir.absolutePath;
            oneCore = uniffi.one_core.initializeCore(dataDirPath, AndroidKeyStoreKeyStorage())
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        Util.asyncCall(promise) {
            val version = getCore().version()
            return@asyncCall Util.convertToRN(version)
        }
    }

    @ReactMethod
    fun createOrganisation(uuid: String?, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall getCore().createOrganisation(uuid)
        }
    }

    @ReactMethod
    fun generateKey(keyRequest: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall getCore().generateKey(
                Deserialize.keyRequest(keyRequest)
            )
        }
    }

    @ReactMethod
    fun createDid(didRequest: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall getCore().createDid(Deserialize.didRequest(didRequest))
        }
    }

    @ReactMethod
    fun handleInvitation(url: String, holderDidId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val invitationResult = getCore().handleInvitation(url, holderDidId)
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
            getCore().holderAcceptCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderRejectCredential(interactionId: String, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().holderRejectCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getPresentationDefinition(proofId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val presentationDefinition = getCore().getPresentationDefintion(proofId)
            return@asyncCall Util.convertToRN(presentationDefinition)
        }
    }

    @ReactMethod
    fun holderRejectProof(interactionId: String, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().holderRejectProof(interactionId)
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
            getCore().holderSubmitProof(interactionId, submitCredentials)
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

            val credentials = getCore().getCredentials(listQuery)
            return@asyncCall Util.convertToRN(credentials)
        }
    }

    @ReactMethod
    fun getCredential(credentialId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val credential = getCore().getCredential(credentialId)
            return@asyncCall Util.convertToRN(credential)
        }
    }

    @ReactMethod
    fun getProof(proofId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val proof = getCore().getProof(proofId)
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

            val results = getCore().checkRevocation(ids)
            return@asyncCall Util.convertToRN(results)
        }
    }

    @ReactMethod
    fun uninitialize(deleteData: Boolean, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().uninitialize(deleteData)
            oneCore = null
            return@asyncCall null
        }
    }
}
