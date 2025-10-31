//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation
import ProcivisOneCore
import React

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: RCTEventEmitter {
  private static let TAG = "ProcivisOneCoreModule"
  private var core: OneCoreBindingProtocol? = nil
  private var rseKeyStorage: NativeKeyStorage? = nil
  private var nfcHce: NfcHce? = nil

  public override init() {
    super.init()
    if #available(iOS 17.4, *) {
      nfcHce = NFCHCE()
    }
  }

  @objc(initialize:resolver:rejecter:)
  func initialize(
    configJson: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    ProcivisOneCoreEventEmitter.shared.eventEmitter = self
    syncCall(resolve, reject) {
      guard
        let dataDirPath = NSSearchPathForDirectoriesInDomains(
          .applicationSupportDirectory,
          .userDomainMask,
          true
        ).first
      else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(code: "BR_0000", message: "invalid DataDir", cause: nil)
        )
      }

      // create folder if not exists
      try FileManager.default.createDirectory(
        atPath: dataDirPath,
        withIntermediateDirectories: true
      )

      if self.core != nil {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0183",
            message: "core already initialized",
            cause: nil
          )
        )
      }

      if RSEKeyStorage.available {
        if let jsonConfigData = configJson.data(using: .utf8),
           let config = try? JSONSerialization.jsonObject(with: jsonConfigData) as? [String: Any],
           let keyStorage = config["keyStorage"] as? [String: Any],
           let ubiquConfig = keyStorage["UBIQU_RSE"] as? [String: Any],
           let ubiquEnabledFlag = ubiquConfig["enabled"] as? Bool,
           ubiquEnabledFlag == true {
          rseKeyStorage = RSEKeyStorage()
        }
      }

      self.core = try initializeCore(
        dataDirPath: dataDirPath,
        params: InitParamsDto(
          configJson: configJson,
          nativeSecureElement: SecureEnclaveKeyStorage(),
          remoteSecureElement: rseKeyStorage,
          bleCentral: IOSBLECentral(),
          blePeripheral: IOSBLEPeripheral(),
          nfcHce: nfcHce,
          nfcScanner: NFCScanner()
        )
      )

      return nil as NSDictionary?
    }
  }

  private func getCore() throws -> OneCoreBindingProtocol {
    guard let result = core else {
      throw BindingError.ErrorResponse(
        data: ErrorResponseBindingDto(code: "BR_0184", message: "core not initialized", cause: nil)
      )
    }
    return result
  }

  @objc(getVersion:rejecter:)
  func getVersion(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    syncCall(resolve, reject) {
      let version = try getCore().version()
      return try serializeAny(version)
    }
  }

  @objc(getConfig:rejecter:)
  func getConfig(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let config = try await self.getCore().getConfig()
      return try serializeAny(config)
    }
  }

  @objc(createOrganisation:resolver:rejecter:)
  func createOrganisation(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createOrganisation(request: try deserialize(request))
    }
  }

  @objc(upsertOrganisation:resolver:rejecter:)
  func upsertOrganisation(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().upsertOrganisation(request: try deserialize(request))
      return nil as NSDictionary?
    }
  }

  @objc(generateKey:resolver:rejecter:)
  func generateKey(
    keyRequest: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().generateKey(request: try deserialize(keyRequest))
    }
  }

  @objc(createDid:resolver:rejecter:)
  func createLocalKeyDid(
    didRequest: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createDid(request: try deserialize(didRequest))
    }
  }

  @objc(getDids:resolver:rejecter:)
  func getDids(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getDids(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(createIdentifier:resolver:rejecter:)
  func createIdentifier(
    identifierRequest: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createIdentifier(request: try deserialize(identifierRequest))
    }
  }

  @objc(getIdentifiers:resolver:rejecter:)
  func getIdentifiers(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().listIdentifiers(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(getIdentifier:resolver:rejecter:)
  func getIdentifier(
    identifierId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getIdentifier(id: identifierId)
      return try serializeAny(result)
    }
  }

  @objc(deleteIdentifier:resolver:rejecter:)
  func deleteIdentifier(
    identifierId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteIdentifier(id: identifierId)
      return nil as NSDictionary?
    }
  }

  @objc(handleInvitation:resolver:rejecter:)
  func handleInvitation(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().handleInvitation(request: try deserialize(request))
      return try serializeAny(result)
    }
  }

  @objc(holderAcceptCredential:didId:identifierId:keyId:txCode:resolver:rejecter:)
  func holderAcceptCredential(
    interactionId: String,
    didId: String?,
    identifierId: String?,
    keyId: String?,
    txCode: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().holderAcceptCredential(
        interactionId: interactionId,
        didId: didId,
        identifierId: identifierId,
        keyId: keyId,
        txCode: txCode
      )
    }
  }

  @objc(holderRejectCredential:resolver:rejecter:)
  func holderRejectCredential(
    interactionId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().holderRejectCredential(interactionId: interactionId)
      return nil as NSDictionary?
    }
  }

  @objc(initiateIssuance:resolver:rejecter:)
  func initiateIssuance(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().initiateIssuance(request: try deserialize(request))
      return try serializeAny(result)
    }
  }

  @objc(continueIssuance:resolver:rejecter:)
  func continueIssuance(
    url: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().continueIssuance(url: url)
      return try serializeAny(result)
    }
  }

  @objc(getPresentationDefinition:resolver:rejecter:)
  func getPresentationDefinition(
    proofId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getPresentationDefinition(proofId: proofId)
      return try serializeAny(result)
    }
  }

  @objc(getPresentationDefinitionV2:resolver:rejecter:)
  func getPresentationDefinitionV2(
    proofId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getPresentationDefinitionV2(proofId: proofId)
      return try serializeAny(result)
    }
  }

  @objc(holderRejectProof:resolver:rejecter:)
  func rejectProof(
    interactionId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().holderRejectProof(interactionId: interactionId)
      return nil as NSDictionary?
    }
  }

  @objc(holderSubmitProof:credentials:didId:identifierId:keyId:resolver:rejecter:)
  func submitProof(
    interactionId: String,
    credentials: NSDictionary,
    didId: String?,
    identifierId: String?,
    keyId: String?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().holderSubmitProof(
        interactionId: interactionId,
        submitCredentials: try deserialize(credentials),
        didId: didId,
        identifierId: identifierId,
        keyId: keyId
      )
      return nil as NSDictionary?
    }
  }

  @objc(holderSubmitProofV2:submission:resolver:rejecter:)
  func holderSubmitProofV2(
    interactionId: String,
    submission: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().holderSubmitProofV2(
        interactionId: interactionId,
        submission: try deserialize(submission)
      )
      return nil as NSDictionary?
    }
  }

  @objc(getCredentials:resolver:rejecter:)
  func getCredentials(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getCredentials(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(getCredential:resolver:rejecter:)
  func getCredential(
    credentialId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getCredential(credentialId: credentialId)
      return try serializeAny(result)
    }
  }

  @objc(deleteCredential:resolver:rejecter:)
  func deleteCredential(
    credentialId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteCredential(credentialId: credentialId)
      return nil as NSDictionary?
    }
  }

  @objc(importCredentialSchema:resolver:rejecter:)
  func importCredentialSchema(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().importCredentialSchema(request: try deserialize(request))
    }
  }

  @objc(getCredentialSchema:resolver:rejecter:)
  func getCredentialSchema(
    credentialSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getCredentialSchema(
        credentialSchemaId: credentialSchemaId
      )
      return try serializeAny(result)
    }
  }

  @objc(getCredentialSchemas:resolver:rejecter:)
  func getCredentialSchemas(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getCredentialSchemas(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(deleteCredentialSchema:resolver:rejecter:)
  func deleteCredentialSchema(
    credentialSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteCredentialSchema(credentialSchemaId: credentialSchemaId)
      return nil as NSDictionary?
    }
  }

  @objc(createProofSchema:resolver:rejecter:)
  func createProofSchema(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createProofSchema(request: try deserialize(request))
    }
  }

  @objc(getProofSchemas:resolver:rejecter:)
  func getProofSchemas(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getProofSchemas(filter: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(getProofSchema:resolver:rejecter:)
  func getProofSchema(
    proofSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getProofSchema(proofSchemaId: proofSchemaId)
      return try serializeAny(result)
    }
  }

  @objc(deleteProofSchema:resolver:rejecter:)
  func deleteProofSchema(
    proofSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteProofSchema(proofSchemaId: proofSchemaId)
      return nil as NSDictionary?
    }
  }

  @objc(importProofSchema:resolver:rejecter:)
  func importProofSchema(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().importProofSchema(request: try deserialize(request))
    }
  }

  @objc(createProof:resolver:rejecter:)
  func createProof(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createProof(request: try deserialize(request))
    }
  }

  @objc(runTask:resolver:rejecter:)
  func runTask(
    task: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().runTask(task: task)
    }
  }

  @objc(deleteProofClaims:resolver:rejecter:)
  func deleteProofClaims(
    proofId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteProofClaims(proofId: proofId)
      return nil as NSDictionary?
    }
  }

  @objc(shareCredentialSchema:resolver:rejecter:)
  func shareCredentialSchema(
    credentialSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().shareCredentialSchema(
        credentialSchemaId: credentialSchemaId
      )
      return try serializeAny(result)
    }
  }

  @objc(shareProofSchema:resolver:rejecter:)
  func shareProofSchema(
    proofSchemaId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().shareProofSchema(proofSchemaId: proofSchemaId)
      return try serializeAny(result)
    }
  }

  @objc(shareProof:request:resolver:rejecter:)
  func shareProof(
    proofId: String,
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().shareProof(
        proofId: proofId,
        params: try deserialize(request)
      )
      return try serializeAny(result)
    }
  }

  @objc(getProof:resolver:rejecter:)
  func getProof(
    proofId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getProof(proofId: proofId)
      return try serializeAny(result)
    }
  }

  @objc(getProofs:resolver:rejecter:)
  func getProofs(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getProofs(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(deleteProof:resolver:rejecter:)
  func deleteProof(
    proofId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteProof(proofId: proofId)
      return nil as NSDictionary?
    }
  }

  @objc(proposeProof:resolver:rejecter:)
  func proposeProof(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().proposeProof(request: try deserialize(request))
      return try serializeAny(result)
    }
  }

  @objc(checkRevocation:forceRefresh:resolver:rejecter:)
  func checkRevocation(
    credentialIds: NSArray,
    forceRefresh: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().checkRevocation(
        credentialIds: try deserialize(credentialIds),
        forceRefresh: forceRefresh
      )
      return try result.map { try serializeAny($0) }
    }
  }

  @objc(getHistory:resolver:rejecter:)
  func getHistory(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getHistoryList(query: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(getHistoryEntry:resolver:rejecter:)
  func getHistoryEntry(
    historyId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().getHistoryEntry(historyId: historyId)
      return try serializeAny(result)
    }
  }

  @objc(createTrustAnchor:resolver:rejecter:)
  func createTrustAnchor(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createTrustAnchor(anchor: try deserialize(request))
    }
  }

  @objc(getTrustAnchor:resolver:rejecter:)
  func getTrustAnchor(
    trustAnchorId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let trustAnchor = try await self.getCore().getTrustAnchor(trustAnchorId: trustAnchorId)
      return try serializeAny(trustAnchor)
    }
  }

  @objc(getTrustAnchors:resolver:rejecter:)
  func getTrustAnchors(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().listTrustAnchors(filters: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(deleteTrustAnchor:resolver:rejecter:)
  func deleteTrustAnchor(
    trustAnchorId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteTrustAnchor(anchorId: trustAnchorId)
      return nil as NSDictionary?
    }
  }

  @objc(createTrustEntity:resolver:rejecter:)
  func createTrustEntity(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createTrustEntity(request: try deserialize(request))
    }
  }

  @objc(getTrustEntities:resolver:rejecter:)
  func getTrustEntities(
    query: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().listTrustEntities(filters: try deserialize(query))
      return try serializeAny(result)
    }
  }

  @objc(getTrustEntity:resolver:rejecter:)
  func getTrustEntity(
    trustEntityId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let trustEntity = try await self.getCore().getTrustEntity(trustEntityId: trustEntityId)
      return try serializeAny(trustEntity)
    }
  }

  @objc(getTrustEntityByDid:resolver:rejecter:)
  func getTrustEntityByDid(
    didId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let trustEntity = try await self.getCore().getTrustEntityByDid(didId: didId)
      return try serializeAny(trustEntity)
    }
  }

  @objc(resolveTrustEntityByIdentifier:resolver:rejecter:)
  func resolveTrustEntityByIdentifier(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let trustEntities = try await self.getCore().resolveTrustEntityByIdentifier(request: try deserialize(request))
      return try serializeAny(trustEntities)
    }
  }

  @objc(createRemoteTrustEntity:resolver:rejecter:)
  func createRemoteTrustEntity(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().createRemoteTrustEntity(request: try deserialize(request))
    }
  }

  @objc(getRemoteTrustEntity:resolver:rejecter:)
  func getRemoteTrustEntity(
    didId: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let trustEntity = try await self.getCore().getRemoteTrustEntity(didId: didId)
      return try serializeAny(trustEntity)
    }
  }

  @objc(updateRemoteTrustEntity:resolver:rejecter:)
  func updateRemoteTrustEntity(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().updateRemoteTrustEntity(request: try deserialize(request))
    }
  }

  @objc(createBackup:outputPath:resolver:rejecter:)
  func createBackup(
    password: String,
    outputPath: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().createBackup(password: password, outputPath: outputPath)
      return try serializeAny(result)
    }
  }

  @objc(backupInfo:rejecter:)
  func backupInfo(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().backupInfo()
      return try serializeAny(result)
    }
  }

  @objc(unpackBackup:inputPath:resolver:rejecter:)
  func unpackBackup(
    password: String,
    inputPath: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().unpackBackup(password: password, inputPath: inputPath)
      return try serializeAny(result)
    }
  }

  @objc(finalizeImport:rejecter:)
  func finalizeImport(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().finalizeImport()
      return nil as NSDictionary?
    }
  }

  @objc(rollbackImport:rejecter:)
  func rollbackImport(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().rollbackImport()
      return nil as NSDictionary?
    }
  }

  @objc(resolveJsonldContext:resolver:rejecter:)
  func resolveJsonldContext(
    url: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      let result = try await self.getCore().resolveJsonldContext(url: url)
      return try serializeAny(result)
    }
  }

  @objc(deleteCache:resolver:rejecter:)
  func deleteCache(
    types: NSArray?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().deleteCache(types: try deserializeOpt(types))
      return nil as NSDictionary?
    }
  }

  @objc(holderRegisterWalletUnit:resolver:rejecter:)
  func holderRegisterWalletUnit(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().holderRegisterWalletUnit(request: try deserialize(request))
    }
  }

  @objc(nfcReadIsoMdlEngagement:resolver:rejecter:)
  func nfcReadIsoMdlEngagement(
    request: NSDictionary,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      return try await self.getCore().nfcReadIsoMdlEngagement(request: try deserialize(request))
    }
  }

  @objc(nfcStopIsoMdlEngagement:rejecter:)
  func nfcStopIsoMdlEngagement(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().nfcStopIsoMdlEngagement()
      return nil as NSDictionary?
    }
  }

  @objc(uninitialize:resolver:rejecter:)
  func uninitialize(
    deleteData: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      try await self.getCore().uninitialize(deleteData: deleteData)
      self.core = nil
      if deleteData, let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage {
        try await rseKeyStorage.delete()
      }
      return nil as NSDictionary?
    }
  }

  @objc(isNfcHceSupported:rejecter:)
  func isNfcHceSupported(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      if let nfcHce = self.nfcHce {
        return try await nfcHce.isSupported()
      }
      return false
    }
  }

  // MARK: Ubiqu specific methods

  @objc(changeRSEPin:rejecter:)
  func changeRSEPin(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0184",
            message: "ubiqu not initialized",
            cause: nil
          )
        )
      }
      try await rseKeyStorage.changePin()
      return nil as NSDictionary?
    }
  }

  @objc(areRSEBiometricsSupported:rejecter:)
  func areRSEBiometricsSupported(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0184",
            message: "ubiqu not initialized",
            cause: nil
          )
        )
      }
      return rseKeyStorage.areBiometricsSupported
    }
  }

  @objc(areRSEBiometricsEnabled:rejecter:)
  func areRSEBiometricsEnabled(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0184",
            message: "ubiqu not initialized",
            cause: nil
          )
        )
      }
      return rseKeyStorage.areBiometricsEnabled
    }
  }

  @objc(setRSEBiometrics:resolver:rejecter:)
  func setRSEBiometrics(
    enabled: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0184",
            message: "ubiqu not initialized",
            cause: nil
          )
        )
      }
      if enabled {
        try await rseKeyStorage.enableBiometrics()
      } else {
        try rseKeyStorage.disableBiometrics()
      }
      return nil as NSDictionary?
    }
  }

  @objc(resetRSE:rejecter:)
  func resetRSE(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      if let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage {
        try await rseKeyStorage.delete()
      }
      return nil as NSDictionary?
    }
  }

  @objc(resetRSEPinFlow:rejecter:)
  func resetRSEPinFlow(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    asyncCall(resolve, reject) {
      guard let rseKeyStorage = self.rseKeyStorage as? RSEKeyStorage else {
        throw BindingError.ErrorResponse(
          data: ErrorResponseBindingDto(
            code: "BR_0184",
            message: "ubiqu not initialized",
            cause: nil
          )
        )
      }
      try await rseKeyStorage.resetPinFlow()
      return nil as NSDictionary?
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
