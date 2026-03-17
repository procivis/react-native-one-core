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
export const interfaceMethodNames = [
  "getVersion",
  "getConfig",
  "createOrganisation",
  "upsertOrganisation",
  "generateKey",
  "createDid",
  "listDids",
  "createIdentifier",
  "getIdentifier",
  "listIdentifiers",
  "deleteIdentifier",
  "handleInvitation",
  "holderAcceptCredential",
  "holderRejectCredential",
  "initiateIssuance",
  "continueIssuance",
  "getPresentationDefinition",
  "getPresentationDefinitionV2",
  "holderRejectProof",
  "holderSubmitProof",
  "holderSubmitProofV2",
  "listCredentials",
  "runTask",
  "deleteProofClaims",
  "getCredential",
  "deleteCredential",
  "importCredentialSchema",
  "getCredentialSchema",
  "listCredentialSchemas",
  "deleteCredentialSchema",
  "createProof",
  "shareProof",
  "shareProofSchema",
  "shareCredentialSchema",
  "getProof",
  "listProofs",
  "deleteProof",
  "proposeProof",
  "createProofSchema",
  "listProofSchemas",
  "getProofSchema",
  "deleteProofSchema",
  "importProofSchema",
  "checkRevocation",
  "createTrustAnchor",
  "deleteTrustAnchor",
  "getTrustAnchor",
  "listTrustAnchors",
  "createTrustEntity",
  "getTrustEntity",
  "listTrustEntities",
  "getTrustEntityByDid",
  "resolveTrustEntityByIdentifier",
  "createRemoteTrustEntity",
  "getRemoteTrustEntity",
  "updateRemoteTrustEntity",
  "listHistory",
  "getHistoryEntry",
  "createBackup",
  "backupInfo",
  "deleteCache",
  "unpackBackup",
  "finalizeImport",
  "rollbackImport",
  "resolveJsonldContext",
  "holderRegisterWalletUnit",
  "holderWalletUnitStatus",
  "holderGetWalletUnit",
  "nfcReadIsoMdlEngagement",
  "nfcStopIsoMdlEngagement",
  "uninitialize",
] as const;

// Typescript automatic assertions to keep ONECore and interfaceMethodNames in sync
/** assert that all method names listed in {@link interfaceMethodNames} exist in {@link ONECore} interface */
const methodNamesCheck: ReadonlyArray<keyof ONECore> = interfaceMethodNames;

/** assert that all {@link ONECore} interface methods are listed in {@link interfaceMethodNames} */
const interfaceMethodsCheck: (typeof interfaceMethodNames)[number] =
  null as unknown as keyof ONECore;
