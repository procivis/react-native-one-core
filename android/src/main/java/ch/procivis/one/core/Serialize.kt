package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.*

object Serialize {
    private val CustomConversionTypes =
        arrayOf(
            HistoryMetadataBinding::class.java,
            ClaimBindingDto::class.java,
        )

    fun isCustomConversionType(input: Any?): Boolean {
        for (customType in CustomConversionTypes) {
            if (customType.isInstance(input)) {
                return true
            }
        }
        return false
    }

    fun convertCustom(input: Any): ReadableMap {
        if (input is HistoryMetadataBinding) {
            return historyMetadata(input)
        }
        if (input is ClaimBindingDto) {
            return claim(input)
        }
        throw IllegalArgumentException("Invalid conversion: $input")
    }

    private fun historyMetadata(metadata: HistoryMetadataBinding): ReadableMap {
        when (metadata) {
            is HistoryMetadataBinding.UnexportableEntities ->
                return Util.convertToRN(metadata.value) as ReadableMap
        }
    }

    private fun claim(c: ClaimBindingDto): ReadableMap {
        val result = Arguments.createMap()
        result.putString("id", c.id)
        result.putString("key", c.key)
        result.putString("dataType", c.dataType)

        when (val value = c.value) {
            is ClaimValueBindingDto.Value ->
                result.putString("value", value.value)
            is ClaimValueBindingDto.Nested ->
                result.putArray("value", Util.convertToRN(value.value) as ReadableArray)
        }

        return result
    }

}
