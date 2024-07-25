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

func deserializeKeyRequest(keyRequest: NSDictionary) -> KeyRequestBindingDto {
    let keyType = keyRequest.value(forKey: "keyType") as! String;
    let name = keyRequest.value(forKey: "name") as! String;
    let storageType = keyRequest.value(forKey: "storageType") as! String;
    let organisationId = keyRequest.value(forKey: "organisationId") as! String;
    
    let keyParamsRaw = keyRequest.value(forKey: "keyParams") as! NSDictionary;
    var keyParams: [String: String] = [:];
    keyParamsRaw.allKeys.forEach {
        let key = $0 as! String;
        keyParams[key] = keyParamsRaw.value(forKey: key) as? String;
    }
    
    let storageParamsRaw = keyRequest.value(forKey: "storageParams") as! NSDictionary;
    var storageParams: [String: String] = [:];
    storageParamsRaw.allKeys.forEach {
        let key = $0 as! String;
        storageParams[key] = storageParamsRaw.value(forKey: key) as? String;
    }
    
    return KeyRequestBindingDto(organisationId: organisationId, keyType: keyType, keyParams: keyParams, name: name, storageType: storageType, storageParams: storageParams);
}

func deserializeDidRequest(didRequest: NSDictionary) throws -> DidRequestBindingDto {
    let organisationId = didRequest.value(forKey: "organisationId") as! String;
    let name = didRequest.value(forKey: "name") as! String;
    let didMethod = didRequest.value(forKey: "didMethod") as! String;
    let keys = deserializeDidRequestKeys(didRequestKeys: didRequest.value(forKey: "keys") as! NSDictionary);
    
    let paramsRaw = didRequest.value(forKey: "params") as! NSDictionary;
    var params: [String: String] = [:];
    paramsRaw.allKeys.forEach {
        let key = $0 as! String;
        params[key] = paramsRaw.value(forKey: key) as? String;
    }
    
    return DidRequestBindingDto(organisationId: organisationId, name: name, didMethod: didMethod, keys: keys, params: params);
}

func deserializeDidRequestKeys(didRequestKeys: NSDictionary) -> DidRequestKeysBindingDto {
    let authentication = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "authentication");
    let assertionMethod = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "assertionMethod");
    let keyAgreement = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "keyAgreement");
    let capabilityInvocation = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityInvocation");
    let capabilityDelegation = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityDelegation");
    return DidRequestKeysBindingDto(authentication: authentication, assertionMethod: assertionMethod, keyAgreement: keyAgreement, capabilityInvocation: capabilityInvocation, capabilityDelegation: capabilityDelegation);
}

func deserializeDidRequestKeySet(didRequestKeys: NSDictionary, keyRole: String) -> [String] {
    let roleKeys = didRequestKeys.value(forKey: keyRole) as! NSArray;
    var result: [String] = [];
    roleKeys.forEach { key in
        result.append(key as! String);
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

func deserializeIds(_ ids: NSArray) -> [String] {
    var result: [String] = [];
    ids.forEach { id in
        result.append(id as! String);
    }
    return result
}

func deserializePresentationSubmitCredentialRequest(_ input: NSDictionary) -> PresentationSubmitCredentialRequestBindingDto {
    let claims = input.value(forKey: "submitClaims") as! NSArray;
    var submitClaims: [String] = [];
    claims.forEach { claim in
        submitClaims.append(claim as! String);
    }
    return PresentationSubmitCredentialRequestBindingDto(credentialId: input.value(forKey: "credentialId") as! String, submitClaims: submitClaims);
}

func deserializeCredentialSchemaListQuery(_ query: NSDictionary) throws -> CredentialSchemaListQueryBindingDto {
    return CredentialSchemaListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String,
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
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as? String,
        exact: try opt(query.value(forKey: "exact") as? NSArray, enumList ),
        role: try opt(query.value(forKey: "role") as? String, deserializeEnum),
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds),
        status: try opt(query.value(forKey: "status") as? NSArray, enumList),
        include: try opt(query.value(forKey: "include") as? NSArray, enumList)
    )
}

func deserializeDidListQuery(_ query: NSDictionary) throws -> DidListQueryBindingDto {
    return DidListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as? String,
        did: query.value(forKey: "did") as? String,
        type: try opt(query.value(forKey: "type") as? String, deserializeEnum),
        deactivated: query.value(forKey: "deactivated") as? Bool,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } ),
        keyAlgorithms: try opt(query.value(forKey: "keyAlgorithms") as? NSArray, deserializeIds),
        keyRoles: try opt(query.value(forKey: "keyRoles") as? NSArray, { roles in try enumList(roles) })
    )
}

func deserializeHistoryListQuery(_ query: NSDictionary) throws -> HistoryListQueryBindingDto {
    return HistoryListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String,
        entityId: query.value(forKey: "entityId") as? String,
        action: try opt(query.value(forKey: "action") as? String, deserializeEnum),
        entityTypes: try opt(query.value(forKey: "entityTypes") as? NSArray, enumList),
        createdDateFrom: query.value(forKey: "createdDateFrom") as? String,
        createdDateTo: query.value(forKey: "createdDateTo") as? String,
        didId: query.value(forKey: "didId") as? String,
        credentialId: query.value(forKey: "credentialId") as? String,
        credentialSchemaId: query.value(forKey: "credentialSchemaId") as? String,
        search: try deserializeHistorySearch(
            text: query.value(forKey: "searchText") as? String,
            type: query.value(forKey: "searchType") as? String
        ),
        proofSchemaId: query.value(forKey: "proofSchemaId") as? String
    )
}

func deserializeProofSchemaListQuery(_ query: NSDictionary) throws -> ListProofSchemasFiltersBindingDto {
    return ListProofSchemasFiltersBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as? String,
        exact: try opt(query.value(forKey: "exact") as? NSArray, { columns in try enumList(columns) } ),
        ids: try opt(query.value(forKey: "ids") as? NSArray, deserializeIds)
    )
}

func deserializeProofListQuery(_ query: NSDictionary) throws -> ProofListQueryBindingDto {
    return ProofListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String,
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
        schema: try deserializeImportProofSchema(request.value(forKey: "schema") as! NSDictionary),
        organisationId: request.value(forKey: "organisationId") as! String
    )
}

func deserializeImportProofSchema(_ schema: NSDictionary) throws -> ImportProofSchemaBindingDto {
    let proofInputSchemas = schema.value(forKey: "proofInputSchemas") as! NSArray;
    
    return ImportProofSchemaBindingDto(
        id: schema.value(forKey: "id") as! String,
        createdDate: schema.value(forKey: "createdDate") as! String,
        lastModified: schema.value(forKey: "lastModified") as! String,
        name: schema.value(forKey: "name") as! String,
        organisationId: schema.value(forKey: "organisationId") as! String,
        expireDuration: schema.value(forKey: "expireDuration") as! UInt32,
        proofInputSchemas: try proofInputSchemas.map { try deserializeImportProofSchemaInputSchema($0 as! NSDictionary) }
    )
}

func deserializeCreateProofSchemaRequest(_ request: NSDictionary) -> CreateProofSchemaRequestDto {
    let proofInputSchemas = request.value(forKey: "proofInputSchemas") as! NSArray;
    
    return CreateProofSchemaRequestDto(
        name: request.value(forKey: "name") as! String,
        organisationId: request.value(forKey: "organisationId") as! String,
        expireDuration: request.value(forKey: "expireDuration") as! UInt32,
        proofInputSchemas: proofInputSchemas.map { deserializeProofInputSchemaRequest($0 as! NSDictionary) }
    )
}

func deserializeProofInputSchemaRequest(_ request: NSDictionary) -> ProofInputSchemaRequestDto {
    let claimSchemas = request.value(forKey: "claimSchemas") as! NSArray;
    
    return ProofInputSchemaRequestDto(
        credentialSchemaId: request.value(forKey: "credentialSchemaId") as! String,
        validityConstraint: request.value(forKey: "validityConstraint") as? Int64,
        claimSchemas: claimSchemas.map { deserializeProofClaimSchemaRequest($0 as! NSDictionary) }
    )
}

func deserializeImportProofSchemaInputSchema(_ inputSchema: NSDictionary) throws -> ImportProofSchemaInputSchemaBindingDto {
    let claimSchemas = inputSchema.value(forKey: "claimSchemas") as! NSArray;
    
    return ImportProofSchemaInputSchemaBindingDto(
        claimSchemas: claimSchemas.map { deserializeImportProofSchemaClaimSchema($0 as! NSDictionary) },
        credentialSchema: try deserializeImportProofSchemaCredentialSchema(inputSchema.value(forKey: "credentialSchema") as! NSDictionary),
        validityConstraint: inputSchema.value(forKey: "validityConstraint") as? Int64
    )
}

func deserializeProofClaimSchemaRequest(_ request: NSDictionary) -> CreateProofSchemaClaimRequestDto {
    return CreateProofSchemaClaimRequestDto(
        id: request.value(forKey: "id") as! String,
        required: request.value(forKey: "required") as! Bool
    )
}

func deserializeImportProofSchemaClaimSchema(_ request: NSDictionary) -> ImportProofSchemaClaimSchemaBindingDto {
    let claims = request.value(forKey: "claims") as? NSArray ?? [];
    
    return ImportProofSchemaClaimSchemaBindingDto(
        id: request.value(forKey: "id") as! String,
        required: request.value(forKey: "required") as! Bool,
        key: request.value(forKey: "key") as! String,
        dataType: request.value(forKey: "dataType") as! String,
        claims: claims.map { deserializeImportProofSchemaClaimSchema($0 as! NSDictionary) },
        array: request.value(forKey: "array") as! Bool
    )
}

func deserializeImportProofSchemaCredentialSchema(_ request: NSDictionary) throws -> ImportProofSchemaCredentialSchemaBindingDto {
    return ImportProofSchemaCredentialSchemaBindingDto(
        id: request.value(forKey: "id") as! String,
        createdDate: request.value(forKey: "createdDate") as! String,
        lastModified: request.value(forKey: "lastModified") as! String,
        name: request.value(forKey: "name") as! String,
        format: request.value(forKey: "format") as! String,
        revocationMethod: request.value(forKey: "revocationMethod") as! String,
        walletStorageType: try opt(request.value(forKey: "walletStorageType") as? String, deserializeEnum),
        schemaId: request.value(forKey: "schemaId") as! String,
        schemaType: deserializeCredentialSchemaTypeBindingEnum(request.value(forKey: "schemaType") as! String),
        layoutType: try opt(request.value(forKey: "layoutType") as? String, deserializeEnum),
        layoutProperties: try opt((request.value(forKey: "layoutProperties") as? NSDictionary), deserializeCredentialSchemaRequestLayoutProperties)
    )
}

func deserializeImportCredentialSchemaRequest(_ request: NSDictionary) throws -> ImportCredentialSchemaRequestBindingDto {
    return ImportCredentialSchemaRequestBindingDto(
        organisationId: request.value(forKey: "organisationId") as! String,
        schema: try deserializeImportCredentialSchemaRequestSchema(request.value(forKey: "schema") as! NSDictionary)
    )
}

func deserializeImportCredentialSchemaRequestSchema(_ request: NSDictionary) throws -> ImportCredentialSchemaRequestSchemaBindingDto {
    let claims = request.value(forKey: "claims") as! NSArray;
    
    return ImportCredentialSchemaRequestSchemaBindingDto(
        id: request.value(forKey: "id") as! String,
        createdDate: request.value(forKey: "createdDate") as! String,
        lastModified: request.value(forKey: "lastModified") as! String,
        name: request.value(forKey: "name") as! String,
        format: request.value(forKey: "format") as! String,
        revocationMethod: request.value(forKey: "revocationMethod") as! String,
        organisationId: request.value(forKey: "organisationId") as! String,
        claims: try claims.map { try deserializeImportCredentialSchemaRequestClaim($0 as! NSDictionary) },
        walletStorageType: try opt(request.value(forKey: "walletStorageType") as? String, deserializeEnum),
        schemaId: request.value(forKey: "schemaId") as! String,
        schemaType: deserializeCredentialSchemaTypeBindingEnum(request.value(forKey: "schemaType") as! String),
        layoutType: try opt(request.value(forKey: "layoutType") as? String, deserializeEnum),
        layoutProperties: try opt((request.value(forKey: "layoutProperties") as? NSDictionary), deserializeImportCredentialSchemaRequestLayoutProperties)
    )
}

func deserializeImportCredentialSchemaRequestClaim(_ request: NSDictionary) throws -> ImportCredentialSchemaClaimSchemaBindingDto {
    let claims = request.value(forKey: "claims") as? NSArray ?? [];
    
    return ImportCredentialSchemaClaimSchemaBindingDto(
        id: request.value(forKey: "id") as! String,
        createdDate: request.value(forKey: "createdDate") as! String,
        lastModified: request.value(forKey: "lastModified") as! String,
        required: request.value(forKey: "required") as! Bool,
        key: request.value(forKey: "key") as! String,
        array: request.value(forKey: "array") as? Bool,
        datatype: request.value(forKey: "datatype") as! String,
        claims: try claims.map { try deserializeImportCredentialSchemaRequestClaim($0 as! NSDictionary) }
    )
}

func deserializeImportCredentialSchemaRequestLayoutProperties(_ request: NSDictionary) throws -> ImportCredentialSchemaLayoutPropertiesBindingDto {
    return ImportCredentialSchemaLayoutPropertiesBindingDto(
        background: try opt(request.value(forKey: "background") as! NSDictionary?, deserializeImportCredentialSchemaBackgroundProperties),
        logo: try opt(request.value(forKey: "logo") as! NSDictionary?, deserializeImportCredentialSchemaLogoProperties),
        primaryAttribute: request.value(forKey: "primaryAttribute") as? String,
        secondaryAttribute: request.value(forKey: "secondaryAttribute") as? String,
        pictureAttribute: request.value(forKey: "pictureAttribute") as? String,
        code: try opt(request.value(forKey: "code") as! NSDictionary?, deserializeImportCredentialSchemaCodeProperties)
    )
}

func deserializeCredentialSchemaRequestLayoutProperties(_ request: NSDictionary) throws -> CredentialSchemaLayoutPropertiesBindingDto {
    return CredentialSchemaLayoutPropertiesBindingDto(
        background: try opt(request.value(forKey: "background") as! NSDictionary?, deserializeImportCredentialSchemaBackgroundProperties),
        logo: try opt(request.value(forKey: "logo") as! NSDictionary?, deserializeImportCredentialSchemaLogoProperties),
        primaryAttribute: request.value(forKey: "primaryAttribute") as? String,
        secondaryAttribute: request.value(forKey: "secondaryAttribute") as? String,
        pictureAttribute: request.value(forKey: "pictureAttribute") as? String,
        code: try opt(request.value(forKey: "code") as! NSDictionary?, deserializeImportCredentialSchemaCodeProperties)
    )
}

func deserializeImportCredentialSchemaBackgroundProperties(_ request: NSDictionary) -> CredentialSchemaBackgroundPropertiesBindingDto {
    return CredentialSchemaBackgroundPropertiesBindingDto(
        color: request.value(forKey: "color") as? String,
        image: request.value(forKey: "image") as? String
    )
}

func deserializeImportCredentialSchemaLogoProperties(_ request: NSDictionary) -> CredentialSchemaLogoPropertiesBindingDto {
    return CredentialSchemaLogoPropertiesBindingDto(
        fontColor: request.value(forKey: "fontColor") as? String,
        backgroundColor: request.value(forKey: "backgroundColor") as? String,
        image: request.value(forKey: "image") as? String
    )
}

func deserializeImportCredentialSchemaCodeProperties(_ request: NSDictionary) throws -> CredentialSchemaCodePropertiesBindingDto {
    return CredentialSchemaCodePropertiesBindingDto(
        attribute: request.value(forKey: "attribute") as! String,
        type: try deserializeEnum(request.value(forKey: "type") as! String)
    )
}

func deserializeCreateProofRequest(_ request: NSDictionary) throws -> CreateProofRequestBindingDto {
    return CreateProofRequestBindingDto(
        proofSchemaId: request.value(forKey: "proofSchemaId") as! String,
        verifierDidId: request.value(forKey: "verifierDidId") as! String,
        exchange: request.value(forKey: "exchange") as! String,
        redirectUri: request.value(forKey: "redirectUri") as? String,
        verifierKey: request.value(forKey: "verifierKey") as? String,
        scanToVerify: try opt((request.value(forKey: "scanToVerify") as? NSDictionary), deserializeScanToVerifyRequest)
    )
}

func deserializeScanToVerifyRequest(_ request: NSDictionary) throws -> ScanToVerifyRequestBindingDto {
    return ScanToVerifyRequestBindingDto(
        credential: request.value(forKey: "credential") as! String,
        barcode: request.value(forKey: "barcode") as! String,
        barcodeType: try deserializeEnum(request.value(forKey: "barcodeType") as! String)
    )
}

func deserializeCreateTrustAnchorRequest(_ request: NSDictionary) throws -> CreateTrustAnchorRequestBindingDto {
    return CreateTrustAnchorRequestBindingDto(
        name: request.value(forKey: "name") as! String,
        type: request.value(forKey: "type") as! String,
        publisherReference: request.value(forKey: "publisherReference") as? String,
        role: try deserializeEnum(request.value(forKey: "role") as! String),
        priority: request.value(forKey: "priority") as? UInt32,
        organisationId: request.value(forKey: "organisationId") as! String
    )
}

func deserializeTrustAnchorListQuery(_ query: NSDictionary) throws -> ListTrustAnchorsFiltersBindings {
    return ListTrustAnchorsFiltersBindings(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as? String, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as? String, deserializeEnum),
        name: query.value(forKey: "name") as? String,
        role: try opt(query.value(forKey: "role") as? String, deserializeEnum),
        type: query.value(forKey: "type") as? String,
        organisationId: query.value(forKey: "organisationId") as! String,
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
        return [.accepted, .created, .deactivated, .deleted, .issued, .offered, .reactivated, .rejected, .requested, .revoked, .pending, .suspended, .restored, .errored, .shared, .imported]
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
        return [.hardware, .software]
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

extension ScanToVerifyBarcodeTypeBindingEnum: CaseIterable {
    public static var allCases: [ScanToVerifyBarcodeTypeBindingEnum] {
        return [.mrz, .pdf417]
    }
}

extension TrustAnchorRoleBinding: CaseIterable {
    public static var allCases: [TrustAnchorRoleBinding] {
        return [.publisher, .client]
    }
}

extension SortableTrustAnchorColumnBindings: CaseIterable {
    public static var allCases: [SortableTrustAnchorColumnBindings] {
        return [.name, .createdDate, .type, .role, .priority]
    }
}

extension ExactTrustAnchorFilterColumnBindings: CaseIterable {
    public static var allCases: [ExactTrustAnchorFilterColumnBindings] {
        return [.name, .type]
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

private func enumList<T: CaseIterable>(_ entries: NSArray) throws -> [T] {
    var result: [T] = [];
    try entries.forEach { entry in
        result.append(try deserializeEnum(entry as! String));
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
