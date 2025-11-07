import {
  BackupCreate,
  ImportBackupMetadata,
  UnexportableEntities,
} from "./backup";
import { Config } from "./config";
import {
  AuthorizationCodeFlow,
  ContinueIssuanceResponse,
  CredentialDetail,
  CredentialListItem,
  CredentialListQuery,
  CredentialRevocationCheckResponse,
  HolderAcceptCredentialRequest,
  InitiateIssuanceRequest,
  InitiateIssuanceResponse,
  InvitationResultCredentialIssuance,
} from "./credential";
import {
  CredentialSchema,
  CredentialSchemaDetail,
  CredentialSchemaListQuery,
  ImportCredentialSchemaRequest,
  ShareCredentialSchemaResponse,
} from "./credentialSchema";
import { DidListItem, DidListQuery, DidRequest } from "./did";
import { HistoryListItem, HistoryListQuery } from "./history";
import { KeyRequest } from "./key";
import { ItemList } from "./list";
import {
  CreateProofRequest,
  InvitationResultProofRequest,
  PresentationDefinition,
  PresentationDefinitionRequestedCredential,
  PresentationDefinitionV2,
  PresentationSubmitCredentialRequest,
  PresentationSubmitV2CredentialRequest,
  ProofDetail,
  ProofListItem,
  ProofListQuery,
  ProposeProofRequest,
  ProposeProofResponse,
  ShareProofRequest,
  ShareProofResponse,
} from "./proof";
import {
  CreateProofSchemaRequest,
  ImportProofSchemaRequest,
  ProofSchema,
  ProofSchemaListItem,
  ProofSchemaListQuery,
  ShareProofSchemaResponse,
} from "./proofSchema";
import {
  CreateRemoteTrustEntityRequest,
  CreateTrustAnchorRequest,
  CreateTrustEntityRequest,
  RemoteTrustEntity,
  ResolvedIdentifierTrustEntity,
  ResolveTrustEntityByIdentifierRequest,
  TrustAnchor,
  TrustAnchorListItem,
  TrustAnchorListQuery,
  TrustEntity,
  TrustEntityListItem,
  TrustEntityListQuery,
  UpdateRemoteTrustEntityRequest,
} from "./trust";
import { CacheType } from "./cache";
import {
  CreateOrganisationRequest,
  UpsertOrganisationRequest,
} from "./organisation";
import {
  CreateIdentifierRequest,
  IdentifierDetail,
  IdentifierListItem,
  IdentifierListQuery,
} from "./identifier";
import {
  HolderRegisterWalletUnitRequest,
  HolderWalletUnitDetail,
} from "./walletUnit";
import { NfcScanRequest } from "./nfc";

export * from "./backup";
export * from "./cache";
export * from "./config";
export * from "./credential";
export * from "./credentialSchema";
export * from "./did";
export * from "./identifier";
export * from "./history";
export * from "./key";
export * from "./nfc";
export * from "./list";
export * from "./organisation";
export * from "./proof";
export * from "./proofSchema";
export * from "./trust";
export * from "./walletUnit";

export interface Version {
  target: string;
  buildTime: string;
  branch: string;
  tag: string;
  commit: string;
  rustVersion: string;
  pipelineId: string;
}

export type InvitationResult =
  | InvitationResultCredentialIssuance
  | InvitationResultProofRequest
  | AuthorizationCodeFlow;

export interface HandleInvitationRequest {
  /** Typically encoded as a QR code or deep link by the issuer or
   * verifier. For example:
   * "https://example.com/credential-offer" */
  url: string;
  organisationId: string;
  /** For configurations with multiple transport protocols enabled
   * you can specify which one to use for this interaction. */
  transport?: string[];
  /** For issuer-initiated Authorization Code Flows, provide the
   * authorization server with the URI it should return the user
   * to once authorization is complete. For example:
   * "myapp://example". */
  redirectUri?: string;
}

export interface ResolveJsonLdContextResponse {
  context: string;
}

export interface ONECore {
  getVersion(): Promise<Version>;

  getConfig(): Promise<Config>;

  createOrganisation(request: CreateOrganisationRequest): Promise<string>;

  upsertOrganisation(request: UpsertOrganisationRequest): Promise<void>;

  generateKey(keyRequest: KeyRequest): Promise<string>;

  createDid(didRequest: DidRequest): Promise<string>;

  getDids(query: DidListQuery): Promise<ItemList<DidListItem>>;

  createIdentifier(identifierRequest: CreateIdentifierRequest): Promise<string>;

  getIdentifiers(
    query: IdentifierListQuery
  ): Promise<ItemList<IdentifierListItem>>;

  getIdentifier(
    identifierId: IdentifierListItem["id"]
  ): Promise<IdentifierDetail>;

  deleteIdentifier(identifierId: IdentifierListItem["id"]): Promise<void>;

  /**
   * For a wallet, handles the interaction once the wallet connects to a share
   * endpoint URL (for example, scans the QR code of an offered credential or
   * request for proof).
   */
  handleInvitation(request: HandleInvitationRequest): Promise<InvitationResult>;

  holderAcceptCredential(
    request: HolderAcceptCredentialRequest
  ): Promise<CredentialDetail["id"]>;

  holderRejectCredential(
    interactionId: InvitationResultCredentialIssuance["interactionId"]
  ): Promise<void>;

  /** For wallets, starts the OID4VCI Authorization Code Flow. */
  initiateIssuance(
    request: InitiateIssuanceRequest
  ): Promise<InitiateIssuanceResponse>;

  /** For wallet-initiated flows, continues the OpenID4VCI issuance process
   * after completing authorization.
   */
  continueIssuance(
    /** Starts with the `redirectUri` and is used to continue the Authorization
     * Code Flow issuance process. For example:
     * "myapp://example/credential-offer?code=xxx&clientId=myWallet&..." */
    url: string
  ): Promise<ContinueIssuanceResponse>;

  getPresentationDefinition(
    proofId: ProofDetail["id"]
  ): Promise<PresentationDefinition>;

  getPresentationDefinitionV2(
    proofId: ProofDetail["id"]
  ): Promise<PresentationDefinitionV2>;

  holderRejectProof(
    interactionId: InvitationResultProofRequest["interactionId"]
  ): Promise<void>;

  holderSubmitProof(
    interactionId: InvitationResultProofRequest["interactionId"],
    credentials: Record<
      PresentationDefinitionRequestedCredential["id"],
      | PresentationSubmitCredentialRequest
      | PresentationSubmitCredentialRequest[]
    >,
    didId: DidListItem["id"] | undefined,
    identifierId: IdentifierListItem["id"] | undefined,
    keyId: string | undefined
  ): Promise<void>;

  holderSubmitProofV2(
    interactionId: InvitationResultProofRequest["interactionId"],
    credentials: Record<
      string,
      | PresentationSubmitV2CredentialRequest
      | PresentationSubmitV2CredentialRequest[]
    >
  ): Promise<void>;

  getCredentials(
    query: CredentialListQuery
  ): Promise<ItemList<CredentialListItem>>;

  runTask(task: string): Promise<string>;

  deleteProofClaims(proofId: ProofDetail["id"]): Promise<void>;

  getCredential(
    credentialId: CredentialListItem["id"]
  ): Promise<CredentialDetail>;

  deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;

  importCredentialSchema(
    request: ImportCredentialSchemaRequest
  ): Promise<CredentialSchema["id"]>;

  getCredentialSchema(
    credentialSchemaId: CredentialSchema["id"]
  ): Promise<CredentialSchemaDetail>;

  getCredentialSchemas(
    query: CredentialSchemaListQuery
  ): Promise<ItemList<CredentialSchema>>;

  deleteCredentialSchema(
    credentialSchemaId: CredentialSchema["id"]
  ): Promise<void>;

  /** For verifiers, creates a proof request. */
  createProof(request: CreateProofRequest): Promise<ProofDetail["id"]>;

  shareProof(
    proofId: ProofDetail["id"],
    request: ShareProofRequest
  ): Promise<ShareProofResponse>;

  shareProofSchema(
    proofSchemaId: ProofSchema["id"]
  ): Promise<ShareProofSchemaResponse>;

  shareCredentialSchema(
    credentialSchemaId: CredentialSchema["id"]
  ): Promise<ShareCredentialSchemaResponse>;

  getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;

  getProofs(query: ProofListQuery): Promise<ItemList<ProofListItem>>;

  deleteProof(proofId: ProofDetail["id"]): Promise<void>;

  /** For wallets, initiates device engagement for offline flows.
   * Reference the `verificationEngagement` entry of your configuration
   * for your options for `engagement`.
   */
  proposeProof(request: ProposeProofRequest): Promise<ProposeProofResponse>;

  createProofSchema(
    request: CreateProofSchemaRequest
  ): Promise<ProofSchema["id"]>;

  getProofSchemas(
    query: ProofSchemaListQuery
  ): Promise<ItemList<ProofSchemaListItem>>;

  getProofSchema(proofSchemaId: ProofSchema["id"]): Promise<ProofSchema>;

  deleteProofSchema(proofSchemaId: ProofSchema["id"]): Promise<void>;

  importProofSchema(
    request: ImportProofSchemaRequest
  ): Promise<ProofSchema["id"]>;

  checkRevocation(
    credentialIds: Array<CredentialListItem["id"]>,
    forceRefresh: boolean
  ): Promise<CredentialRevocationCheckResponse[]>;

  createTrustAnchor(
    request: CreateTrustAnchorRequest
  ): Promise<TrustAnchor["id"]>;

  deleteTrustAnchor(trustAnchorId: TrustAnchor["id"]): Promise<void>;

  getTrustAnchor(trustAnchorId: TrustAnchor["id"]): Promise<TrustAnchor>;

  getTrustAnchors(
    query: TrustAnchorListQuery
  ): Promise<ItemList<TrustAnchorListItem>>;

  createTrustEntity(
    request: CreateTrustEntityRequest
  ): Promise<TrustEntity["id"]>;

  getTrustEntity(
    trustEntityId: TrustEntityListItem["id"]
  ): Promise<TrustEntity>;

  getTrustEntities(
    query: TrustEntityListQuery
  ): Promise<ItemList<TrustEntityListItem>>;

  getTrustEntityByDid(didId: DidListItem["id"]): Promise<TrustEntity>;

  resolveTrustEntityByIdentifier(
    request: ResolveTrustEntityByIdentifierRequest
  ): Promise<Record<IdentifierListItem["id"], ResolvedIdentifierTrustEntity[]>>;

  createRemoteTrustEntity(
    request: CreateRemoteTrustEntityRequest
  ): Promise<RemoteTrustEntity["id"]>;

  getRemoteTrustEntity(didId: DidListItem["id"]): Promise<RemoteTrustEntity>;

  updateRemoteTrustEntity(
    request: UpdateRemoteTrustEntityRequest
  ): Promise<void>;

  getHistory(query: HistoryListQuery): Promise<ItemList<HistoryListItem>>;

  getHistoryEntry(historyId: HistoryListItem["id"]): Promise<HistoryListItem>;

  createBackup(password: string, outputPath: string): Promise<BackupCreate>;

  backupInfo(): Promise<UnexportableEntities>;

  deleteCache(types: CacheType[] | undefined): Promise<void>;

  /**
   * Start import procedure
   *
   * This call will open the provided backup file, other subsequent function calls like {@link getCredentials} will return data from the imported package
   * After this successful call, either {@link finalizeImport} (to persist the changes) or {@link rollbackImport} (to revert to old data) must be called
   * @param {string} password User password matching selected during creation of the backup file
   * @param {string} inputPath Path to the stored backup file
   */
  unpackBackup(
    password: string,
    inputPath: string
  ): Promise<ImportBackupMetadata>;

  /**
   * Persist unpacked backup
   *
   * This call will delete/overwrite the previously stored entries
   */
  finalizeImport(): Promise<void>;

  /**
   * Close unpacked backup
   *
   * This call will restore the old entries prior calling {@link unpackBackup}
   */
  rollbackImport(): Promise<void>;

  resolveJsonldContext(url: string): Promise<ResolveJsonLdContextResponse>;

  holderRegisterWalletUnit(
    request: HolderRegisterWalletUnitRequest
  ): Promise<HolderWalletUnitDetail["id"]>;

  holderWalletUnitStatus(
    walletUnitId: HolderWalletUnitDetail["id"]
  ): Promise<void>;

  holderGetWalletUnit(
    walletUnitId: HolderWalletUnitDetail["id"]
  ): Promise<HolderWalletUnitDetail>;

  /**
   * Start scanning for ISO 18013-5 NFC engagement
   *
   * @param {NfcScanRequest} request system overlay messages to be displayed (iOS only)
   * @returns {string} encoded NFC engagement to be used for {@link CreateProofRequest.isoMdlEngagement}
   */
  nfcReadIsoMdlEngagement(request: NfcScanRequest): Promise<string>;

  /**
   * Explicitly stop scan started via {@link nfcReadIsoMdlEngagement}
   */
  nfcStopIsoMdlEngagement(): Promise<void>;

  /**
   * Uninitialize the core instance
   *
   * Any following calls on this instance will fail.
   * A new core instance has to be initialized after.
   * @param {boolean} deleteData If true, also delete all data from the DB, otherwise data will be persisted for the next core instance
   */
  uninitialize(deleteData: boolean): Promise<void>;
}

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
  "initiateIssuance",
  "continueIssuance",
  "getPresentationDefinition",
  "getPresentationDefinitionV2",
  "holderRejectProof",
  "holderSubmitProof",
  "holderSubmitProofV2",
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
