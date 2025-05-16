import Foundation

internal class RNKeyedDecodingContainer<Key: CodingKey> {
  private let decoder: RNInternalDecoder
  private let container: [String: Any]
  private(set) public var codingPath: [CodingKey]

  internal init(referencing decoder: RNInternalDecoder, wrapping container: [String: Any]) {
    self.decoder = decoder
    self.container = container
    self.codingPath = decoder.codingPath
  }
}

extension RNKeyedDecodingContainer: KeyedDecodingContainerProtocol {
  public var allKeys: [Key] {
    return self.container.keys.compactMap { Key(stringValue: $0) }
  }

  public func contains(_ key: Key) -> Bool {
    return self.container[key.stringValue] != nil
  }

  public func decodeNil(forKey key: Key) throws -> Bool {
    return !self.contains(key)
  }

  private func _errorDescription(of key: CodingKey) -> String {
    return "\(key) (\"\(key.stringValue)\")"
  }

  func decode<T: Decodable>(_ type: T.Type, forKey key: Key) throws -> T {
    guard let entry = self.container[key.stringValue] else {
      throw DecodingError.keyNotFound(
        key,
        DecodingError.Context(
          codingPath: self.decoder.codingPath,
          debugDescription: "No value associated with key \(_errorDescription(of: key))."
        )
      )
    }

    self.decoder.codingPath.append(key)
    defer { self.decoder.codingPath.removeLast() }

    guard let value = try self.decoder.unbox(entry, as: type) else {
      throw DecodingError.valueNotFound(
        type,
        DecodingError.Context(
          codingPath: self.decoder.codingPath,
          debugDescription: "Expected \(type) value but found null instead."
        )
      )
    }

    return value
  }

  func nestedContainer<NestedKey>(keyedBy type: NestedKey.Type, forKey key: Key) throws
    -> KeyedDecodingContainer<NestedKey> where NestedKey: CodingKey
  {
    self.decoder.codingPath.append(key)
    defer { self.decoder.codingPath.removeLast() }

    guard let value = self.container[key.stringValue] else {
      throw DecodingError.keyNotFound(
        key,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription:
            "Cannot get \(KeyedDecodingContainer<NestedKey>.self) -- no value found for key \"\(key.stringValue)\""
        )
      )
    }

    guard let dictionary = value as? [String: Any] else {
      let description = "Expected to decode \([String : Any].self) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        [String: Any].self,
        DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
      )
    }

    let container = RNKeyedDecodingContainer<NestedKey>(
      referencing: self.decoder,
      wrapping: dictionary
    )
    return KeyedDecodingContainer(container)
  }

  func nestedUnkeyedContainer(forKey key: Key) throws -> any UnkeyedDecodingContainer {
    self.decoder.codingPath.append(key)
    defer { self.decoder.codingPath.removeLast() }

    guard let value = self.container[key.stringValue] else {
      throw DecodingError.keyNotFound(
        key,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription:
            "Cannot get UnkeyedDecodingContainer -- no value found for key \"\(key.stringValue)\""
        )
      )
    }

    guard let array = value as? [Any] else {
      let description = "Expected to decode \([Any].self) but found '\(value)' instead."
      throw DecodingError.typeMismatch(
        [Any].self,
        DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
      )
    }

    return RNUnkeyedDecodingContainer(referencing: self.decoder, wrapping: array)
  }

  private func _superDecoder(forKey key: CodingKey) throws -> Decoder {
    let value: Any = self.container[key.stringValue] ?? NSNull()
    return RNInternalDecoder(
      referencing: value,
      at: self.decoder.codingPath + [key],
      userInfo: self.decoder.userInfo
    )
  }

  public func superDecoder() throws -> Decoder {
    fatalError("Unimplemented")
  }

  public func superDecoder(forKey key: Key) throws -> Decoder {
    return try _superDecoder(forKey: key)
  }
}
