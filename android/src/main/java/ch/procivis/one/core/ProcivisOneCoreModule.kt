package ch.procivis.one.core

import ch.procivis.one.core.Deserialize.construct
import ch.procivis.one.core.DeserializeSpecific.enumList
import ch.procivis.one.core.Serialize.convertToRN
import ch.procivis.one.core.Util.asyncCall
import ch.procivis.one.core.Util.syncCall
import ch.procivis.one.core.ubiqu.UbiquKeyStorage
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import kotlinx.coroutines.CoroutineScope
import kotlin.coroutines.EmptyCoroutineContext

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "ProcivisOneCoreModule"

    private var oneCore: OneCoreBindingInterface? = null
    private val scope = CoroutineScope(EmptyCoroutineContext)

    private fun getCore(): OneCoreBindingInterface {
        return oneCore ?: throw BindingException.ErrorResponse(
            ErrorResponseBindingDto(
                "BR_0184",
                "core not initialized",
                null
            )
        )
    }

    private var ubiqu: UbiquKeyStorage? = null
    private fun getUbiqu(): UbiquKeyStorage {
        return ubiqu ?: throw BindingException.ErrorResponse(
            ErrorResponseBindingDto(
                "BR_0184",
                "ubiqu not initialized",
                null
            )
        )
    }

    @ReactMethod
    fun initialize(configJson: String, promise: Promise) {
        syncCall(promise) {
            val dataDirPath = this.reactApplicationContext.filesDir.absolutePath
            ubiqu = ubiqu ?: UbiquKeyStorage(this.reactApplicationContext)
            oneCore =
                initializeCore(
                    configJson = configJson,
                    dataDirPath = dataDirPath,
                    nativeSecureElement = AndroidKeyStoreKeyStorage(this.reactApplicationContext),
                    remoteSecureElement = ubiqu,
                    bleCentral = AndroidBLECentral(this.reactApplicationContext),
                    blePeripheral = AndroidBLEPeripheral(this.reactApplicationContext)
                )
            return@syncCall null
        }
    }

    @ReactMethod
    fun getVersion(promise: Promise) {
        syncCall(promise) {
            val version = getCore().version()
            return@syncCall convertToRN(version)
        }
    }

    @ReactMethod
    fun getConfig(promise: Promise) {
        asyncCall(promise, scope) {
            val config = getCore().getConfig()
            return@asyncCall convertToRN(config)
        }
    }

    @ReactMethod
    fun runTask(task: String, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().runTask(task)
        }
    }

    @ReactMethod
    fun deleteProofClaims(proofId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().deleteProofClaims(proofId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun checkCertificate(keyId: String, certificate: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().checkCertificate(keyId, construct(certificate))
            return@asyncCall null
        }
    }

    @ReactMethod
    fun shareCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().shareCredentialSchema(credentialSchemaId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun shareProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().shareProofSchema(proofSchemaId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createOrganisation(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createOrganisation(construct(request))
        }
    }

    @ReactMethod
    fun upsertOrganisation(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().upsertOrganisation(construct(request))
            return@asyncCall null
        }
    }

    @ReactMethod
    fun generateKey(keyRequest: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().generateKey(construct(keyRequest))
        }
    }

    @ReactMethod
    fun createDid(didRequest: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createDid(construct(didRequest))
        }
    }

    @ReactMethod
    fun getDids(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
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
        asyncCall(promise, scope) {
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
        asyncCall(promise, scope) {
            getCore().holderAcceptCredential(interactionId, didId, keyId, txCode)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun holderRejectCredential(interactionId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().holderRejectCredential(interactionId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getPresentationDefinition(proofId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val presentationDefinition = getCore().getPresentationDefinition(proofId)
            return@asyncCall convertToRN(presentationDefinition)
        }
    }

    @ReactMethod
    fun holderRejectProof(interactionId: String, promise: Promise) {
        asyncCall(promise, scope) {
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
        asyncCall(promise, scope) {
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
        asyncCall(promise, scope) {
            val credentials = getCore().getCredentials(construct(query))
            return@asyncCall convertToRN(credentials)
        }
    }

    @ReactMethod
    fun getCredential(credentialId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val credential = getCore().getCredential(credentialId)
            return@asyncCall convertToRN(credential)
        }
    }

    @ReactMethod
    fun deleteCredential(credentialId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().deleteCredential(credentialId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun importCredentialSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().importCredentialSchema(construct(request))
        }
    }

    @ReactMethod
    fun getCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val schema = getCore().getCredentialSchema(credentialSchemaId)
            return@asyncCall convertToRN(schema)
        }
    }

    @ReactMethod
    fun getCredentialSchemas(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val schemas = getCore().getCredentialSchemas(construct(query))
            return@asyncCall convertToRN(schemas)
        }
    }

    @ReactMethod
    fun deleteCredentialSchema(credentialSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().deleteCredentialSchema(credentialSchemaId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun createProof(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createProof(construct(request))
        }
    }

    @ReactMethod
    fun shareProof(proofId: String, request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val shareProof = getCore().shareProof(proofId, construct(request))
            return@asyncCall convertToRN(shareProof)
        }
    }

    @ReactMethod
    fun getProof(proofId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val proof = getCore().getProof(proofId)
            return@asyncCall convertToRN(proof)
        }
    }

    @ReactMethod
    fun getProofs(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val proofs = getCore().getProofs(construct(query))
            return@asyncCall convertToRN(proofs)
        }
    }

    @ReactMethod
    fun deleteProof(proofId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().deleteProof(proofId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun proposeProof(exchange: String, organisationId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().proposeProof(exchange, organisationId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createProofSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createProofSchema(construct(request))
        }
    }

    @ReactMethod
    fun getProofSchemas(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val schemas = getCore().getProofSchemas(construct(query))
            return@asyncCall convertToRN(schemas)
        }
    }

    @ReactMethod
    fun getProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val schema = getCore().getProofSchema(proofSchemaId)
            return@asyncCall convertToRN(schema)
        }
    }

    @ReactMethod
    fun deleteProofSchema(proofSchemaId: String, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().deleteProofSchema(proofSchemaId)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun importProofSchema(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().importProofSchema(construct(request))
        }
    }

    @ReactMethod
    fun checkRevocation(
        credentialIds: ReadableArray,
        forceRefresh: Boolean,
        promise: Promise
    ) {
        asyncCall(promise, scope) {
            val ids = DeserializeSpecific.ids(credentialIds)
            val results = getCore().checkRevocation(ids, forceRefresh)
            return@asyncCall convertToRN(results)
        }
    }

    @ReactMethod
    fun getHistory(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val listQuery = DeserializeSpecific.historyListQuery(query)
            val history = getCore().getHistoryList(listQuery)
            return@asyncCall convertToRN(history)
        }
    }

    @ReactMethod
    fun getHistoryEntry(historyId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().getHistoryEntry(historyId)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun createTrustAnchor(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createTrustAnchor(construct(request))
        }
    }

    @ReactMethod
    fun deleteTrustAnchor(trustAnchorId: String, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().deleteTrustAnchor(trustAnchorId)
        }
    }

    @ReactMethod
    fun getTrustAnchor(trustAnchorId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val trustAnchor = getCore().getTrustAnchor(trustAnchorId)
            return@asyncCall convertToRN(trustAnchor)
        }
    }

    @ReactMethod
    fun getTrustAnchors(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val trustAnchors = getCore().listTrustAnchors(construct(query))
            return@asyncCall convertToRN(trustAnchors)
        }
    }

    @ReactMethod
    fun createTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createTrustEntity(construct(request))
        }
    }

    @ReactMethod
    fun getTrustEntity(trustEntityId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val trustEntity = getCore().getTrustEntity(trustEntityId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun getTrustEntities(query: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            val trustEntity = getCore().listTrustEntities(construct(query))
            return@asyncCall convertToRN(trustEntity)
        }
    }


    @ReactMethod
    fun getTrustEntityByDid(didId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val trustEntity = getCore().getTrustEntityByDid(didId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun createRemoteTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getCore().createRemoteTrustEntity(construct(request))
        }
    }

    @ReactMethod
    fun updateRemoteTrustEntity(request: ReadableMap, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().updateRemoteTrustEntity(construct(request))
            return@asyncCall null
        }
    }

    @ReactMethod
    fun getRemoteTrustEntity(didId: String, promise: Promise) {
        asyncCall(promise, scope) {
            val trustEntity = getCore().getRemoteTrustEntity(didId)
            return@asyncCall convertToRN(trustEntity)
        }
    }

    @ReactMethod
    fun createBackup(password: String, outputPath: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().createBackup(password, outputPath)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun backupInfo(promise: Promise) {
        asyncCall(promise, scope) {
            val backupInfo = getCore().backupInfo()
            return@asyncCall convertToRN(backupInfo)
        }
    }

    @ReactMethod
    fun unpackBackup(password: String, inputPath: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().unpackBackup(password, inputPath)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun finalizeImport(promise: Promise) {
        asyncCall(promise, scope) {
            getCore().finalizeImport()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun rollbackImport(promise: Promise) {
        asyncCall(promise, scope) {
            getCore().rollbackImport()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun resolveJsonldContext(url: String, promise: Promise) {
        asyncCall(promise, scope) {
            val result = getCore().resolveJsonldContext(url)
            return@asyncCall convertToRN(result)
        }
    }

    @ReactMethod
    fun deleteCache(types: ReadableArray?, promise: Promise) {
        asyncCall(promise, scope) {
            var cacheTypeList: List<CacheTypeBindingDto>? = null;
            if (types != null) {
                cacheTypeList = enumList(types, CacheTypeBindingDto::valueOf)
            }
            getCore().deleteCache(cacheTypeList)
            return@asyncCall null
        }
    }

    @ReactMethod
    fun uninitialize(deleteData: Boolean, promise: Promise) {
        asyncCall(promise, scope) {
            getCore().uninitialize(deleteData)
            oneCore = null
            if (deleteData) {
                ubiqu?.reset()
            }
            return@asyncCall null
        }
    }

    // ===== Ubiqu specific methods
    @ReactMethod
    fun changeRSEPin(promise: Promise) {
        asyncCall(promise, scope) {
            getUbiqu().changePin()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun areRSEBiometricsSupported(promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getUbiqu().getBiometricsSupported()
        }
    }

    @ReactMethod
    fun areRSEBiometricsEnabled(promise: Promise) {
        asyncCall(promise, scope) {
            return@asyncCall getUbiqu().getBiometricsEnabled()
        }
    }

    @ReactMethod
    fun setRSEBiometrics(enabled: Boolean, promise: Promise) {
        asyncCall(promise, scope) {
            if (enabled) {
                getUbiqu().enableBiometrics(true)
            } else {
                getUbiqu().disableBiometrics()
            }
            return@asyncCall null
        }
    }

    @ReactMethod
    fun resetRSE(promise: Promise) {
        asyncCall(promise, scope) {
            ubiqu?.reset()
            return@asyncCall null
        }
    }

    @ReactMethod
    fun resetRSEPinFlow(promise: Promise) {
        asyncCall(promise, scope) {
            ubiqu?.resetPinFlow()
            return@asyncCall null
        }
    }

    // handling RN event emitter
    @ReactMethod
    fun addListener(eventName: String) {
        UbiquKeyStorage.listenerCount++
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        UbiquKeyStorage.listenerCount -= count
    }
}
