import { NativeModules, NativeEventEmitter, requireNativeComponent, } from "react-native";
const NativeModule = NativeModules.ProcivisOneCoreModule;
export var PinEventType;
(function (PinEventType) {
    PinEventType["SHOW_PIN"] = "RSE_SHOW_PIN";
    PinEventType["HIDE_PIN"] = "RSE_HIDE_PIN";
    PinEventType["PIN_STAGE"] = "RSE_PIN_STAGE";
    PinEventType["DIGITS_ENTERED"] = "RSE_DIGITS_ENTERED";
    PinEventType["INCORRECT_PIN"] = "RSE_INCORRECT_PIN";
})(PinEventType || (PinEventType = {}));
export var PinFlowType;
(function (PinFlowType) {
    PinFlowType["SUBSCRIBE"] = "SUBSCRIBE";
    PinFlowType["TRANSACTION"] = "TRANSACTION";
    PinFlowType["ADD_BIOMETRICS"] = "ADD_BIOMETRICS";
    PinFlowType["CHANGE_PIN"] = "CHANGE_PIN";
})(PinFlowType || (PinFlowType = {}));
export var PinFlowStage;
(function (PinFlowStage) {
    PinFlowStage["CHECK_CURRENT_PIN"] = "CHECK_CURRENT_PIN";
    PinFlowStage["NEW_FIRST_PIN"] = "NEW_FIRST_PIN";
    PinFlowStage["NEW_SECOND_PIN"] = "NEW_SECOND_PIN";
})(PinFlowStage || (PinFlowStage = {}));
export const PIN_COUNT = 5;
export function addEventListener(fn) {
    const eventEmitter = new NativeEventEmitter(NativeModule);
    const showPinListener = eventEmitter.addListener(PinEventType.SHOW_PIN, (event) => {
        fn({
            type: PinEventType.SHOW_PIN,
            flowType: event.flowType,
            stage: event.stage,
        });
    });
    const hidePinListener = eventEmitter.addListener(PinEventType.HIDE_PIN, () => {
        fn({ type: PinEventType.HIDE_PIN });
    });
    const stageListener = eventEmitter.addListener(PinEventType.PIN_STAGE, (event) => {
        fn({
            type: PinEventType.PIN_STAGE,
            stage: event.stage,
        });
    });
    const digitsEnteredListener = eventEmitter.addListener(PinEventType.DIGITS_ENTERED, (event) => {
        fn({
            type: PinEventType.DIGITS_ENTERED,
            digitsEntered: event.digitsEntered,
        });
    });
    const incorrectPinListener = eventEmitter.addListener(PinEventType.INCORRECT_PIN, (event) => {
        fn({
            type: PinEventType.INCORRECT_PIN,
            attemptsLeft: event.attemptsLeft,
        });
    });
    return () => {
        showPinListener.remove();
        hidePinListener.remove();
        stageListener.remove();
        digitsEnteredListener.remove();
        incorrectPinListener.remove();
    };
}
export const PinPad = requireNativeComponent("RCTProcivisRSEPinPad");
export const changePin = async () => NativeModule.changeRSEPin();
export const areBiometricsSupported = async () => NativeModule.areRSEBiometricsSupported();
export const areBiometricsEnabled = async () => NativeModule.areRSEBiometricsEnabled();
export const setBiometrics = async (enabled) => NativeModule.setRSEBiometrics(enabled);
export const reset = async () => NativeModule.resetRSE();
export const resetPinFlow = async () => NativeModule.resetRSEPinFlow();
