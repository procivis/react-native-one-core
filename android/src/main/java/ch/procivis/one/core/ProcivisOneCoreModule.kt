package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.BindingException
import uniffi.one_core.CredentialListQueryBindingDto
import uniffi.one_core.HandleInvitationResponseBindingEnum
import uniffi.one_core.HistoryListQueryBindingDto
import uniffi.one_core.ListQueryBindingDto
import uniffi.one_core.OneCoreBindingInterface
import uniffi.one_core.PresentationSubmitCredentialRequestBindingDto

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ProcivisOneCoreModule"

    private var oneCore: OneCoreBindingInterface? = null

    private fun getCore(): OneCoreBindingInterface {
        return oneCore ?: throw BindingException.Uninitialized("core not initialized")
    }

    @ReactMethod
    fun initialize(promise: Promise) {
        Util.asyncCall(promise) {
            val dataDirPath = this.reactApplicationContext.filesDir.absolutePath
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
    fun getConfig(promise: Promise) {
        Util.asyncCall(promise) {
            val config = getCore().getConfig()
            return@asyncCall Util.convertToRN(config)
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
            return@asyncCall getCore().generateKey(Deserialize.keyRequest(keyRequest))
        }
    }

    @ReactMethod
    fun createDid(didRequest: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            return@asyncCall getCore().createDid(Deserialize.didRequest(didRequest))
        }
    }

    @ReactMethod
    fun handleInvitation(url: String, organisationId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val invitationResult = getCore().handleInvitation(url, organisationId)
            return@asyncCall Util.convertToRN(invitationResult)
        }
    }

    @ReactMethod
    fun holderAcceptCredential(interactionId: String, didId: String, keyId: String?, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().holderAcceptCredential(interactionId, didId, keyId)
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
    fun holderSubmitProof(interactionId: String, credentials: ReadableMap, didId: String, keyId: String?, promise: Promise) {
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

                submitCredentials[entry.key] =
                    PresentationSubmitCredentialRequestBindingDto(
                        credential.getString("credentialId").toString(),
                        claims
                    )
            }
            getCore().holderSubmitProof(interactionId, submitCredentials, didId, keyId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getCredentials(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery =
                CredentialListQueryBindingDto(
                    query.getInt("page").toUInt(),
                    query.getInt("pageSize").toUInt(),
                    query.getString("organisationId").toString(),
                    Deserialize.opt(query.getString("role"), Deserialize::credentialRole),
                    Deserialize.credentialIds(query.getArray("ids"))
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
    fun deleteCredential(credentialId: String, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().deleteCredential(credentialId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getCredentialSchemas(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery =
                ListQueryBindingDto(
                    query.getInt("page").toUInt(),
                    query.getInt("pageSize").toUInt(),
                    query.getString("organisationId").toString()
                )

            val schemas = getCore().getCredentialSchemas(listQuery)
            return@asyncCall Util.convertToRN(schemas)
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
    fun getHistory(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery =
                HistoryListQueryBindingDto(
                    query.getInt("page").toUInt(),
                    query.getInt("pageSize").toUInt(),
                    query.getString("organisationId").toString(),
                    query.getString("entityId"),
                    Deserialize.opt(query.getString("action"), Deserialize::historyAction),
                    Deserialize.historyEntityTypes(query.getArray("entityTypes")),
                    query.getString("createdDateFrom"),
                    query.getString("createdDateTo"),
                    query.getString("didId"),
                    query.getString("credentialId"),
                    query.getString("credentialSchemaId"),
                    Deserialize.historySearch(
                        query.getString("searchText"),
                        query.getString("searchType"),
                    ),
                )

            val history = getCore().getHistoryList(listQuery)
            return@asyncCall Util.convertToRN(history)
        }
    }

    @ReactMethod
    fun getHistoryEntry(historyId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val result = getCore().getHistoryEntry(historyId)
            return@asyncCall Util.convertToRN(result)
        }
    }

    @ReactMethod
    fun createBackup(password: String, outputPath: String, promise: Promise) {
        Util.asyncCall(promise) {
            val result = getCore().createBackup(password, outputPath)
            return@asyncCall Util.convertToRN(result)
        }
    }

    @ReactMethod
    fun backupInfo(promise: Promise) {
        Util.asyncCall(promise) {
            val backupInfo = getCore().backupInfo()
            return@asyncCall Util.convertToRN(backupInfo)
        }
    }

    @ReactMethod
    fun unpackBackup(password: String, inputPath: String, promise: Promise) {
        Util.asyncCall(promise) {
            val result = getCore().unpackBackup(password, inputPath)
            return@asyncCall Util.convertToRN(result)
        }
    }

    @ReactMethod
    fun finalizeImport(promise: Promise) {
        Util.asyncCall(promise) {
            getCore().finalizeImport()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun rollbackImport(promise: Promise) {
        Util.asyncCall(promise) {
            getCore().rollbackImport()
            return@asyncCall null
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
