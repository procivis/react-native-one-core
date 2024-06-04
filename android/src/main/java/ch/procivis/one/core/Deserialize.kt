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
        val keys = didRequestKeys(request.getMap("keys")!!)

        val params = mutableMapOf<String, String>()
        for (entry in request.getMap("params")!!.entryIterator) {
            params[entry.key] = entry.value as String
        }

        return DidRequestBindingDto(organisationId, name, didMethod, keys, params)
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

    fun ids(ids: ReadableArray): List<String> {
        val result = mutableListOf<String>()
        for (n in 0 until ids.size()) {
            result.add(ids.getString(n))
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
            opt(query.getString("sort"), SortableCredentialColumnBindingEnum::valueOf),
            opt(query.getString("sortDirection"), SortDirection::valueOf),
            query.getString("organisationId").toString(),
            query.getString("name"),
            opt(
                query.getArray("exact")
            ) { columns ->
                enumList(
                    columns,
                    CredentialListQueryExactColumnBindingEnum::valueOf
                )
            },
            opt(query.getString("role"), CredentialRoleBindingDto::valueOf),
            opt(query.getArray("ids"), Deserialize::ids),
            opt(query.getArray("status")) { states ->
                enumList(
                    states,
                    CredentialStateBindingEnum::valueOf
                )
            },
            opt(query.getArray("include")) { types ->
                enumList(
                    types,
                    CredentialListIncludeEntityTypeBindingEnum::valueOf
                )
            },
        )
    }

    fun didListQuery(query: ReadableMap): DidListQueryBindingDto {
        return DidListQueryBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            opt(query.getString("sort"), SortableDidColumnBindingEnum::valueOf),
            opt(query.getString("sortDirection"), SortDirection::valueOf),
            query.getString("organisationId").toString(),
            query.getString("name"),
            query.getString("did"),
            opt(query.getString("type"), DidTypeBindingEnum::valueOf),
            if(query.hasKey("deactivated")) query.getBoolean("deactivated") else null,
            opt(
                query.getArray("exact")
            ) { columns ->
                enumList(
                    columns,
                    ExactDidFilterColumnBindingEnum::valueOf
                )
            },
            opt(query.getArray("keyAlgorithms"), Deserialize::ids),
            opt(query.getArray("keyRoles")) { roles ->
                enumList(
                    roles,
                    KeyRoleBindingEnum::valueOf
                )
            },
        )
    }

    fun historyListQuery(query: ReadableMap): HistoryListQueryBindingDto {
        return HistoryListQueryBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            query.getString("organisationId").toString(),
            query.getString("entityId"),
            opt(query.getString("action"), HistoryActionBindingEnum::valueOf),
            opt(query.getArray("entityTypes")) { types ->
                enumList(
                    types,
                    HistoryEntityTypeBindingEnum::valueOf
                )
            },
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

    fun proofSchemaListQuery(query: ReadableMap): ListProofSchamasFiltersBindingDto {
        return ListProofSchamasFiltersBindingDto(
            query.getInt("page").toUInt(),
            query.getInt("pageSize").toUInt(),
            opt(query.getString("sort"), SortableProofSchemaColumnBinding::valueOf),
            opt(query.getString("sortDirection"), SortDirection::valueOf),
            query.getString("organisationId").toString(),
            query.getString("name"),
            opt(
                query.getArray("exact")
            ) { columns ->
                enumList(
                    columns,
                    ProofSchemaListQueryExactColumnBinding::valueOf
                )
            },
            opt(query.getArray("ids"), Deserialize::ids),
        )
    }

    private fun historySearch(text: String?, type: String?): HistorySearchBindingDto? {
        if (text == null) {
            return null
        }

        return HistorySearchBindingDto(
            text,
            opt(type, HistorySearchEnumBindingEnum::valueOf),
        )
    }

    private fun <F, T> opt(input: F?, fn: (F) -> T): T? {
        if (input == null) {
            return null
        }
        return fn(input)
    }

    private fun <T> enumList(entries: ReadableArray, fn: (String) -> T): List<T> {
        val result = mutableListOf<T>()
        for (n in 0 until entries.size()) {
            result.add(fn(entries.getString(n)))
        }
        return result
    }
}
