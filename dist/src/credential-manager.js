import { NativeModules } from "react-native";
const NativeModule = NativeModules.ProcivisOneCoreModule;
/**
 * Checks whether the app was started within a DC-API flow.
 * It creates a new proof entry if a DC-API request found.
 *
 * Only available on Android
 */
export const checkDcApi = async (request) => NativeModule.checkDcApi({
    transport: "DC_API",
    ...request,
});
