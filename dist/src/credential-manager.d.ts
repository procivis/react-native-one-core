import { HandleInvitationResponse } from "./one-core-uniffi-intf";
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
} & Extract<HandleInvitationResponse, {
    type_: "PROOF_REQUEST";
}>;
/**
 * Checks whether the app was started within a DC-API flow.
 * It creates a new proof entry if a DC-API request found.
 *
 * Only available on Android
 */
export declare const checkDcApi: (request: DcApiCheckRequest) => Promise<DcApiCheckResponse | undefined>;
