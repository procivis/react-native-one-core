//
//  ProcivisOneCoreModule.swift
//
//  Created by Pavel Zarecky
//

import Foundation

@objc(ProcivisOneCoreModule)
class ProcivisOneCoreModule: NSObject {
    private static let TAG = "ProcivisOneCoreModule";
    private let core = initializeCore(dataDirPath: NSSearchPathForDirectoriesInDomains(.applicationSupportDirectory, .userDomainMask, true).first!);
    
    @objc(getVersion:rejecter:)
    func getVersion(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            let version = core.version();
            resolve([
                "target": version.target,
                "buildTime": version.buildTime,
                "branch": version.branch,
                "tag": version.tag,
                "commit": version.commit,
                "rustVersion": version.rustVersion,
                "pipelineId": version.pipelineId
            ]);
        }
    
    @objc(createOrg:rejecter:)
    func createOrg(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {
            do {
                resolve(try core.createOrg());
            } catch {
                reject("createOrg", "createOrg error: \(error).", error);
            }
        }
}
