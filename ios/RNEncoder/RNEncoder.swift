import Foundation

public typealias CustomEncoder = (_ value: Encodable) throws -> Any?
public let customEncoderKey = CodingUserInfoKey(rawValue: "customEncoder")!

final public class RNEncoder {
  public init() {}

  /**
   A dictionary you use to customize the encoding process
   by providing contextual information.
   */
  public var userInfo: [CodingUserInfoKey: Any] = [:]

  public func encode<T>(_ value: T) throws -> Any where T: Encodable {
    if let customEncoder = self.userInfo[customEncoderKey] {
      if let result = try (customEncoder as! CustomEncoder)(value) {
        return result
      }
    }

    let encoder = RNObjectEncoder(userInfo: self.userInfo)
    try value.encode(to: encoder)
    return encoder.data
  }
}

// MARK: - TopLevelEncoder

#if canImport(Combine)
  import Combine

  extension RNEncoder: TopLevelEncoder {}
#endif

// MARK: -

protocol RNEncodingContainer {
  var data: Any? { get }
}

class RNObjectEncoder {
  var codingPath: [CodingKey] = []

  var userInfo: [CodingUserInfoKey: Any] = [:]

  fileprivate var container: RNEncodingContainer?

  var data: Any {
    return container?.data ?? NSDictionary()
  }

  init(userInfo: [CodingUserInfoKey: Any]) {
    self.userInfo = userInfo
  }
}

extension RNObjectEncoder: Encoder {
  fileprivate func assertCanCreateContainer() {
    precondition(self.container == nil)
  }

  func container<Key>(keyedBy type: Key.Type) -> KeyedEncodingContainer<Key> where Key: CodingKey {
    assertCanCreateContainer()

    let container = RNKeyedEncodingContainer<Key>(
      codingPath: self.codingPath,
      userInfo: self.userInfo
    )
    self.container = container

    return KeyedEncodingContainer(container)
  }

  func unkeyedContainer() -> UnkeyedEncodingContainer {
    assertCanCreateContainer()

    let container = RNUnkeyedEncodingContainer(codingPath: self.codingPath, userInfo: self.userInfo)
    self.container = container

    return container
  }

  func singleValueContainer() -> SingleValueEncodingContainer {
    assertCanCreateContainer()

    let container = RNSingleValueEncodingContainer(
      codingPath: self.codingPath,
      userInfo: self.userInfo
    )
    self.container = container

    return container
  }
}
