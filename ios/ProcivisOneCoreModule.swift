//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: NSObject {
    private static let TAG = "ProcivisOneCoreModule";
    private let core = try! initializeCore(dataDirPath: NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first!);
    
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
    
    @objc(createLocalDid:organisationId:resolver:rejecter:)
    func createLocalDid(
        did: String,
        organisationId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try core.createLocalDid(did: did, organisationId: organisationId);
            }
        }
    
    @objc(handleInvitation:resolver:rejecter:)
    func handleInvitation(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.handleInvitation(url: url);
                
                switch(result) {
                case let .invitationResponseCredentialIssuance(issuedCredentialId):
                    return [
                        "issuedCredentialId": issuedCredentialId
                    ] as NSDictionary;
                    
                case let .invitationResponseProofRequest(proofRequest):
                    return [
                        "claims": proofRequest.claims.map { serialize(proofRequestClaim: $0) }
                    ] as NSDictionary;
                }
            }
        }
    
    @objc(holderRejectProof:rejecter:)
    func rejectProof(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try core.holderRejectProof();
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderSubmitProof:resolver:rejecter:)
    func submitProof(
        credentialIds: [String],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try core.holderSubmitProof(credentialIds: credentialIds);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getCredentials:rejecter:)
    func getCredentials(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.getCredentials();
                return result.map { serialize(credential: $0) }
            }
        }
    
}
