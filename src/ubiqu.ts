import {
  NativeModules,
  NativeEventEmitter,
  requireNativeComponent,
  ViewProps,
} from "react-native";

const NativeModule = NativeModules.ProcivisOneCoreModule;

export enum PinEventType {
  SHOW_PIN = "RSE_SHOW_PIN",
  HIDE_PIN = "RSE_HIDE_PIN",
  PIN_STAGE = "RSE_PIN_STAGE",
  DIGITS_ENTERED = "RSE_DIGITS_ENTERED",
  INCORRECT_PIN = "RSE_INCORRECT_PIN",
}

export enum PinFlowType {
  SUBSCRIBE = "SUBSCRIBE",
  TRANSACTION = "TRANSACTION",
  ADD_BIOMETRICS = "ADD_BIOMETRICS",
  CHANGE_PIN = "CHANGE_PIN",
}

export enum PinFlowStage {
  CHECK_CURRENT_PIN = "CHECK_CURRENT_PIN",
  NEW_FIRST_PIN = "NEW_FIRST_PIN",
  NEW_SECOND_PIN = "NEW_SECOND_PIN",
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

export type Event =
  | ShowPinEvent
  | HidePinEvent
  | StagePinEvent
  | DigitsEnteredEvent
  | IncorrectPinEvent;

export const PIN_COUNT = 5;

export function addEventListener(fn: (event: Event) => void) {
  const eventEmitter = new NativeEventEmitter(NativeModule);
  const showPinListener = eventEmitter.addListener(
    PinEventType.SHOW_PIN,
    (event) => {
      fn({
        type: PinEventType.SHOW_PIN,
        flowType: event.type,
        stage: event.stage,
      });
    }
  );
  const hidePinListener = eventEmitter.addListener(
    PinEventType.HIDE_PIN,
    () => {
      fn({ type: PinEventType.HIDE_PIN });
    }
  );
  const stageListener = eventEmitter.addListener(
    PinEventType.PIN_STAGE,
    (event) => {
      fn({
        type: PinEventType.PIN_STAGE,
        stage: event.stage,
      });
    }
  );
  const digitsEnteredListener = eventEmitter.addListener(
    PinEventType.DIGITS_ENTERED,
    (event) => {
      fn({
        type: PinEventType.DIGITS_ENTERED,
        digitsEntered: event.digitsEntered,
      });
    }
  );
  const incorrectPinListener = eventEmitter.addListener(
    PinEventType.INCORRECT_PIN,
    (event) => {
      fn({
        type: PinEventType.INCORRECT_PIN,
        attemptsLeft: event.attemptsLeft,
      });
    }
  );

  return () => {
    showPinListener.remove();
    hidePinListener.remove();
    stageListener.remove();
    digitsEnteredListener.remove();
    incorrectPinListener.remove();
  };
}

export const PinPad = requireNativeComponent<ViewProps>("RCTProcivisRSEPinPad");

export const changePin = async (): Promise<void> => NativeModule.changeRSEPin();

export const areBiometricsSupported = async (): Promise<boolean> =>
  NativeModule.areRSEBiometricsSupported();

export const areBiometricsEnabled = async (): Promise<boolean> =>
  NativeModule.areRSEBiometricsEnabled();

export const setBiometrics = async (enabled: boolean): Promise<void> =>
  NativeModule.setRSEBiometrics(enabled);

export const reset = async (): Promise<void> => NativeModule.resetRSE();
