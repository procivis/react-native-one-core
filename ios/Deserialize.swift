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

func deserializeListQuery(_ query: NSDictionary) -> ListQueryBindingDto {
    return ListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String
    )
}

func deserializeCredentialListQuery(_ query: NSDictionary) throws -> CredentialListQueryBindingDto {
    return CredentialListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as! String?, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as! String?, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as! String?,
        exact: try opt(query.value(forKey: "exact") as! NSArray?, enumList ),
        role: try opt(query.value(forKey: "role") as! String?, deserializeEnum),
        ids: try opt(query.value(forKey: "ids") as! NSArray?, deserializeIds),
        status: try opt(query.value(forKey: "status") as! NSArray?, enumList),
        include: try opt(query.value(forKey: "include") as! NSArray?, enumList)
    )
}

func deserializeDidListQuery(_ query: NSDictionary) throws -> DidListQueryBindingDto {
    return DidListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as! String?, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as! String?, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as! String?,
        did: query.value(forKey: "did") as! String?,
        type: try opt(query.value(forKey: "type") as! String?, deserializeEnum),
        deactivated: query.value(forKey: "deactivated") as! Bool?,
        exact: try opt(query.value(forKey: "exact") as! NSArray?, { columns in try enumList(columns) } ),
        keyAlgorithms: try opt(query.value(forKey: "keyAlgorithms") as! NSArray?, deserializeIds),
        keyRoles: try opt(query.value(forKey: "keyRoles") as! NSArray?, { roles in try enumList(roles) })
    )
}

func deserializeHistoryListQuery(_ query: NSDictionary) throws -> HistoryListQueryBindingDto {
    return HistoryListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String,
        entityId: query.value(forKey: "entityId") as! String?,
        action: try opt(query.value(forKey: "action") as! String?, deserializeEnum),
        entityTypes: try opt(query.value(forKey: "entityTypes") as! NSArray?, enumList),
        createdDateFrom: query.value(forKey: "createdDateFrom") as! String?,
        createdDateTo: query.value(forKey: "createdDateTo") as! String?,
        didId: query.value(forKey: "didId") as! String?,
        credentialId: query.value(forKey: "credentialId") as! String?,
        credentialSchemaId: query.value(forKey: "credentialSchemaId") as! String?,
        search: try deserializeHistorySearch(
            text: query.value(forKey: "searchText") as! String?,
            type: query.value(forKey: "searchType") as! String?
        )
    )
}

func deserializeProofSchemaListQuery(_ query: NSDictionary) throws -> ListProofSchamasFiltersBindingDto {
    return ListProofSchamasFiltersBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as! String?, deserializeEnum),
        sortDirection: try opt(query.value(forKey: "sortDirection") as! String?, deserializeEnum),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as! String?,
        exact: try opt(query.value(forKey: "exact") as! NSArray?, { columns in try enumList(columns) } ),
        ids: try opt(query.value(forKey: "ids") as! NSArray?, deserializeIds)
    )
}

func deserializeProofSchemaImportRequest(_ request: NSDictionary) throws -> ProofSchemaImportRequestDto {
    return ProofSchemaImportRequestDto(
        url: request.value(forKey: "url") as! String,
        organisationId: request.value(forKey: "organisationId") as! String
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
        return [.layoutProperties]
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
        return [.claimName, .claimValue, .credentialSchemaName, .issuerDid, .issuerName, .verifierDid, .verifierName]
    }
}

extension HistoryActionBindingEnum: CaseIterable {
    public static var allCases: [HistoryActionBindingEnum] {
        return [.accepted, .created, .deactivated, .deleted, .issued, .offered, .reactivated, .rejected, .requested, .revoked, .pending, .suspended, .restored, .errored]
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
