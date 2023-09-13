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

func serialize(proofRequestClaim: ProofRequestClaimBindingDto) -> NSDictionary {
    return [
        "id": proofRequestClaim.id,
        "createdDate": proofRequestClaim.createdDate,
        "lastModified": proofRequestClaim.lastModified,
        "key": proofRequestClaim.key,
        "dataType": proofRequestClaim.dataType,
        "required": proofRequestClaim.required,
        "credentialSchema": serialize(credentialSchema: proofRequestClaim.credentialSchema),
    ]
}
