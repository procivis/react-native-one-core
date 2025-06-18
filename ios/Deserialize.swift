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

private func opt<F, T>(_ input: F?, _ deserializeFn: @escaping (_ input: F) throws -> T) throws
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
    let description = "Invalid input for type \(T.self): \(String(describing: input))"
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

private func deserializeSpecific(_ value: Any, _ type: Any.Type, _ codingPath: [CodingKey]) throws
  -> Any?
{
  if type == CredentialSchemaTypeBindingEnum.self {
    guard let data = value as? String else {
      let description = "Expected to decode \(type) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        type,
        DecodingError.Context(codingPath: codingPath, debugDescription: description)
      )
    }
    return deserializeCredentialSchemaTypeBindingEnum(data)
  }

  if type == HistoryListQueryBindingDto.self {
    guard let data = value as? NSDictionary else {
      let description = "Expected to decode \(type) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        type,
        DecodingError.Context(codingPath: codingPath, debugDescription: description)
      )
    }
    return try deserializeHistoryListQuery(data)
  }

  if type == OptionalString.self {
    if value is NSNull {
      return OptionalString.none
    }

    guard let data = value as? String else {
      let description = "Expected to decode \(type) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        type,
        DecodingError.Context(codingPath: codingPath, debugDescription: description)
      )
    }
    return OptionalString.some(value: data)
  }

  return nil
}

private func deserializeCredentialSchemaTypeBindingEnum(_ credentialSchemaType: String)
  -> CredentialSchemaTypeBindingEnum
{
  switch credentialSchemaType {
  case "PROCIVIS_ONE_SCHEMA2024":
    return .procivisOneSchema2024
  case "FALLBACK_SCHEMA2024":
    return .fallbackSchema2024
  case "MDOC":
    return .mdoc
  case "SD_JWT_VC":
    return .sdJwtVc
  case let other:
    return .other(value: other)
  }
}

private func deserializeHistoryListQuery(_ query: NSDictionary) throws -> HistoryListQueryBindingDto
{
  return HistoryListQueryBindingDto(
    page: try safeCast(query.value(forKey: "page")),
    pageSize: try safeCast(query.value(forKey: "pageSize")),
    organisationId: try safeCast(query.value(forKey: "organisationId")),
    entityId: query.value(forKey: "entityId") as? String,
    entityTypes: try opt(query.value(forKey: "entityTypes") as? NSArray, enumList),
    actions: try opt(query.value(forKey: "actions") as? NSArray, enumList),
    createdDateFrom: query.value(forKey: "createdDateFrom") as? String,
    createdDateTo: query.value(forKey: "createdDateTo") as? String,
    identifierId: query.value(forKey: "identifierId") as? String,
    credentialId: query.value(forKey: "credentialId") as? String,
    credentialSchemaId: query.value(forKey: "credentialSchemaId") as? String,
    proofSchemaId: query.value(forKey: "proofSchemaId") as? String,
    search: try deserializeHistorySearch(
      text: query.value(forKey: "searchText") as? String,
      type: query.value(forKey: "searchType") as? String
    )
  )
}

private func deserializeHistorySearch(text: String?, type: String?) throws
  -> HistorySearchBindingDto?
{
  if text == nil {
    return nil
  }

  return HistorySearchBindingDto(
    text: text!,
    type: try opt(type, deserializeEnum)
  )
}
