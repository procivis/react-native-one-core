package ch.procivis.one.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

object Util {
    // error handling + running core code outside JS thread
    fun asyncCall(promise: Promise, function: () -> Any?) {
        object : Thread() {
            override fun run() {
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
        }.start()
    }
}

fun ReadableMap.getUInt(name: String): UInt? {
    return if (this.hasKey(name) && !this.isNull(name)) this.getInt(name).toUInt() else null
}