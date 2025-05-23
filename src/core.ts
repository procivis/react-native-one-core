import {
  BackupCreate,
  ImportBackupMetadata,
  UnexportableEntities,
} from "./backup";
import { Config } from "./config";
import {
  CredentialDetail,
  CredentialListItem,
  CredentialListQuery,
  CredentialRevocationCheckResponse,
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
import {
  KeyCheckCertificateRequestBindingDto,
  KeyListItem,
  KeyRequest,
} from "./key";
import { ItemList } from "./list";
import {
  CreateProofRequest,
  InvitationResultProofRequest,
  PresentationDefinition,
  PresentationDefinitionRequestedCredential,
  PresentationSubmitCredentialRequest,
  ProofDetail,
  ProofListItem,
  ProofListQuery,
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

export * from "./backup";
export * from "./cache";
export * from "./config";
export * from "./credential";
export * from "./credentialSchema";
export * from "./did";
export * from "./history";
export * from "./key";
export * from "./list";
export * from "./organisation";
export * from "./proof";
export * from "./proofSchema";
export * from "./trust";

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
  | InvitationResultProofRequest;

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

  handleInvitation(
    url: string,
    organisationId: string,
    transport: string[] | undefined
  ): Promise<InvitationResult>;

  holderAcceptCredential(
    interactionId: InvitationResultCredentialIssuance["interactionId"],
    didId: string,
    keyId: string | undefined,
    txCode: string | undefined
  ): Promise<void>;

  holderRejectCredential(
    interactionId: InvitationResultCredentialIssuance["interactionId"]
  ): Promise<void>;

  getPresentationDefinition(
    proofId: ProofDetail["id"]
  ): Promise<PresentationDefinition>;

  holderRejectProof(
    interactionId: InvitationResultProofRequest["interactionId"]
  ): Promise<void>;

  holderSubmitProof(
    interactionId: InvitationResultProofRequest["interactionId"],
    credentials: Record<
      PresentationDefinitionRequestedCredential["id"],
      PresentationSubmitCredentialRequest
    >,
    didId: string,
    keyId: string | undefined
  ): Promise<void>;

  getCredentials(
    query: CredentialListQuery
  ): Promise<ItemList<CredentialListItem>>;

  runTask(task: string): Promise<string>;

  checkCertificate(
    keyId: KeyListItem["id"],
    certificate: KeyCheckCertificateRequestBindingDto
  ): Promise<void>;

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

  proposeProof(
    exchange: string,
    organisationId: string
  ): Promise<ProposeProofResponse>;

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

  getTrustEntity(trustEntityId: TrustEntity["id"]): Promise<TrustEntity>;

  getTrustEntities(
    query: TrustEntityListQuery
  ): Promise<ItemList<TrustEntityListItem>>;

  getTrustEntityByDid(didId: DidListItem["id"]): Promise<TrustEntity>;

  createRemoteTrustEntity(
    request: CreateRemoteTrustEntityRequest
  ): Promise<TrustEntity["id"]>;

  getRemoteTrustEntity(didId: DidListItem["id"]): Promise<TrustEntity>;

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
  "handleInvitation",
  "holderAcceptCredential",
  "holderRejectCredential",
  "getPresentationDefinition",
  "holderRejectProof",
  "holderSubmitProof",
  "getCredentials",
  "runTask",
  "checkCertificate",
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
] as const;

// Typescript automatic assertions to keep ONECore and interfaceMethodNames in sync
/** assert that all method names listed in {@link interfaceMethodNames} exist in {@link ONECore} interface */
const methodNamesCheck: ReadonlyArray<keyof ONECore> = interfaceMethodNames;

/** assert that all {@link ONECore} interface methods are listed in {@link interfaceMethodNames} */
const interfaceMethodsCheck: (typeof interfaceMethodNames)[number] =
  null as unknown as keyof ONECore;
