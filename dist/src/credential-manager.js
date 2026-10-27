import { NativeModules } from "react-native";
const NativeModule = NativeModules.ProcivisOneCoreModule;
/**
 * Checks whether the app was started within a DC-API flow.
 * It creates a new proof entry if a DC-API request found.
 * If the received proof request is not valid, this call will fail (providing error details),
 * but the DC-API flow needs to be cancelled afterwards via `cancelDcApiRequest`
 *
 * Only available on Android
 */
export const checkDcApi = async (request) => NativeModule.checkDcApi({
    transport: "DC_API",
    ...request,
});
/**
 * Returns `true` if a previous `checkDcApi` call found a DC-API request.
 * Also when an invalid request is detected (after `checkDcApi` fails)
 *
 * Only available on Android
 */
export const isDcApiRequestActive = async () => NativeModule.isDcApiRequestActive();
/**
 * Cancels DC-API request flow (if any active)
 *
 * Only available on Android
 */
export const cancelDcApiRequest = async () => NativeModule.cancelDcApiRequest();
