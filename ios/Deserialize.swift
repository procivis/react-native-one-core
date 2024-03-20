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

func deserializeDidType(input: String) throws -> DidTypeBindingEnum {
    switch input.lowercased() {
    case "local": return .local;
    case "remote": return .remote;
    default: throw SerializationError("Invalid did type: " + input);
    }
}

func deserializeCredentialRole(input: String) throws -> CredentialRoleBindingDto {
    switch input.lowercased() {
    case "holder": return .holder;
    case "issuer": return .issuer;
    case "verifier": return .verifier;
    default: throw SerializationError("Invalid credential role: " + input);
    }
}

func deserializeHistoryAction(input: String) throws -> HistoryActionBindingEnum {
    switch input.lowercased() {
    case "accepted": return .accepted;
    case "created": return .created;
    case "deactivated": return .deactivated;
    case "deleted": return .deleted;
    case "issued": return .issued;
    case "offered": return .offered;
    case "rejected": return .rejected;
    case "requested": return .requested;
    case "revoked": return .revoked;
    case "pending": return .pending;
    default: throw SerializationError("Invalid history action: " + input);
    }
}

func deserializeHistorySearch(text: String?, type: String?) throws -> HistorySearchBindingDto? {
    if text == nil {
        return nil
    }
    
    return HistorySearchBindingDto(
        text: text!,
        type: try opt(type, deserializeHistorySearchType)
    )
}

func deserializeHistorySearchType(input: String) throws -> HistorySearchEnumBindingEnum {
    switch input.lowercased() {
    case "claim_name": return .claimName;
    case "claim_value": return .claimValue;
    case "credential_schema_name": return .credentialSchemaName;
    case "issuer_did": return .issuerDid;
    case "issuer_name": return .issuerName;
    case "verifier_did": return .verifierDid;
    case "verifier_name": return .verifierName;
    default: throw SerializationError("Invalid history search type: " + input);
    }
}

func deserializeHistoryEntityType(input: String) throws -> HistoryEntityTypeBindingEnum {
    switch input.lowercased() {
    case "key": return .key;
    case "did": return .did;
    case "credential_schema": return .credentialSchema;
    case "credential": return .credential;
    case "proof_schema": return .proofSchema;
    case "proof": return .proof;
    case "organisation": return .organisation;
    case "backup": return .backup;
    default: throw SerializationError("Invalid history entityType: " + input);
    }
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

func deserializeCredentialListQueryExactColumn(_ input: String) throws -> CredentialListQueryExactColumnBindingEnum {
    switch input.lowercased() {
    case "name": return .name;
    default: throw SerializationError("Invalid credential list exact column: " + input);
    }
}

func deserializeCredentialState(_ input: String) throws -> CredentialStateBindingEnum {
    switch input.lowercased() {
    case "created": return .created
    case "pending": return .pending
    case "offered": return .offered
    case "accepted": return .accepted
    case "rejected": return .rejected
    case "revoked": return .revoked
    case "error": return .error
    case "suspended": return .suspended
    default: throw SerializationError("Invalid credential state: " + input);
    }
}

func deserializeSortableCredentialColumn(_ input: String) throws -> SortableCredentialColumnBindingEnum {
    switch input.lowercased() {
    case "created_date": return .createdDate
    case "schema_name": return .schemaName
    case "issuer_did": return .issuerDid
    case "state": return .state
    default: throw SerializationError("Invalid credential column: " + input);
    }
}

func deserializeSortDirection(_ input: String) throws -> SortDirection {
    switch input.lowercased() {
    case "ascending": return .ascending
    case "descending": return .descending
    default: throw SerializationError("Invalid sort direction: " + input);
    }
}

func deserializeCredentialListQuery(_ query: NSDictionary) throws -> CredentialListQueryBindingDto {
    return CredentialListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        sort: try opt(query.value(forKey: "sort") as! String?, deserializeSortableCredentialColumn),
        sortDirection: try opt(query.value(forKey: "sortDirection") as! String?, deserializeSortDirection),
        organisationId: query.value(forKey: "organisationId") as! String,
        name: query.value(forKey: "name") as! String?,
        exact: try opt(query.value(forKey: "exact") as! NSArray?, { columns in try enumList(columns, deserializeCredentialListQueryExactColumn) } ),
        role: try opt(query.value(forKey: "role") as! String?, deserializeCredentialRole),
        ids: try opt(query.value(forKey: "ids") as! NSArray?, deserializeIds),
        status: try opt(query.value(forKey: "status") as! NSArray?, { states in try enumList(states, deserializeCredentialState) })
    )
}

func deserializeHistoryListQuery(_ query: NSDictionary) throws -> HistoryListQueryBindingDto {
    return HistoryListQueryBindingDto(
        page: query.value(forKey: "page") as! UInt32,
        pageSize: query.value(forKey: "pageSize") as! UInt32,
        organisationId: query.value(forKey: "organisationId") as! String,
        entityId: query.value(forKey: "entityId") as! String?,
        action: try opt(query.value(forKey: "action") as! String?, deserializeHistoryAction),
        entityTypes: try opt(query.value(forKey: "entityTypes") as! NSArray?, { types in try enumList(types, deserializeHistoryEntityType) }),
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

private func opt<F, T>(_ input: F?, _ deserialize: @escaping (_ input: F) throws -> T) throws -> T? {
    if (input != nil) {
        return try deserialize(input!);
    }
    return nil
}

private func enumList<T>(_ entries: NSArray, _ deserialize: @escaping (_ input: String) throws -> T) throws -> [T] {
    var result: [T] = [];
    try entries.forEach { entry in
        result.append(try deserialize(entry as! String));
    }
    return result
}
