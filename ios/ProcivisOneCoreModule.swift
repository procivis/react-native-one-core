//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: NSObject {
    private static let TAG = "ProcivisOneCoreModule";
    private let core = initializeCore(dataDirPath: NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first!);
    
    @objc(getVersion:rejecter:)
    func getVersion(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let version = core.version();
                return [
                    "target": version.target,
                    "buildTime": version.buildTime,
                    "branch": version.branch,
                    "tag": version.tag,
                    "commit": version.commit,
                    "rustVersion": version.rustVersion,
                    "pipelineId": version.pipelineId
                ]
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
                return [
                    "issuedCredentialId": result.issuedCredentialId
                ]
            }
        }
    
    @objc(getCredentials:rejecter:)
    func getCredentials(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try core.getCredentials();
                return result.map { (credential: Credential) in [
                    "id": credential.id,
                    "createdDate": credential.createdDate,
                    "issuanceDate": credential.issuanceDate,
                    "lastModified": credential.lastModified,
                    "issuerDid": credential.issuerDid,
                    "state": serializeEnumValue(value: credential.state),
                    "claims": credential.claims.map { (claim: Claim) in [
                        "id": claim.id,
                        "key": claim.key,
                        "dataType": serializeEnumValue(value: claim.dataType),
                        "value": claim.value,
                    ] },
                    "schema": [
                        "id": credential.schema.id,
                        "createdDate": credential.schema.createdDate,
                        "lastModified": credential.schema.lastModified,
                        "name": credential.schema.name,
                        "organisationId": credential.schema.organisationId,
                        "format": serializeEnumValue(value: credential.schema.format),
                        "revocationMethod": serializeEnumValue(value: credential.schema.revocationMethod),
                    ],
                ] }
            }
        }
    
}
