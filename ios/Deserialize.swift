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
    let  assertion = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "assertion");
    let  keyAgreement = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "keyAgreement");
    let  capabilityInvocation = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityInvocation");
    let  capabilityDelegation = deserializeDidRequestKeySet(didRequestKeys: didRequestKeys, keyRole: "capabilityDelegation");
    return DidRequestKeysBindingDto(authentication: authentication, assertion: assertion,keyAgreement: keyAgreement, capabilityInvocation:capabilityInvocation, capabilityDelegation: capabilityDelegation );
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
