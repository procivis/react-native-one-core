//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: NSObject {
    private static let TAG = "ProcivisOneCoreModule";
    private var core: OneCoreBindingProtocol? = nil;
    
    @objc(initialize:rejecter:)
    func initialize(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let dataDirPath = NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first else {
                    throw BindingError.Unknown(message: "invalid DataDir")
                }
                
                if (core != nil) {
                    throw BindingError.Unknown(message: "core already initialized")
                }
                
                core = try initializeCore(dataDirPath: dataDirPath, keyStorage: SecureEnclaveKeyStorage());
                return nil as NSDictionary?;
            }
        }
    
    private func getCore() throws -> OneCoreBindingProtocol {
        guard let result = core else {
            throw BindingError.Uninitialized(message: "core not initialized")
        }
        return result
    }
    
    @objc(getVersion:rejecter:)
    func getVersion(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let version = try getCore().version();
                return serialize(version: version)
            }
        }
    
    @objc(getConfig:rejecter:)
    func getConfig(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let config = try getCore().getConfig();
                return serialize(config: config)
            }
        }
    
    @objc(createOrganisation:resolver:rejecter:)
    func createOrganisation(
        uuid: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try getCore().createOrganisation(uuid: uuid);
            }
        }
    
    @objc(generateKey:resolver:rejecter:)
    func generateKey(
        keyRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try getCore().generateKey(request: deserializeKeyRequest(keyRequest: keyRequest));
            }
        }
    
    @objc(createDid:resolver:rejecter:)
    func createLocalKeyDid(
        didRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try getCore().createDid(request: deserializeDidRequest(didRequest: didRequest));
            }
        }
    
    @objc(handleInvitation:didId:resolver:rejecter:)
    func handleInvitation(
        url: String,
        didId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try getCore().handleInvitation(url: url, didId: didId);
                
                switch(result) {
                case let .credentialIssuance(interactionId, credentialIds):
                    return [
                        "interactionId": interactionId,
                        "credentialIds": credentialIds
                    ] as NSDictionary;
                    
                case let .proofRequest(interactionId, proofId):
                    return [
                        "interactionId": interactionId,
                        "proofId": proofId
                    ] as NSDictionary;
                }
            }
        }
    
    @objc(holderAcceptCredential:resolver:rejecter:)
    func holderAcceptCredential(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try getCore().holderAcceptCredential(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderRejectCredential:resolver:rejecter:)
    func holderRejectCredential(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try getCore().holderRejectCredential(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getPresentationDefinition:resolver:rejecter:)
    func getPresentationDefinition(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try getCore().getPresentationDefintion(proofId: proofId);
                return serialize(presentationDefinition: result)
            }
        }
    
    @objc(holderRejectProof:resolver:rejecter:)
    func rejectProof(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try getCore().holderRejectProof(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderSubmitProof:credentials:resolver:rejecter:)
    func submitProof(
        interactionId: String,
        credentials: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                var submitCredentials: [String: PresentationSubmitCredentialRequestBindingDto] = [:];
                credentials.allKeys.forEach {
                    let key = $0 as! String;
                    let entry = credentials.value(forKey: key) as! NSDictionary;
                    let claims = entry.value(forKey: "submitClaims") as! NSArray;
                    var submitClaims: [String] = [];
                    claims.forEach { claim in
                        submitClaims.append(claim as! String);
                    }
                    submitCredentials[key] = PresentationSubmitCredentialRequestBindingDto (credentialId:  entry.value(forKey: "credentialId") as! String, submitClaims: submitClaims);
                }
                
                try getCore().holderSubmitProof(interactionId: interactionId, submitCredentials: submitCredentials);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getCredentials:resolver:rejecter:)
    func getCredentials(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = CredentialListQueryBindingDto (
                    page: query.value(forKey: "page") as! UInt32,
                    pageSize: query.value(forKey: "pageSize") as! UInt32,
                    organisationId: query.value(forKey: "organisationId") as! String,
                    role: try deserializeOpt(query.value(forKey: "role") as! String?, deserializeCredentialRole))
                let result = try getCore().getCredentials(query: listQuery);
                return serialize(credentialList: result)
            }
        }
    
    @objc(getCredential:resolver:rejecter:)
    func getCredential(
        credentialId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try getCore().getCredential(credentialId: credentialId);
                return serialize(credentialDetail: result)
            }
        }
    
    @objc(deleteCredential:resolver:rejecter:)
    func deleteCredential(
        credentialId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try getCore().deleteCredential(credentialId: credentialId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getCredentialSchemas:resolver:rejecter:)
    func getCredentialSchemas(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = ListQueryBindingDto (
                    page: query.value(forKey: "page") as! UInt32,
                    pageSize: query.value(forKey: "pageSize") as! UInt32,
                    organisationId: query.value(forKey: "organisationId") as! String)
                let result = try getCore().getCredentialSchemas(query: listQuery);
                return serialize(credentialSchemaList: result)
            }
        }
    
    @objc(getProof:resolver:rejecter:)
    func getProof(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try getCore().getProof(proofId: proofId);
                return serialize(proofRequest: result)
            }
        }
    
    @objc(checkRevocation:resolver:rejecter:)
    func checkRevocation(
        credentialIds: NSArray,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                var ids: [String] = [];
                credentialIds.forEach { id in
                    ids.append(id as! String);
                }
                
                let result = try getCore().checkRevocation(credentialIds: ids);
                return result.map { serialize(credentialRevocationCheckResponse: $0) }
            }
        }
    
    @objc(getHistory:resolver:rejecter:)
    func getHistory(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = HistoryListQueryBindingDto (
                    page: query.value(forKey: "page") as! UInt32,
                    pageSize: query.value(forKey: "pageSize") as! UInt32,
                    organisationId: query.value(forKey: "organisationId") as! String,
                    entityId: query.value(forKey: "entityId") as! String?,
                    action: try deserializeOpt(query.value(forKey: "action") as! String?,  deserializeHistoryAction),
                    entityType: try deserializeOpt(query.value(forKey: "entityType") as! String?,  deserializeHistoryEntityType),
                    createdDateFrom: query.value(forKey: "createdDateFrom") as! String?,
                    createdDateTo: query.value(forKey: "createdDateTo") as! String?,
                    didId: query.value(forKey: "didId") as! String?,
                    credentialId: query.value(forKey: "credentialId") as! String?,
                    credentialSchemaId: query.value(forKey: "credentialSchemaId") as! String?,
                    search: try deserializeHistorySearch(
                        query.value(forKey: "searchText") as! String?, 
                        query.value(forKey: "searchType") as! String?  
                    )
                )
                let result = try getCore().getHistoryList(query: listQuery);
                return serialize(historyList: result)
            }
        }
    
    @objc(uninitialize:resolver:rejecter:)
    func uninitialize(
        deleteData: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try getCore().uninitialize(deleteData: deleteData);
                core = nil
                return nil as NSDictionary?;
            }
        }
}
