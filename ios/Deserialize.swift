//
//  Deserialize.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation
import ProcivisOneCore

private func enumList<T: CaseIterable>(_ entries: NSArray) throws -> [T] {
  var result: [T] = []
  try entries.forEach { entry in
    result.append(try deserializeEnum(try safeCast(entry)))
  }
  return result
}

private func deserializeEnum<T: CaseIterable>(_ input: String) throws -> T {
  if let entry = T.allCases.first(where: { value in
    serializeEnumValue(value: value) == input
  }) {
    return entry
  } else {
    let description = "Invalid enum value for \(T.self): \(input)"
    throw DecodingError.typeMismatch(
      T.self,
      DecodingError.Context(codingPath: [], debugDescription: description)
    )
  }
}

private func opt<F, T>(
  _ input: F?,
  _ deserializeFn: @escaping (_ input: F) throws -> T
) throws
  -> T?
{
  if input != nil {
    return try deserializeFn(input!)
  }
  return nil
}

private func safeCast<T>(_ input: Any?) throws -> T {
  if let result = input as? T {
    return result
  } else {
    let description =
      "Invalid input for type \(T.self): \(String(describing: input))"
    throw DecodingError.typeMismatch(
      T.self,
      DecodingError.Context(codingPath: [], debugDescription: description)
    )
  }
}

func deserialize<T: Decodable>(_ value: Any) throws -> T {
  let decoder = RNDecoder()
  decoder.userInfo[customDecoderKey] = deserializeSpecific as CustomDecoder
  return try decoder.decode(value)
}

func deserializeOpt<T: Decodable>(_ value: Any?) throws -> T? {
  if value == nil {
    return nil
  }

  return try deserialize(value!)
}

private func deserializeSpecific(
  _ value: Any,
  _ type: Any.Type,
  _ codingPath: [CodingKey]
) throws
  -> Any?
{
  if type == OptionalString.self {
    if value is NSNull {
      return OptionalString.none
    }

    guard let data = value as? String else {
      let description =
        "Expected to decode \(type) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        type,
        DecodingError.Context(
          codingPath: codingPath,
          debugDescription: description
        )
      )
    }
    return OptionalString.some(value: data)
  }

  return nil
}

func deserializeHandleInvitationRequest(_ request: NSDictionary) throws
  -> HandleInvitationRequest
{
  let data = try deserializeHandleInvitationRequestData(
    request["data"] as? NSDictionary
  )
  guard let organisationId = request["organisationId"] as? String else {
    throw DecodingError.typeMismatch(
      HandleInvitationRequest.self,
      DecodingError.Context(
        codingPath: [],
        debugDescription: "missing organisationId"
      )
    )
  }
  return HandleInvitationRequest(
    data: data,
    organisationId: organisationId,
    transport: try deserializeOpt(request["transport"]),
    redirectUri: try deserializeOpt(request["redirectUri"]),
    ecosystem: try deserializeOpt(request["ecosystem"])
  )
}

func deserializeHandleInvitationRequestData(_ data: NSDictionary?) throws
  -> HandleInvitationRequestData
{
  guard let data = data,
    let enum_type = data["type_"] as? String,
    enum_type == "URL",
    let url = data["url"] as? String
  else {
    throw DecodingError.typeMismatch(
      HandleInvitationRequestData.self,
      DecodingError.Context(
        codingPath: [],
        debugDescription: "Invalid HandleInvitationRequestData"
      )
    )
  }
  return HandleInvitationRequestData.url(url: url)
}
