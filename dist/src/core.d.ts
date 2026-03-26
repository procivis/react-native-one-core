import { CoreConfig } from "./config";
export * from "./config";
import { Version, OneCore } from "./one-core-uniffi-intf";
export * from "./one-core-uniffi-intf";
export interface ONECore extends Omit<OneCore, "version" | "getConfig"> {
    getVersion(): Promise<Version>;
    getConfig(): Promise<CoreConfig>;
}
/**
 * @hidden
 * New Architecture bridgeless issue workaround: see https://github.com/facebook/react-native/issues/43221
 */
export declare const interfaceMethodNames: readonly ["getVersion", "getConfig", "createOrganisation", "upsertOrganisation", "generateKey", "createDid", "listDids", "createIdentifier", "getIdentifier", "listIdentifiers", "deleteIdentifier", "handleInvitation", "holderAcceptCredential", "holderRejectCredential", "initiateIssuance", "continueIssuance", "getPresentationDefinition", "getPresentationDefinitionV2", "holderRejectProof", "holderSubmitProof", "holderSubmitProofV2", "listCredentials", "runTask", "deleteProofClaims", "getCredential", "deleteCredential", "importCredentialSchema", "getCredentialSchema", "listCredentialSchemas", "deleteCredentialSchema", "createProof", "shareProof", "shareProofSchema", "shareCredentialSchema", "getProof", "listProofs", "deleteProof", "proposeProof", "createProofSchema", "listProofSchemas", "getProofSchema", "deleteProofSchema", "importProofSchema", "checkRevocation", "createTrustAnchor", "deleteTrustAnchor", "getTrustAnchor", "listTrustAnchors", "createTrustEntity", "getTrustEntity", "listTrustEntities", "getTrustEntityByDid", "resolveTrustEntityByIdentifier", "createRemoteTrustEntity", "getRemoteTrustEntity", "updateRemoteTrustEntity", "listHistory", "getHistoryEntry", "createBackup", "backupInfo", "deleteCache", "unpackBackup", "finalizeImport", "rollbackImport", "resolveJsonldContext", "holderRegisterWalletUnit", "holderWalletUnitStatus", "holderGetWalletUnit", "holderWalletUnitUpdate", "holderGetWalletUnitTrustCollections", "registerVerifierInstance", "updateVerifierInstance", "getVerifierInstanceTrustCollections", "nfcReadIsoMdlEngagement", "nfcStopIsoMdlEngagement", "uninitialize"];
