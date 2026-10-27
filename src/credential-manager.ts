import { NativeModules } from "react-native";
import {
  EcosystemOutcome,
  HandleInvitationResponse,
} from "./one-core-uniffi-intf";

const NativeModule = NativeModules.ProcivisOneCoreModule;

export interface DcApiCheckRequest {
  organisationId: string;
  /**
   * Use this to enforce the constraints of a regulatory ecosystem
   * for this interaction. If omitted, every ecosystem available to
   * the wallet checks the interaction. See
   * [Enforcing an Ecosystem as a Wallet](https://docs.procivis.ch/hold/ecosystem-enforcement)
   * for more information.
   */
  ecosystem?: string;
}

export type DcApiCheckResponse = {
  preselectedCredentialId?: string;
} & Extract<HandleInvitationResponse, { type_: "PROOF_REQUEST" }>;

/**
 * Checks whether the app was started within a DC-API flow.
 * It creates a new proof entry if a DC-API request found.
 * If the received proof request is not valid, this call will fail (providing error details),
 * but the DC-API flow needs to be cancelled afterwards via `cancelDcApiRequest`
 *
 * Only available on Android
 */
export const checkDcApi = async (
  request: DcApiCheckRequest,
): Promise<DcApiCheckResponse | undefined> =>
  NativeModule.checkDcApi({
    transport: "DC_API",
    ...request,
  });

/**
 * Returns `true` if a previous `checkDcApi` call found a DC-API request.
 * Also when an invalid request is detected (after `checkDcApi` fails)
 *
 * Only available on Android
 */
export const isDcApiRequestActive = async (): Promise<boolean> =>
  NativeModule.isDcApiRequestActive();

/**
 * Cancels DC-API request flow (if any active)
 *
 * Only available on Android
 */
export const cancelDcApiRequest = async (): Promise<void> =>
  NativeModule.cancelDcApiRequest();
