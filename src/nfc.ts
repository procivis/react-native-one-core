import { NativeModules } from "react-native";

const NativeModule = NativeModules.ProcivisOneCoreModule;

export interface NfcScanRequest {
  inProgressMessage?: string;
  failureMessage?: string;
  successMessage?: string;
}

export const isNfcHceSupported = async (): Promise<boolean> =>
  NativeModule.isNfcHceSupported();
