//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation
import React

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: RCTEventEmitter {
    private static let TAG = "ProcivisOneCoreModule"
    private var core: OneCoreBindingProtocol? = nil
    private var rseKeyStorage: NativeKeyStorage? = nil
    
    @objc(initialize:resolver:rejecter:)
    func initialize(
        configJson: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            ProcivisOneCoreEventEmitter.shared.eventEmitter = self
            syncCall(resolve, reject) {
                guard let dataDirPath = NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0000", message: "invalid DataDir", cause: nil))
                }
                
                // create folder if not exists
                try FileManager.default.createDirectory(atPath: dataDirPath, withIntermediateDirectories: true)
                
                if (self.core != nil) {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0183", message: "core already initialized", cause: nil))
                }
                
                if (RSEKeyStorage.available) {
                    rseKeyStorage = RSEKeyStorage()
                }
                self.core = try initializeCore(configJson: configJson, dataDirPath: dataDirPath, nativeSecureElement: SecureEnclaveKeyStorage(), remoteSecureElement: rseKeyStorage, bleCentral: IOSBLECentral(), blePeripheral: IOSBLEPeripheral());
                return nil as NSDictionary?;
            }
        }
    
    private func getCore() throws -> OneCoreBindingProtocol {
        guard let result = core else {
            throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "core not initialized", cause: nil))
        }
        return result
    }
    
    @objc(getVersion:rejecter:)
    func getVersion(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            syncCall(resolve, reject) {
                let version = try getCore().version();
                return serialize(version: version)
            }
        }
    
    @objc(getConfig:rejecter:)
    func getConfig(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let config = try await self.getCore().getConfig();
                return serialize(config: config)
            }
        }
    
    @objc(createOrganisation:resolver:rejecter:)
    func createOrganisation(
        uuid: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try await self.getCore().createOrganisation(uuid: uuid);
            }
        }
    
    @objc(generateKey:resolver:rejecter:)
    func generateKey(
        keyRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try await self.getCore().generateKey(request: deserializeKeyRequest(keyRequest: keyRequest));
            }
        }
    
    @objc(createDid:resolver:rejecter:)
    func createLocalKeyDid(
        didRequest: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try await self.getCore().createDid(request: deserializeDidRequest(didRequest: didRequest));
            }
        }
    
    @objc(getDids:resolver:rejecter:)
    func getDids(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeDidListQuery(query);
                let result = try await self.getCore().getDids(query: listQuery);
                return serialize(didList: result)
            }
        }
    
    @objc(handleInvitation:organisationId:transport:resolver:rejecter:)
    func handleInvitation(
        url: String,
        organisationId: String,
        transport: NSArray?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let transport = (transport != nil) ? try deserializeIds(transport!) : nil;
                let result = try await self.getCore().handleInvitation(url: url, organisationId: organisationId, transport: transport);
                return serialize(invitationResponse: result)
            }
        }
    
    @objc(holderAcceptCredential:didId:keyId:txCode:resolver:rejecter:)
    func holderAcceptCredential(
        interactionId: String,
        didId: String,
        keyId: String?,
        txCode: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().holderAcceptCredential(interactionId: interactionId, didId: didId, keyId: keyId, txCode: txCode);
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderRejectCredential:resolver:rejecter:)
    func holderRejectCredential(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().holderRejectCredential(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getPresentationDefinition:resolver:rejecter:)
    func getPresentationDefinition(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getPresentationDefinition(proofId: proofId);
                return serialize(presentationDefinition: result)
            }
        }
    
    @objc(holderRejectProof:resolver:rejecter:)
    func rejectProof(
        interactionId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().holderRejectProof(interactionId: interactionId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(holderSubmitProof:credentials:didId:keyId:resolver:rejecter:)
    func submitProof(
        interactionId: String,
        credentials: NSDictionary,
        didId: String,
        keyId: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                var submitCredentials: [String: PresentationSubmitCredentialRequestBindingDto] = [:];
                try credentials.allKeys.forEach {
                    let key: String = try safeCast($0);
                    let entry: NSDictionary = try safeCast(credentials.value(forKey: key));
                    submitCredentials[key] = try deserializePresentationSubmitCredentialRequest(entry)
                }
                
                try await self.getCore().holderSubmitProof(interactionId: interactionId, submitCredentials: submitCredentials, didId: didId, keyId: keyId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(getCredentials:resolver:rejecter:)
    func getCredentials(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeCredentialListQuery(query);
                let result = try await self.getCore().getCredentials(query: listQuery);
                return serialize(credentialList: result)
            }
        }
    
    @objc(getCredential:resolver:rejecter:)
    func getCredential(
        credentialId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getCredential(credentialId: credentialId);
                return serialize(credentialDetail: result)
            }
        }
    
    @objc(deleteCredential:resolver:rejecter:)
    func deleteCredential(
        credentialId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteCredential(credentialId: credentialId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(importCredentialSchema:resolver:rejecter:)
    func importCredentialSchema(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeImportCredentialSchemaRequest(request);
                return try await self.getCore().importCredentialSchema(request: request)
            }
        }
    
    @objc(getCredentialSchema:resolver:rejecter:)
    func getCredentialSchema(
        credentialSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getCredentialSchema(credentialSchemaId: credentialSchemaId);
                return serialize(credentialSchemaDetail: result)
            }
        }
    
    @objc(getCredentialSchemas:resolver:rejecter:)
    func getCredentialSchemas(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeCredentialSchemaListQuery(query)
                let result = try await self.getCore().getCredentialSchemas(query: listQuery);
                return serialize(credentialSchemaList: result)
            }
        }
    
    @objc(deleteCredentialSchema:resolver:rejecter:)
    func deleteCredentialSchema(
        credentialSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteCredentialSchema(credentialSchemaId: credentialSchemaId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(createProofSchema:resolver:rejecter:)
    func createProofSchema(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeCreateProofSchemaRequest(request)
                return try await self.getCore().createProofSchema(request: request)
            }
        }
    
    @objc(getProofSchemas:resolver:rejecter:)
    func getProofSchemas(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeProofSchemaListQuery(query)
                let result = try await self.getCore().getProofSchemas(filter: listQuery);
                return serialize(proofSchemaList: result)
            }
        }
    
    @objc(getProofSchema:resolver:rejecter:)
    func getProofSchema(
        proofSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getProofSchema(proofSchemaId: proofSchemaId);
                return serialize(proofSchema: result)
            }
        }
    
    @objc(deleteProofSchema:resolver:rejecter:)
    func deleteProofSchema(
        proofSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteProofSchema(proofSchemaId: proofSchemaId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(importProofSchema:resolver:rejecter:)
    func importProofSchema(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeImportProofSchemaRequest(request);
                return try await self.getCore().importProofSchema(request: request)
            }
        }
    
    @objc(createProof:resolver:rejecter:)
    func createProof(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeCreateProofRequest(request);
                return try await self.getCore().createProof(request: request)
            }
        }
    
    @objc(runTask:resolver:rejecter:)
    func runTask(
        task: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try await self.getCore().runTask(task: task);
            }
        }
    
    @objc(deleteProofClaims:resolver:rejecter:)
    func deleteProofClaims(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteProofClaims(proofId: proofId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(checkCertificate:certificate:resolver:rejecter:)
    func checkCertificate(
        keyId: String,
        certificate: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let certificate = try deserializeKeyCheckCertificateRequest(certificate);
                try await self.getCore().checkCertificate(keyId: keyId, certificate: certificate);
                return nil as NSDictionary?;
            }
        }
    
    @objc(shareCredentialSchema:resolver:rejecter:)
    func shareCredentialSchema(
        credentialSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().shareCredentialSchema(credentialSchemaId: credentialSchemaId);
                return serialize(credentialSchemaShareResponse: result)
            }
        }
    
    @objc(shareProofSchema:resolver:rejecter:)
    func shareProofSchema(
        proofSchemaId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().shareProofSchema(proofSchemaId: proofSchemaId);
                return serialize(proofSchemaShareResponse: result)
            }
        }
    
    @objc(shareProof:request:resolver:rejecter:)
    func shareProof(
        proofId: String,
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().shareProof(proofId: proofId, params: deserializeShareProofRequest(request));
                return serialize(shareProofResponse: result)
            }
        }
    
    @objc(getProof:resolver:rejecter:)
    func getProof(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getProof(proofId: proofId);
                return serialize(proofRequest: result)
            }
        }
    
    @objc(getProofs:resolver:rejecter:)
    func getProofs(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeProofListQuery(query);
                let result = try await self.getCore().getProofs(query: listQuery);
                return serialize(proofList: result)
            }
        }
    
    @objc(retractProof:resolver:rejecter:)
    func retractProof(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                return try await self.getCore().retractProof(proofId: proofId)
            }
        }
    
    @objc(deleteProof:resolver:rejecter:)
    func deleteProof(
        proofId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteProof(proofId: proofId)
                return nil as NSDictionary?;
            }
        }
    
    @objc(proposeProof:organisationId:resolver:rejecter:)
    func proposeProof(
        exchange: String,
        organisationId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().proposeProof(exchange: exchange, organisationId: organisationId)
                return serialize(proposeProofResponse: result)
            }
        }
    
    @objc(checkRevocation:forceRefresh:resolver:rejecter:)
    func checkRevocation(
        credentialIds: NSArray,
        forceRefresh: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let ids = try deserializeIds(credentialIds);
                let result = try await self.getCore().checkRevocation(credentialIds: ids, forceRefresh: forceRefresh);
                return result.map {
                    serialize(credentialRevocationCheckResponse: $0)
                }
            }
        }
    
    @objc(getHistory:resolver:rejecter:)
    func getHistory(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeHistoryListQuery(query)
                let result = try await self.getCore().getHistoryList(query: listQuery);
                return serialize(historyList: result)
            }
        }
    
    @objc(getHistoryEntry:resolver:rejecter:)
    func getHistoryEntry(
        historyId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().getHistoryEntry(historyId: historyId);
                return serialize(historyListItem: result)
            }
        }
    
    @objc(createTrustAnchor:resolver:rejecter:)
    func createTrustAnchor(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeCreateTrustAnchorRequest(request);
                return try await self.getCore().createTrustAnchor(anchor: request)
            }
        }
    
    @objc(getTrustAnchor:resolver:rejecter:)
    func getTrustAnchor(
        trustAnchorId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let trustAnchor = try await self.getCore().getTrustAnchor(trustAnchorId: trustAnchorId);
                return serialize(trustAnchor: trustAnchor)
            }
        }
    
    @objc(getTrustAnchors:resolver:rejecter:)
    func getTrustAnchors(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeTrustAnchorListQuery(query)
                let result = try await self.getCore().listTrustAnchors(filters: listQuery);
                return serialize(trustAnchorList: result)
            }
        }
    
    @objc(deleteTrustAnchor:resolver:rejecter:)
    func deleteTrustAnchor(
        trustAnchorId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().deleteTrustAnchor(anchorId: trustAnchorId);
                return nil as NSDictionary?;
            }
        }
    
    @objc(createTrustEntity:resolver:rejecter:)
    func createTrustEntity(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeCreateTrustEntityRequest(request);
                return try await self.getCore().createTrustEntity(request: request)
            }
        }
    
    @objc(getTrustEntities:resolver:rejecter:)
    func getTrustEntities(
        query: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let listQuery = try deserializeTrustEntityListQuery(query)
                let result = try await self.getCore().listTrustEntities(filters: listQuery);
                return serialize(trustEntityList: result)
            }
        }
    
    @objc(getTrustEntity:resolver:rejecter:)
    func getTrustEntity(
        trustEntityId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let trustEntity = try await self.getCore().getTrustEntity(trustEntityId: trustEntityId);
                return serialize(trustEntity: trustEntity)
            }
        }
    
    @objc(getTrustEntityByDid:resolver:rejecter:)
    func getTrustEntityByDid(
        didId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let trustEntity = try await self.getCore().getTrustEntityByDid(didId: didId);
                return serialize(trustEntity: trustEntity)
            }
        }
    
    @objc(createRemoteTrustEntity:resolver:rejecter:)
    func createRemoteTrustEntity(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeCreateRemoteTrustEntityRequest(request);
                return try await self.getCore().createRemoteTrustEntity(request: request)
            }
        }
    
    @objc(getRemoteTrustEntity:resolver:rejecter:)
    func getRemoteTrustEntity(
        didId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let trustEntity = try await self.getCore().getRemoteTrustEntity(didId: didId);
                return serialize(trustEntity: trustEntity)
            }
        }
    
    @objc(updateRemoteTrustEntity:resolver:rejecter:)
    func updateRemoteTrustEntity(
        request: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let request = try deserializeUpdateRemoteTrustEntityRequest(request);
                return try await self.getCore().updateRemoteTrustEntity(request: request)
            }
        }
    
    
    @objc(createBackup:outputPath:resolver:rejecter:)
    func createBackup(
        password: String,
        outputPath: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().createBackup(password: password, outputPath: outputPath);
                return serialize(backupCreate: result)
            }
        }
    
    @objc(backupInfo:rejecter:)
    func backupInfo(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().backupInfo();
                return serialize(unexportableEntities: result)
            }
        }
    
    @objc(unpackBackup:inputPath:resolver:rejecter:)
    func unpackBackup(
        password: String,
        inputPath: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().unpackBackup(password: password, inputPath: inputPath);
                return serialize(importBackupMetadata: result)
            }
        }
    
    @objc(finalizeImport:rejecter:)
    func finalizeImport(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().finalizeImport();
                return nil as NSDictionary?;
            }
        }
    
    @objc(rollbackImport:rejecter:)
    func rollbackImport(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().rollbackImport();
                return nil as NSDictionary?;
            }
        }
    
    @objc(resolveJsonldContext:resolver:rejecter:)
    func resolveJsonldContext(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let result = try await self.getCore().resolveJsonldContext(url: url);
                return serialize(resolveJsonLdContextResponse: result)
            }
        }
    
    @objc(deleteCache:resolver:rejecter:)
    func deleteCache(
        types: NSArray?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                let types = try deserializeCacheTypes(types: types);
                try await self.getCore().deleteCache(types: types);
                return nil as NSDictionary?;
            }
        }
    
    @objc(uninitialize:resolver:rejecter:)
    func uninitialize(
        deleteData: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                try await self.getCore().uninitialize(deleteData: deleteData);
                self.core = nil
                if deleteData, let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage {
                    try await rseKeyStorage.delete()
                }
                return nil as NSDictionary?;
            }
        }
    
    // MARK: Ubiqu specific methods
    
    @objc(changeRSEPin:rejecter:)
    func changeRSEPin(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "ubiqu not initialized", cause: nil))
                }
                try await rseKeyStorage.changePin()
                return nil as NSDictionary?;
            }
        }
    
    @objc(areRSEBiometricsSupported:rejecter:)
    func areRSEBiometricsSupported(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "ubiqu not initialized", cause: nil))
                }
                return rseKeyStorage.areBiometricsSupported
            }
        }
    
    @objc(areRSEBiometricsEnabled:rejecter:)
    func areRSEBiometricsEnabled(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "ubiqu not initialized", cause: nil))
                }
                return rseKeyStorage.areBiometricsEnabled
            }
        }
    
    @objc(setRSEBiometrics:resolver:rejecter:)
    func setRSEBiometrics(
        enabled: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "ubiqu not initialized", cause: nil))
                }
                if (enabled) {
                    try await rseKeyStorage.enableBiometrics()
                } else {
                    try rseKeyStorage.disableBiometrics()
                }
                return nil as NSDictionary?;
            }
        }
    
    @objc(resetRSE:rejecter:)
    func resetRSE(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                if let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage {
                    try await rseKeyStorage.delete()
                }
                return nil as NSDictionary?;
            }
        }
    
    @objc(resetRSEPinFlow:rejecter:)
    func resetRSEPinFlow(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            asyncCall(resolve, reject) {
                guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
                    throw BindingError.ErrorResponse(data: ErrorResponseBindingDto(code: "BR_0184", message: "ubiqu not initialized", cause: nil))
                }
                try await rseKeyStorage.resetPinFlow()
                return nil as NSDictionary?;
            }
        }
}

// MARK: RCTEventEmitter

extension ProcivisOneCoreModule {
    
    override func supportedEvents() -> [String]! {
        return ProcivisOneCoreEventEmitter.supportedEvents
    }
    
    override func startObserving() {
        ProcivisOneCoreEventEmitter.hasListeners = true
    }
    
    override func stopObserving() {
        ProcivisOneCoreEventEmitter.hasListeners = false
    }
    
    override func sendEvent(withName name: String!, body: Any!) {
        guard ProcivisOneCoreEventEmitter.hasListeners else {
            return
        }
        super.sendEvent(withName: name, body: body)
    }
}
