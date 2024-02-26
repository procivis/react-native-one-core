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
    let didType = try deserializeDidType(input: didRequest.value(forKey: "didType") as! String);
    let keys = deserializeDidRequestKeys(didRequestKeys: didRequest.value(forKey: "keys") as! NSDictionary);

    let paramsRaw = didRequest.value(forKey: "params") as! NSDictionary;
    var params: [String: String] = [:];
    paramsRaw.allKeys.forEach {
        let key = $0 as! String;
        params[key] = paramsRaw.value(forKey: key) as? String;
    }

    return DidRequestBindingDto(organisationId: organisationId, name: name, didMethod: didMethod, didType: didType, keys: keys, params: params);
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
        type: try deserializeOpt(type, deserializeHistorySearchType)
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
    default: throw SerializationError("Invalid history entityType: " + input);
    }
}

func deserializeHistoryEntityTypes(_ input: NSArray?) throws -> [HistoryEntityTypeBindingEnum]? {
    if (input == nil) {
        return nil;
    }

    var result: [HistoryEntityTypeBindingEnum] = [];
    try input!.forEach { entityType in
        result.append(try deserializeHistoryEntityType(input: entityType as! String));
    }
    return result
}

func deserializeCredentialIds(_ ids: NSArray?) throws -> [String]? {
    if (ids == nil) {
        return nil;
    }

    var result: [String] = [];
    try ids!.forEach { id in
        result.append(id as! String);
    }
    return result
}

func deserializeOpt<T>(_ input: String?, _ deserialize: @escaping (_ input: String) throws -> T) throws -> T? {
    if (input != nil) {
        return try deserialize(input!);
    }
    return nil
}
