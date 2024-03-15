package ch.procivis.one.core

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import uniffi.one_core.*

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
            "local" -> DidTypeBindingEnum.LOCAL
            "remote" -> DidTypeBindingEnum.REMOTE
            else -> {
                throw IllegalArgumentException("Invalid did type: $type")
            }
        }
    }

    private fun didRequestKeys(requestKeys: ReadableMap): DidRequestKeysBindingDto {
        val authentication = didRequestRoleKeys(requestKeys, "authentication")
        val assertionMethod = didRequestRoleKeys(requestKeys, "assertionMethod")
        val keyAgreement = didRequestRoleKeys(requestKeys, "keyAgreement")
        val capabilityInvocation = didRequestRoleKeys(requestKeys, "capabilityInvocation")
        val capabilityDelegation = didRequestRoleKeys(requestKeys, "capabilityDelegation")
        return DidRequestKeysBindingDto(
            authentication,
            assertionMethod,
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

    private fun credentialRole(role: String): CredentialRoleBindingDto {
        return when (role.lowercase()) {
            "holder" -> CredentialRoleBindingDto.HOLDER
            "issuer" -> CredentialRoleBindingDto.ISSUER
            "verifier" -> CredentialRoleBindingDto.VERIFIER
            else -> {
                throw IllegalArgumentException("Invalid credential role: $role")
            }
        }
    }

    fun ids(ids: ReadableArray): List<String> {
        val result = mutableListOf<String>()
        for (n in 0 until ids.size()) {
            result.add(ids.getString(n))
        }
        return result
    }

    private fun historyAction(action: String): HistoryActionBindingEnum {
        return when (action.lowercase()) {
            "accepted" -> HistoryActionBindingEnum.ACCEPTED
            "created" -> HistoryActionBindingEnum.CREATED
            "deactivated" -> HistoryActionBindingEnum.DEACTIVATED
            "deleted" -> HistoryActionBindingEnum.DELETED
            "issued" -> HistoryActionBindingEnum.ISSUED
            "offered" -> HistoryActionBindingEnum.OFFERED
            "rejected" -> HistoryActionBindingEnum.REJECTED
            "requested" -> HistoryActionBindingEnum.REQUESTED
            "revoked" -> HistoryActionBindingEnum.REVOKED
            "pending" -> HistoryActionBindingEnum.PENDING
            else -> {
                throw IllegalArgumentException("Invalid history action: $action")
            }
        }
    }

    private fun historySearch(text: String?, type: String?): HistorySearchBindingDto? {
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
            "key" -> HistoryEntityTypeBindingEnum.KEY
            "did" -> HistoryEntityTypeBindingEnum.DID
            "credential_schema" -> HistoryEntityTypeBindingEnum.CREDENTIAL_SCHEMA
            "credential" -> HistoryEntityTypeBindingEnum.CREDENTIAL
            "proof_schema" -> HistoryEntityTypeBindingEnum.PROOF_SCHEMA
            "proof" -> HistoryEntityTypeBindingEnum.PROOF
            "organisation" -> HistoryEntityTypeBindingEnum.ORGANISATION
            "backup" -> HistoryEntityTypeBindingEnum.BACKUP
            else -> {
                throw IllegalArgumentException("Invalid history entityType: $entityType")
            }
        }
    }

    private fun historyEntityTypes(entityTypes: ReadableArray?): List<HistoryEntityTypeBindingEnum>? {
        if (entityTypes == null) {
            return null
        }

        val result = mutableListOf<HistoryEntityTypeBindingEnum>()
        for (n in 0 until entityTypes.size()) {
            result.add(historyEntityType(entityTypes.getString(n)))
        }
        return result
    }

    fun presentationSubmitCredentialRequest(credential: ReadableMap): PresentationSubmitCredentialRequestBindingDto {
        val submitClaims = credential.getArray("submitClaims") as ReadableArray
        val claims = mutableListOf<String>()
        for (n in 0 until submitClaims.size()) {
            claims.add(submitClaims.getString(n))
        }
        return PresentationSubmitCredentialRequestBindingDto(
            credential.getString("credentialId").toString(),
            claims
        )
    }

    fun listQuery(query: ReadableMap): ListQueryBindingDto {
        return ListQueryBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            query.getString("organisationId").toString()
        )
    }

    fun credentialListQuery(query: ReadableMap): CredentialListQueryBindingDto {
        return CredentialListQueryBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            query.getString("organisationId").toString(),
            opt(query.getString("role"), Deserialize::credentialRole),
            opt(query.getArray("ids"), Deserialize::ids)
        )
    }

    fun historyListQuery(query: ReadableMap): HistoryListQueryBindingDto {
        return HistoryListQueryBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            query.getString("organisationId").toString(),
            query.getString("entityId"),
            opt(query.getString("action"), Deserialize::historyAction),
            historyEntityTypes(query.getArray("entityTypes")),
            query.getString("createdDateFrom"),
            query.getString("createdDateTo"),
            query.getString("didId"),
            query.getString("credentialId"),
            query.getString("credentialSchemaId"),
            historySearch(
                query.getString("searchText"),
                query.getString("searchType"),
            ),
        )
    }

    private fun <F, T> opt(input: F?, fn: (F) -> T): T? {
        if (input == null) {
            return null
        }
        return fn(input)
    }
}
