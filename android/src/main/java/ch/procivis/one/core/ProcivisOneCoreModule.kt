package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ProcivisOneCoreModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ProcivisOneCoreModule"

    override fun getName() = "ProcivisOneCoreModule"

    private val oneCore: uniffi.one_core.OneCoreInterface

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
    fun handleInvitation(url: String, promise: Promise) {
        Util.asyncCall(promise) {
            val invitationResult = oneCore.handleInvitation(url)
            return@asyncCall Util.convertToRN(invitationResult)
        }
    }

    @ReactMethod
    fun getCredentials(promise: Promise) {
        Util.asyncCall(promise) {
            val credentials = oneCore.getCredentials()
            return@asyncCall Util.convertToRN(credentials)
        }
    }
}