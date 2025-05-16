import Foundation

final class RNKeyedEncodingContainer<Key> where Key: CodingKey {
  private var storage: [RNAnyCodingKey: RNEncodingContainer] = [:]

  var codingPath: [CodingKey]
  var userInfo: [CodingUserInfoKey: Any]

  func nestedCodingPath(forKey key: CodingKey) -> [CodingKey] {
    return self.codingPath + [key]
  }

  init(codingPath: [CodingKey], userInfo: [CodingUserInfoKey: Any]) {
    self.codingPath = codingPath
    self.userInfo = userInfo
  }
}

extension RNKeyedEncodingContainer: KeyedEncodingContainerProtocol {
  func encodeNil(forKey key: Key) throws {
    var container = self.nestedSingleValueContainer(forKey: key)
    try container.encodeNil()
  }

  func encode<T>(_ value: T, forKey key: Key) throws where T: Encodable {
    var container = self.nestedSingleValueContainer(forKey: key)
    try container.encode(value)
  }

  private func nestedSingleValueContainer(forKey key: Key) -> SingleValueEncodingContainer {
    let container = RNSingleValueEncodingContainer(
      codingPath: self.nestedCodingPath(forKey: key),
      userInfo: self.userInfo
    )
    self.storage[RNAnyCodingKey(key)] = container
    return container
  }

  func nestedUnkeyedContainer(forKey key: Key) -> UnkeyedEncodingContainer {
    let container = RNUnkeyedEncodingContainer(
      codingPath: self.nestedCodingPath(forKey: key),
      userInfo: self.userInfo
    )
    self.storage[RNAnyCodingKey(key)] = container

    return container
  }

  func nestedContainer<NestedKey>(keyedBy keyType: NestedKey.Type, forKey key: Key)
    -> KeyedEncodingContainer<NestedKey> where NestedKey: CodingKey
  {
    let container = RNKeyedEncodingContainer<NestedKey>(
      codingPath: self.nestedCodingPath(forKey: key),
      userInfo: self.userInfo
    )
    self.storage[RNAnyCodingKey(key)] = container

    return KeyedEncodingContainer(container)
  }

  func superEncoder() -> Encoder {
    fatalError("Unimplemented")
  }

  func superEncoder(forKey key: Key) -> Encoder {
    fatalError("Unimplemented")
  }
}

extension RNKeyedEncodingContainer: RNEncodingContainer {
  var data: Any? {
    var result: [String: Any] = [:]
    for (key, container) in self.storage {
      let data = container.data
      if data != nil {
        result[key.stringValue] = data
      }
    }
    return result
  }
}
