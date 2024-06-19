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

    fun presentationSubmitCredentialRequest(
            credential: ReadableMap
    ): PresentationSubmitCredentialRequestBindingDto {
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

    fun credentialSchemaListQuery(query: ReadableMap): CredentialSchemaListQueryBindingDto {
        return CredentialSchemaListQueryBindingDto(
                query.getInt("page").toUInt(),
                query.getInt("pageSize").toUInt(),
                query.getString("organisationId").toString(),
                opt(query.getString("sort"), SortableCredentialSchemaColumnBindingEnum::valueOf),
                opt(query.getString("sortDirection"), SortDirection::valueOf),
                query.getString("name"),
                opt(query.getArray("ids"), Deserialize::ids),
                opt(query.getArray("exact")) { columns ->
                    enumList(columns, CredentialSchemaListQueryExactColumnBindingEnum::valueOf)
                },
                opt(query.getArray("include")) { columns ->
                    enumList(columns, CredentialSchemaListIncludeEntityType::valueOf)
                },
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
                opt(query.getArray("exact")) { columns ->
                    enumList(columns, CredentialListQueryExactColumnBindingEnum::valueOf)
                },
                opt(query.getString("role"), CredentialRoleBindingDto::valueOf),
                opt(query.getArray("ids"), Deserialize::ids),
                opt(query.getArray("status")) { states ->
                    enumList(states, CredentialStateBindingEnum::valueOf)
                },
                opt(query.getArray("include")) { types ->
                    enumList(types, CredentialListIncludeEntityTypeBindingEnum::valueOf)
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
                if (query.hasKey("deactivated")) query.getBoolean("deactivated") else null,
                opt(query.getArray("exact")) { columns ->
                    enumList(columns, ExactDidFilterColumnBindingEnum::valueOf)
                },
                opt(query.getArray("keyAlgorithms"), Deserialize::ids),
                opt(query.getArray("keyRoles")) { roles ->
                    enumList(roles, KeyRoleBindingEnum::valueOf)
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
                    enumList(types, HistoryEntityTypeBindingEnum::valueOf)
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
                query.getString("proofSchemaId"),
        )
    }

    fun proofSchemaListQuery(query: ReadableMap): ListProofSchemasFiltersBindingDto {
        return ListProofSchemasFiltersBindingDto(
                query.getInt("page").toUInt(),
                query.getInt("pageSize").toUInt(),
                opt(query.getString("sort"), SortableProofSchemaColumnBinding::valueOf),
                opt(query.getString("sortDirection"), SortDirection::valueOf),
                query.getString("organisationId").toString(),
                query.getString("name"),
                opt(query.getArray("exact")) { columns ->
                    enumList(columns, ProofSchemaListQueryExactColumnBinding::valueOf)
                },
                opt(query.getArray("ids"), Deserialize::ids),
        )
    }

    fun proofListQuery(query: ReadableMap): ProofListQueryBindingDto {
        return ProofListQueryBindingDto(
                query.getInt("page").toUInt(),
                query.getInt("pageSize").toUInt(),
                query.getString("organisationId").toString(),
                opt(query.getString("sort"), SortableProofListColumnBinding::valueOf),
                opt(query.getString("sortDirection"), SortDirection::valueOf),
                query.getString("name"),
                opt(query.getArray("ids"), Deserialize::ids),
                opt(query.getArray("exact")) { columns ->
                    enumList(columns, ProofListQueryExactColumnBindingEnum::valueOf)
                },
        )
    }

    fun proofSchemaImportRequest(request: ReadableMap): ProofSchemaImportRequestDto {
        return ProofSchemaImportRequestDto(
                request.getString("url")!!,
                request.getString("organisationId")!!,
        )
    }

    fun createProofSchemaRequest(request: ReadableMap): CreateProofSchemaRequestDto {
        val rawProofInputSchemas = request.getArray("proofInputSchemas")!!

        val proofInputSchemas = mutableListOf<ProofInputSchemaRequestDto>()
        for (i in 0 until rawProofInputSchemas.size()) {
            val rawInputSchema = rawProofInputSchemas.getMap(i)
            proofInputSchemas.add(proofInputSchemaRequest(rawInputSchema))
        }

        return CreateProofSchemaRequestDto(
                request.getString("name")!!,
                request.getString("organisationId")!!,
                request.getInt("expireDuration").toUInt(),
                proofInputSchemas,
        )
    }

    fun proofInputSchemaRequest(request: ReadableMap): ProofInputSchemaRequestDto {
        val rawClaimSchemas = request.getArray("claimSchemas")!!

        val claimSchemas = mutableListOf<CreateProofSchemaClaimRequestDto>()
        for (i in 0 until rawClaimSchemas.size()) {
            val rawClaimSchema = rawClaimSchemas.getMap(i)
            claimSchemas.add(proofSchemaClaimRequest(rawClaimSchema))
        }

        var validityConstraint: Long? = null
        if (request.hasKey("validityConstraint")) {
            validityConstraint = request.getInt("validityConstraint").toLong()
        }

        return ProofInputSchemaRequestDto(
                request.getString("credentialSchemaId")!!,
                validityConstraint,
                claimSchemas,
        )
    }

    fun proofSchemaClaimRequest(request: ReadableMap): CreateProofSchemaClaimRequestDto {
        return CreateProofSchemaClaimRequestDto(
                request.getString("id")!!,
                request.getBoolean("required"),
        )
    }

    fun deserializeImportCredentialSchemaRequest(request: ReadableMap): ImportCredentialSchemaRequestBindingDto {
       return ImportCredentialSchemaRequestBindingDto(
                request.getString("organisationId")!!,
                deserializeImportCredentialSchemaRequestSchema(request.getMap("schema")!!),
       ) 
    }

    fun deserializeImportCredentialSchemaRequestSchema(request: ReadableMap): ImportCredentialSchemaRequestSchemaBindingDto {
        val rawClaims = request.getArray("claims")!!

        val claims = mutableListOf<ImportCredentialSchemaClaimSchemaBindingDto>()
        for (i in 0 until rawClaims.size()) {
            val claimSchema = rawClaims.getMap(i)
            claims.add(deserializeImportCredentialSchemaRequestClaim(claimSchema))
        } 

        return ImportCredentialSchemaRequestSchemaBindingDto(
                request.getString("id")!!,
                request.getString("createdDate")!!,
                request.getString("lastModified")!!,
                request.getString("name")!!,
                request.getString("format")!!,
                request.getString("revocationMethod")!!,
                request.getString("organisationId")!!,
                claims,
                opt(request.getString("walletStorageType"), WalletStorageTypeBindingEnum::valueOf),
                request.getString("schemaId")!!,
                deserializeCredentialSchemaTypeBindingEnum(request.getString("schemaType")!!),
                opt(request.getString("layoutType"), LayoutTypeBindingEnum::valueOf),
                opt(request.getMap("layoutProperties"), ::deserializeImportCredentialSchemaRequestLayoutProperties),
        )    
    }

    fun deserializeImportCredentialSchemaRequestClaim(request: ReadableMap): ImportCredentialSchemaClaimSchemaBindingDto {
        val claimSchemas = mutableListOf<ImportCredentialSchemaClaimSchemaBindingDto>()

        if (request.hasKey("claims") && !request.isNull("claims")) {
            val rawClaimSchemas = request.getArray("claims")!!
            for (i in 0 until rawClaimSchemas.size()) {
                val claimSchema = rawClaimSchemas.getMap(i)
                claimSchemas.add(deserializeImportCredentialSchemaRequestClaim(claimSchema))
            } 
        }

        val array = if (request.hasKey("array")) request.getBoolean("array") else null;
        
        return ImportCredentialSchemaClaimSchemaBindingDto(
            request.getString("id")!!,
            request.getString("createdDate")!!,
            request.getString("lastModified")!!,
            request.getBoolean("required"),
            request.getString("key")!!,
            array,
            request.getString("datatype")!!,
            claimSchemas,
        )
    }

    fun deserializeImportCredentialSchemaRequestLayoutProperties(request: ReadableMap): ImportCredentialSchemaLayoutPropertiesBindingDto {
        return ImportCredentialSchemaLayoutPropertiesBindingDto(
            opt(request.getMap("background"), ::deserializeImportCredentialSchemaBackgroundProperties),
            opt(request.getMap("logo"), ::deserializeImportCredentialSchemaLogoProperties),
            request.getString("primaryAttribute"),
            request.getString("secondaryAttribute"),
            request.getString("pictureAttribute"),
            opt(request.getMap("code"), ::deserializeImportCredentialSchemaCodeProperties),        
        )
    }

    fun deserializeImportCredentialSchemaBackgroundProperties(request: ReadableMap): CredentialSchemaBackgroundPropertiesBindingDto {
        return CredentialSchemaBackgroundPropertiesBindingDto(
            request.getString("color"),
            request.getString("image"),
        )
    }

    fun deserializeImportCredentialSchemaLogoProperties(request: ReadableMap): CredentialSchemaLogoPropertiesBindingDto {
        return CredentialSchemaLogoPropertiesBindingDto(
            request.getString("fontColor"),
            request.getString("backgroundColor"),
            request.getString("image"), 
        )
    }

    fun deserializeImportCredentialSchemaCodeProperties(request: ReadableMap): CredentialSchemaCodePropertiesBindingDto {
        return CredentialSchemaCodePropertiesBindingDto(
            request.getString("attribute")!!,
            CredentialSchemaCodeTypeBindingDto.valueOf(request.getString("type")!!), 
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


private fun deserializeCredentialSchemaTypeBindingEnum(credentialSchemaType: String): CredentialSchemaTypeBindingEnum {
    when {
        credentialSchemaType == "PROCIVIS_ONE_SCHEMA2024" -> 
            return CredentialSchemaTypeBindingEnum.ProcivisOneSchema2024     
        credentialSchemaType == "FALLBACK_SCHEMA2024" -> 
            return CredentialSchemaTypeBindingEnum.FallbackSchema2024
        credentialSchemaType == "MDOC" ->
            return CredentialSchemaTypeBindingEnum.Mdoc         
        else ->
            return CredentialSchemaTypeBindingEnum.Other(credentialSchemaType)
    }
}