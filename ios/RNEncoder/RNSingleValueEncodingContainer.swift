import Foundation

final class RNSingleValueEncodingContainer {
  private var storage: Any? = nil

  fileprivate var canEncodeNewValue = true
  fileprivate func checkCanEncode(value: Any?) throws {
    guard self.canEncodeNewValue else {
      let context = EncodingError.Context(
        codingPath: self.codingPath,
        debugDescription:
          "Attempt to encode value through single value container when previously value already encoded."
      )
      throw EncodingError.invalidValue(value as Any, context)
    }
  }

  var codingPath: [CodingKey]
  var userInfo: [CodingUserInfoKey: Any]

  init(codingPath: [CodingKey], userInfo: [CodingUserInfoKey: Any]) {
    self.codingPath = codingPath
    self.userInfo = userInfo
  }
}

extension RNSingleValueEncodingContainer: SingleValueEncodingContainer {
  func encodeNil() throws {
    try checkCanEncode(value: nil)
    defer { self.canEncodeNewValue = false }

    self.storage = nil
  }

  func encode<T>(_ value: T) throws where T: Encodable {
    try checkCanEncode(value: value)
    defer { self.canEncodeNewValue = false }
    self.storage = try encodeSingle(value)
  }

  private func encodeSingle<T>(_ value: T) throws -> Any where T: Encodable {
    if let customEncoder = self.userInfo[customEncoderKey] {
      if let result = try (customEncoder as! CustomEncoder)(value) {
        return result
      }
    }

    switch value {
    case let data as String:
      return data
    case let data as Double:
      return data
    case let data as Float:
      return Double(data)
    case let data as Bool:
      return data
    case let data as any BinaryInteger:
      return data
    case let data as any CaseIterable:
      return serializeEnumValue(value: data)
    case let data as [any Encodable]:
      return try data.map { try encodeSingle($0) }
    default:
      break
    }

    // Object
    let encoder = RNObjectEncoder(userInfo: self.userInfo)
    try value.encode(to: encoder)
    return encoder.data
  }
}

extension RNSingleValueEncodingContainer: RNEncodingContainer {
  var data: Any? {
    return storage
  }
}
