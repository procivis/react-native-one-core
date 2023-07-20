import { NativeModules } from "react-native";

const Native = NativeModules.ProcivisOneCoreModule;

export default {
  createOrg: Native.createOrg,
  getVersion: Native.getVersion,
};
