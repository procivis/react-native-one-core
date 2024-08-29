package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

object Util {
    // error handling
    fun asyncCall(promise: Promise, function: () -> Any?) {
        try {
            promise.resolve(function())
        } catch (error: Throwable) {
            promise.reject(
                error.javaClass.simpleName.replaceFirst(Regex("Exception$"), "Error"),
                error.message,
                error
            )
        }
    }
}

fun ReadableMap.getUInt(name: String): UInt? {
    return if (this.hasKey(name) && !this.isNull(name)) this.getInt(name).toUInt() else null
}