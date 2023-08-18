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
func serialize(version: Version) -> NSDictionary {
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

func serialize(credentialSchema: CredentialSchema) -> NSDictionary {
    return [
        "id": credentialSchema.id,
        "createdDate": credentialSchema.createdDate,
        "lastModified": credentialSchema.lastModified,
        "name": credentialSchema.name,
        "organisationId": credentialSchema.organisationId,
        "format": serializeEnumValue(value: credentialSchema.format),
        "revocationMethod": serializeEnumValue(value: credentialSchema.revocationMethod),
    ]
}

func serialize(claim: Claim) -> NSDictionary {
    return [
        "id": claim.id,
        "key": claim.key,
        "dataType": claim.dataType,
        "value": claim.value,
    ]
}

func serialize(credential: Credential) -> NSDictionary {
    return [
        "id": credential.id,
        "createdDate": credential.createdDate,
        "issuanceDate": credential.issuanceDate,
        "lastModified": credential.lastModified,
        "issuerDid": credential.issuerDid,
        "state": serializeEnumValue(value: credential.state),
        "claims": credential.claims.map { serialize(claim: $0) },
        "schema": serialize(credentialSchema: credential.schema),
    ]
}

func serialize(proofRequestClaim: ProofRequestClaim) -> NSDictionary {
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
