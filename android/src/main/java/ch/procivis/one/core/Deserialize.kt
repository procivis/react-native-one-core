package ch.procivis.one.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.CredentialRoleBindingDto
import uniffi.one_core.DidRequestBindingDto
import uniffi.one_core.DidRequestKeysBindingDto
import uniffi.one_core.DidTypeBindingEnum
import uniffi.one_core.HistoryActionBindingEnum
import uniffi.one_core.HistoryEntityTypeBindingEnum
import uniffi.one_core.HistorySearchBindingDto
import uniffi.one_core.HistorySearchEnumBindingEnum
import uniffi.one_core.KeyRequestBindingDto

object Deserialize {
    fun keyRequest(request: ReadableMap): KeyRequestBindingDto {
        val keyType = request.getString("keyType")!!
        val name = request.getString("name")!!
        val storageType = request.getString("storageType")!!
        val organisationId = request.getString("organisationId")!!

        val keyParams = mutableMapOf<String, String>()
        for (entry in request.getMap("keyParams")!!.entryIterator) {
            keyParams[entry.key] = entry.value as String
        }

        val storageParams = mutableMapOf<String, String>()
        for (entry in request.getMap("storageParams")!!.entryIterator) {
            storageParams[entry.key] = entry.value as String
        }

        return KeyRequestBindingDto(
            organisationId,
            keyType,
            keyParams,
            name,
            storageType,
            storageParams
        )
    }

    fun didRequest(request: ReadableMap): DidRequestBindingDto {
        val organisationId = request.getString("organisationId")!!
        val name = request.getString("name")!!
        val didMethod = request.getString("didMethod")!!
        val didType = didType(request.getString("didType")!!)
        val keys = didRequestKeys(request.getMap("keys")!!)

        val params = mutableMapOf<String, String>()
        for (entry in request.getMap("params")!!.entryIterator) {
            params[entry.key] = entry.value as String
        }

        return DidRequestBindingDto(organisationId, name, didMethod, didType, keys, params)
    }

    private fun didType(type: String): DidTypeBindingEnum {
        return when (type.lowercase()) {
            "local" -> DidTypeBindingEnum.LOCAL;
            "remote" -> DidTypeBindingEnum.REMOTE;
            else -> {
                throw IllegalArgumentException("Invalid did type: $type")
            }
        }
    }

    private fun didRequestKeys(requestKeys: ReadableMap): DidRequestKeysBindingDto {
        val authentication = didRequestRoleKeys(requestKeys, "authentication")
        val assertion = didRequestRoleKeys(requestKeys, "assertion")
        val keyAgreement = didRequestRoleKeys(requestKeys, "keyAgreement")
        val capabilityInvocation = didRequestRoleKeys(requestKeys, "capabilityInvocation")
        val capabilityDelegation = didRequestRoleKeys(requestKeys, "capabilityDelegation")
        return DidRequestKeysBindingDto(
            authentication,
            assertion,
            keyAgreement,
            capabilityInvocation,
            capabilityDelegation
        )
    }

    private fun didRequestRoleKeys(requestKeys: ReadableMap, role: String): List<String> {
        val roleKeys = requestKeys.getArray(role)!!
        val result = mutableListOf<String>()
        for (n in 0 until roleKeys.size()) {
            result.add(roleKeys.getString(n))
        }
        return result
    }

    fun credentialRole(role: String): CredentialRoleBindingDto {
        return when (role.lowercase()) {
            "holder" -> CredentialRoleBindingDto.HOLDER;
            "issuer" -> CredentialRoleBindingDto.ISSUER;
            "verifier" -> CredentialRoleBindingDto.VERIFIER;
            else -> {
                throw IllegalArgumentException("Invalid credential role: $role")
            }
        }
    }

    fun historyAction(action: String): HistoryActionBindingEnum {
        return when (action.lowercase()) {
            "accepted" -> HistoryActionBindingEnum.ACCEPTED;
            "created" -> HistoryActionBindingEnum.CREATED;
            "deactivated" -> HistoryActionBindingEnum.DEACTIVATED;
            "deleted" -> HistoryActionBindingEnum.DELETED;
            "issued" -> HistoryActionBindingEnum.ISSUED;
            "offered" -> HistoryActionBindingEnum.OFFERED;
            "rejected" -> HistoryActionBindingEnum.REJECTED;
            "requested" -> HistoryActionBindingEnum.REQUESTED;
            "revoked" -> HistoryActionBindingEnum.REVOKED;
            "pending" -> HistoryActionBindingEnum.PENDING;
            else -> {
                throw IllegalArgumentException("Invalid history action: $action")
            }
        }
    }

    fun historySearch(text: String?, type: String?): HistorySearchBindingDto? {
        if (text == null) {
            return null
        }

        return HistorySearchBindingDto(
            text,
            opt(type, Deserialize::historySearchType),
        )
    }

    private fun historySearchType(searchType: String): HistorySearchEnumBindingEnum {
        return when (searchType.lowercase()) {
            "claim_name" -> HistorySearchEnumBindingEnum.CLAIM_NAME
            "claim_value" -> HistorySearchEnumBindingEnum.CLAIM_VALUE
            "credential_schema_name" -> HistorySearchEnumBindingEnum.CREDENTIAL_SCHEMA_NAME
            "issuer_did" -> HistorySearchEnumBindingEnum.ISSUER_DID
            "issuer_name" -> HistorySearchEnumBindingEnum.ISSUER_NAME
            "verifier_did" -> HistorySearchEnumBindingEnum.VERIFIER_DID
            "verifier_name" -> HistorySearchEnumBindingEnum.VERIFIER_NAME
            else -> {
                throw IllegalArgumentException("Invalid history search type: $searchType")
            }
        }
    }

    private fun historyEntityType(entityType: String): HistoryEntityTypeBindingEnum {
        return when (entityType.lowercase()) {
            "key" -> HistoryEntityTypeBindingEnum.KEY;
            "did" -> HistoryEntityTypeBindingEnum.DID;
            "credential_schema" -> HistoryEntityTypeBindingEnum.CREDENTIAL_SCHEMA;
            "credential" -> HistoryEntityTypeBindingEnum.CREDENTIAL;
            "proof_schema" -> HistoryEntityTypeBindingEnum.PROOF_SCHEMA;
            "proof" -> HistoryEntityTypeBindingEnum.PROOF;
            "organisation" -> HistoryEntityTypeBindingEnum.ORGANISATION;
            else -> {
                throw IllegalArgumentException("Invalid history entityType: $entityType")
            }
        }
    }

    fun historyEntityTypes(entityTypes: ReadableArray?): List<HistoryEntityTypeBindingEnum>? {
        if (entityTypes == null) {
            return null
        }

        val result = mutableListOf<HistoryEntityTypeBindingEnum>()
        for (n in 0 until entityTypes.size()) {
            result.add(historyEntityType(entityTypes.getString(n)))
        }
        return result
    }

    fun <T> opt(input: String?, fn: (String) -> T): T? {
        if (input == null) {
            return null
        }
        return fn(input);
    }
}