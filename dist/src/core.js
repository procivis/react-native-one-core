export * from "./backup";
export * from "./cache";
export * from "./config";
export * from "./credential";
export * from "./credentialSchema";
export * from "./did";
export * from "./identifier";
export * from "./history";
export * from "./key";
export * from "./list";
export * from "./organisation";
export * from "./proof";
export * from "./proofSchema";
export * from "./trust";
// New Architecture bridgeless issue workaround: see https://github.com/facebook/react-native/issues/43221
export const interfaceMethodNames = [
    "getVersion",
    "getConfig",
    "createOrganisation",
    "upsertOrganisation",
    "generateKey",
    "createDid",
    "getDids",
    "createIdentifier",
    "getIdentifier",
    "getIdentifiers",
    "deleteIdentifier",
    "handleInvitation",
    "holderAcceptCredential",
    "holderRejectCredential",
    "getPresentationDefinition",
    "holderRejectProof",
    "holderSubmitProof",
    "getCredentials",
    "runTask",
    "deleteProofClaims",
    "getCredential",
    "deleteCredential",
    "importCredentialSchema",
    "getCredentialSchema",
    "getCredentialSchemas",
    "deleteCredentialSchema",
    "createProof",
    "shareProof",
    "shareProofSchema",
    "shareCredentialSchema",
    "getProof",
    "getProofs",
    "deleteProof",
    "proposeProof",
    "createProofSchema",
    "getProofSchemas",
    "getProofSchema",
    "deleteProofSchema",
    "importProofSchema",
    "checkRevocation",
    "createTrustAnchor",
    "deleteTrustAnchor",
    "getTrustAnchor",
    "getTrustAnchors",
    "createTrustEntity",
    "getTrustEntity",
    "getTrustEntities",
    "getTrustEntityByDid",
    "resolveTrustEntityByIdentifier",
    "createRemoteTrustEntity",
    "getRemoteTrustEntity",
    "updateRemoteTrustEntity",
    "getHistory",
    "getHistoryEntry",
    "createBackup",
    "backupInfo",
    "deleteCache",
    "unpackBackup",
    "finalizeImport",
    "rollbackImport",
    "resolveJsonldContext",
    "uninitialize",
];
// Typescript automatic assertions to keep ONECore and interfaceMethodNames in sync
/** assert that all method names listed in {@link interfaceMethodNames} exist in {@link ONECore} interface */
const methodNamesCheck = interfaceMethodNames;
/** assert that all {@link ONECore} interface methods are listed in {@link interfaceMethodNames} */
const interfaceMethodsCheck = null;
