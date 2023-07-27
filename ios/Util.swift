//
//  Util.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation

// Enum values serialization
func serializeEnumValue<T>(value: T) -> String {
    return String(describing: value).snakeCased()
}

private let snakeCaseRegex = try! NSRegularExpression(pattern: "([a-z0-9])([A-Z])", options: [])
extension String {
    func snakeCased() -> String {
        let range = NSRange(location: 0, length: count)
        return snakeCaseRegex.stringByReplacingMatches(in: self, options: [], range: range, withTemplate: "$1_$2").uppercased()
    }
}

// Error handling
func asyncCall<Result>(_ resolve: @escaping RCTPromiseResolveBlock,
                       _ reject: @escaping RCTPromiseRejectBlock, _ function: () throws -> Result) {
    do {
        resolve(try function());
    } catch {
        handleError(error: error, reject);
    }
}

private let errorMessageRegex = try! NSRegularExpression(pattern: "^([a-zA-Z0-9]+)\\(message\\: \\\"(.*)\\\"\\)$", options: [])
private func handleError(error: Error, _ reject: @escaping RCTPromiseRejectBlock) {
    
    let input = String(describing: error);
    let inputRange = NSMakeRange(0, input.count)
    let result = errorMessageRegex.matches(in: input, options: [], range: inputRange)
    
    guard let match = result.first else {
        reject("UnknownError", input, error)
        return
    }
    
    if (match.numberOfRanges != 3) {
        reject("UnknownError", input, error)
        return
    }
    
    let codeRange = Range(match.range(at: 1), in: input)
    let messageRange = Range(match.range(at: 2), in: input)
    guard let c = codeRange, let m = messageRange else {
        reject("UnknownError", input, error)
        return
    }
    
    let code = String(input[c])
    let message = String(input[m])
    reject(code, message, error)
}
