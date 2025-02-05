//
//  Deserialize.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation

struct SerializationError: LocalizedError {
    let description: String
    
    init(_ description: String) {
        self.description = description
    }
    
    var errorDescription: String? {
        description
    }
}

func deserializeKeyRequest(keyRequest: NSDictionary) throws -> KeyRequestBindingDto {
    let keyType: String = try safeCast(keyRequest.value(forKey: "keyType"));
    let name: String = try safeCast(keyRequest.value(forKey: "name"));
    let storageType: String = try safeCast(keyRequest.value(forKey: "storageType"));
    let organisationId: String = try safeCast(keyRequest.value(forKey: "organisationId"));
    
    let keyParamsRaw: NSDictionary = try safeCast(keyRequest.value(forKey: "keyParams"));
    var keyParams: [String: String] = [:];
    try keyParamsRaw.allKeys.forEach {
        let key: String = try safeCast($0);
        keyParams[key] = keyParamsRaw.value(forKey: key) as? String;
    }
    
    let storageParamsRaw: NSDictionary = try safeCast(keyRequest.value(forKey: "storageParams"));
    var storageParams: [String: String] = [:];
    try storageParamsRaw.allKeys.forEach {
        let key: String = try safeCast($0);
        storageParams[key] = storageParamsRaw.value(forKey: key) as? String;
    }
    
    return KeyRequestBindingDto(organisationId: organisationId, keyType: keyType, keyParams: keyParams, name: name, storageType: storageType, storageParams: storageParams);
}

func deserializeDidRequest(didRequest: NSDictionary) throws -> DidRequestBindingDto {
    let organisationId: String = try safeCast(didRequest.value(forKey: "organisationId"));
    let name: String = try safeCast(didRequest.value(forKey: "name"));
    let didMethod: String = try safeCast(didRequest.value(forKey: "didMethod"));
    let keys = try deserializeDidRequestKeys(didRequestKeys: try safeCast(didRequest.value(forKey: "keys")));
    
    let paramsRaw: NSDictionary = try safeCast(didRequest.value(forKey: "params"));
    var params: [String: String] = [:];
    try paramsRaw.allKeys.forEach {
        let key: String = try safeCast($0);
        params[key] = paramsRaw.value(forKey: key) as? String;
    }
    
    return DidRequestBindingDto(organisationId: organisationId, name: name, didMethod: didMethod, keys: keys, params: params);
}

func deserializeDidRequestKeys(didRequestKeys: NSDictionary) throws -> DidRequestKeysBindingDto {
    let authentication = try deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "authentication");
    let assertionMethod = try deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "assertionMethod");
    let keyAgreement = try deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "keyAgreement");
    let capabilityInvocation = try deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityInvocation");
    let capabilityDelegation = try deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityDelegation");
    return DidRequestKeysBindingDto(authentication: authentication, assertionMethod: assertionMethod, keyAgreement: keyAgreement, capabilityInvocation: capabilityInvocation, capabilityDelegation: capabilityDelegation);
}

func deserializeDidRequestKeySet(didRequestKeys: NSDictionary, keyRole: String) throws -> [String] {
    let roleKeys: NSArray = try safeCast(didRequestKeys.value(forKey: keyRole));
    var result: [String] = [];
    try roleKeys.forEach { key in
        result.append(try safeCast(key));
    }
    return result;
}

func deserializeHistorySearch(text: String?, type: String?) throws -> HistorySearchBindingDto? {
    if text == nil {
        return nil
    }
    
    return HistorySearchBindingDto(
        text: text!,
        type: try opt(type, deserializeEnum)
    )
}

func deserializeIds(_ ids: NSArray) throws -> [String] {
    var result: [String] = [];
    try ids.forEach { id in
        result.append(try safeCast(id));
    }
    return result
}

func deserializeCacheTypes(types: NSArray?) throws -> [CacheTypeBindingDto]? {
    return try opt(types, enumList)
}

func deserializePresentationSubmitCredentialRequest(_ input: NSDictionary) throws -> PresentationSubmitCredentialRequestBindingDto {
    let claims: NSArray = try safeCast(input.value(forKey: "submitClaims"));
    var submitClaims: [String] = [];
    try claims.forEach { claim in
        submitClaims.append(try safeCast(claim));
    }
    return PresentationSubmitCredentialRequestBindingDto(credentialId: try safeCast(input.value(forKey: "credentialId")), submitClaims: submitClaims);
}

func deserializeCredentialSchemaListQuery(_ query: NSDictionary) throws -> CredentialSchemaListQueryBindingDto {
    return CredentialSchemaListQueryBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        name: query.value(forKey: "name") as? String,
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds),
        exact: try opt(query.value(forKey: "exact") as? NSArray, enumList),
        include: try opt(query.value(forKey: "include") as? NSArray, enumList)
    )
}

func deserializeCredentialListQuery(_ query: NSDictionary) throws -> CredentialListQueryBindingDto {
    return CredentialListQueryBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        name: query.value(forKey: "name") as? String,
        searchText: query.value(forKey: "searchText") as? String,
        searchType: try opt(query.value(forKey: "searchType") as? NSArray, enumList),
        exact: try opt(query.value(forKey: "exact") as? NSArray, enumList ),
        role: try opt(query.value(forKey: "role") as? String, deserializeEnum),
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds),
        status: try opt(query.value(forKey: "status") as? NSArray, enumList),
        include: try opt(query.value(forKey: "include") as? NSArray, enumList)
    )
}

func deserializeDidListQuery(_ query: NSDictionary) throws -> DidListQueryBindingDto {
    return DidListQueryBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        name: query.value(forKey: "name") as? String,
        did: query.value(forKey: "did") as? String,
        type: try opt(query.value(forKey: "type") as? String, deserializeEnum),
        deactivated: query.value(forKey: "deactivated") as? Bool,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } ),
        keyAlgorithms: try opt(query.value(forKey: "keyAlgorithms") as? NSArray, deserializeIds),
        keyRoles: try opt(query.value(forKey: "keyRoles") as? NSArray, { roles in try enumList(roles) }),
        keyStorages: try opt(query.value(forKey: "keyStorages") as? NSArray, deserializeIds),
        keyIds: try opt(query.value(forKey: "keyIds") as? NSArray, deserializeIds),
        didMethods: try opt(query.value(forKey: "didMethods") as? NSArray, deserializeIds)
    )
}

func deserializeHistoryListQuery(_ query: NSDictionary) throws -> HistoryListQueryBindingDto {
    return HistoryListQueryBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        entityId: query.value(forKey: "entityId") as? String,
        entityTypes: try opt(query.value(forKey: "entityTypes") as? NSArray, enumList),
        action: try opt(query.value(forKey: "action") as? String, deserializeEnum),
        createdDateFrom: query.value(forKey: "createdDateFrom") as? String,
        createdDateTo: query.value(forKey: "createdDateTo") as? String,
        didId: query.value(forKey: "didId") as? String,
        credentialId: query.value(forKey: "credentialId") as? String,
        credentialSchemaId: query.value(forKey: "credentialSchemaId") as? String,
        proofSchemaId: query.value(forKey: "proofSchemaId") as? String,
        search: try deserializeHistorySearch(
            text: query.value(forKey: "searchText") as? String,
            type: query.value(forKey: "searchType") as? String
        )
    )
}

func deserializeProofSchemaListQuery(_ query: NSDictionary) throws -> ListProofSchemasFiltersBindingDto {
    return ListProofSchemasFiltersBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        name: query.value(forKey: "name") as? String,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } ),
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds)
    )
}

func deserializeProofListQuery(_ query: NSDictionary) throws -> ProofListQueryBindingDto {
    return ProofListQueryBindingDto(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        organisationId: try safeCast(query.value(forKey: "organisationId")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        name: query.value(forKey: "name") as? String,
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds),
        proofStates: try opt(query.value(forKey: "proofStates") as? NSArray, { columns in try enumList(columns) } ),
        proofSchemaIds: query.value(forKey: "proofSchemaIds") as? [String],
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } )
    )
}

func deserializeImportProofSchemaRequest(_ request: NSDictionary) throws -> ImportProofSchemaRequestBindingsDto {
    return ImportProofSchemaRequestBindingsDto(
        schema: try deserializeImportProofSchema(try safeCast(request.value(forKey: "schema"))),
        organisationId: try safeCast(request.value(forKey: "organisationId"))
    )
}

func deserializeImportProofSchema(_ schema: NSDictionary) throws -> ImportProofSchemaBindingDto {
    let proofInputSchemas: NSArray = try safeCast(schema.value(forKey: "proofInputSchemas"));
    
    return ImportProofSchemaBindingDto(
        id: try safeCast(schema.value(forKey: "id")),
        createdDate: try safeCast(schema.value(forKey: "createdDate")),
        lastModified: try safeCast(schema.value(forKey: "lastModified")),
        name: try safeCast(schema.value(forKey: "name")),
        organisationId: try safeCast(schema.value(forKey: "organisationId")),
        expireDuration: try safeCast(schema.value(forKey: "expireDuration")),
        importedSourceUrl: try safeCast(schema.value(forKey: "importedSourceUrl")),
        proofInputSchemas: try proofInputSchemas.map { try deserializeImportProofSchemaInputSchema(try safeCast($0)) }
    )
}

func deserializeCreateProofSchemaRequest(_ request: NSDictionary) throws -> CreateProofSchemaRequestDto {
    let proofInputSchemas: NSArray = try safeCast(request.value(forKey: "proofInputSchemas"));
    
    return CreateProofSchemaRequestDto(
        name: try safeCast(request.value(forKey: "name")),
        organisationId: try safeCast(request.value(forKey: "organisationId")),
        expireDuration: try safeCast(request.value(forKey: "expireDuration")),
        proofInputSchemas: try proofInputSchemas.map { try deserializeProofInputSchemaRequest(try safeCast($0)) }
    )
}

func deserializeProofInputSchemaRequest(_ request: NSDictionary) throws -> ProofInputSchemaRequestDto {
    let claimSchemas: NSArray = try safeCast(request.value(forKey: "claimSchemas"));
    
    return ProofInputSchemaRequestDto(
        credentialSchemaId: try safeCast(request.value(forKey: "credentialSchemaId")),
        validityConstraint: try safeCast(request.value(forKey: "validityConstraint")),
        claimSchemas: try claimSchemas.map { try deserializeProofClaimSchemaRequest(try safeCast($0)) }
    )
}

func deserializeImportProofSchemaInputSchema(_ inputSchema: NSDictionary) throws -> ImportProofSchemaInputSchemaBindingDto {
    let claimSchemas: NSArray = try safeCast(inputSchema.value(forKey: "claimSchemas"));
    
    return ImportProofSchemaInputSchemaBindingDto(
        claimSchemas: try claimSchemas.map { try deserializeImportProofSchemaClaimSchema(try safeCast($0)) },
        credentialSchema: try deserializeImportProofSchemaCredentialSchema(try safeCast(inputSchema.value(forKey: "credentialSchema"))),
        validityConstraint: inputSchema.value(forKey: "validityConstraint") as? Int64
    )
}

func deserializeProofClaimSchemaRequest(_ request: NSDictionary) throws -> CreateProofSchemaClaimRequestDto {
    return CreateProofSchemaClaimRequestDto(
        id: try safeCast(request.value(forKey: "id")),
        required: try safeCast(request.value(forKey: "required"))
    )
}

func deserializeImportProofSchemaClaimSchema(_ request: NSDictionary) throws -> ImportProofSchemaClaimSchemaBindingDto {
    let claims = request.value(forKey: "claims") as? NSArray;
    
    return ImportProofSchemaClaimSchemaBindingDto(
        id: try safeCast(request.value(forKey: "id")),
        requested: try safeCast(request.value(forKey: "requested")),
        required: try safeCast(request.value(forKey: "required")),
        key: try safeCast(request.value(forKey: "key")),
        dataType: try safeCast(request.value(forKey: "dataType")),
        claims: try claims?.map { try deserializeImportProofSchemaClaimSchema(try safeCast($0)) },
        array: try safeCast(request.value(forKey: "array"))
    )
}

func deserializeImportProofSchemaCredentialSchema(_ request: NSDictionary) throws -> ImportProofSchemaCredentialSchemaBindingDto {
    return ImportProofSchemaCredentialSchemaBindingDto(
        id: try safeCast(request.value(forKey: "id")),
        createdDate: try safeCast(request.value(forKey: "createdDate")),
        lastModified: try safeCast(request.value(forKey: "lastModified")),
        name: try safeCast(request.value(forKey: "name")),
        format: try safeCast(request.value(forKey: "format")),
        revocationMethod: try safeCast(request.value(forKey: "revocationMethod")),
        walletStorageType: try opt(request.value(forKey: "walletStorageType") as? String, deserializeEnum),
        schemaId: try safeCast(request.value(forKey: "schemaId")),
        importedSourceUrl: try safeCast(request.value(forKey: "importedSourceUrl")),
        schemaType: deserializeCredentialSchemaTypeBindingEnum(try safeCast(request.value(forKey: "schemaType"))),
        layoutType: try opt(request.value(forKey: "layoutType") as? String, deserializeEnum),
        layoutProperties: try opt((request.value(forKey: "layoutProperties") as? NSDictionary), deserializeCredentialSchemaRequestLayoutProperties)
    )
}

func deserializeImportCredentialSchemaRequest(_ request: NSDictionary) throws -> ImportCredentialSchemaRequestBindingDto {
    return ImportCredentialSchemaRequestBindingDto(
        organisationId: try safeCast(request.value(forKey: "organisationId")),
        schema: try deserializeImportCredentialSchemaRequestSchema(try safeCast(request.value(forKey: "schema")))
    )
}

func deserializeImportCredentialSchemaRequestSchema(_ request: NSDictionary) throws -> ImportCredentialSchemaRequestSchemaBindingDto {
    let claims: NSArray = try safeCast(request.value(forKey: "claims"));
    
    return ImportCredentialSchemaRequestSchemaBindingDto(
        id: try safeCast(request.value(forKey: "id")),
        createdDate: try safeCast(request.value(forKey: "createdDate")),
        lastModified: try safeCast(request.value(forKey: "lastModified")),
        name: try safeCast(request.value(forKey: "name")),
        format: try safeCast(request.value(forKey: "format")),
        revocationMethod: try safeCast(request.value(forKey: "revocationMethod")),
        organisationId: try safeCast(request.value(forKey: "organisationId")),
        claims: try claims.map { try deserializeImportCredentialSchemaRequestClaim(try safeCast($0)) },
        walletStorageType: try opt(request.value(forKey: "walletStorageType") as? String, deserializeEnum),
        schemaId: try safeCast(request.value(forKey: "schemaId")),
        importedSourceUrl: try safeCast(request.value(forKey: "importedSourceUrl")),
        schemaType: deserializeCredentialSchemaTypeBindingEnum(try safeCast(request.value(forKey: "schemaType"))),
        layoutType: try opt(request.value(forKey: "layoutType") as? String, deserializeEnum),
        layoutProperties: try opt((request.value(forKey: "layoutProperties") as? NSDictionary), deserializeImportCredentialSchemaRequestLayoutProperties),
        allowSuspension: request.value(forKey: "allowSuspension") as? Bool
    )
}

func deserializeImportCredentialSchemaRequestClaim(_ request: NSDictionary) throws -> ImportCredentialSchemaClaimSchemaBindingDto {
    let claims = request.value(forKey: "claims") as? NSArray;
    
    return ImportCredentialSchemaClaimSchemaBindingDto(
        id: try safeCast(request.value(forKey: "id")),
        createdDate: try safeCast(request.value(forKey: "createdDate")),
        lastModified: try safeCast(request.value(forKey: "lastModified")),
        required: try safeCast(request.value(forKey: "required")),
        key: try safeCast(request.value(forKey: "key")),
        datatype: try safeCast(request.value(forKey: "datatype")),
        array: request.value(forKey: "array") as? Bool,
        claims: try claims?.map { try deserializeImportCredentialSchemaRequestClaim(try safeCast($0)) }
    )
}

func deserializeImportCredentialSchemaRequestLayoutProperties(_ request: NSDictionary) throws -> ImportCredentialSchemaLayoutPropertiesBindingDto {
    return ImportCredentialSchemaLayoutPropertiesBindingDto(
        background: try opt(request.value(forKey: "background") as? NSDictionary, deserializeImportCredentialSchemaBackgroundProperties),
        logo: try opt(request.value(forKey: "logo") as? NSDictionary, deserializeImportCredentialSchemaLogoProperties),
        primaryAttribute: request.value(forKey: "primaryAttribute") as? String,
        secondaryAttribute: request.value(forKey: "secondaryAttribute") as? String,
        pictureAttribute: request.value(forKey: "pictureAttribute") as? String,
        code: try opt(request.value(forKey: "code") as? NSDictionary, deserializeImportCredentialSchemaCodeProperties)
    )
}

func deserializeCredentialSchemaRequestLayoutProperties(_ request: NSDictionary) throws -> CredentialSchemaLayoutPropertiesBindingDto {
    return CredentialSchemaLayoutPropertiesBindingDto(
        background: try opt(request.value(forKey: "background") as? NSDictionary, deserializeImportCredentialSchemaBackgroundProperties),
        logo: try opt(request.value(forKey: "logo") as? NSDictionary, deserializeImportCredentialSchemaLogoProperties),
        primaryAttribute: request.value(forKey: "primaryAttribute") as? String,
        secondaryAttribute: request.value(forKey: "secondaryAttribute") as? String,
        pictureAttribute: request.value(forKey: "pictureAttribute") as? String,
        code: try opt(request.value(forKey: "code") as? NSDictionary, deserializeImportCredentialSchemaCodeProperties)
    )
}

func deserializeImportCredentialSchemaBackgroundProperties(_ request: NSDictionary) throws -> CredentialSchemaBackgroundPropertiesBindingDto {
    return CredentialSchemaBackgroundPropertiesBindingDto(
        color: request.value(forKey: "color") as? String,
        image: request.value(forKey: "image") as? String
    )
}

func deserializeImportCredentialSchemaLogoProperties(_ request: NSDictionary) throws -> CredentialSchemaLogoPropertiesBindingDto {
    return CredentialSchemaLogoPropertiesBindingDto(
        fontColor: request.value(forKey: "fontColor") as? String,
        backgroundColor: request.value(forKey: "backgroundColor") as? String,
        image: request.value(forKey: "image") as? String
    )
}

func deserializeImportCredentialSchemaCodeProperties(_ request: NSDictionary) throws -> CredentialSchemaCodePropertiesBindingDto {
    return CredentialSchemaCodePropertiesBindingDto(
        attribute: try safeCast(request.value(forKey: "attribute")),
        type: try deserializeEnum(try safeCast(request.value(forKey: "type")))
    )
}

func deserializeCreateProofRequest(_ request: NSDictionary) throws -> CreateProofRequestBindingDto {
    return CreateProofRequestBindingDto(
        proofSchemaId: try safeCast(request.value(forKey: "proofSchemaId")),
        verifierDidId: try safeCast(request.value(forKey: "verifierDidId")),
        exchange: try safeCast(request.value(forKey: "exchange")),
        redirectUri: request.value(forKey: "redirectUri") as? String,
        verifierKey: request.value(forKey: "verifierKey") as? String,
        scanToVerify: try opt((request.value(forKey: "scanToVerify") as? NSDictionary), deserializeScanToVerifyRequest),
        isoMdlEngagement: request.value(forKey: "isoMdlEngagement") as? String,
        transport: request.value(forKey: "transport") as? [String]
    )
}

func deserializeShareProofRequest(_ request: NSDictionary) throws -> ShareProofRequestBindingDto {
    return ShareProofRequestBindingDto(
        params: try opt((request.value(forKey: "params") as? NSDictionary), deserializeShareProofRequestParams)
    )
}

func deserializeShareProofRequestParams(_ request: NSDictionary) throws -> ShareProofRequestParamsBindingDto {
    return ShareProofRequestParamsBindingDto(
        clientIdSchema: try opt(request.value(forKey: "clientIdSchema") as? String, deserializeEnum)
    )
}


func deserializeKeyCheckCertificateRequest(_ request: NSDictionary) throws -> KeyCheckCertificateRequestBindingDto {
    return KeyCheckCertificateRequestBindingDto(
        certificate: (request.value(forKey: "certificate") as? String)!
    )
}

func deserializeScanToVerifyRequest(_ request: NSDictionary) throws -> ScanToVerifyRequestBindingDto {
    return ScanToVerifyRequestBindingDto(
        credential: try safeCast(request.value(forKey: "credential")),
        barcode: try safeCast(request.value(forKey: "barcode")),
        barcodeType: try deserializeEnum(try safeCast(request.value(forKey: "barcodeType")))
    )
}

func deserializeCreateTrustAnchorRequest(_ request: NSDictionary) throws -> CreateTrustAnchorRequestBindingDto {
    return CreateTrustAnchorRequestBindingDto(
        name: try safeCast(request.value(forKey: "name")),
        type: try safeCast(request.value(forKey: "type")),
        isPublisher: request.value(forKey: "isPublisher") as? Bool,
        publisherReference: request.value(forKey: "publisherReference") as? String
    )
}

func deserializeTrustAnchorListQuery(_ query: NSDictionary) throws -> ListTrustAnchorsFiltersBindings {
    return ListTrustAnchorsFiltersBindings(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        name: query.value(forKey: "name") as? String,
        isPublisher: query.value(forKey: "isPublisher") as? Bool,
        type: query.value(forKey: "type") as? String,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } )
    )
}

func deserializeCreateTrustEntityRequest(_ request: NSDictionary) throws -> CreateTrustEntityRequestBindingDto {
    return CreateTrustEntityRequestBindingDto(
        name: try safeCast(request.value(forKey: "name")),
        logo: request.value(forKey: "logo") as? String,
        website: request.value(forKey: "website") as? String,
        termsUrl: request.value(forKey: "termsUrl") as? String,
        privacyUrl: request.value(forKey: "privacyUrl") as? String,
        role: try deserializeEnum(try safeCast(request.value(forKey: "role"))),
        trustAnchorId: try safeCast(request.value(forKey: "trustAnchorId")),
        didId: try safeCast(request.value(forKey: "didId"))
    )
}

func deserializeCreateRemoteTrustEntityRequest(_ request: NSDictionary) throws -> CreateRemoteTrustEntityRequestBindingDto {
    return CreateRemoteTrustEntityRequestBindingDto(
        didId: try safeCast(request.value(forKey: "didId")),
        trustAnchorId: request.value(forKey: "trustAnchorId") as? String,
        name: try safeCast(request.value(forKey: "name")),
        logo: request.value(forKey: "logo") as? String,
        termsUrl: request.value(forKey: "termsUrl") as? String,
        privacyUrl: request.value(forKey: "privacyUrl") as? String,
        website: request.value(forKey: "website") as? String,
        role: try deserializeEnum(try safeCast(request.value(forKey: "role")))
    )
}

func deserializeUpdateRemoteTrustEntityRequest(_ request: NSDictionary) throws -> UpdateRemoteTrustEntityFromDidRequestBindingDto {
    return UpdateRemoteTrustEntityFromDidRequestBindingDto(
        didId: try safeCast(request.value(forKey: "didId")),
        action: try opt(request.value(forKey: "action") as? String, deserializeEnum),
        name: try safeCast(request.value(forKey: "name")),
        logo: try optionalString(request, key: "logo"),
        website: try optionalString(request, key: "website"),
        termsUrl: try optionalString(request, key: "termsUrl"),
        privacyUrl: try optionalString(request, key: "privacyUrl"),
        role: try opt(request.value(forKey: "role") as? String, deserializeEnum)
    )
}

func deserializeTrustEntityListQuery(_ query: NSDictionary) throws -> ListTrustEntitiesFiltersBindings {
    return ListTrustEntitiesFiltersBindings(
        page: try safeCast(query.value(forKey: "page")),
        pageSize: try safeCast(query.value(forKey: "pageSize")),
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        name: query.value(forKey: "name") as? String,
        role: try opt(query.value(forKey: "role") as? String, deserializeEnum),
        trustAnchor: query.value(forKey: "trustAnchor") as? String,
        didId: query.value(forKey: "didId") as? String,
        organisationId: query.value(forKey: "organisationId") as? String,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } )
    )
}

extension KeyRoleBindingEnum: CaseIterable {
    public static var allCases: [KeyRoleBindingEnum] {
        return [.authentication, .assertionMethod, .keyAgreement, .capabilityInvocation, .capabilityDelegation]
    }
}

extension DidTypeBindingEnum: CaseIterable {
    public static var allCases: [DidTypeBindingEnum] {
        return [.local, .remote]
    }
}

extension SortDirection: CaseIterable {
    public static var allCases: [SortDirection] {
        return [.ascending, .descending]
    }
}

extension SortableDidColumnBindingEnum: CaseIterable {
    public static var allCases: [SortableDidColumnBindingEnum] {
        return [.name, .createdDate, .method, .type, .did, .deactivated]
    }
}

extension SortableCredentialColumnBindingEnum: CaseIterable {
    public static var allCases: [SortableCredentialColumnBindingEnum] {
        return [.createdDate, .schemaName, .issuerDid, .state]
    }
}

extension CredentialListIncludeEntityTypeBindingEnum: CaseIterable {
    public static var allCases: [CredentialListIncludeEntityTypeBindingEnum] {
        return [.layoutProperties, .credential]
    }
}

extension CredentialStateBindingEnum: CaseIterable {
    public static var allCases: [CredentialStateBindingEnum] {
        return [.created, .pending, .offered, .accepted, .rejected, .revoked, .error, .suspended]
    }
}

extension ExactDidFilterColumnBindingEnum: CaseIterable {
    public static var allCases: [ExactDidFilterColumnBindingEnum] {
        return [.name, .did]
    }
}

extension CredentialListQueryExactColumnBindingEnum: CaseIterable {
    public static var allCases: [CredentialListQueryExactColumnBindingEnum] {
        return [.name]
    }
}

extension HistoryEntityTypeBindingEnum: CaseIterable {
    public static var allCases: [HistoryEntityTypeBindingEnum] {
        return [.key, .did, .credentialSchema, .credential, .proofSchema, .proof, .organisation, .backup]
    }
}

extension HistorySearchEnumBindingEnum: CaseIterable {
    public static var allCases: [HistorySearchEnumBindingEnum] {
        return [.claimName, .claimValue, .credentialSchemaName, .issuerDid, .issuerName, .verifierDid, .verifierName, .proofSchemaName]
    }
}

extension HistoryActionBindingEnum: CaseIterable {
    public static var allCases: [HistoryActionBindingEnum] {
        return [.accepted, .created, .deactivated, .deleted, .errored, .issued, .offered, .rejected, .requested, .revoked, .pending, .suspended, .restored, .shared, .imported, .claimsRemoved]
    }
}

extension CredentialRoleBindingDto: CaseIterable {
    public static var allCases: [CredentialRoleBindingDto] {
        return [.holder, .issuer, .verifier]
    }
}

extension SortableProofSchemaColumnBinding: CaseIterable {
    public static var allCases: [SortableProofSchemaColumnBinding] {
        return [.name, .createdDate]
    }
}

extension ProofSchemaListQueryExactColumnBinding: CaseIterable {
    public static var allCases: [ProofSchemaListQueryExactColumnBinding] {
        return [.name]
    }
}

extension SortableCredentialSchemaColumnBindingEnum: CaseIterable {
    public static var allCases: [SortableCredentialSchemaColumnBindingEnum] {
        return [.name, .format, .createdDate]
    }
}

extension CredentialSchemaListQueryExactColumnBindingEnum: CaseIterable {
    public static var allCases: [CredentialSchemaListQueryExactColumnBindingEnum] {
        return [.name]
    }
}

extension CredentialSchemaListIncludeEntityType: CaseIterable {
    public static var allCases: [CredentialSchemaListIncludeEntityType] {
        return [.layoutProperties]
    }
}

extension SortableProofListColumnBinding: CaseIterable {
    public static var allCases: [SortableProofListColumnBinding] {
        return [.createdDate, .schemaName, .state, .verifierDid]
    }
}

extension ProofListQueryExactColumnBindingEnum: CaseIterable {
    public static var allCases: [ProofListQueryExactColumnBindingEnum] {
        return [.name]
    }
}

extension CredentialSchemaCodeTypeBindingDto: CaseIterable {
    public static var allCases: [CredentialSchemaCodeTypeBindingDto] {
        return [.barcode, .mrz, .qrCode]
    }
}

extension LayoutTypeBindingEnum: CaseIterable {
    public static var allCases: [LayoutTypeBindingEnum] {
        return [.card, .document, .singleAttribute]
    }
}

extension WalletStorageTypeBindingEnum: CaseIterable {
    public static var allCases: [WalletStorageTypeBindingEnum] {
        return [.hardware, .software, .remoteSecureElement]
    }
}

extension ProofStateBindingEnum: CaseIterable {
    public static var allCases: [ProofStateBindingEnum] {
        return [
            .created,
            .pending,
            .requested,
            .accepted,
            .rejected,
            .error
        ]
    }
}

extension ShareProofRequestClientIdSchemaTypeBindingDto: CaseIterable {
    public static var allCases: [ShareProofRequestClientIdSchemaTypeBindingDto] {
        return [.redirectUri, .verifierAttestation]
    }
}

extension ScanToVerifyBarcodeTypeBindingEnum: CaseIterable {
    public static var allCases: [ScanToVerifyBarcodeTypeBindingEnum] {
        return [.mrz, .pdf417]
    }
}

extension SortableTrustAnchorColumnBindings: CaseIterable {
    public static var allCases: [SortableTrustAnchorColumnBindings] {
        return [.name, .createdDate, .type]
    }
}

extension ExactTrustAnchorFilterColumnBindings: CaseIterable {
    public static var allCases: [ExactTrustAnchorFilterColumnBindings] {
        return [.name, .type]
    }
}

extension SearchTypeBindingEnum: CaseIterable {
    public static var allCases: [SearchTypeBindingEnum] {
        return [.claimName, .claimValue, .credentialSchemaName]
    }
}

extension TrustEntityRoleBindingEnum: CaseIterable {
    public static var allCases: [TrustEntityRoleBindingEnum] {
        return [.issuer, .verifier, .both]
    }
}

extension TrustEntityStateBindingEnum: CaseIterable {
    public static var allCases: [TrustEntityStateBindingEnum] {
        return [.active, .removed, .withdrawn, .removedAndWithdrawn]
    }
}

extension SortableTrustEntityColumnBindings: CaseIterable {
    public static var allCases: [SortableTrustEntityColumnBindings] {
        return [.name, .role]
    }
}

extension ExactTrustEntityFilterColumnBindings: CaseIterable {
    public static var allCases: [ExactTrustEntityFilterColumnBindings] {
        return [.name]
    }
}

extension TrustEntityUpdateActionBindingEnum: CaseIterable {
    public static var allCases: [TrustEntityUpdateActionBindingEnum] {
        return [.activate, .remove, .withdraw]
    }
}

extension CacheTypeBindingDto: CaseIterable {
    public static var allCases: [CacheTypeBindingDto] {
        return [.didDocument, .jsonLdContext, .jsonSchema, .statusListCredential, .trustList, .vctMetadata]
    }
}

private func deserializeEnum<T: CaseIterable>(_ input: String) throws -> T {
    if let entry = T.allCases.first(where: { value in
        serializeEnumValue(value: value) == input
    }) {
        return entry;
    } else {
        throw SerializationError("Invalid enum value for \(T.self): " + input);
    }
}

private func opt<F, T>(_ input: F?, _ deserialize: @escaping (_ input: F) throws -> T) throws -> T? {
    if (input != nil) {
        return try deserialize(input!);
    }
    return nil
}

private func optionalString(_ input: NSDictionary, key: String) throws -> OptionalString? {
    var isThere: Bool = false;
    input.keyEnumerator().forEach { k in
        if (k as! String == key) {
            isThere = true;
        }
    }
    if (!isThere) {
        return nil;
    }
    let value = input[key] as? String;
    if value == nil {
        return OptionalString.none;
    }
    return OptionalString.some(value: value!);
}

func safeCast<T>(_ input: Any?) throws -> T {
    if let result = input as? T {
        return result
    } else {
        throw SerializationError("Invalid input for type \(T.self): " + String(describing: input));
    }
}

private func enumList<T: CaseIterable>(_ entries: NSArray) throws -> [T] {
    var result: [T] = [];
    try entries.forEach { entry in
        result.append(try deserializeEnum(try safeCast(entry)));
    }
    return result
}

private func deserializeCredentialSchemaTypeBindingEnum(_ credentialSchemaType: String) -> CredentialSchemaTypeBindingEnum {
    switch (credentialSchemaType) {
    case "PROCIVIS_ONE_SCHEMA2024":
        return .procivisOneSchema2024
    case "FALLBACK_SCHEMA2024":
        return .fallbackSchema2024
    case "MDOC":
        return .mdoc
    case let other:
        return .other(value: other)
    }
    
}
