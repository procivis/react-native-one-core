import Foundation

internal class RNUnkeyedDecodingContainer {
  private let decoder: RNInternalDecoder
  private let container: [Any]
  private(set) public var codingPath: [CodingKey]
  private(set) public var currentIndex: Int

  internal init(referencing decoder: RNInternalDecoder, wrapping container: [Any]) {
    self.decoder = decoder
    self.container = container
    self.codingPath = decoder.codingPath
    self.currentIndex = 0
  }
}

extension RNUnkeyedDecodingContainer: UnkeyedDecodingContainer {
  var count: Int? {
    return self.container.count
  }

  var isAtEnd: Bool {
    return self.currentIndex >= self.container.count
  }

  func decodeNil() throws -> Bool {
    guard !self.isAtEnd else {
      throw DecodingError.valueNotFound(
        Any?.self,
        DecodingError.Context(
          codingPath: self.decoder.codingPath + [RNAnyCodingKey(intValue: self.currentIndex)],
          debugDescription: "Unkeyed container is at end."
        )
      )
    }

    if self.container[self.currentIndex] is NSNull {
      self.currentIndex += 1
      return true
    } else {
      return false
    }
  }

  func decode<T: Decodable>(_ type: T.Type) throws -> T {
    guard !self.isAtEnd else {
      throw DecodingError.valueNotFound(
        type,
        DecodingError.Context(
          codingPath: self.decoder.codingPath + [RNAnyCodingKey(intValue: self.currentIndex)],
          debugDescription: "Unkeyed container is at end."
        )
      )
    }

    self.decoder.codingPath.append(RNAnyCodingKey(intValue: self.currentIndex))
    defer { self.decoder.codingPath.removeLast() }

    guard let decoded = try self.decoder.unbox(self.container[self.currentIndex], as: type) else {
      throw DecodingError.valueNotFound(
        type,
        DecodingError.Context(
          codingPath: self.decoder.codingPath + [RNAnyCodingKey(intValue: self.currentIndex)],
          debugDescription: "Expected \(type) but found null instead."
        )
      )
    }

    self.currentIndex += 1
    return decoded
  }

  func nestedContainer<NestedKey>(keyedBy type: NestedKey.Type) throws -> KeyedDecodingContainer<
    NestedKey
  > where NestedKey: CodingKey {
    self.decoder.codingPath.append(RNAnyCodingKey(intValue: self.currentIndex))
    defer { self.decoder.codingPath.removeLast() }

    guard !self.isAtEnd else {
      throw DecodingError.valueNotFound(
        KeyedDecodingContainer<NestedKey>.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get nested keyed container -- unkeyed container is at end."
        )
      )
    }

    let value = self.container[self.currentIndex]
    guard !(value is NSNull) else {
      throw DecodingError.valueNotFound(
        KeyedDecodingContainer<NestedKey>.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get keyed decoding container -- found null value instead."
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

    self.currentIndex += 1
    let container = RNKeyedDecodingContainer<NestedKey>(
      referencing: self.decoder,
      wrapping: dictionary
    )
    return KeyedDecodingContainer(container)
  }

  func nestedUnkeyedContainer() throws -> any UnkeyedDecodingContainer {
    self.decoder.codingPath.append(RNAnyCodingKey(intValue: self.currentIndex))
    defer { self.decoder.codingPath.removeLast() }

    guard !self.isAtEnd else {
      throw DecodingError.valueNotFound(
        UnkeyedDecodingContainer.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get nested keyed container -- unkeyed container is at end."
        )
      )
    }

    let value = self.container[self.currentIndex]
    guard !(value is NSNull) else {
      throw DecodingError.valueNotFound(
        UnkeyedDecodingContainer.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get keyed decoding container -- found null value instead."
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

    self.currentIndex += 1
    return RNUnkeyedDecodingContainer(referencing: self.decoder, wrapping: array)
  }

  func superDecoder() throws -> any Decoder {
    self.decoder.codingPath.append(RNAnyCodingKey(intValue: self.currentIndex))
    defer { self.decoder.codingPath.removeLast() }

    guard !self.isAtEnd else {
      throw DecodingError.valueNotFound(
        Decoder.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get superDecoder() -- unkeyed container is at end."
        )
      )
    }

    let value = self.container[self.currentIndex]
    self.currentIndex += 1
    return RNInternalDecoder(
      referencing: value,
      at: self.decoder.codingPath,
      userInfo: self.decoder.userInfo
    )
  }
}
