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

func serialize(credentialSchema: CredentialSchemaBindingDto) -> NSDictionary {
    return [
        "id": credentialSchema.id,
        "createdDate": credentialSchema.createdDate,
        "lastModified": credentialSchema.lastModified,
        "name": credentialSchema.name,
        "format": credentialSchema.format,
        "revocationMethod": credentialSchema.revocationMethod,
    ]
}

func serialize(claim: ClaimBindingDto) -> NSDictionary {
    return [
        "id": claim.id,
        "key": claim.key,
        "dataType": claim.dataType,
        "value": claim.value,
    ]
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
    ]
}

func serialize(credentialList: CredentialListBindingDto) -> NSDictionary {
    return [
        "totalItems": credentialList.totalItems,
        "totalPages": credentialList.totalPages,
        "values": credentialList.values.map { serialize(credentialListItem: $0) },
    ]
}

func serialize(proofRequest: ProofRequestBindingDto) -> NSDictionary {
    return [
        "id": proofRequest.id,
        "createdDate": proofRequest.createdDate,
        "lastModified": proofRequest.lastModified,
        "claims": proofRequest.claims.map { serialize(proofRequestClaim: $0) },
        "verifierDid": proofRequest.verifierDid,
        "transport": proofRequest.transport,
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
