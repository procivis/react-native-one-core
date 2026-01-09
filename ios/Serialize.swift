//
//  Serialize.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation
import ProcivisOneCore

func serializeAny<T: Encodable>(_ value: T) throws -> Any {
    let encoder = RNEncoder()
    encoder.userInfo[customEncoderKey] = serializeSpecific as CustomEncoder
    return try encoder.encode(value)
}

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

private func serializeSpecific(_ value: Encodable) throws -> Any? {
    switch value {
    case let data as HistoryMetadataBinding:
        return try serialize(historyMetadata: data)
    case let data as ClaimValueBindingDto:
        return try serialize(claimValue: data)
    case let data as ProofRequestClaimValueBindingDto:
        return try serialize(proofRequestClaimValue: data)
    case let data as HandleInvitationResponseBindingEnum:
        return try serialize(invitationResponse: data)
    case let data as ApplicableCredentialOrFailureHintBindingEnum:
        return try serialize(applicableCredentialQuery: data)
    case let data as PresentationDefinitionV2ClaimValueBindingDto:
        return try serialize(presentationDefinitionV2ClaimValue: data)

    default:
        return nil
    }
}

private func serialize(historyMetadata: HistoryMetadataBinding) throws -> NSDictionary {
    switch (historyMetadata) {
    case let .unexportableEntities(value):
        return [
            "type_": "UNEXPORTABLE_ENTITIES",
            "value": try serializeAny(value)
        ];
    case let .errorMetadata(value):
        return [
            "type_": "ERROR_METADATA",
            "value": try serializeAny(value)
        ];
    case let .walletUnitJwt(value):
        return [
            "type_": "WALLET_UNIT_JWT",
            "value": [value]
        ];
    }
}

private func serialize(claimValue: ClaimValueBindingDto) throws -> NSDictionary {
    switch (claimValue) {
    case let .boolean(value):
        return [
            "type_": "BOOLEAN",
            "value": value
        ];
    case let .float(value):
        return [
            "type_": "FLOAT",
            "value": value
        ];
    case let .integer(value):
        return [
            "type_": "INTEGER",
            "value": NSNumber(value: value)
        ];
    case let .string(value):
        return [
            "type_": "STRING",
            "value": value
        ];
    case .nested(value: let values):
        return [
            "type_": "NESTED",
            "value": try values.map { try serializeAny($0) }
        ];
    }
}

private func serialize(proofRequestClaimValue: ProofRequestClaimValueBindingDto) throws -> NSDictionary {
    switch (proofRequestClaimValue) {
    case let .value(value):
        return [
            "type_": "VALUE",
            "value": value
        ];
    case .claims(value: let values):
        return [
            "type_": "CLAIMS",
            "value": try values.map { try serializeAny($0)}
        ];
    }
}

private func serialize(invitationResponse: HandleInvitationResponseBindingEnum) throws -> NSDictionary {
    switch (invitationResponse) {
    case let .credentialIssuance(interactionId, keyStorageSecurityLevels, keyAlgorithms, txCode):
        var result: [String: Any] = [
            "type_": "CREDENTIAL_ISSUANCE",
            "interactionId": interactionId
        ];
        if let keyStorageSecurityLevels = keyStorageSecurityLevels {
            result["keyStorageSecurityLevels"] = keyStorageSecurityLevels.map { serializeEnumValue(value: $0) }
        }
        if let keyAlgorithms = keyAlgorithms {
            result["keyAlgorithms"] = try serializeAny(keyAlgorithms)
        }
        if let txCode = txCode {
            result["txCode"] = try serializeAny(txCode)
        }
        return result as NSDictionary;

    case let .proofRequest(interactionId, proofId):
        return [
            "type_": "PROOF_REQUEST",
            "interactionId": interactionId,
            "proofId": proofId
        ];

    case let .authorizationCodeFlow(interactionId, authorizationCodeFlowUrl):
        return [
            "type_": "AUTHORIZATION_CODE_FLOW",
            "interactionId": interactionId,
            "authorizationCodeFlowUrl": authorizationCodeFlowUrl
        ];
    }
}

private func serialize(applicableCredentialQuery: ApplicableCredentialOrFailureHintBindingEnum) throws -> NSDictionary {
    switch (applicableCredentialQuery) {
    case let .applicableCredentials(applicableCredentials: value):
        return [
            "type_": "APPLICABLE_CREDENTIALS",
            "applicableCredentials": try serializeAny(value)
        ];

    case let .failureHint(failureHint: value):
        return [
            "type_": "FAILURE_HINT",
            "failureHint": try serializeAny(value)
        ];
    }
}

private func serialize(presentationDefinitionV2ClaimValue: PresentationDefinitionV2ClaimValueBindingDto) throws -> NSDictionary {
    switch (presentationDefinitionV2ClaimValue) {
    case let .boolean(value):
        return [
            "type_": "BOOLEAN",
            "value": value
        ];
    case let .float(value):
        return [
            "type_": "FLOAT",
            "value": value
        ];
    case let .integer(value):
        return [
            "type_": "INTEGER",
            "value": NSNumber(value: value)
        ];
    case let .string(value):
        return [
            "type_": "STRING",
            "value": value
        ];
    case .nested(value: let values):
        return [
            "type_": "NESTED",
            "value": try values.map { try serializeAny($0) }
        ];
    }
}
