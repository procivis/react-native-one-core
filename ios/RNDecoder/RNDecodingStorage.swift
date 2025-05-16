import Foundation

internal struct RNDecodingStorage {
  // MARK: Properties

  /// The container stack.
  private(set) internal var containers: [Any] = []

  // MARK: - Initialization

  /// Initializes `self` with no containers.
  internal init() {}

  // MARK: - Modifying the Stack

  internal var count: Int {
    return self.containers.count
  }

  internal var topContainer: Any {
    precondition(!self.containers.isEmpty, "Empty container stack.")
    return self.containers.last!
  }

  internal mutating func push(container: Any) {
    self.containers.append(container)
  }

  internal mutating func popContainer() {
    precondition(!self.containers.isEmpty, "Empty container stack.")
    self.containers.removeLast()
  }
}
