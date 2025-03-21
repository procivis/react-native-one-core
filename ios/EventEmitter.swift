import Foundation
import React
import one_core

@objc(ProcivisOneCoreEventEmitter)
class ProcivisOneCoreEventEmitter: NSObject {
    
    enum EventName: String, CaseIterable {
        
        case rseShowPin = "RSE_SHOW_PIN"
        case rseHidePin = "RSE_HIDE_PIN"
        case rsePinStageChanged = "RSE_PIN_STAGE"
        case rseDigitsEntered = "RSE_DIGITS_ENTERED"
        case rseIncorrectPin = "RSE_INCORRECT_PIN"
    }
    
    enum PinFlowType: String {
        
        case subscribe = "SUBSCRIBE"
        case transaction = "TRANSACTION"
        case addBiometrics = "ADD_BIOMETRICS"
        case changePin = "CHANGE_PIN"
    }
    
    enum PinFlowStage: String {
        
        case checkCurrentPin = "CHECK_CURRENT_PIN"
        case newFirstPin = "NEW_FIRST_PIN"
        case newSecondPin = "NEW_SECOND_PIN"
    }
    
    static let shared: ProcivisOneCoreEventEmitter = {
        return ProcivisOneCoreEventEmitter()
    }()
    weak var eventEmitter: RCTEventEmitter?
    
    static var supportedEvents: [String] {
        return EventName.allCases.map(\.rawValue)
    }
    
    static var hasListeners: Bool = false
    
    func sendShowPinEvent(flowType: PinFlowType, stage: PinFlowStage) throws {
        guard ProcivisOneCoreEventEmitter.hasListeners else {
            throw NativeKeyStorageError.Unknown(reason: "No UI listener")
        }
        
        self.sendEvent(with: .rseShowPin, body: [
            "flowType": flowType.rawValue,
            "stage": stage.rawValue,
        ])
    }
    
    func sendHidePinEvent() {
        self.sendEvent(with: .rseHidePin, body: nil)
    }
    
    func sendPinStageChangeEvent(stage: PinFlowStage) {
        self.sendEvent(with: .rsePinStageChanged, body: [
            "stage": stage.rawValue,
        ])
    }
    
    func sendDigitsEnteredEvent(amount: Int) {
        self.sendEvent(with: .rseDigitsEntered, body: [
            "digitsEntered": amount,
        ])
    }
    
    func sendIncorrectPinEvent(attemptsLeft: Int) {
        self.sendEvent(with: .rseIncorrectPin, body: [
            "attemptsLeft": attemptsLeft,
        ])
    }
    
    private func sendEvent(with name: EventName!, body: Any!) {
        self.eventEmitter?.sendEvent(withName: name.rawValue, body: body)
    }
}
