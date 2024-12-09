package ch.procivis.one.core

import ch.procivis.one.core.Deserialize.construct
import ch.procivis.one.core.Serialize.convertToRN
import ch.procivis.one.core.Util.asyncCall
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ProcivisOneCoreModule"

    private var oneCore: OneCoreBindingInterface? = null

    private fun getCore(): OneCoreBindingInterface {
        return oneCore ?: throw BindingException.ErrorResponse(ErrorResponseBindingDto("BR_0184", "core not initialized", null))
    }

    @ReactMethod
    fun initializeHolder(promise: Promise) {
        asyncCall(promise) {
            val dataDirPath = this.reactApplicationContext.filesDir.absolutePath
            oneCore =
                initializeHolderCore(
                    dataDirPath,
                    AndroidKeyStoreKeyStorage(this.reactApplicationContext),
                    AndroidBLECentral(this.reactApplicationContext),
                    AndroidBLEPeripheral(this.reactApplicationContext)
                )
            return@asyncCall null
        }
    }

    @ReactMethod
    fun initializeVerifier(promise: Promise) {
        asyncCall(promise) {
            val dataDirPath = this.reactApplicationContext.filesDir.absolutePath
            oneCore =
                initializeVerifierCore(
                    dataDirPath,
                    AndroidKeyStoreKeyStorage(this.reactApplicationContext),
                    AndroidBLECentral(this.reactApplicationContext),
                    AndroidBLEPeripheral(this.reactApplicationContext)
                )
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        asyncCall(promise) {
            val version = getCore().version()
            return@asyncCall convertToRN(version)
        }
    }

    @ReactMethod
    fun getConfig(promise: Promise) {
        asyncCall(promise) {
            val config = getCore().getConfig()
            return@asyncCall convertToRN(config)
        }
    }

    @ReactMethod
    fun runTask(task: String, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().runTask(task)
        }
    }

    @ReactMethod
    fun deleteProofClaims(proofId: String, promise: Promise) {
        asyncCall(promise) {
            getCore().deleteProofClaims(proofId)
            return@asyncCall null
        }
    }
    @ReactMethod
    fun checkCertificate(keyId: String, certificate: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            getCore().checkCertificate(keyId, construct(certificate))
            return@asyncCall null
        }
    }

    @ReactMethod
    fun shareCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().shareCredentialSchema(credentialSchemaId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun shareProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().shareProofSchema(proofSchemaId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createOrganisation(uuid: String?, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createOrganisation(uuid)
        }
    }

    @ReactMethod
    fun generateKey(keyRequest: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().generateKey(construct(keyRequest))
        }
    }

    @ReactMethod
    fun createDid(didRequest: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createDid(construct(didRequest))
        }
    }

    @ReactMethod
    fun getDids(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val dids = getCore().getDids(construct(query))
            return@asyncCall convertToRN(dids)
        }
    }

    @ReactMethod
    fun handleInvitation(
        url: String,
        organisationId: String,
        transport: ReadableArray?,
        promise: Promise
    ) {
        asyncCall(promise) {
            val transportList = transport?.let { DeserializeSpecific.ids(it) }
            val invitationResult = getCore().handleInvitation(url, organisationId, transportList)
            return@asyncCall convertToRN(invitationResult)
        }
    }

    @ReactMethod
    fun holderAcceptCredential(
        interactionId: String,
        didId: String,
        keyId: String?,
        txCode: String?,
        promise: Promise
    ) {
        asyncCall(promise) {
            getCore().holderAcceptCredential(interactionId, didId, keyId, txCode)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderRejectCredential(interactionId: String, promise: Promise) {
        asyncCall(promise) {
            getCore().holderRejectCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getPresentationDefinition(proofId: String, promise: Promise) {
        asyncCall(promise) {
            val presentationDefinition = getCore().getPresentationDefinition(proofId)
            return@asyncCall convertToRN(presentationDefinition)
        }
    }

    @ReactMethod
    fun holderRejectProof(interactionId: String, promise: Promise) {
        asyncCall(promise) {
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
        asyncCall(promise) {
            val submitCredentials =
                mutableMapOf<String, PresentationSubmitCredentialRequestBindingDto>()
            for (entry in credentials.entryIterator) {
                val credential = entry.value as ReadableMap
                submitCredentials[entry.key] = construct(credential)
            }
            getCore().holderSubmitProof(interactionId, submitCredentials, didId, keyId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getCredentials(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val credentials = getCore().getCredentials(construct(query))
            return@asyncCall convertToRN(credentials)
        }
    }

    @ReactMethod
    fun getCredential(credentialId: String, promise: Promise) {
        asyncCall(promise) {
            val credential = getCore().getCredential(credentialId)
            return@asyncCall convertToRN(credential)
        }
    }

    @ReactMethod
    fun deleteCredential(credentialId: String, promise: Promise) {
        asyncCall(promise) {
            getCore().deleteCredential(credentialId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun importCredentialSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().importCredentialSchema(construct(request))
        }
    }

    @ReactMethod
    fun getCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            val schema = getCore().getCredentialSchema(credentialSchemaId)
            return@asyncCall convertToRN(schema)
        }
    }

    @ReactMethod
    fun getCredentialSchemas(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val schemas = getCore().getCredentialSchemas(construct(query))
            return@asyncCall convertToRN(schemas)
        }
    }

    @ReactMethod
    fun deleteCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            getCore().deleteCredentialSchema(credentialSchemaId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun createProof(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createProof(construct(request))
        }
    }

    @ReactMethod
    fun shareProof(proofId: String, request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val shareProof = getCore().shareProof(proofId, construct(request))
            return@asyncCall convertToRN(shareProof)
        }
    }

    @ReactMethod
    fun getProof(proofId: String, promise: Promise) {
        asyncCall(promise) {
            val proof = getCore().getProof(proofId)
            return@asyncCall convertToRN(proof)
        }
    }

    @ReactMethod
    fun getProofs(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val proofs = getCore().getProofs(construct(query))
            return@asyncCall convertToRN(proofs)
        }
    }

    @ReactMethod
    fun retractProof(proofId: String, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().retractProof(proofId)
        }
    }

    @ReactMethod
    fun proposeProof(exchange: String, organisationId: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().proposeProof(exchange, organisationId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createProofSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createProofSchema(construct(request))
        }
    }

    @ReactMethod
    fun getProofSchemas(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val schemas = getCore().getProofSchemas(construct(query))
            return@asyncCall convertToRN(schemas)
        }
    }

    @ReactMethod
    fun getProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            val schema = getCore().getProofSchema(proofSchemaId)
            return@asyncCall convertToRN(schema)
        }
    }

    @ReactMethod
    fun deleteProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise) {
            getCore().deleteProofSchema(proofSchemaId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun importProofSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().importProofSchema(construct(request))
        }
    }

    @ReactMethod
    fun checkRevocation(credentialIds: ReadableArray, promise: Promise) {
        asyncCall(promise) {
            val ids = DeserializeSpecific.ids(credentialIds)
            val results = getCore().checkRevocation(ids)
            return@asyncCall convertToRN(results)
        }
    }

    @ReactMethod
    fun getHistory(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val listQuery = DeserializeSpecific.historyListQuery(query)
            val history = getCore().getHistoryList(listQuery)
            return@asyncCall convertToRN(history)
        }
    }

    @ReactMethod
    fun getHistoryEntry(historyId: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().getHistoryEntry(historyId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createTrustAnchor(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createTrustAnchor(construct(request))
        }
    }

    @ReactMethod
    fun deleteTrustAnchor(trustAnchorId: String, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().deleteTrustAnchor(trustAnchorId)
        }
    }

    @ReactMethod
    fun getTrustAnchor(trustAnchorId: String, promise: Promise) {
        asyncCall(promise) {
            val trustAnchor = getCore().getTrustAnchor(trustAnchorId)
            return@asyncCall convertToRN(trustAnchor)
        }
    }

    @ReactMethod
    fun getTrustAnchors(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val trustAnchors = getCore().listTrustAnchors(construct(query))
            return@asyncCall convertToRN(trustAnchors)
        }
    }

    @ReactMethod
    fun createTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createTrustEntity(construct(request))
        }
    }

    @ReactMethod
    fun getTrustEntity(trustEntityId: String, promise: Promise) {
        asyncCall(promise) {
            val trustEntity = getCore().getTrustEntity(trustEntityId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun getTrustEntities(query: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val trustEntity = getCore().listTrustEntities(construct(query))
            return@asyncCall convertToRN(trustEntity)
        }
    }


    @ReactMethod
    fun getTrustEntityByDid(didId: String, promise: Promise) {
        asyncCall(promise) {
            val trustEntity = getCore().getTrustEntityByDid(didId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun createRemoteTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            return@asyncCall getCore().createRemoteTrustEntity(construct(request))
        }
    }

    @ReactMethod
    fun updateRemoteTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise) {
            val foo = construct<UpdateRemoteTrustEntityFromDidRequestBindingDto>(request)
            return@asyncCall getCore().updateRemoteTrustEntity(foo)
        }
    }

    @ReactMethod
    fun getRemoteTrustEntity(didId: String, promise: Promise) {
        asyncCall(promise) {
            val trustEntity = getCore().getRemoteTrustEntity(didId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun createBackup(password: String, outputPath: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().createBackup(password, outputPath)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun backupInfo(promise: Promise) {
        asyncCall(promise) {
            val backupInfo = getCore().backupInfo()
            return@asyncCall convertToRN(backupInfo)
        }
    }

    @ReactMethod
    fun unpackBackup(password: String, inputPath: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().unpackBackup(password, inputPath)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun finalizeImport(promise: Promise) {
        asyncCall(promise) {
            getCore().finalizeImport()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun rollbackImport(promise: Promise) {
        asyncCall(promise) {
            getCore().rollbackImport()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun resolveJsonldContext(url: String, promise: Promise) {
        asyncCall(promise) {
            val result = getCore().resolveJsonldContext(url)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun uninitialize(deleteData: Boolean, promise: Promise) {
        asyncCall(promise) {
            getCore().uninitialize(deleteData)
            oneCore = null
            return@asyncCall null
        }
    }
}
