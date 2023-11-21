//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: NSObject {
    private static let TAG = "ProcivisOneCoreModule";
    private let core = try! initializeCore(dataDirPath: NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first!, keyStorage: SecureEnclaveKeyStorage());
    
    @objc(getVersion:rejecter:)
    func getVersion(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let version = core.version();
                return serialize(version: version)
            }
        }
    
    @objc(createOrganisation:resolver:rejecter:)
    func createOrganisation(
        uuid: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try core.createOrganisation(uuid: uuid);
            }
        }
    
    @objc(generateKey:resolver:rejecter:)
    func generateKey(
        keyRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try core.generateKey(request: deserializeKeyRequest(keyRequest: keyRequest));
            }
        }
    
    @objc(createDid:resolver:rejecter:)
    func createLocalKeyDid(
        didRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try core.createDid(request: deserializeDidRequest(didRequest: didRequest));
            }
        }
    
    @objc(handleInvitation:didId:resolver:rejecter:)
    func handleInvitation(
        url: String,
        didId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.handleInvitation(url: url, didId: didId);
                
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
                try core.holderAcceptCredential(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderRejectCredential:resolver:rejecter:)
    func holderRejectCredential(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try core.holderRejectCredential(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getPresentationDefinition:resolver:rejecter:)
    func getPresentationDefinition(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.getPresentationDefintion(proofId: proofId);
                return serialize(presentationDefinition: result)
            }
        }
    
    @objc(holderRejectProof:resolver:rejecter:)
    func rejectProof(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try core.holderRejectProof(interactionId: interactionId);
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
                
                try core.holderSubmitProof(interactionId: interactionId, submitCredentials: submitCredentials);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getCredentials:resolver:rejecter:)
    func getCredentials(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = ListQueryBindingDto (
                    page: query.value(forKey: "page") as! UInt32,
                    pageSize: query.value(forKey: "pageSize") as! UInt32,
                    organisationId: query.value(forKey: "organisationId") as! String)
                let result = try core.getCredentials(query: listQuery);
                return serialize(credentialList: result)
            }
        }
    
    @objc(getCredential:resolver:rejecter:)
    func getCredential(
        credentialId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.getCredential(credentialId: credentialId);
                return serialize(credentialDetail: result)
            }
        }
    
    @objc(getProof:resolver:rejecter:)
    func getProof(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.getProof(proofId: proofId);
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
                
                let result = try core.checkRevocation(credentialIds: ids);
                return result.map { serialize(credentialRevocationCheckResponse: $0) }
            }
        }
}
