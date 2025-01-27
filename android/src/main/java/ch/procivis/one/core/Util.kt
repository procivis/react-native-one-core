package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

object Util {
    // error handling + running core code outside JS thread
    fun syncCall(promise: Promise, function: () -> Any?) {
        object : Thread() {
            override fun run() {
                try {
                    promise.resolve(function())
                } catch (error: BindingException.ErrorResponse) {
                    handleBindingException(promise, error)
                } catch (error: Throwable) {
                    promise.reject(error)
                }
            }
        }.start()
    }

    fun asyncCall(promise: Promise, scope: CoroutineScope, function: suspend () -> Any?) {
        scope.launch {
            try {
                promise.resolve(function())
            } catch (error: BindingException.ErrorResponse) {
                handleBindingException(promise, error)
            } catch (error: Throwable) {
                promise.reject(error)
            }
        }
    }

    private fun handleBindingException(promise: Promise, error: BindingException.ErrorResponse) {
        val userInfo = Arguments.createMap()
        val cause = error.data.cause?.message
        if (!cause.isNullOrEmpty()) {
            userInfo.putString("cause", cause)
        }

        promise.reject(
            error.data.code,
            error.data.message,
            error,
            userInfo
        )
    }
}

fun ReadableMap.getUInt(name: String): UInt? {
    return if (this.hasKey(name) && !this.isNull(name)) this.getInt(name).toUInt() else null
}