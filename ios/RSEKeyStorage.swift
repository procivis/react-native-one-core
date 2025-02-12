import Foundation
import ProcivisOneCore

class RSEKeyStorage: NativeKeyStorage {
    
    public static var available: Bool {
        return false
    }
    
    init() {
        fatalError("init() has not been implemented")
    }
    
    func generateKey(keyAlias: String) async throws -> GeneratedKeyBindingDto {
        fatalError("generateKey(keyAlias:) has not been implemented")
    }
    
    func sign(keyReference: Data, message: Data) async throws -> Data {
        fatalError("sign(keyReference:,message:) has not been implemented")
    }

    func generateAttestation(keyReference: Data, nonce: String?) async throws -> [String] {
        fatalError("generateAttestation(keyReference:,nonce:) has not been implemented")
    }

    func generateAttestationKey(keyAlias: String, nonce: String?) async throws -> ProcivisOneCore.GeneratedKeyBindingDto {
        fatalError("generateAttestationKey(keyAlias:,nonce:) has not been implemented")
    }
    
    func signWithAttestationKey(keyReference: Data, message: Data) async throws -> Data {
        fatalError("signWithAttestationKey(keyReference:,message:) has not been implemented")
    }
    
    func changePin() async throws {
        fatalError("changePin() has not been implemented")
    }
    
    var areBiometricsSupported: Bool {
        fatalError("areBiometricsSupported has not been implemented")
    }
    
    var areBiometricsEnabled: Bool {
        fatalError("areBiometricsEnabled has not been implemented")
    }
    
    func enableBiometrics() async throws {
        fatalError("enableBiometrics() has not been implemented")
    }
    
    func disableBiometrics() throws {
        fatalError("disableBiometrics() has not been implemented")
    }
    
    func delete() async throws {
        fatalError("delete() has not been implemented")
    }

    func resetPinFlow() async throws {
        fatalError("resetPinFlow() has not been implemented")
    }
}
