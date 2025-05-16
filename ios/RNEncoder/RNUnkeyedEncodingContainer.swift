import Foundation

final class RNUnkeyedEncodingContainer {
  private var storage: [RNEncodingContainer] = []

  var count: Int {
    return storage.count
  }

  var codingPath: [CodingKey]

  var nestedCodingPath: [CodingKey] {
    return self.codingPath + [RNAnyCodingKey(intValue: self.count)]
  }

  var userInfo: [CodingUserInfoKey: Any]

  init(codingPath: [CodingKey], userInfo: [CodingUserInfoKey: Any]) {
    self.codingPath = codingPath
    self.userInfo = userInfo
  }
}

extension RNUnkeyedEncodingContainer: UnkeyedEncodingContainer {
  func encodeNil() throws {
    var container = self.nestedSingleValueContainer()
    try container.encodeNil()
  }

  func encode<T>(_ value: T) throws where T: Encodable {
    var container = self.nestedSingleValueContainer()
    try container.encode(value)
  }

  private func nestedSingleValueContainer() -> SingleValueEncodingContainer {
    let container = RNSingleValueEncodingContainer(
      codingPath: self.nestedCodingPath,
      userInfo: self.userInfo
    )
    self.storage.append(container)

    return container
  }

  func nestedContainer<NestedKey>(keyedBy keyType: NestedKey.Type) -> KeyedEncodingContainer<
    NestedKey
  > where NestedKey: CodingKey {
    let container = RNKeyedEncodingContainer<NestedKey>(
      codingPath: self.nestedCodingPath,
      userInfo: self.userInfo
    )
    self.storage.append(container)

    return KeyedEncodingContainer(container)
  }

  func nestedUnkeyedContainer() -> UnkeyedEncodingContainer {
    let container = RNUnkeyedEncodingContainer(
      codingPath: self.nestedCodingPath,
      userInfo: self.userInfo
    )
    self.storage.append(container)

    return container
  }

  func superEncoder() -> Encoder {
    fatalError("Unimplemented")
  }
}

extension RNUnkeyedEncodingContainer: RNEncodingContainer {
  var data: Any? {
    var result: [Any] = []

    for container in storage {
      if let data = container.data {
        result.append(data)
      }
    }

    return result
  }
}
