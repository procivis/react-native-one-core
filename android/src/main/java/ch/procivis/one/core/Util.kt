package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

object Util {
    // error handling + running core code outside JS thread
    fun asyncCall(promise: Promise, function: () -> Any?) {
        object : Thread() {
            override fun run() {
                try {
                    promise.resolve(function())
                } catch (error: BindingException.ErrorResponse) {
                    val userInfo = Arguments.createMap()
                    val cause = error.data.cause?.message
                    if (cause != null) {
                        userInfo.putString("cause", cause)
                    }

                    promise.reject(
                        error.data.code,
                        error.data.message,
                        error,
                        userInfo
                    )
                } catch (error: Throwable) {
                    promise.reject(error)
                }
            }
        }.start()
    }
}

fun ReadableMap.getUInt(name: String): UInt? {
    return if (this.hasKey(name) && !this.isNull(name)) this.getInt(name).toUInt() else null
}