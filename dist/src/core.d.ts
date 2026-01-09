import { Config } from "./config";
import { OneCoreBinding } from "./one-core-uniffi-intf";
export * from "./one-core-uniffi-intf";
export * from "./config";
export interface ONECore extends Omit<OneCoreBinding, "version" | "getConfig"> {
    getVersion(): Promise<ReturnType<OneCoreBinding["version"]>>;
    getConfig(): Promise<Config>;
}
/**
 * @hidden
 * New Architecture bridgeless issue workaround: see https://github.com/facebook/react-native/issues/43221
 */
export declare const interfaceMethodNames: readonly ["getVersion", "getConfig", "createOrganisation", "upsertOrganisation", "generateKey", "createDid", "getDids", "createIdentifier", "getIdentifier", "listIdentifiers", "deleteIdentifier", "handleInvitation", "holderAcceptCredential", "holderRejectCredential", "initiateIssuance", "continueIssuance", "getPresentationDefinition", "getPresentationDefinitionV2", "holderRejectProof", "holderSubmitProof", "holderSubmitProofV2", "getCredentials", "runTask", "deleteProofClaims", "getCredential", "deleteCredential", "importCredentialSchema", "getCredentialSchema", "getCredentialSchemas", "deleteCredentialSchema", "createProof", "shareProof", "shareProofSchema", "shareCredentialSchema", "getProof", "getProofs", "deleteProof", "proposeProof", "createProofSchema", "getProofSchemas", "getProofSchema", "deleteProofSchema", "importProofSchema", "checkRevocation", "createTrustAnchor", "deleteTrustAnchor", "getTrustAnchor", "listTrustAnchors", "createTrustEntity", "getTrustEntity", "listTrustEntities", "getTrustEntityByDid", "resolveTrustEntityByIdentifier", "createRemoteTrustEntity", "getRemoteTrustEntity", "updateRemoteTrustEntity", "getHistoryList", "getHistoryEntry", "createBackup", "backupInfo", "deleteCache", "unpackBackup", "finalizeImport", "rollbackImport", "resolveJsonldContext", "holderRegisterWalletUnit", "holderWalletUnitStatus", "holderGetWalletUnit", "nfcReadIsoMdlEngagement", "nfcStopIsoMdlEngagement", "uninitialize"];
