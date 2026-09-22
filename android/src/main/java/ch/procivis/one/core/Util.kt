package ch.procivis.one.core

import android.annotation.SuppressLint
import android.util.Log
import ch.procivis.one.core.Serialize.convertToRN
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

@SuppressLint("LogNotTimber")
object Util {
    private const val TAG = "ch.procivis.one.core.Util"

    // error handling + running core code outside JS thread
    fun syncCall(promise: Promise, function: () -> Any?) {
        object : Thread() {
            override fun run() {
                try {
                    promise.resolve(function())
                } catch (error: OneCoreException.Response) {
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
            } catch (error: OneCoreException.Response) {
                handleBindingException(promise, error)
            } catch (error: Throwable) {
                promise.reject(error)
            }
        }
    }

    private fun handleBindingException(promise: Promise, error: OneCoreException.Response) {
        val userInfo = Arguments.createMap()

        try {
            error.data.cause?.let { cause ->
                userInfo.putMap("cause", convertToRN(cause) as ReadableMap)
            }

            error.data.data?.let { data ->
                userInfo.putMap("data", convertToRN(data) as ReadableMap)
            }
        } catch (error: Throwable) {
            Log.w(TAG, "Failed to parse error userInfo: $error")
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