package ch.procivis.one.core

import ch.procivis.one.core.Serialize.convertToRN
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

object SerializeSpecific {
    object Obj {
        private val CustomConversionTypes =
            arrayOf(
                HistoryMetadataBinding::class.java,
                ClaimValueBindingDto::class.java,
                ProofRequestClaimValueBindingDto::class.java,
                ApplicableCredentialOrFailureHintBindingEnum::class.java,
                PresentationDefinitionV2ClaimValueBindingDto::class.java,
                HandleInvitationResponseBindingEnum::class.java,
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
            if (input is ClaimValueBindingDto) {
                return claimValue(input)
            }
            if (input is ProofRequestClaimValueBindingDto) {
                return proofClaimValue(input)
            }
            if (input is ApplicableCredentialOrFailureHintBindingEnum) {
                return credentialQuery(input)
            }
            if (input is PresentationDefinitionV2ClaimValueBindingDto) {
                return presentationDefinitionV2ClaimValue(input)
            }
            if (input is HandleInvitationResponseBindingEnum) {
                return invitationResponse(input)
            }
            throw IllegalArgumentException("Invalid map conversion: $input")
        }

        private fun historyMetadata(metadata: HistoryMetadataBinding): ReadableMap {
            val result = Arguments.createMap()
            when (metadata) {
                is HistoryMetadataBinding.UnexportableEntities -> {
                    result.putString("type_", "UNEXPORTABLE_ENTITIES")
                    result.putMap(
                        "value",
                        convertToRN(metadata.value) as ReadableMap
                    )
                }

                is HistoryMetadataBinding.ErrorMetadata -> {
                    result.putString("type_", "ERROR_METADATA")
                    result.putMap(
                        "value",
                        convertToRN(metadata.value) as ReadableMap
                    )
                }

                is HistoryMetadataBinding.WalletUnitJwt -> {
                    result.putString("type_", "WALLET_UNIT_JWT")
                    val values = Arguments.createArray()
                    values.pushString(metadata.v1)
                    result.putArray("value", values)
                }
            }
            return result
        }

        private fun credentialQuery(query: ApplicableCredentialOrFailureHintBindingEnum): ReadableMap {
            val result = Arguments.createMap()
            when (query) {
                is ApplicableCredentialOrFailureHintBindingEnum.ApplicableCredentials -> {
                    result.putString("type_", "APPLICABLE_CREDENTIALS")
                    result.putArray(
                        "applicableCredentials",
                        convertToRN(query.applicableCredentials) as ReadableArray
                    )
                }

                is ApplicableCredentialOrFailureHintBindingEnum.FailureHint -> {
                    result.putString("type_", "FAILURE_HINT")
                    result.putMap("failureHint", convertToRN(query.failureHint) as ReadableMap)
                }
            }
            return result
        }

        private fun claimValue(value: ClaimValueBindingDto): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is ClaimValueBindingDto.Boolean -> {
                    result.putString("type_", "BOOLEAN")
                    result.putBoolean("value", value.value)
                }

                is ClaimValueBindingDto.Float -> {
                    result.putString("type_", "FLOAT")
                    result.putDouble("value", value.value)
                }

                is ClaimValueBindingDto.Integer -> {
                    result.putString("type_", "INTEGER")
                    if (value.value < Int.MIN_VALUE || value.value > Int.MAX_VALUE) {
                        result.putDouble("value", value.value.toDouble())
                    } else {
                        result.putInt("value", value.value.toInt())
                    }
                }

                is ClaimValueBindingDto.String -> {
                    result.putString("type_", "STRING")
                    result.putString("value", value.value)
                }

                is ClaimValueBindingDto.Nested -> {
                    result.putString("type_", "NESTED")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun proofClaimValue(value: ProofRequestClaimValueBindingDto): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is ProofRequestClaimValueBindingDto.Value -> {
                    result.putString("type_", "VALUE")
                    result.putString("value", value.value)
                }

                is ProofRequestClaimValueBindingDto.Claims -> {
                    result.putString("type_", "CLAIMS")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun presentationDefinitionV2ClaimValue(value: PresentationDefinitionV2ClaimValueBindingDto): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is PresentationDefinitionV2ClaimValueBindingDto.Boolean -> {
                    result.putString("type_", "BOOLEAN")
                    result.putBoolean("value", value.value)
                }

                is PresentationDefinitionV2ClaimValueBindingDto.Float -> {
                    result.putString("type_", "FLOAT")
                    result.putDouble("value", value.value)
                }

                is PresentationDefinitionV2ClaimValueBindingDto.Integer -> {
                    result.putString("type_", "INTEGER")
                    if (value.value < Int.MIN_VALUE || value.value > Int.MAX_VALUE) {
                        result.putDouble("value", value.value.toDouble())
                    } else {
                        result.putInt("value", value.value.toInt())
                    }
                }

                is PresentationDefinitionV2ClaimValueBindingDto.String -> {
                    result.putString("type_", "STRING")
                    result.putString("value", value.value)
                }

                is PresentationDefinitionV2ClaimValueBindingDto.Nested -> {
                    result.putString("type_", "NESTED")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun invitationResponse(value: HandleInvitationResponseBindingEnum): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is HandleInvitationResponseBindingEnum.CredentialIssuance -> {
                    result.putString("type_", "CREDENTIAL_ISSUANCE")
                    result.putString("interactionId", value.interactionId)
                    value.keyStorageSecurityLevels?.let {
                        result.putArray(
                            "keyStorageSecurityLevels",
                            convertToRN(it) as ReadableArray
                        )
                    }
                    value.keyAlgorithms?.let {
                        result.putArray("keyAlgorithms", convertToRN(it) as ReadableArray)
                    }
                    value.txCode?.let {
                        result.putMap("txCode", convertToRN(it) as ReadableMap)
                    }
                }

                is HandleInvitationResponseBindingEnum.AuthorizationCodeFlow -> {
                    result.putString("type_", "AUTHORIZATION_CODE_FLOW")
                    result.putString("interactionId", value.interactionId)
                    result.putString("authorizationCodeFlowUrl", value.authorizationCodeFlowUrl)
                }

                is HandleInvitationResponseBindingEnum.ProofRequest -> {
                    result.putString("type_", "PROOF_REQUEST")
                    result.putString("interactionId", value.interactionId)
                    result.putString("proofId", value.proofId)
                }
            }
            return result
        }
    }

    object Arr {
        fun isCustomConversionType(input: Any?): Boolean {
            return ByteArray::class.isInstance(input)
        }

        fun convertCustom(input: Any): List<*> {
            if (input is ByteArray) {
                return input.toList()
            }
            throw IllegalArgumentException("Invalid array conversion: $input")
        }
    }
}
