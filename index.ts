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

export enum ProofStateEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  ERROR = "ERROR",
}

export enum WalletStorageType {
  HARDWARE = "HARDWARE",
  SOFTWARE = "SOFTWARE",
}

export enum KnownCredentialSchemaType {
  PROCIVIS_ONE_SCHEMA2024 = "PROCIVIS_ONE_SCHEMA2024",
  FALLBACK_SCHEMA2024 = "FALLBACK_SCHEMA2024",
  MDOC = "MDOC",
}
export type CredentialSchemaType = KnownCredentialSchemaType | string;

export enum LayoutType {
  CARD = "CARD",
  DOCUMENT = "DOCUMENT",
  SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE",
}

export interface CredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
  walletStorageType?: WalletStorageType;
  schemaId: string;
  importedSourceUrl: string;
  schemaType: CredentialSchemaType;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
}

export interface CredentialSchemaDetail extends CredentialSchema {
  claims: ClaimSchema[];
}

export interface ClaimSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  key: string;
  datatype: string;
  required: boolean;
  array: boolean;
  claims: ClaimSchema[];
}

export interface CredentialSchemaLayoutProperties {
  background?: CredentialSchemaBackgroundProperties;
  logo?: CredentialSchemaLogoProperties;
  primaryAttribute?: string;
  secondaryAttribute?: string;
  pictureAttribute?: string;
  code?: CredentialSchemaCodeProperties;
}

export interface CredentialSchemaBackgroundProperties {
  color?: string;
  image?: string;
}

export interface CredentialSchemaLogoProperties {
  fontColor?: string;
  backgroundColor?: string;
  image?: string;
}

export interface CredentialSchemaCodeProperties {
  attribute: string;
  type: CredentialSchemaCodeType;
}

export enum CredentialSchemaCodeType {
  BARCODE = "BARCODE",
  MRZ = "MRZ",
  QR_CODE = "QR_CODE",
}

export type ClaimValue =
  | {
      dataType: DataTypeEnum.String | DataTypeEnum.Date | DataTypeEnum.File;
      value: string;
      array: false;
    }
  | {
      dataType: DataTypeEnum.Number;
      value: number;
      array: false;
    }
  | {
      dataType: DataTypeEnum.Boolean;
      value: boolean;
      array: false;
    }
  | {
      dataType: DataTypeEnum.Object;
      value: Claim[];
      array: false;
    }
  | {
      dataType: string;
      value: string | number | boolean;
      array: false;
    }
  | {
      dataType: string;
      value: Claim[];
      array: true;
    };

export type Claim = ClaimValue & {
  id: string;
  key: string;
};

export interface CredentialListItem {
  id: string;
  createdDate: string;
  issuanceDate: string;
  lastModified: string;
  revocationDate?: string;
  issuerDid?: string;
  state: CredentialStateEnum;
  schema: CredentialSchema;
  role: CredentialRoleEnum;
  suspendEndDate?: string;
}

export interface CredentialDetail extends CredentialListItem {
  claims: Claim[];
  redirectUri?: string;
  lvvcIssuanceDate?: string;
}

export interface ProofInput {
  claims: ProofInputClaim[];
  credential?: CredentialDetail;
  credentialSchema: CredentialSchema;
  validityConstraint?: number;
}

export interface ProofInputClaim {
  schema: ProofInputClaimSchema;
  value?: string | ProofInputClaim[];
}

export interface ProofInputClaimSchema {
  id: string;
  required: boolean;
  key: string;
  dataType: string;
  claims: ProofInputClaimSchema[];
  array: boolean;
}

export interface ProofDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  proofInputs: ProofInput[];
  state: ProofStateEnum;
  proofSchema?: ProofSchemaListItem;
  verifierDid?: string;
  exchange: string;
  redirectUri?: string;
  retainUntilDate?: string;
}

export interface ProofSchemaListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  deletedAt?: string;
  name: string;
  expireDuration: number;
}

export interface ProofSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId: string;
  expireDuration: number;
  proofInputSchemas: ProofInputSchema[];
  importedSourceUrl?: string;
}

export interface ProofInputSchema {
  claimSchemas: ProofInputClaimSchema[];
  credentialSchema: CredentialSchema;
  validityConstraint?: number;
}

export interface ListQuery {
  page: number;
  pageSize: number;
  organisationId: string;
}

export interface CredentialSchemaListQuery extends ListQuery {
  sort?: SortableCredentialSchemaColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  ids?: string[];
  exact?: ExactCredentialSchemaFilterColumnEnum[];
  include?: CredentialSchemaListIncludeEntityType[];
}

export enum CredentialSchemaListIncludeEntityType {
  LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
}

export enum SortableCredentialSchemaColumnEnum {
  NAME = "NAME",
  FORMAT = "FORMAT",
  CREATED_DATE = "CREATED_DATE",
}

export enum ExactCredentialSchemaFilterColumnEnum {
  NAME = "NAME",
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

export enum CredentialListIncludeEntityType {
  LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
  CREDENTIAL = "CREDENTIAL",
}

export enum CredentialListSearchType {
  CLAIM_NAME = "CLAIM_NAME",
  CLAIM_VALUE = "CLAIM_VALUE",
  CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
}

export type CredentialListQuery = ListQuery & {
  sort?: SortableCredentialColumnEnum;
  sortDirection?: SortDirection;
  exact?: CredentialListQueryExactColumnEnum[];
  role?: CredentialRoleEnum;
  ids?: Array<CredentialListItem["id"]>;
  status?: CredentialStateEnum[];
  include?: CredentialListIncludeEntityType[];
} & (
    | { name?: string; searchType?: never; searchText?: never }
    | {
        searchText?: string;
        searchType?: CredentialListSearchType[];
        name?: never;
      }
  );

export enum SortableDidColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  METHOD = "METHOD",
  TYPE = "TYPE",
  DID = "DID",
  DEACTIVATED = "DEACTIVATED",
}

export enum ExactDidFilterColumnEnum {
  NAME = "NAME",
  DID = "DID",
}

export enum KeyRoleEnum {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
  CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION",
}

export enum SortableProofSchemasColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
}

export enum ExactProofSchemaFilterColumnEnum {
  NAME = "NAME",
}

export interface DidListQuery extends ListQuery {
  sort?: SortableDidColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  did?: string;
  type?: DidTypeEnum;
  deactivated?: boolean;
  exact?: ExactDidFilterColumnEnum[];
  keyAlgorithms?: string[];
  keyRoles?: KeyRoleEnum[];
}

export interface ProofSchemaListQuery extends ListQuery {
  sort?: SortableProofSchemasColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: ExactProofSchemaFilterColumnEnum[];
  ids?: string[];
}

export enum SortableProofColumnEnum {
  SCHEMA_NAME = "SCHEMA_NAME",
  VERIFIER_DID = "VERIFIER_DID",
  CREATED_DATE = "CREATED_DATE",
  STATE = "STATE",
}

export enum ExactProofFilterColumnEnum {
  NAME = "NAME",
}

export interface ProofListQuery extends ListQuery {
  sort?: SortableProofColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  ids?: string[];
  proofStates?: ProofStateEnum[];
  proofSchemaIds?: string[];
  exact?: ExactProofFilterColumnEnum[];
}

export interface ProofListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  issuanceDate: string;
  requestedDate?: string;
  completedDate?: string;
  verifierDid?: string;
  exchange: string;
  transport: string;
  state: ProofStateEnum;
  schema?: ProofSchemaListItem;
  retainUntilDate?: string;
}

export interface ImportProofSchemaRequest {
  organisationId: string;
  schema: ImportProofSchema;
}

export interface ImportProofSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId: string;
  importedSourceUrl: string;
  expireDuration: number;
  proofInputSchemas: ImportProofSchemaInputSchema[];
}

export interface ImportProofSchemaInputSchema {
  claimSchemas: ImportProofSchemaClaimSchema[];
  credentialSchema: ImportProofSchemaCredentialSchema;
  validityConstraint?: number;
}

export interface ImportProofSchemaClaimSchema {
  id: string;
  required: boolean;
  key: string;
  dataType: string;
  claims?: ImportProofSchemaClaimSchema[];
  array: boolean;
}

export interface ImportProofSchemaCredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
  walletStorageType?: WalletStorageType;
  schemaId: string;
  importedSourceUrl: string;
  schemaType: CredentialSchemaType;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
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
  ERRORED = "ERRORED",
  SHARED = "SHARED",
  IMPORTED = "IMPORTED",
  CLAIMS_REMOVED = "CLAIMS_REMOVED",
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
  PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME",
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
  proofSchemaId?: string;
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
  metadata?: HistoryMetadata;
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
  name?: string;
  purpose?: string;
  rule: PresentationDefinitionRule;
  requestedCredentials: PresentationDefinitionRequestedCredential[];
}

export interface PresentationDefinitionRule {
  type: PresentationDefinitionRuleTypeEnum;
  min?: number;
  max?: number;
  count?: number;
}

export enum PresentationDefinitionRuleTypeEnum {
  ALL = "ALL",
  PICK = "PICK",
}

export interface PresentationDefinitionRequestedCredential {
  id: string;
  name?: string;
  purpose?: string;
  fields: PresentationDefinitionField[];
  applicableCredentials: Array<CredentialListItem["id"]>;
  validityCredentialNbf?: string;
}

export interface PresentationDefinitionField {
  id: string;
  name?: string;
  purpose?: string;
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
  reason?: string;
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
  SupportsCredentialDesign = "SUPPORTS_CREDENTIAL_DESIGN",
  RequiresSchemaId = "REQUIRES_SCHEMA_ID",
}

export enum FormatSelectiveDisclosureEnum {
  AnyLevel = "ANY_LEVEL",
  SecondLevel = "SECOND_LEVEL",
}

export interface FormatCapabilities {
  features: FormatFeatureEnum[];
  selectiveDisclosure: FormatSelectiveDisclosureEnum[];
  issuanceDidMethods: string[];
  issuanceExchangeProtocols: string[];
  proofExchangeProtocols: string[];
  revocationMethods: string[];
  signingKeyAlgorithms: string[];
  verificationKeyAlgorithms: string[];
  datatypes: Array<DataTypeEnum | string>;
  allowedSchemaIds: string[];
  forbiddenClaimNames: string[];
}

export interface ConfigEntity<Capabilities> {
  disabled?: boolean;
  capabilities?: Capabilities;
  display: string;
  order: number;
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
  Boolean = "BOOLEAN",
  Object = "OBJECT",
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
    }
  | {
      type: DataTypeEnum.Object;
      params?: undefined;
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
  cacheEntities: ConfigEntities;
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

export interface CreateProofSchemaRequest {
  name: string;
  organisationId: string;
  expireDuration: number;
  proofInputSchemas: ProofInputSchemaRequest[];
}

export interface ProofInputSchemaRequest {
  credentialSchemaId: string;
  validityConstraint?: number;
  claimSchemas: ProofSchemaClaimRequest[];
}

export interface ProofSchemaClaimRequest {
  id: string;
  required: boolean;
}

export interface ImportCredentialSchemaRequest {
  organisationId: string;
  schema: ImportCredentialSchemaRequestSchema;
}

export interface ImportCredentialSchemaRequestSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
  organisationId: string;
  importedSourceUrl: string;
  claims: ImportCredentialSchemaClaimSchema[];
  walletStorageType?: WalletStorageType;
  schemaId: string;
  schemaType: CredentialSchemaType;
  layoutType?: LayoutType;
  layoutProperties?: ImportCredentialSchemaLayoutProperties;
  allowSuspension?: boolean;
}

export interface ImportCredentialSchemaClaimSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  required: boolean;
  key: string;
  datatype: string;
  claims?: ImportCredentialSchemaClaimSchema[];
  array?: boolean;
}

export interface ImportCredentialSchemaLayoutProperties {
  background?: CredentialSchemaBackgroundProperties;
  logo?: CredentialSchemaLogoProperties;
  primaryAttribute?: string;
  secondaryAttribute?: string;
  pictureAttribute?: string;
  code?: CredentialSchemaCodeProperties;
}

export interface CreateProofRequest {
  proofSchemaId: string;
  verifierDidId: string;
  exchange: string;
  redirectUri?: string;
  verifierKey?: string;
  scanToVerify?: ScanToVerifyRequest;
  isoMdlEngagement?: string;
}

export interface ScanToVerifyRequest {
  credential: string;
  barcode: string;
  barcodeType: ScanToVerifyBarcodeTypeEnum;
}

export enum ScanToVerifyBarcodeTypeEnum {
  MRZ = "MRZ",
  PDF417 = "PDF417",
}

export interface ShareProofResponse {
  url: string;
}
export interface ShareProofSchemaResponse {
  url: string;
}
export interface ShareCredentialSchemaResponse {
  url: string;
}
export interface ResolveJsonLdContextResponse {
  context: string;
}

export enum TrustAnchorRoleEnum {
  PUBLISHER = "PUBLISHER",
  CLIENT = "CLIENT",
}

export interface CreateTrustAnchorRequest {
  name: string;
  type: string;
  publisherReference?: string;
  role: TrustAnchorRoleEnum;
  priority?: number;
  organisationId: string;
}

export interface TrustAnchor {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  type: string;
  publisherReference?: string;
  role: TrustAnchorRoleEnum;
  priority?: number;
  organisationId: string;
}

export interface TrustAnchorListItem extends TrustAnchor {
  entities: number;
}

export enum SortableTrustAnchorColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  TYPE = "TYPE",
  ROLE = "ROLE",
  PRIORITY = "PRIORITY",
}

export enum ExactTrustAnchorFilterColumnEnum {
  NAME = "NAME",
  TYPE = "TYPE",
}

export interface TrustAnchorListQuery extends ListQuery {
  sort?: SortableTrustAnchorColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: ExactTrustAnchorFilterColumnEnum[];
  type?: string;
  role?: TrustAnchorRoleEnum;
}

export interface ProposeProofResponse {
  proofId: string;
  interactionId: string;
  url: string;
}

export interface ONECore {
  getVersion(): Promise<Version>;

  getConfig(): Promise<Config>;

  createOrganisation(uuid: string | undefined): Promise<string>;

  generateKey(keyRequest: KeyRequest): Promise<string>;

  createDid(didRequest: DidRequest): Promise<string>;

  getDids(query: DidListQuery): Promise<ItemList<DidListItem>>;

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

  createProof(request: CreateProofRequest): Promise<ProofDetail["id"]>;

  shareProof(proofId: ProofDetail["id"]): Promise<ShareProofResponse>;

  shareProofSchema(
    proofSchemaId: ProofSchema["id"]
  ): Promise<ShareProofSchemaResponse>;

  shareCredentialSchema(
    credentialSchemaId: CredentialSchema["id"]
  ): Promise<ShareCredentialSchemaResponse>;

  getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;

  getProofs(query: ProofListQuery): Promise<ItemList<ProofListItem>>;

  retractProof(proofId: ProofDetail["id"]): Promise<ProofDetail["id"]>;

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

  importProofSchema(request: ImportProofSchemaRequest): Promise<string>;

  checkRevocation(
    credentialIds: Array<CredentialListItem["id"]>
  ): Promise<CredentialRevocationCheckResponse[]>;

  createTrustAnchor(
    request: CreateTrustAnchorRequest
  ): Promise<TrustAnchor["id"]>;

  getTrustAnchor(trustAnchorId: TrustAnchor["id"]): Promise<TrustAnchor>;

  getTrustAnchors(
    query: TrustAnchorListQuery
  ): Promise<ItemList<TrustAnchorListItem>>;

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
 * Initialize ONE Core for Holder
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeHolderCore(): Promise<ONECore> {
  await wrapFn(ONE.initializeHolder, "initializeHolderCore")();
  return wrapObj(ONE);
}

/**
 * Initialize ONE Core for Verifier
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeVerifierCore(): Promise<ONECore> {
  await wrapFn(ONE.initializeVerifier, "initializeVerifierCore")();
  return wrapObj(ONE);
}

// UTILS
// returns a new object with the values at each key mapped using fn(value)
const objectMap = <Source, Result>(
  obj: Record<string, Source>,
  fn: (value: Source) => Result
): Record<string, Result> =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
