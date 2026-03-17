package ch.procivis.one.core

import ch.procivis.one.core.Serialize.convertToRN
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

object SerializeSpecific {
    object Obj {
        private val CustomConversionTypes =
            arrayOf(
                HistoryMetadata::class.java,
                ClaimValue::class.java,
                ProofClaimValue::class.java,
                ApplicableCredentialOrFailureHint::class.java,
                PresentationDefinitionV2ClaimValue::class.java,
                HandleInvitationResponse::class.java,
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
            if (input is HistoryMetadata) {
                return historyMetadata(input)
            }
            if (input is ClaimValue) {
                return claimValue(input)
            }
            if (input is ProofClaimValue) {
                return proofClaimValue(input)
            }
            if (input is ApplicableCredentialOrFailureHint) {
                return credentialQuery(input)
            }
            if (input is PresentationDefinitionV2ClaimValue) {
                return presentationDefinitionV2ClaimValue(input)
            }
            if (input is HandleInvitationResponse) {
                return invitationResponse(input)
            }
            throw IllegalArgumentException("Invalid map conversion: $input")
        }

        private fun historyMetadata(metadata: HistoryMetadata): ReadableMap {
            val result = Arguments.createMap()
            when (metadata) {
                is HistoryMetadata.UnexportableEntities -> {
                    result.putString("type_", "UNEXPORTABLE_ENTITIES")
                    result.putMap(
                        "value",
                        convertToRN(metadata.value) as ReadableMap
                    )
                }

                is HistoryMetadata.ErrorMetadata -> {
                    result.putString("type_", "ERROR_METADATA")
                    result.putMap(
                        "value",
                        convertToRN(metadata.value) as ReadableMap
                    )
                }

                is HistoryMetadata.WalletUnitJwt -> {
                    result.putString("type_", "WALLET_UNIT_JWT")
                    val values = Arguments.createArray()
                    values.pushString(metadata.v1)
                    result.putArray("value", values)
                }
            }
            return result
        }

        private fun credentialQuery(query: ApplicableCredentialOrFailureHint): ReadableMap {
            val result = Arguments.createMap()
            when (query) {
                is ApplicableCredentialOrFailureHint.ApplicableCredentials -> {
                    result.putString("type_", "APPLICABLE_CREDENTIALS")
                    result.putArray(
                        "applicableCredentials",
                        convertToRN(query.applicableCredentials) as ReadableArray
                    )
                }

                is ApplicableCredentialOrFailureHint.FailureHint -> {
                    result.putString("type_", "FAILURE_HINT")
                    result.putMap("failureHint", convertToRN(query.failureHint) as ReadableMap)
                }
            }
            return result
        }

        private fun claimValue(value: ClaimValue): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is ClaimValue.Boolean -> {
                    result.putString("type_", "BOOLEAN")
                    result.putBoolean("value", value.value)
                }

                is ClaimValue.Float -> {
                    result.putString("type_", "FLOAT")
                    result.putDouble("value", value.value)
                }

                is ClaimValue.Integer -> {
                    result.putString("type_", "INTEGER")
                    if (value.value < Int.MIN_VALUE || value.value > Int.MAX_VALUE) {
                        result.putDouble("value", value.value.toDouble())
                    } else {
                        result.putInt("value", value.value.toInt())
                    }
                }

                is ClaimValue.String -> {
                    result.putString("type_", "STRING")
                    result.putString("value", value.value)
                }

                is ClaimValue.Nested -> {
                    result.putString("type_", "NESTED")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun proofClaimValue(value: ProofClaimValue): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is ProofClaimValue.Value -> {
                    result.putString("type_", "VALUE")
                    result.putString("value", value.value)
                }

                is ProofClaimValue.Claims -> {
                    result.putString("type_", "CLAIMS")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun presentationDefinitionV2ClaimValue(value: PresentationDefinitionV2ClaimValue): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is PresentationDefinitionV2ClaimValue.Boolean -> {
                    result.putString("type_", "BOOLEAN")
                    result.putBoolean("value", value.value)
                }

                is PresentationDefinitionV2ClaimValue.Float -> {
                    result.putString("type_", "FLOAT")
                    result.putDouble("value", value.value)
                }

                is PresentationDefinitionV2ClaimValue.Integer -> {
                    result.putString("type_", "INTEGER")
                    if (value.value < Int.MIN_VALUE || value.value > Int.MAX_VALUE) {
                        result.putDouble("value", value.value.toDouble())
                    } else {
                        result.putInt("value", value.value.toInt())
                    }
                }

                is PresentationDefinitionV2ClaimValue.String -> {
                    result.putString("type_", "STRING")
                    result.putString("value", value.value)
                }

                is PresentationDefinitionV2ClaimValue.Nested -> {
                    result.putString("type_", "NESTED")
                    result.putArray("value", convertToRN(value.value) as ReadableArray)
                }
            }
            return result
        }

        private fun invitationResponse(value: HandleInvitationResponse): ReadableMap {
            val result = Arguments.createMap()
            when (value) {
                is HandleInvitationResponse.CredentialIssuance -> {
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
                    result.putString("protocol", value.protocol)
                    result.putBoolean("requiresWalletInstanceAttestation", value.requiresWalletInstanceAttestation)
                }

                is HandleInvitationResponse.AuthorizationCodeFlow -> {
                    result.putString("type_", "AUTHORIZATION_CODE_FLOW")
                    result.putString("interactionId", value.interactionId)
                    result.putString("authorizationCodeFlowUrl", value.authorizationCodeFlowUrl)
                    result.putString("protocol", value.protocol)
                }

                is HandleInvitationResponse.ProofRequest -> {
                    result.putString("type_", "PROOF_REQUEST")
                    result.putString("interactionId", value.interactionId)
                    result.putString("proofId", value.proofId)
                    result.putString("protocol", value.protocol)
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
