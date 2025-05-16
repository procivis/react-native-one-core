import Foundation

public typealias CustomDecoder = (_ value: Any, _ type: Any.Type, _ codingPath: [CodingKey]) throws
  -> Any?
public let customDecoderKey = CodingUserInfoKey(rawValue: "customDecoder")!

final public class RNDecoder {
  public init() {}

  public var userInfo: [CodingUserInfoKey: Any] = [:]

  public func decode<T: Decodable>(_ value: Any) throws -> T {
    return try decode(T.self, from: value)
  }

  public func decode<T: Decodable>(_ type: T.Type, from data: Any) throws -> T {
    let decoder = RNInternalDecoder(referencing: data, userInfo: self.userInfo)

    guard let value = try decoder.unbox(data, as: type) else {
      throw DecodingError.valueNotFound(
        type,
        DecodingError.Context(
          codingPath: [],
          debugDescription: "The given data did not contain a top-level value."
        )
      )
    }

    return value
  }
}

// MARK: - TopLevelDecoder

#if canImport(Combine)
  import Combine

  extension RNDecoder: TopLevelDecoder {
    public typealias Input = Any
  }
#endif

// MARK: -

class RNInternalDecoder {
  internal var storage: RNDecodingStorage
  internal let userInfo: [CodingUserInfoKey: Any]
  internal(set) public var codingPath: [CodingKey]

  internal init(
    referencing container: Any,
    at codingPath: [CodingKey] = [],
    userInfo: [CodingUserInfoKey: Any]
  ) {
    self.storage = RNDecodingStorage()
    self.storage.push(container: container)
    self.codingPath = codingPath
    self.userInfo = userInfo
  }
}

extension RNInternalDecoder: Decoder {
  func container<Key>(keyedBy type: Key.Type) throws -> KeyedDecodingContainer<Key>
  where Key: CodingKey {
    guard !(self.storage.topContainer is NSNull) else {
      throw DecodingError.valueNotFound(
        KeyedDecodingContainer<Key>.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get keyed decoding container -- found null value instead."
        )
      )
    }

    guard let topContainer = self.storage.topContainer as? [String: Any] else {
      let description =
        "Expected to decode \([String : Any].self) but found '\(self.storage.topContainer)' instead."
      throw DecodingError.typeMismatch(
        [String: Any].self,
        DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
      )
    }

    let container = RNKeyedDecodingContainer<Key>(referencing: self, wrapping: topContainer)
    return KeyedDecodingContainer(container)
  }

  func unkeyedContainer() throws -> any UnkeyedDecodingContainer {
    guard !(self.storage.topContainer is NSNull) else {
      throw DecodingError.valueNotFound(
        UnkeyedDecodingContainer.self,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Cannot get unkeyed decoding container -- found null value instead."
        )
      )
    }

    let topContainer: [Any]

    if let container = self.storage.topContainer as? [Any] {
      topContainer = container
    } else if let container = self.storage.topContainer as? [AnyHashable: Any] {
      topContainer = [container]
    } else {
      let description =
        "Expected to decode \([Any].self) but found '\(self.storage.topContainer)' instead."
      throw DecodingError.typeMismatch(
        [Any].self,
        DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
      )
    }

    return RNUnkeyedDecodingContainer(referencing: self, wrapping: topContainer)
  }

  public func singleValueContainer() throws -> SingleValueDecodingContainer {
    return self
  }
}

extension RNInternalDecoder: SingleValueDecodingContainer {
  private func expectNonNull<T>(_ type: T.Type) throws {
    guard !self.decodeNil() else {
      throw DecodingError.valueNotFound(
        type,
        DecodingError.Context(
          codingPath: self.codingPath,
          debugDescription: "Expected \(type) but found null value instead."
        )
      )
    }
  }

  public func decodeNil() -> Bool {
    return self.storage.topContainer is NSNull
  }

  public func decode<T: Decodable>(_ type: T.Type) throws -> T {
    try expectNonNull(type)
    return try self.unbox(self.storage.topContainer, as: type)!
  }
}

extension RNInternalDecoder {
  internal func unbox<T: Decodable>(_ value: Any, as type: T.Type) throws -> T? {
    if let customDecoder = self.userInfo[customDecoderKey] {
      if let result = try (customDecoder as! CustomDecoder)(value, type, self.codingPath) {
        return (result as! T)
      }
    }

    if type == String.self || type == Bool.self || type is any Numeric.Type {
      guard let data = value as? T else {
        let description = "Expected to decode \(type) but found '\(value)' instead."
        throw DecodingError.typeMismatch(
          type,
          DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
        )
      }
      return data
    }

    if let enumType = type as? any CaseIterable.Type {
      guard let data = value as? String else {
        let description = "Expected to decode \(type) but found '\(value)' instead."
        throw DecodingError.typeMismatch(
          type,
          DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
        )
      }

      let match = enumType.allCases.first {
        return serializeEnumValue(value: $0) == data
      }

      guard let result = match as? T else {
        let description = "Expected to decode \(type) but found '\(value)' instead."
        throw DecodingError.typeMismatch(
          type,
          DecodingError.Context(codingPath: self.codingPath, debugDescription: description)
        )
      }
      return result
    }

    self.storage.push(container: value)
    defer { self.storage.popContainer() }
    return try type.init(from: self)
  }
}
