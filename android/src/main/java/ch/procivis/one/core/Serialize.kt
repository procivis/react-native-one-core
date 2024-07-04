package ch.procivis.one.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

object Serialize {
    object Obj {
        private val CustomConversionTypes =
            arrayOf(
                HistoryMetadataBinding::class.java,
                ClaimBindingDto::class.java,
                ProofRequestClaimBindingDto::class.java,
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
            if (input is ProofRequestClaimBindingDto) {
                return proofClaim(input)
            }
            throw IllegalArgumentException("Invalid map conversion: $input")
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

        private fun proofClaim(c: ProofRequestClaimBindingDto): ReadableMap {
            var result = Arguments.createMap()
            result.putMap("schema", Util.convertToRN(c.schema) as ReadableMap)

            c.value?.let {
                when (val value = it) {
                    is ProofRequestClaimValueBindingDto.Value ->
                        result.putString("value", value.value)

                    is ProofRequestClaimValueBindingDto.Claims ->
                        result.putArray("value", Util.convertToRN(value.value) as ReadableArray)
                }
            }

            return result
        }
    }

    object Str {
        private val CustomConversionTypes =
            arrayOf(
                CredentialSchemaTypeBindingEnum::class.java,
            )

        fun isCustomConversionType(input: Any?): Boolean {
            for (customType in CustomConversionTypes) {
                if (customType.isInstance(input)) {
                    return true
                }
            }
            return false
        }

        fun convertCustom(input: Any): String {
            if (input is CredentialSchemaTypeBindingEnum) {
                return credentialSchemaType(input)
            }
            throw IllegalArgumentException("Invalid string conversion: $input")
        }

        private fun credentialSchemaType(type: CredentialSchemaTypeBindingEnum): String {
            return when (type) {
                is CredentialSchemaTypeBindingEnum.ProcivisOneSchema2024 ->
                    "PROCIVIS_ONE_SCHEMA2024"

                is CredentialSchemaTypeBindingEnum.FallbackSchema2024 ->
                    "FALLBACK_SCHEMA2024"

                is CredentialSchemaTypeBindingEnum.Mdoc ->
                    "MDOC"

                is CredentialSchemaTypeBindingEnum.Other ->
                    type.value
            }
        }
    }
}
