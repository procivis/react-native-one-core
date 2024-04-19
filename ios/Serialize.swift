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
    ]
}

func serialize(credentialSchema: CredentialSchemaBindingDto) -> NSDictionary {
    return [
        "id": credentialSchema.id,
        "createdDate": credentialSchema.createdDate,
        "lastModified": credentialSchema.lastModified,
        "name": credentialSchema.name,
        "format": credentialSchema.format,
        "revocationMethod": credentialSchema.revocationMethod,
        "walletStorageType": opt(credentialSchema.walletStorageType, serializeEnumValue),
        "schemaId": credentialSchema.schemaId,
        "schemaType": opt(credentialSchema.schemaType, serializeEnumValue),
        "layoutType": opt(credentialSchema.layoutType, serializeEnumValue),
        "layoutProperties": opt(credentialSchema.layoutProperties, {properties in serialize(layoutProperties: properties)}),
    ]
}

func serialize(layoutProperties: CredentialSchemaLayoutPropertiesBindingDto) -> NSDictionary {
    return [
        "background": opt(layoutProperties.background, {background in serialize(backgroundProperties: background)}),
        "logo": opt(layoutProperties.logo, {logo in serialize(logoProperties: logo)}),
        "primaryAttribute": layoutProperties.primaryAttribute,
        "secondaryAttribute": layoutProperties.secondaryAttribute,
        "pictureAttribute": layoutProperties.pictureAttribute,
        "code": opt(layoutProperties.code, {code in serialize(codeProperties: code)}),
    ]
}

func serialize(backgroundProperties: CredentialSchemaBackgroundPropertiesBindingDto) -> NSDictionary {
    return [
        "color": backgroundProperties.color,
        "image": backgroundProperties.image,
    ]
}

func serialize(logoProperties: CredentialSchemaLogoPropertiesBindingDto) -> NSDictionary {
    return [
        "fontColor": logoProperties.fontColor,
        "backgroundColor": logoProperties.backgroundColor,
        "image": logoProperties.image,
    ]
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
        "value": serialize(claimValue: claim.value),
    ]
}

func serialize(claimValue: ClaimValueBindingDto) -> Any {
    switch (claimValue) {
    case let .value(value):
        return value;
    case .nested(value: let values):
        return values.map { serialize(claim: $0) }
    }
}

func serialize(credentialListItem: CredentialListItemBindingDto) -> NSDictionary {
    return [
        "id": credentialListItem.id,
        "createdDate": credentialListItem.createdDate,
        "issuanceDate": credentialListItem.issuanceDate,
        "lastModified": credentialListItem.lastModified,
        "revocationDate": credentialListItem.revocationDate,
        "issuerDid": credentialListItem.issuerDid,
        "state": serializeEnumValue(value: credentialListItem.state),
        "schema": serialize(credentialSchema: credentialListItem.schema),
        "role": serializeEnumValue(value: credentialListItem.role),
        "suspendEndDate": credentialListItem.suspendEndDate,
    ]
}

func serialize(credentialDetail: CredentialDetailBindingDto) -> NSDictionary {
    return [
        "id": credentialDetail.id,
        "createdDate": credentialDetail.createdDate,
        "issuanceDate": credentialDetail.issuanceDate,
        "lastModified": credentialDetail.lastModified,
        "revocationDate": credentialDetail.revocationDate,
        "issuerDid": credentialDetail.issuerDid,
        "state": serializeEnumValue(value: credentialDetail.state),
        "claims": credentialDetail.claims.map { serialize(claim: $0) },
        "schema": serialize(credentialSchema: credentialDetail.schema),
        "redirectUri": credentialDetail.redirectUri,
        "role": serializeEnumValue(value: credentialDetail.role),
        "lvvcIssuanceDate": credentialDetail.lvvcIssuanceDate,
        "suspendEndDate": credentialDetail.suspendEndDate,
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

func serialize(proofRequest: ProofRequestBindingDto) -> NSDictionary {
    return [
        "id": proofRequest.id,
        "createdDate": proofRequest.createdDate,
        "lastModified": proofRequest.lastModified,
        "claims": proofRequest.claims.map { serialize(proofRequestClaim: $0) },
        "credentials": proofRequest.credentials.map { serialize(credentialDetail: $0) },
        "verifierDid": proofRequest.verifierDid,
        "transport": proofRequest.transport,
        "redirectUri": proofRequest.redirectUri,
    ]
}

func serialize(proofRequestClaim: ProofRequestClaimBindingDto) -> NSDictionary {
    return [
        "id": proofRequestClaim.id,
        "key": proofRequestClaim.key,
        "dataType": proofRequestClaim.dataType,
        "required": proofRequestClaim.required,
        "credentialSchema": serialize(credentialSchema: proofRequestClaim.credentialSchema),
    ]
}

func serialize(presentationDefinition: PresentationDefinitionBindingDto) -> NSDictionary {
    return [
        "requestGroups": presentationDefinition.requestGroups.map { serialize(presentationDefinitionRequestGroup: $0) },
    ]
}

func serialize(presentationDefinitionRequestGroup: PresentationDefinitionRequestGroupBindingDto) -> NSDictionary {
    return [
        "id": presentationDefinitionRequestGroup.id,
        "name": presentationDefinitionRequestGroup.name,
        "purpose": presentationDefinitionRequestGroup.purpose,
        "rule": serialize(presentationDefinitionRule: presentationDefinitionRequestGroup.rule),
        "requestedCredentials": presentationDefinitionRequestGroup.requestedCredentials.map { serialize(presentationDefinitionRequestedCredential: $0) },
    ]
}

func serialize(presentationDefinitionRequestedCredential: PresentationDefinitionRequestedCredentialBindingDto) -> NSDictionary {
    return [
        "id": presentationDefinitionRequestedCredential.id,
        "name": presentationDefinitionRequestedCredential.name,
        "purpose": presentationDefinitionRequestedCredential.purpose,
        "fields": presentationDefinitionRequestedCredential.fields.map { serialize(presentationDefinitionField: $0) },
        "applicableCredentials": presentationDefinitionRequestedCredential.applicableCredentials,
        "validityCredentialNbf": presentationDefinitionRequestedCredential.validityCredentialNbf,
    ]
}

func serialize(presentationDefinitionField: PresentationDefinitionFieldBindingDto) -> NSDictionary {
    return [
        "id": presentationDefinitionField.id,
        "name": presentationDefinitionField.name,
        "purpose": presentationDefinitionField.purpose,
        "required": presentationDefinitionField.required,
        "keyMap": presentationDefinitionField.keyMap,
    ]
}

func serialize(presentationDefinitionRule: PresentationDefinitionRuleBindingDto) -> NSDictionary {
    return [
        "type": serializeEnumValue(value: presentationDefinitionRule.type),
        "min": presentationDefinitionRule.min,
        "max": presentationDefinitionRule.max,
        "count": presentationDefinitionRule.count,
    ]
}

func serialize(credentialRevocationCheckResponse: CredentialRevocationCheckResponseBindingDto) -> NSDictionary {
    return [
        "credentialId": credentialRevocationCheckResponse.credentialId,
        "status": serializeEnumValue(value: credentialRevocationCheckResponse.status),
        "success": credentialRevocationCheckResponse.success,
        "reason": credentialRevocationCheckResponse.reason,
    ]
}

func serialize(historyList: HistoryListBindingDto) -> NSDictionary {
    return [
        "totalItems": historyList.totalItems,
        "totalPages": historyList.totalPages,
        "values": historyList.values.map { serialize(historyListItem: $0) },
    ]
}

func serialize(historyListItem: HistoryListItemBindingDto) -> NSDictionary {
    return [
        "id": historyListItem.id,
        "createdDate": historyListItem.createdDate,
        "action": serializeEnumValue(value: historyListItem.action),
        "entityId": historyListItem.entityId,
        "entityType": serializeEnumValue(value: historyListItem.entityType),
        "organisationId": historyListItem.organisationId,
        "metadata": (historyListItem.metadata == nil) ? nil : serialize(historyMetadata: historyListItem.metadata!),
    ]
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


