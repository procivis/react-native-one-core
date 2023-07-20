package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ProcivisOneCoreModule (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ProcivisOneCoreModule"

    override fun getName() = "ProcivisOneCoreModule"

    private val oneCore: uniffi.one_core.OneCoreInterface
    init {
        oneCore = uniffi.one_core.initializeCore(this.reactApplicationContext.filesDir.absolutePath)
    }

    @ReactMethod fun getVersion(promise: Promise) {
        try {
            val version = oneCore.version()
            val result = Arguments.createMap()
            result.putString("target", version.target)
            result.putString("buildTime", version.buildTime)
            result.putString("branch", version.branch)
            result.putString("tag", version.tag)
            result.putString("commit", version.commit)
            result.putString("rustVersion", version.rustVersion)
            result.putString("pipelineId", version.pipelineId)
            promise.resolve(result)
        } catch (error: Throwable) {
            promise.reject(error)
        }
    }

    @ReactMethod fun createOrg(promise: Promise) {
        try {
            promise.resolve(oneCore.createOrg())
        } catch (error: Throwable) {
            promise.reject(error)
        }
    }
}
