//
//  Util.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation

// Error handling
func syncCall<Result>(_ resolve: @escaping RCTPromiseResolveBlock,
                       _ reject: @escaping RCTPromiseRejectBlock, _ function: () throws -> Result) {
    do {
        resolve(try function());
    } catch {
        handleError(error: error, reject);
    }
}

func asyncCall<Result>(_ resolve: @escaping RCTPromiseResolveBlock,
                        _ reject: @escaping RCTPromiseRejectBlock, _ function: @escaping () async throws -> Result) {
    Task {
        do {
            resolve(try await function());
        } catch {
            handleError(error: error, reject);
        }
    }
}

private func handleError(error: Error, _ reject: @escaping RCTPromiseRejectBlock) {
    if case BindingError.ErrorResponse(data: let errorResponse) = error {
        var userInfo: [String: Any] = [NSUnderlyingErrorKey: error]
        if let cause = errorResponse.cause?.message {
            userInfo["cause"] = cause
        }
        
        reject(errorResponse.code, errorResponse.message, NSError(domain: "one-core", code: 1, userInfo: userInfo))
        return
    }
    
    reject("UnknownError", String(describing: error), error)
}
