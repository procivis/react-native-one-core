//
//  Util.swift
//  react-native-one-core
//
//  Created by Pavel Zarecky
//

import Foundation

// Error handling
func asyncCall<Result>(_ resolve: @escaping RCTPromiseResolveBlock,
                       _ reject: @escaping RCTPromiseRejectBlock, _ function: () throws -> Result) {
    do {
        resolve(try function());
    } catch {
        handleError(error: error, reject);
    }
}

private func handleError(error: Error, _ reject: @escaping RCTPromiseRejectBlock) {
    if case BindingError.ErrorResponse(data: let errorResponse) = error {
        reject(errorResponse.code, errorResponse.message, error)
        return
    }
    
    reject("UnknownError", String(describing: error), error)
}
