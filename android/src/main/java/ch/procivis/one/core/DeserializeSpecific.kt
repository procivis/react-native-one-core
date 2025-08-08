package ch.procivis.one.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import kotlin.reflect.KClass

object DeserializeSpecific {
    object Obj {
        private val CustomConversionTypes = arrayOf(CredentialSchemaTypeBindingEnum::class, OptionalString::class)

        fun isCustomConversionType(type: KClass<*>): Boolean {
            return CustomConversionTypes.contains(type)
        }

        fun convertCustom(type: KClass<*>, input: ReadableMap, field: String): Any? {
            return when (type) {
                CredentialSchemaTypeBindingEnum::class -> input.getString(field)
                    ?.let { credentialSchemaType(it) }
                OptionalString::class -> {
                    val value = input.getString(field)
                    if (value == null) {
                        OptionalString.None
                    } else {
                        OptionalString.Some(value)
                    }
                }
                else -> {
                    throw IllegalArgumentException("Invalid map conversion: $input")
                }
            }
        }
    }

    private fun credentialSchemaType(
        credentialSchemaType: String
    ): CredentialSchemaTypeBindingEnum {
        return when (credentialSchemaType) {
            "PROCIVIS_ONE_SCHEMA2024" -> CredentialSchemaTypeBindingEnum.ProcivisOneSchema2024
            "FALLBACK_SCHEMA2024" -> CredentialSchemaTypeBindingEnum.FallbackSchema2024
            "MDOC" -> CredentialSchemaTypeBindingEnum.Mdoc
            "SD_JWT_VC" -> CredentialSchemaTypeBindingEnum.SdJwtVc
            else -> CredentialSchemaTypeBindingEnum.Other(credentialSchemaType)
        }
    }

    fun ids(ids: ReadableArray): List<String> {
        val result = mutableListOf<String>()
        for (n in 0 until ids.size()) {
            result.add(ids.getString(n)!!)
        }
        return result
    }

    fun <T> enumList(entries: ReadableArray, fn: (String) -> T): List<T> {
        val result = mutableListOf<T>()
        for (n in 0 until entries.size()) {
            result.add(fn(entries.getString(n)!!))
        }
        return result
    }
}
