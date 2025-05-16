struct RNAnyCodingKey: CodingKey, Equatable {
  var stringValue: String
  var intValue: Int?

  init(stringValue: String) {
    self.stringValue = stringValue
    self.intValue = nil
  }

  init(intValue: Int) {
    self.stringValue = "\(intValue)"
    self.intValue = intValue
  }

  init<Key>(_ base: Key) where Key: CodingKey {
    if let intValue = base.intValue {
      self.init(intValue: intValue)
    } else {
      self.init(stringValue: base.stringValue)
    }
  }
}

extension RNAnyCodingKey: Hashable {
  public func hash(into hasher: inout Hasher) {
    if intValue != nil {
      hasher.combine(intValue)
    }
    hasher.combine(stringValue)
  }
}
