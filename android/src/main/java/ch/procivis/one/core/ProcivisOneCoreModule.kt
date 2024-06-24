package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.BindingException
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
            oneCore =
                    uniffi.one_core.initializeCore(
                            dataDirPath,
                            AndroidKeyStoreKeyStorage(this.reactApplicationContext)
                    )
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
    fun getDids(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.didListQuery(query)
            val dids = getCore().getDids(listQuery)
            return@asyncCall Util.convertToRN(dids)
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
    fun holderAcceptCredential(
            interactionId: String,
            didId: String,
            keyId: String?,
            promise: Promise
    ) {
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
            val presentationDefinition = getCore().getPresentationDefinition(proofId)
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
    fun holderSubmitProof(
            interactionId: String,
            credentials: ReadableMap,
            didId: String,
            keyId: String?,
            promise: Promise
    ) {
        Util.asyncCall(promise) {
            val submitCredentials =
                    mutableMapOf<String, PresentationSubmitCredentialRequestBindingDto>()
            for (entry in credentials.entryIterator) {
                val credential = entry.value as ReadableMap
                submitCredentials[entry.key] =
                        Deserialize.presentationSubmitCredentialRequest(credential)
            }
            getCore().holderSubmitProof(interactionId, submitCredentials, didId, keyId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getCredentials(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.credentialListQuery(query)
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
    fun importCredentialSchema(request: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val r = Deserialize.deserializeImportCredentialSchemaRequest(request)
            return@asyncCall getCore().importCredentialSchema(r)
        }
    }

    @ReactMethod
    fun getCredentialSchema(credentialSchemaId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val schema = getCore().getCredentialSchema(credentialSchemaId)
            return@asyncCall Util.convertToRN(schema)
        }
    }

    @ReactMethod
    fun getCredentialSchemas(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.credentialSchemaListQuery(query)
            val schemas = getCore().getCredentialSchemas(listQuery)
            return@asyncCall Util.convertToRN(schemas)
        }
    }

    @ReactMethod
    fun deleteCredentialSchema(credentialSchemaId: String, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().deleteCredentialSchema(credentialSchemaId)
            return@asyncCall null
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
    fun getProofs(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.proofListQuery(query)
            val proofs = getCore().getProofs(listQuery)
            return@asyncCall Util.convertToRN(proofs)
        }
    }

    @ReactMethod
    fun createProofSchema(request: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val r = Deserialize.createProofSchemaRequest(request)
            return@asyncCall getCore().createProofSchema(r)
        }
    }

    @ReactMethod
    fun getProofSchemas(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.proofSchemaListQuery(query)
            val schemas = getCore().getProofSchemas(listQuery)
            return@asyncCall Util.convertToRN(schemas)
        }
    }

    @ReactMethod
    fun getProofSchema(proofSchemaId: String, promise: Promise) {
        Util.asyncCall(promise) {
            val schema = getCore().getProofSchema(proofSchemaId)
            return@asyncCall Util.convertToRN(schema)
        }
    }

    @ReactMethod
    fun deleteProofSchema(proofSchemaId: String, promise: Promise) {
        Util.asyncCall(promise) {
            getCore().deleteProofSchema(proofSchemaId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun importProofSchema(request: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val r = Deserialize.importProofSchemaRequest(request)
            return@asyncCall getCore().importProofSchema(r)
        }
    }

    @ReactMethod
    fun checkRevocation(credentialIds: ReadableArray, promise: Promise) {
        Util.asyncCall(promise) {
            val ids = Deserialize.ids(credentialIds)
            val results = getCore().checkRevocation(ids)
            return@asyncCall Util.convertToRN(results)
        }
    }

    @ReactMethod
    fun getHistory(query: ReadableMap, promise: Promise) {
        Util.asyncCall(promise) {
            val listQuery = Deserialize.historyListQuery(query)
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
