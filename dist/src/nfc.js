import { NativeModules } from "react-native";
const NativeModule = NativeModules.ProcivisOneCoreModule;
export const isNfcHceSupported = async () => NativeModule.isNfcHceSupported();
