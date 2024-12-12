//
//  Serialize.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation

// Enum values serialization
func serializeEnumValue<T>(value: T) -> String {
    return String(describing: value).snakeCased()
}

private let snakeCaseRegex = try! NSRegularExpression(pattern: "([a-z0-9])([A-Z])", options: [])
extension String {
    func snakeCased() -> String {
        let range = NSRange(location: 0, length: count)
        return snakeCaseRegex.stringByReplacingMatches(in: self, options: [], range: range, withTemplate: "$1_$2").uppercased()
    }
}

private func opt<F, T>(_ value: F?, _ serialize: @escaping (_ input: F) -> T) -> T? {
    if (value == nil) {
        return nil;
    }
    return serialize(value!)
}

extension Dictionary where Key: ExpressibleByStringLiteral {
    mutating func addOpt<T>(_ field: String, _ value: T?) {
        if (value != nil) {
            self[field as! Key] = value! as? Value
        }
    }
}

// Business objects serialization
func serialize(version: VersionBindingDto) -> NSDictionary {
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

func serialize(config: ConfigBindingDto) -> NSDictionary {
    return [
        "format": config.format,
        "exchange": config.exchange,
        "transport": config.transport,
        "revocation": config.revocation,
        "did": config.did,
        "datatype": config.datatype,
        "keyAlgorithm": config.keyAlgorithm,
        "keyStorage": config.keyStorage,
        "trustManagement": config.trustManagement,
        "cacheEntities": config.cacheEntities,
    ]
}

func serialize(credentialSchemaType: CredentialSchemaTypeBindingEnum) -> String {
    switch (credentialSchemaType) {
    case .procivisOneSchema2024:
        return "PROCIVIS_ONE_SCHEMA2024";
    case .fallbackSchema2024:
        return "FALLBACK_SCHEMA2024";
    case .mdoc:
        return "MDOC";
    case let .other(value):
        return value;
    }
}

func serialize(credentialSchema: CredentialSchemaBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": credentialSchema.id,
        "createdDate": credentialSchema.createdDate,
        "lastModified": credentialSchema.lastModified,
        "name": credentialSchema.name,
        "format": credentialSchema.format,
        "revocationMethod": credentialSchema.revocationMethod,
        "schemaId": credentialSchema.schemaId,
        "importedSourceUrl": credentialSchema.importedSourceUrl,
        "schemaType": serialize(credentialSchemaType: credentialSchema.schemaType)
    ]
    result.addOpt("walletStorageType", opt(credentialSchema.walletStorageType, serializeEnumValue))
    result.addOpt("layoutType", opt(credentialSchema.layoutType, serializeEnumValue))
    result.addOpt("layoutProperties", opt(credentialSchema.layoutProperties, {properties in serialize(layoutProperties: properties)}))
    return result as NSDictionary
}

func serialize(credentialSchemaDetail: CredentialSchemaDetailBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": credentialSchemaDetail.id,
        "createdDate": credentialSchemaDetail.createdDate,
        "lastModified": credentialSchemaDetail.lastModified,
        "name": credentialSchemaDetail.name,
        "format": credentialSchemaDetail.format,
        "revocationMethod": credentialSchemaDetail.revocationMethod,
        "schemaId": credentialSchemaDetail.schemaId,
        "importedSourceUrl": credentialSchemaDetail.importedSourceUrl,
        "schemaType": serialize(credentialSchemaType: credentialSchemaDetail.schemaType),
        "claims": credentialSchemaDetail.claims.map { serialize(claimSchema: $0) }
    ]
    result.addOpt("walletStorageType", opt(credentialSchemaDetail.walletStorageType, serializeEnumValue))
    result.addOpt("layoutType", opt(credentialSchemaDetail.layoutType, serializeEnumValue))
    result.addOpt("layoutProperties", opt(credentialSchemaDetail.layoutProperties, {properties in serialize(layoutProperties: properties)}))
    
    return result as NSDictionary
}

func serialize(claimSchema: CredentialClaimSchemaBindingDto) -> NSDictionary {
    return [
        "id": claimSchema.id,
        "createdDate": claimSchema.createdDate,
        "lastModified": claimSchema.lastModified,
        "required": claimSchema.required,
        "key": claimSchema.key,
        "array": claimSchema.array,
        "datatype": claimSchema.datatype,
        "claims": claimSchema.claims.map { serialize(claimSchema: $0) }
    ]
}

func serialize(layoutProperties: CredentialSchemaLayoutPropertiesBindingDto) -> NSDictionary {
    var result: [String: Any] = [:]
    result.addOpt("background", opt(layoutProperties.background, {background in serialize(backgroundProperties: background)}))
    result.addOpt("logo", opt(layoutProperties.logo, {logo in serialize(logoProperties: logo)}))
    result.addOpt("primaryAttribute", layoutProperties.primaryAttribute)
    result.addOpt("secondaryAttribute", layoutProperties.secondaryAttribute)
    result.addOpt("pictureAttribute", layoutProperties.pictureAttribute)
    result.addOpt("code", opt(layoutProperties.code, {code in serialize(codeProperties: code)}))
    return result as NSDictionary
}

func serialize(backgroundProperties: CredentialSchemaBackgroundPropertiesBindingDto) -> NSDictionary {
    var result: [String: Any] = [:]
    result.addOpt("color", backgroundProperties.color)
    result.addOpt("image", backgroundProperties.image)
    return result as NSDictionary
}

func serialize(logoProperties: CredentialSchemaLogoPropertiesBindingDto) -> NSDictionary {
    var result: [String: Any] = [:]
    result.addOpt("fontColor", logoProperties.fontColor)
    result.addOpt("backgroundColor", logoProperties.backgroundColor)
    result.addOpt("image", logoProperties.image)
    return result as NSDictionary
}

func serialize(codeProperties: CredentialSchemaCodePropertiesBindingDto) -> NSDictionary {
    return [
        "attribute": codeProperties.attribute,
        "type": serializeEnumValue(value: codeProperties.type),
    ]
}

func serialize(claim: ClaimBindingDto) -> NSDictionary {
    return [
        "id": claim.id,
        "key": claim.key,
        "dataType": claim.dataType,
        "array": claim.array,
        "value": serialize(claimValue: claim.value),
    ]
}

func serialize(claimValue: ClaimValueBindingDto) -> Any {
    switch (claimValue) {
    case let .boolean(value):
        return value;
    case let .float(value):
        return value;
    case let .integer(value):
        return NSNumber(value: value);
    case let .string(value):
        return value;
    case .nested(value: let values):
        return values.map { serialize(claim: $0) }
    }
}

func serialize(credentialListItem: CredentialListItemBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": credentialListItem.id,
        "createdDate": credentialListItem.createdDate,
        "issuanceDate": credentialListItem.issuanceDate,
        "lastModified": credentialListItem.lastModified,
        "state": serializeEnumValue(value: credentialListItem.state),
        "schema": serialize(credentialSchema: credentialListItem.schema),
        "role": serializeEnumValue(value: credentialListItem.role),
    ]
    result.addOpt("revocationDate", credentialListItem.revocationDate)
    result.addOpt("issuerDid", credentialListItem.issuerDid)
    result.addOpt("suspendEndDate", credentialListItem.suspendEndDate)
    return result as NSDictionary
}

func serialize(credentialDetail: CredentialDetailBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": credentialDetail.id,
        "createdDate": credentialDetail.createdDate,
        "issuanceDate": credentialDetail.issuanceDate,
        "lastModified": credentialDetail.lastModified,
        "state": serializeEnumValue(value: credentialDetail.state),
        "claims": credentialDetail.claims.map { serialize(claim: $0) },
        "schema": serialize(credentialSchema: credentialDetail.schema),
        "role": serializeEnumValue(value: credentialDetail.role),
    ]
    result.addOpt("revocationDate", credentialDetail.revocationDate)
    result.addOpt("issuerDid", opt(credentialDetail.issuerDid, {issuerDid in serialize(didListItem: issuerDid)}))
    result.addOpt("holderDid", opt(credentialDetail.holderDid, {holderDid in serialize(didListItem: holderDid)}))
    result.addOpt("redirectUri", credentialDetail.redirectUri)
    result.addOpt("lvvcIssuanceDate", credentialDetail.lvvcIssuanceDate)
    result.addOpt("suspendEndDate", credentialDetail.suspendEndDate)
    result.addOpt("mdocMsoValidity", opt(credentialDetail.mdocMsoValidity, {validity in serialize(mdocMsoValidity: validity)}) )
    return result as NSDictionary
}

func serialize(mdocMsoValidity: MdocMsoValidityResponseBindingDto) -> NSDictionary {
    return [
        "expiration": mdocMsoValidity.expiration,
        "nextUpdate": mdocMsoValidity.nextUpdate,
        "lastUpdate": mdocMsoValidity.lastUpdate,
    ]
}

func serialize(credentialList: CredentialListBindingDto) -> NSDictionary {
    return [
        "totalItems": credentialList.totalItems,
        "totalPages": credentialList.totalPages,
        "values": credentialList.values.map { serialize(credentialListItem: $0) },
    ]
}

func serialize(didList: DidListBindingDto) -> NSDictionary {
    return [
        "totalItems": didList.totalItems,
        "totalPages": didList.totalPages,
        "values": didList.values.map { serialize(didListItem: $0) },
    ]
}

func serialize(credentialSchemaList: CredentialSchemaListBindingDto) -> NSDictionary {
    return [
        "totalItems": credentialSchemaList.totalItems,
        "totalPages": credentialSchemaList.totalPages,
        "values": credentialSchemaList.values.map { serialize(credentialSchema: $0) },
    ]
}

func serialize(proofList: ProofListBindingDto) -> NSDictionary {
    return [
        "totalItems": proofList.totalItems,
        "totalPages": proofList.totalPages,
        "values": proofList.values.map { serialize(proofListItem: $0) },
    ]
}

func serialize(proofListItem: ProofListItemBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": proofListItem.id,
        "createdDate": proofListItem.createdDate,
        "lastModified": proofListItem.lastModified,
        "issuanceDate": proofListItem.issuanceDate,
        "exchange": proofListItem.exchange,
        "transport": proofListItem.transport,
        "state": serializeEnumValue(value: proofListItem.state),
    ]
    
    result.addOpt("requestedDate", proofListItem.requestedDate)
    result.addOpt("completedDate", proofListItem.completedDate)
    result.addOpt("schema", opt(proofListItem.schema, {proofSchema in serialize(proofSchemaListItem: proofSchema) }))
    result.addOpt("verifierDid", proofListItem.verifierDid)
    
    return result as NSDictionary
}

func serialize(proposeProofResponse: ProposeProofResponseBindingDto) -> NSDictionary {
    return [
        "proofId": proposeProofResponse.proofId,
        "interactionId": proposeProofResponse.interactionId,
        "url": proposeProofResponse.url,
    ]
}

func serialize(proofRequest: ProofRequestBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": proofRequest.id,
        "createdDate": proofRequest.createdDate,
        "lastModified": proofRequest.lastModified,
        "proofInputs": proofRequest.proofInputs.map { serialize(proofInput: $0) },
        "state": serializeEnumValue(value: proofRequest.state),
        "exchange": proofRequest.exchange,
    ]
    result.addOpt("proofSchema", opt(proofRequest.proofSchema, {proofSchema in serialize(proofSchemaListItem: proofSchema) }))
    result.addOpt("verifierDid", opt(proofRequest.verifierDid, {verifierDid in serialize(didListItem: verifierDid)}))
    result.addOpt("holderDid", opt(proofRequest.holderDid, {holderDid in serialize(didListItem: holderDid)}))
    result.addOpt("redirectUri", proofRequest.redirectUri)
    return result as NSDictionary
}

func serialize(proofSchemaList: ProofSchemaListBindingDto) -> NSDictionary {
    return [
        "totalItems": proofSchemaList.totalItems,
        "totalPages": proofSchemaList.totalPages,
        "values": proofSchemaList.values.map { serialize(proofSchemaListItem: $0) },
    ]
}

func serialize(proofSchemaListItem: GetProofSchemaListItemBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": proofSchemaListItem.id,
        "createdDate": proofSchemaListItem.createdDate,
        "lastModified": proofSchemaListItem.lastModified,
        "name": proofSchemaListItem.name,
        "expireDuration": proofSchemaListItem.expireDuration
    ]
    
    result.addOpt("deletedAt", proofSchemaListItem.deletedAt)
    return result as NSDictionary
}

func serialize(proofSchema: GetProofSchemaBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": proofSchema.id,
        "createdDate": proofSchema.createdDate,
        "lastModified": proofSchema.lastModified,
        "name": proofSchema.name,
        "organisationId": proofSchema.organisationId,
        "expireDuration": proofSchema.expireDuration,
        "proofInputSchemas": proofSchema.proofInputSchemas.map { serialize(proofInputSchema: $0) }
    ]
    result.addOpt("importedSourceUrl", proofSchema.importedSourceUrl)
    return result as NSDictionary
}

func serialize(proofInputSchema: ProofInputSchemaBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "claimSchemas": proofInputSchema.claimSchemas.map { serialize(proofClaimSchema: $0) },
        "credentialSchema": serialize(credentialSchema: proofInputSchema.credentialSchema),
    ]
    result.addOpt("validityConstraint", proofInputSchema.validityConstraint)
    
    return result as NSDictionary
}

func serialize(proofInput: ProofInputBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "claims": proofInput.claims.map { serialize(proofRequestClaim: $0) },
        "credentialSchema": serialize(credentialSchema: proofInput.credentialSchema),
    ]
    result.addOpt("credential", opt(proofInput.credential, { credential in serialize(credentialDetail: credential) }))
    result.addOpt("validityConstraint", proofInput.validityConstraint)
    return result as NSDictionary
}

func serialize(proofRequestClaim: ProofRequestClaimBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "schema": serialize(proofClaimSchema: proofRequestClaim.schema),
    ]
    
    result.addOpt("value", opt(proofRequestClaim.value, { claim in serialize(proofRequestClaimValue: claim) }))
    return result as NSDictionary
}

func serialize(proofRequestClaimValue: ProofRequestClaimValueBindingDto) -> Any {
    switch (proofRequestClaimValue) {
    case let .value(value):
        return value;
    case .claims(value: let values):
        return values.map { serialize(proofRequestClaim: $0)}
    }
}

func serialize(proofClaimSchema: ProofClaimSchemaBindingDto) -> NSDictionary {
    return [
        "id": proofClaimSchema.id,
        "requested": proofClaimSchema.requested,
        "required": proofClaimSchema.required,
        "key": proofClaimSchema.key,
        "dataType": proofClaimSchema.dataType,
        "claims": proofClaimSchema.claims.map { serialize(proofClaimSchema: $0)},
        "array": proofClaimSchema.array,
    ]
}

func serialize(presentationDefinition: PresentationDefinitionBindingDto) -> NSDictionary {
    return [
        "requestGroups": presentationDefinition.requestGroups.map { serialize(presentationDefinitionRequestGroup: $0) },
    ]
}

func serialize(presentationDefinitionRequestGroup: PresentationDefinitionRequestGroupBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": presentationDefinitionRequestGroup.id,
        "rule": serialize(presentationDefinitionRule: presentationDefinitionRequestGroup.rule),
        "requestedCredentials": presentationDefinitionRequestGroup.requestedCredentials.map { serialize(presentationDefinitionRequestedCredential: $0) },
    ]
    result.addOpt("name", presentationDefinitionRequestGroup.name)
    result.addOpt("purpose", presentationDefinitionRequestGroup.purpose)
    return result as NSDictionary
}

func serialize(presentationDefinitionRequestedCredential: PresentationDefinitionRequestedCredentialBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": presentationDefinitionRequestedCredential.id,
        "fields": presentationDefinitionRequestedCredential.fields.map { serialize(presentationDefinitionField: $0) },
        "applicableCredentials": presentationDefinitionRequestedCredential.applicableCredentials,
        "inapplicableCredentials": presentationDefinitionRequestedCredential.inapplicableCredentials,
    ]
    result.addOpt("name", presentationDefinitionRequestedCredential.name)
    result.addOpt("purpose", presentationDefinitionRequestedCredential.purpose)
    result.addOpt("validityCredentialNbf", presentationDefinitionRequestedCredential.validityCredentialNbf)
    return result as NSDictionary
}

func serialize(presentationDefinitionField: PresentationDefinitionFieldBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": presentationDefinitionField.id,
        "required": presentationDefinitionField.required,
        "keyMap": presentationDefinitionField.keyMap,
    ]
    result.addOpt("name", presentationDefinitionField.name)
    result.addOpt("purpose", presentationDefinitionField.purpose)
    return result as NSDictionary
}

func serialize(presentationDefinitionRule: PresentationDefinitionRuleBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "type": serializeEnumValue(value: presentationDefinitionRule.type),
    ]
    result.addOpt("min", presentationDefinitionRule.min)
    result.addOpt("max", presentationDefinitionRule.max)
    result.addOpt("count", presentationDefinitionRule.count)
    return result as NSDictionary
}

func serialize(credentialRevocationCheckResponse: CredentialRevocationCheckResponseBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "credentialId": credentialRevocationCheckResponse.credentialId,
        "status": serializeEnumValue(value: credentialRevocationCheckResponse.status),
        "success": credentialRevocationCheckResponse.success,
    ]
    result.addOpt("reason", credentialRevocationCheckResponse.reason)
    return result as NSDictionary
}

func serialize(historyList: HistoryListBindingDto) -> NSDictionary {
    return [
        "totalItems": historyList.totalItems,
        "totalPages": historyList.totalPages,
        "values": historyList.values.map { serialize(historyListItem: $0) },
    ]
}

func serialize(historyListItem: HistoryListItemBindingDto) -> NSDictionary {
    var result = [
        "id": historyListItem.id,
        "createdDate": historyListItem.createdDate,
        "action": serializeEnumValue(value: historyListItem.action),
        "entityType": serializeEnumValue(value: historyListItem.entityType),
        "organisationId": historyListItem.organisationId,
    ]
    result.addOpt("entityId", historyListItem.entityId)
    result.addOpt("metadata", opt(historyListItem.metadata, {data in serialize(historyMetadata: data)}))
    return result as NSDictionary
}

func serialize(historyMetadata: HistoryMetadataBinding) -> NSDictionary {
    switch (historyMetadata) {
    case let .unexportableEntities(value):
        return serialize(unexportableEntities: value);
    }
}

func serialize(keyListItem: KeyListItemBindingDto) -> NSDictionary {
    return [
        "id": keyListItem.id,
        "createdDate": keyListItem.createdDate,
        "lastModified": keyListItem.lastModified,
        "name": keyListItem.name,
        "publicKey": keyListItem.publicKey,
        "storageType": keyListItem.storageType,
        "keyType": keyListItem.keyType,
    ]
}

func serialize(didListItem: DidListItemBindingDto) -> NSDictionary {
    return [
        "id": didListItem.id,
        "createdDate": didListItem.createdDate,
        "lastModified": didListItem.lastModified,
        "name": didListItem.name,
        "did": didListItem.did,
        "didType": serializeEnumValue(value: didListItem.didType),
        "didMethod": didListItem.didMethod,
        "deactivated": didListItem.deactivated,
    ]
}

func serialize(unexportableEntities: UnexportableEntitiesBindingDto) -> NSDictionary {
    return [
        "credentials": unexportableEntities.credentials.map { serialize(credentialDetail: $0) },
        "keys": unexportableEntities.keys.map { serialize(keyListItem: $0) },
        "dids": unexportableEntities.dids.map { serialize(didListItem: $0) },
        "totalCredentials": unexportableEntities.totalCredentials,
        "totalKeys": unexportableEntities.totalKeys,
        "totalDids": unexportableEntities.totalDids,
    ]
}

func serialize(backupCreate: BackupCreateBindingDto) -> NSDictionary {
    return [
        "historyId": backupCreate.historyId,
        "file": backupCreate.file,
        "unexportable": serialize(unexportableEntities: backupCreate.unexportable),
    ]
}

func serialize(importBackupMetadata: MetadataBindingDto) -> NSDictionary {
    return [
        "dbVersion": importBackupMetadata.dbVersion,
        "dbHash": importBackupMetadata.dbHash,
        "createdAt": importBackupMetadata.createdAt,
    ]
}

func serialize(invitationResponse: HandleInvitationResponseBindingEnum) -> NSDictionary {
    switch (invitationResponse) {
    case let .credentialIssuance(interactionId, credentialIds, txCode):
        var result: [String: Any] = [
            "interactionId": interactionId,
            "credentialIds": credentialIds
        ];
        
        result.addOpt("txCode", opt(txCode, { serialize(txCode: $0) }));        

        return result as NSDictionary;
        
    case let .proofRequest(interactionId, proofId):
        return [
            "interactionId": interactionId,
            "proofId": proofId
        ];
    }
}

func serialize(txCode: OpenId4vciTxCodeBindingDto) -> NSDictionary {
    var result: [String: Any] = [:];

    result.addOpt("inputMode", opt(txCode.inputMode, serializeEnumValue));
    result.addOpt("length", txCode.length);
    result.addOpt("description", txCode.description);
    
    return result as NSDictionary;
}

func serialize(shareProofResponse: ShareProofResponseBindingDto) -> NSDictionary {
    return [
        "url": shareProofResponse.url,
    ]
}

func serialize(proofSchemaShareResponse: ProofSchemaShareResponseBindingDto) -> NSDictionary {
    return [
        "url": proofSchemaShareResponse.url,
    ]
}

func serialize(credentialSchemaShareResponse: CredentialSchemaShareResponseBindingDto) -> NSDictionary {
    return [
        "url": credentialSchemaShareResponse.url,
    ]
}

func serialize(resolveJsonLdContextResponse: ResolveJsonLdContextResponseBindingDto) -> NSDictionary {
    return [
        "context": resolveJsonLdContextResponse.context,
    ]
}

func serialize(trustAnchor: GetTrustAnchorResponseBindingDto) -> NSDictionary {
    return [
        "id": trustAnchor.id,
        "createdDate": trustAnchor.createdDate,
        "lastModified": trustAnchor.lastModified,
        "name": trustAnchor.name,
        "type": trustAnchor.type,
        "isPublisher": trustAnchor.isPublisher,
        "publisherReference": trustAnchor.publisherReference,
    ]
}

func serialize(trustAnchorList: TrustAnchorsListBindingDto) -> NSDictionary {
    return [
        "totalItems": trustAnchorList.totalItems,
        "totalPages": trustAnchorList.totalPages,
        "values": trustAnchorList.values.map { serialize(trustAnchorListItem: $0) },
    ]
}

func serialize(trustEntityList: TrustEntitiesListBindingDto) -> NSDictionary {
    return [
        "totalItems": trustEntityList.totalItems,
        "totalPages": trustEntityList.totalPages,
        "values": trustEntityList.values.map { serialize(trustEntityListItem: $0) },
    ]
}

func serialize(trustAnchorListItem: TrustAnchorsListItemResponseBindingDto) -> NSDictionary {
    return [
        "id": trustAnchorListItem.id,
        "createdDate": trustAnchorListItem.createdDate,
        "lastModified": trustAnchorListItem.lastModified,
        "name": trustAnchorListItem.name,
        "type": trustAnchorListItem.type,
        "isPublisher": trustAnchorListItem.isPublisher,
        "publisherReference": trustAnchorListItem.publisherReference,
        "entities": trustAnchorListItem.entities,
    ]
}

func serialize(trustEntity: GetTrustEntityResponseBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": trustEntity.id,
        "organisationId": trustEntity.organisationId,
        "createdDate": trustEntity.createdDate,
        "lastModified": trustEntity.lastModified,
        "name": trustEntity.name,
        "role": serializeEnumValue(value: trustEntity.role),
        "trustAnchor": serialize(trustAnchor: trustEntity.trustAnchor),
        "did": serialize(didListItem: trustEntity.did),
        "state": serializeEnumValue(value: trustEntity.state),
    ]
    result.addOpt("logo", trustEntity.logo)
    result.addOpt("website", trustEntity.website)
    result.addOpt("termsUrl", trustEntity.termsUrl)
    result.addOpt("privacyUrl", trustEntity.privacyUrl)
    return result as NSDictionary
}

func serialize(trustEntityListItem: TrustEntitiesListItemResponseBindingDto) -> NSDictionary {
    var result: [String: Any] = [
        "id": trustEntityListItem.id,
        "createdDate": trustEntityListItem.createdDate,
        "lastModified": trustEntityListItem.lastModified,
        "name": trustEntityListItem.name,
        "role": serializeEnumValue(value: trustEntityListItem.role),
        "trustAnchor": serialize(trustAnchor: trustEntityListItem.trustAnchor),
        "did": serialize(didListItem: trustEntityListItem.did),
        "state": serializeEnumValue(value: trustEntityListItem.state),
    ]
    result.addOpt("logo", trustEntityListItem.logo)
    result.addOpt("website", trustEntityListItem.website)
    result.addOpt("termsUrl", trustEntityListItem.termsUrl)
    result.addOpt("privacyUrl", trustEntityListItem.privacyUrl)
    return result as NSDictionary
}
