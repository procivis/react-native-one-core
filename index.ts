import { NativeModules } from "react-native";

const ONE = NativeModules.ProcivisOneCoreModule;

export interface Version {
  target: string;
  buildTime: string;
  branch: string;
  tag: string;
  commit: string;
  rustVersion: string;
  pipelineId: string;
}

export enum CredentialStateEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  ERROR = "ERROR",
}

export enum WalletStorageType {
  HARDWARE = "HARDWARE",
  SOFTWARE = "SOFTWARE",
}

export interface CredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
  walletStorageType?: WalletStorageType;
}

export interface Claim {
  id: string;
  key: string;
  dataType: string;
  value: string;
}

export interface CredentialListItem {
  id: string;
  createdDate: string;
  issuanceDate: string;
  lastModified: string;
  revocationDate?: string | null;
  issuerDid?: string | null;
  state: CredentialStateEnum;
  schema: CredentialSchema;
  role: CredentialRoleEnum;
  suspendEndDate?: string | null;
}

export interface CredentialDetail extends CredentialListItem {
  claims: Claim[];
  redirectUri?: string | null;
  lvvcIssuanceDate?: string | null;
}

export interface ProofDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  claims: ProofRequestClaim[];
  credentials: CredentialDetail[];
  verifierDid?: string | null;
  transport: string;
  redirectUri?: string | null;
}

export interface ProofRequestClaim {
  id: string;
  key: string;
  dataType: string;
  required: boolean;
  credentialSchema: CredentialSchema;
}

export interface ListQuery {
  page: number;
  pageSize: number;
  organisationId: string;
}

export enum CredentialRoleEnum {
  HOLDER = "HOLDER",
  ISSUER = "ISSUER",
  VERIFIER = "VERIFIER",
}

export enum CredentialListQueryExactColumnEnum {
  NAME = "NAME",
}

export enum SortDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

export enum SortableCredentialColumnEnum {
  CREATED_DATE = "CREATED_DATE",
  SCHEMA_NAME = "SCHEMA_NAME",
  ISSUER_DID = "ISSUER_DID",
  STATE = "STATE",
}

export interface CredentialListQuery extends ListQuery {
  sort?: SortableCredentialColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: CredentialListQueryExactColumnEnum[];
  role?: CredentialRoleEnum;
  ids?: Array<CredentialListItem["id"]>;
  status?: CredentialStateEnum[];
}

export enum HistoryActionEnum {
  ACCEPTED = "ACCEPTED",
  CREATED = "CREATED",
  DEACTIVATED = "DEACTIVATED",
  DELETED = "DELETED",
  ISSUED = "ISSUED",
  OFFERED = "OFFERED",
  REACTIVATED = "REACTIVATED",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  RESTORED = "RESTORED",
}

export enum HistoryEntityTypeEnum {
  KEY = "KEY",
  DID = "DID",
  CREDENTIAL = "CREDENTIAL",
  CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
  PROOF = "PROOF",
  PROOF_SCHEMA = "PROOF_SCHEMA",
  ORGANISATION = "ORGANISATION",
  BACKUP = "BACKUP",
}

export enum HistorySearchTypeEnum {
  CLAIM_NAME = "CLAIM_NAME",
  CLAIM_VALUE = "CLAIM_VALUE",
  CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
  ISSUER_DID = "ISSUER_DID",
  ISSUER_NAME = "ISSUER_NAME",
  VERIFIER_DID = "VERIFIER_DID",
  VERIFIER_NAME = "VERIFIER_NAME",
}

export interface HistoryListQuery extends ListQuery {
  entityId?: string;
  action?: HistoryActionEnum;
  entityTypes?: HistoryEntityTypeEnum[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateFrom?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateTo?: string;
  didId?: string;
  credentialId?: string;
  credentialSchemaId?: string;
  searchText?: string;
  searchType?: HistorySearchTypeEnum;
}

export type HistoryMetadata = UnexportableEntities;

export interface HistoryListItem {
  id: string;
  createdDate: string;
  action: HistoryActionEnum;
  entityId?: string;
  entityType: HistoryEntityTypeEnum;
  organisationId: string;
  metadata?: HistoryMetadata | null;
}

export interface ItemList<Item> {
  totalItems: number;
  totalPages: number;
  values: Item[];
}

export interface InvitationResultCredentialIssuance {
  interactionId: string;
  credentialIds: Array<CredentialListItem["id"]>;
}

export interface InvitationResultProofRequest {
  interactionId: string;
  proofId: ProofDetail["id"];
}

export type InvitationResult =
  | InvitationResultCredentialIssuance
  | InvitationResultProofRequest;

export interface PresentationDefinition {
  requestGroups: PresentationDefinitionRequestGroup[];
}

export interface PresentationDefinitionRequestGroup {
  id: string;
  name?: string | null;
  purpose?: string | null;
  rule: PresentationDefinitionRule;
  requestedCredentials: PresentationDefinitionRequestedCredential[];
}

export interface PresentationDefinitionRule {
  type: PresentationDefinitionRuleTypeEnum;
  min?: number | null;
  max?: number | null;
  count?: number | null;
}

export enum PresentationDefinitionRuleTypeEnum {
  ALL = "ALL",
  PICK = "PICK",
}

export interface PresentationDefinitionRequestedCredential {
  id: string;
  name?: string | null;
  purpose?: string | null;
  fields: PresentationDefinitionField[];
  applicableCredentials: Array<CredentialListItem["id"]>;
  validityCredentialNbf?: string | null;
}

export interface PresentationDefinitionField {
  id: string;
  name?: string | null;
  purpose?: string | null;
  required: boolean;
  keyMap: Record<string, string>;
}

export interface PresentationSubmitCredentialRequest {
  credentialId: CredentialListItem["id"];
  submitClaims: Array<PresentationDefinitionField["id"]>;
}

export interface KeyRequest {
  organisationId: string;
  keyType: string;
  keyParams: Record<string, string>;
  name: string;
  storageType: string;
  storageParams: Record<string, string>;
}

export enum DidTypeEnum {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export interface DidRequest {
  organisationId: string;
  name: string;
  didMethod: string;
  keys: DidRequestKeys;
  params: Record<string, string>;
}

export interface DidRequestKeys {
  authentication: string[];
  assertionMethod: string[];
  keyAgreement: string[];
  capabilityInvocation: string[];
  capabilityDelegation: string[];
}

export interface CredentialRevocationCheckResponse {
  credentialId: string;
  status: CredentialStateEnum;
  success: boolean;
  reason?: string | null;
}

export enum KeyStorageSecurityEnum {
  HARDWARE = "HARDWARE",
  SOFTWARE = "SOFTWARE",
}

export interface KeyStorageCapabilities {
  algorithms: string[];
  security: KeyStorageSecurityEnum[];
}

export interface DidCapabilities {
  operations: string[];
}

export enum FormatFeatureEnum {
  SelectiveDisclosure = "SELECTIVE_DISCLOSURE",
}

export interface FormatCapabilities {
  features: FormatFeatureEnum[];
}

export interface ConfigEntity<Capabilities> {
  disabled?: boolean | null;
  capabilities?: Capabilities;
  display: string;
  order: number;
}

export interface FormatCapabilities {
  features: FormatFeatureEnum[];
}

export type ConfigEntities<
  Capabilities = undefined,
  Params = { type: string }
> = Record<string, ConfigEntity<Capabilities> & Params>;

export enum DataTypeEnum {
  String = "STRING",
  Number = "NUMBER",
  Date = "DATE",
  File = "FILE",
}

type DataTypeError = string | Record<string, string>;

export interface StringDataTypeParams {
  autocomplete: boolean;
  error?: DataTypeError;
  pattern: string;
  placeholder: string;
}

export interface NumberDataTypeParams {
  error?: DataTypeError;
  max?: number;
  min?: number;
}

export interface DateDataTypeParams {
  error?: DataTypeError;
  max?: string;
  min?: string;
}

export interface FileDataTypeParams {
  accept?: string[];
  fileSize?: number;
  showAs: "IMAGE" | "VIDEO" | "FILE";
}

export type DataTypeParams =
  | {
      type: DataTypeEnum.String;
      params?: StringDataTypeParams;
    }
  | {
      type: DataTypeEnum.Number;
      params?: NumberDataTypeParams;
    }
  | {
      type: DataTypeEnum.Date;
      params?: DateDataTypeParams;
    }
  | {
      type: DataTypeEnum.File;
      params?: FileDataTypeParams;
    };

export interface Config {
  format: ConfigEntities<FormatCapabilities>;
  exchange: ConfigEntities;
  transport: ConfigEntities;
  revocation: ConfigEntities;
  did: ConfigEntities<DidCapabilities>;
  datatype: ConfigEntities<undefined, DataTypeParams>;
  keyAlgorithm: ConfigEntities;
  keyStorage: ConfigEntities<KeyStorageCapabilities>;
}

export interface KeyListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  publicKey: number[];
  keyType: string;
  storageType: string;
}

export interface DidListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  did: string;
  didType: DidTypeEnum;
  didMethod: string;
  deactivated: boolean;
}

export interface UnexportableEntities {
  credentials: CredentialDetail[];
  keys: KeyListItem[];
  dids: DidListItem[];
  totalCredentials: number;
  totalKeys: number;
  totalDids: number;
}

export interface BackupCreate {
  historyId: HistoryListItem["id"];
  file: string;
  unexportable: UnexportableEntities;
}

export interface ImportBackupMetadata {
  dbVersion: string;
  dbHash: string;
  createdAt: string;
}

export interface ONECore {
  getVersion(): Promise<Version>;

  getConfig(): Promise<Config>;

  createOrganisation(uuid: string | undefined): Promise<string>;

  generateKey(keyRequest: KeyRequest): Promise<string>;

  createDid(didRequest: DidRequest): Promise<string>;

  handleInvitation(
    url: string,
    organisationId: string
  ): Promise<InvitationResult>;

  holderAcceptCredential(
    interactionId: InvitationResultCredentialIssuance["interactionId"],
    didId: string,
    keyId: string | undefined
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

  getCredential(
    credentialId: CredentialListItem["id"]
  ): Promise<CredentialDetail>;

  deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;

  getCredentialSchemas(query: ListQuery): Promise<ItemList<CredentialSchema>>;

  getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;

  checkRevocation(
    credentialIds: Array<CredentialListItem["id"]>
  ): Promise<CredentialRevocationCheckResponse[]>;

  getHistory(query: HistoryListQuery): Promise<ItemList<HistoryListItem>>;

  getHistoryEntry(historyId: HistoryListItem["id"]): Promise<HistoryListItem>;

  createBackup(password: string, outputPath: string): Promise<BackupCreate>;

  backupInfo(): Promise<UnexportableEntities>;

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

  /**
   * Uninitialize the core instance
   *
   * Any following calls on this instance will fail.
   * A new core instance has to be initialized after.
   * @param {boolean} deleteData If true, also delete all data from the DB, otherwise data will be persisted for the next core instance
   */
  uninitialize(deleteData: boolean): Promise<void>;
}

// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed

export enum OneErrorCode {
  // BindingError
  AlreadyExists = "AlreadyExists",
  NotFound = "NotFound",
  NotSupported = "NotSupported",
  ValidationError = "ValidationError",
  ConfigValidationError = "ConfigValidationError",
  Uninitialized = "Uninitialized",
  DbErr = "DbErr",
  IOError = "IOError",
  Unknown = "Unknown",
}

/**
 * Specific errors being throw from the {@link ONECore} functions
 */
export class OneError extends Error {
  readonly code: OneErrorCode;
  readonly cause: unknown;

  constructor(params: {
    code: OneErrorCode;
    cause: unknown;
    message?: string;
  }) {
    super(params.message);
    this.code = params.code;
    this.cause = params.cause;
  }
}

function wrapFn<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
  name: string
) {
  return (...args: any[]) => {
    const errHandler = (cause: any) => {
      const code = (cause ?? {}).code;
      if (Object.values(OneErrorCode).includes(code)) {
        // throw a specific error to be able to handle it easily
        throw new OneError({
          code,
          cause,
          message: cause?.message,
        });
      } else {
        throw cause;
      }
    };

    // set name on the err handler to display the original function name in callstack
    Object.defineProperty(errHandler, "name", { value: name });

    // convert undefined parameters to null for proper parameter matching in native code
    return fn(...args.map((x) => (x === undefined ? null : x))).catch(
      errHandler
    ) as unknown as Fn;
  };
}

function wrapObj<T extends Record<string, (...args: any[]) => Promise<any>>>(
  obj: T
): T {
  return Object.entries(obj).reduce(
    (aggr, [key, fn]) => ({
      ...aggr,
      [key]: typeof fn === "function" ? wrapFn(fn, key) : fn,
    }),
    {} as T
  );
}

// Config entities are exposed as serialized JSON, here conversion to structs
const originalGetConfig: () => Promise<
  Record<
    string /* entity type */,
    Record<string /* entity identifier */, string /* json */>
  >
> = ONE.getConfig;
ONE.getConfig = () =>
  originalGetConfig().then((config) =>
    objectMap(config, (entities) =>
      objectMap(entities, (json) => JSON.parse(json))
    )
  );

/**
 * Initialize the ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeCore(): Promise<ONECore> {
  await wrapFn(ONE.initialize, "initializeCore")();
  return wrapObj(ONE);
}

// UTILS
// returns a new object with the values at each key mapped using fn(value)
const objectMap = <Source, Result>(
  obj: Record<string, Source>,
  fn: (value: Source) => Result
): Record<string, Result> =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
