package ch.procivis.one.core

import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.HistoryMetadataBinding

object Serialize {
    private val CustomConversionTypes =
        arrayOf(
            HistoryMetadataBinding::class.java
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
        if (HistoryMetadataBinding::class.java.isInstance(input)) {
            return historyMetadata(input as HistoryMetadataBinding)
        }
        throw IllegalArgumentException("Invalid conversion: $input")
    }

    private fun historyMetadata(metadata: HistoryMetadataBinding): ReadableMap {
        return Util.convertToRN(
            when (metadata) {
                is HistoryMetadataBinding.UnexportableEntities ->
                    metadata.value
            }
        ) as ReadableMap
    }
}
