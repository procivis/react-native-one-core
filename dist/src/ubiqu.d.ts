import { ViewProps } from "react-native";
export declare enum PinEventType {
    SHOW_PIN = "RSE_SHOW_PIN",
    HIDE_PIN = "RSE_HIDE_PIN",
    PIN_STAGE = "RSE_PIN_STAGE",
    DIGITS_ENTERED = "RSE_DIGITS_ENTERED",
    INCORRECT_PIN = "RSE_INCORRECT_PIN"
}
export declare enum PinFlowType {
    SUBSCRIBE = "SUBSCRIBE",
    TRANSACTION = "TRANSACTION",
    ADD_BIOMETRICS = "ADD_BIOMETRICS",
    CHANGE_PIN = "CHANGE_PIN"
}
export declare enum PinFlowStage {
    CHECK_CURRENT_PIN = "CHECK_CURRENT_PIN",
    NEW_FIRST_PIN = "NEW_FIRST_PIN",
    NEW_SECOND_PIN = "NEW_SECOND_PIN"
}
export interface ShowPinEvent {
    type: PinEventType.SHOW_PIN;
    flowType: PinFlowType;
    stage: PinFlowStage;
}
export interface HidePinEvent {
    type: PinEventType.HIDE_PIN;
}
export interface StagePinEvent {
    type: PinEventType.PIN_STAGE;
    stage: PinFlowStage;
}
export interface DigitsEnteredEvent {
    type: PinEventType.DIGITS_ENTERED;
    digitsEntered: number;
}
export interface IncorrectPinEvent {
    type: PinEventType.INCORRECT_PIN;
    attemptsLeft: number;
}
export type Event = ShowPinEvent | HidePinEvent | StagePinEvent | DigitsEnteredEvent | IncorrectPinEvent;
export declare const PIN_COUNT = 5;
export declare function addEventListener(fn: (event: Event) => void): () => void;
export declare const PinPad: import("react-native").HostComponent<ViewProps>;
export declare const changePin: () => Promise<void>;
export declare const areBiometricsSupported: () => Promise<boolean>;
export declare const areBiometricsEnabled: () => Promise<boolean>;
export declare const setBiometrics: (enabled: boolean) => Promise<void>;
export declare const reset: () => Promise<void>;
