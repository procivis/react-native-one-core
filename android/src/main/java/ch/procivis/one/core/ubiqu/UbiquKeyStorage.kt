package ch.procivis.one.core.ubiqu

import ch.procivis.one.core.GeneratedKeyBindingDto
import ch.procivis.one.core.NativeKeyStorage
import ch.procivis.one.core.NativeKeyStorageException
import com.facebook.react.bridge.ReactApplicationContext

// Dummy implementation for licensed library
class UbiquKeyStorage(private val context: ReactApplicationContext) : NativeKeyStorage {
    companion object {
        var listenerCount = 0
    }

    // ==== NativeKeyStorage interface
    override suspend fun generateKey(keyAlias: String): GeneratedKeyBindingDto {
        throw NativeKeyStorageException.Unsupported()
    }

    override suspend fun sign(keyReference: ByteArray, message: ByteArray): ByteArray {
        throw NativeKeyStorageException.Unsupported()
    }

    // ==== public interface
    fun changePin(): String? {
        throw NativeKeyStorageException.Unsupported()
    }

    fun getBiometricsSupported(): Boolean {
        throw NativeKeyStorageException.Unsupported()
    }

    fun getBiometricsEnabled(): Boolean {
        throw NativeKeyStorageException.Unsupported()
    }

    fun enableBiometrics(verifyBiometrics: Boolean): String? {
        throw NativeKeyStorageException.Unsupported()
    }

    fun disableBiometrics() {
        throw NativeKeyStorageException.Unsupported()
    }

    fun reset() {
        throw NativeKeyStorageException.Unsupported()
    }

    fun resetPinFlow() {
        throw NativeKeyStorageException.Unsupported()
    }
}