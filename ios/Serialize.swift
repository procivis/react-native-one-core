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
    case let data as CredentialSchemaTypeBindingEnum:
        return serialize(credentialSchemaType: data)
    case let data as ClaimValueBindingDto:
        return try serialize(claimValue: data)
    case let data as ProofRequestClaimValueBindingDto:
        return try serialize(proofRequestClaimValue: data)
    case let data as HandleInvitationResponseBindingEnum:
        return try serialize(invitationResponse: data)
    case let data as CredentialQueryResponseBindingDto:
        return try serialize(credentialQuery: data)
    case let data as PresentationDefinitionV2ClaimValueBindingDto:
        return try serialize(presentationDefinitionV2ClaimValue: data)

    default:
        return nil
    }
}

private func serialize(historyMetadata: HistoryMetadataBinding) throws -> Any {
    switch (historyMetadata) {
    case let .unexportableEntities(value):
        return try serializeAny(value);
    case let .errorMetadata(value):
        return try serializeAny(value);
    case let .walletUnitJwt(value):
        return ["jwt": value] as NSDictionary;
    }
}

private func serialize(credentialSchemaType: CredentialSchemaTypeBindingEnum) -> String {
    switch (credentialSchemaType) {
    case .procivisOneSchema2024:
        return "PROCIVIS_ONE_SCHEMA2024";
    case .fallbackSchema2024:
        return "FALLBACK_SCHEMA2024";
    case .mdoc:
        return "MDOC";
    case .sdJwtVc:
        return "SD_JWT_VC";
    case let .other(value):
        return value;
    }
}

private func serialize(claimValue: ClaimValueBindingDto) throws -> Any {
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
        return try values.map { try serializeAny($0) }
    }
}

private func serialize(proofRequestClaimValue: ProofRequestClaimValueBindingDto) throws -> Any {
    switch (proofRequestClaimValue) {
    case let .value(value):
        return value;
    case .claims(value: let values):
        return try values.map { try serializeAny($0)}
    }
}

private func serialize(invitationResponse: HandleInvitationResponseBindingEnum) throws -> NSDictionary {
    switch (invitationResponse) {
    case let .credentialIssuance(interactionId, keyStorageSecurity, txCode):
        var result: [String: Any] = [
            "interactionId": interactionId
        ];
        if let keyStorageSecurity = keyStorageSecurity {
          result["keyStorageSecurity"] = serializeEnumValue(value: keyStorageSecurity)
        }
        if let txCode = txCode {
            result["txCode"] = try serializeAny(txCode)
        }
        return result as NSDictionary;

    case let .proofRequest(interactionId, proofId):
        return [
            "interactionId": interactionId,
            "proofId": proofId
        ];

    case let .authorizationCodeFlow(interactionId, authorizationCodeFlowUrl):
        return [
            "interactionId": interactionId,
            "authorizationCodeFlowUrl": authorizationCodeFlowUrl
        ];
    }
}

private func serialize(credentialQuery: CredentialQueryResponseBindingDto) throws -> Any {
    var result: [String: Any] = ["multiple": credentialQuery.multiple]
    switch (credentialQuery.credentialOrFailureHint) {
    case let .applicableCredentials(applicableCredentials: value):
        result["applicableCredentials"] = try serializeAny(value);
    case let .failureHint(failureHint: value):
        result["failureHint"] = try serializeAny(value);
    }
    return result as NSDictionary;
}

private func serialize(presentationDefinitionV2ClaimValue: PresentationDefinitionV2ClaimValueBindingDto) throws -> Any {
    switch (presentationDefinitionV2ClaimValue) {
    case let .boolean(value):
        return value;
    case let .float(value):
        return value;
    case let .integer(value):
        return NSNumber(value: value);
    case let .string(value):
        return value;
    case .nested(value: let values):
        return try values.map { try serializeAny($0) }
    }
}
