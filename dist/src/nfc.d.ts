export interface NfcScanRequest {
    inProgressMessage?: string;
    failureMessage?: string;
    successMessage?: string;
}
export declare const isNfcHceSupported: () => Promise<boolean>;
