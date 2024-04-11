export interface Version {
    target: string;
    buildTime: string;
    branch: string;
    tag: string;
    commit: string;
    rustVersion: string;
    pipelineId: string;
}
export declare enum CredentialStateEnum {
    CREATED = "CREATED",
    PENDING = "PENDING",
    OFFERED = "OFFERED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    REVOKED = "REVOKED",
    SUSPENDED = "SUSPENDED",
    ERROR = "ERROR"
}
export declare enum WalletStorageType {
    HARDWARE = "HARDWARE",
    SOFTWARE = "SOFTWARE"
}
export declare enum CredentialSchemaType {
    PROCIVIS_ONE_SCHEMA2024 = "PROCIVIS_ONE_SCHEMA2024",
    FALLBACK_SCHEMA2024 = "FALLBACK_SCHEMA2024",
    MDOC = "MDOC"
}
export declare enum LayoutType {
    CARD = "CARD",
    DOCUMENT = "DOCUMENT",
    SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE"
}
export interface CredentialSchemaListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod: string;
    walletStorageType?: WalletStorageType;
    schemaId: string;
    schemaType: CredentialSchemaType;
    layoutType?: LayoutType;
}
export interface CredentialSchemaDetail extends CredentialSchemaListItem {
    layoutProperties?: CredentialSchemaLayoutProperties;
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
export declare enum CredentialSchemaCodeType {
    BARCODE = "BARCODE",
    MRZ = "MRZ",
    QR_CODE = "QR_CODE"
}
export type ClaimValue = {
    dataType: DataTypeEnum.String | DataTypeEnum.Number | DataTypeEnum.Date | DataTypeEnum.File | string;
    value: string;
} | {
    dataType: DataTypeEnum.Object;
    value: Claim[];
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
    revocationDate?: string | null;
    issuerDid?: string | null;
    state: CredentialStateEnum;
    schema: CredentialSchemaListItem;
    role: CredentialRoleEnum;
    suspendEndDate?: string | null;
}
export interface CredentialDetail extends CredentialListItem {
    schema: CredentialSchemaDetail;
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
    credentialSchema: CredentialSchemaDetail;
}
export interface ListQuery {
    page: number;
    pageSize: number;
    organisationId: string;
}
export declare enum CredentialRoleEnum {
    HOLDER = "HOLDER",
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER"
}
export declare enum CredentialListQueryExactColumnEnum {
    NAME = "NAME"
}
export declare enum SortDirection {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}
export declare enum SortableCredentialColumnEnum {
    CREATED_DATE = "CREATED_DATE",
    SCHEMA_NAME = "SCHEMA_NAME",
    ISSUER_DID = "ISSUER_DID",
    STATE = "STATE"
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
export declare enum HistoryActionEnum {
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
    RESTORED = "RESTORED"
}
export declare enum HistoryEntityTypeEnum {
    KEY = "KEY",
    DID = "DID",
    CREDENTIAL = "CREDENTIAL",
    CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
    PROOF = "PROOF",
    PROOF_SCHEMA = "PROOF_SCHEMA",
    ORGANISATION = "ORGANISATION",
    BACKUP = "BACKUP"
}
export declare enum HistorySearchTypeEnum {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
    ISSUER_DID = "ISSUER_DID",
    ISSUER_NAME = "ISSUER_NAME",
    VERIFIER_DID = "VERIFIER_DID",
    VERIFIER_NAME = "VERIFIER_NAME"
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
export type InvitationResult = InvitationResultCredentialIssuance | InvitationResultProofRequest;
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
export declare enum PresentationDefinitionRuleTypeEnum {
    ALL = "ALL",
    PICK = "PICK"
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
export declare enum DidTypeEnum {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE"
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
export declare enum KeyStorageSecurityEnum {
    HARDWARE = "HARDWARE",
    SOFTWARE = "SOFTWARE"
}
export interface KeyStorageCapabilities {
    algorithms: string[];
    security: KeyStorageSecurityEnum[];
}
export interface DidCapabilities {
    operations: string[];
}
export declare enum FormatFeatureEnum {
    SelectiveDisclosure = "SELECTIVE_DISCLOSURE"
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
export type ConfigEntities<Capabilities = undefined, Params = {
    type: string;
}> = Record<string, ConfigEntity<Capabilities> & Params>;
export declare enum DataTypeEnum {
    String = "STRING",
    Number = "NUMBER",
    Date = "DATE",
    File = "FILE",
    Object = "OBJECT"
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
export type DataTypeParams = {
    type: DataTypeEnum.String;
    params?: StringDataTypeParams;
} | {
    type: DataTypeEnum.Number;
    params?: NumberDataTypeParams;
} | {
    type: DataTypeEnum.Date;
    params?: DateDataTypeParams;
} | {
    type: DataTypeEnum.File;
    params?: FileDataTypeParams;
} | {
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
    handleInvitation(url: string, organisationId: string): Promise<InvitationResult>;
    holderAcceptCredential(interactionId: InvitationResultCredentialIssuance["interactionId"], didId: string, keyId: string | undefined): Promise<void>;
    holderRejectCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    getPresentationDefinition(proofId: ProofDetail["id"]): Promise<PresentationDefinition>;
    holderRejectProof(interactionId: InvitationResultProofRequest["interactionId"]): Promise<void>;
    holderSubmitProof(interactionId: InvitationResultProofRequest["interactionId"], credentials: Record<PresentationDefinitionRequestedCredential["id"], PresentationSubmitCredentialRequest>, didId: string, keyId: string | undefined): Promise<void>;
    getCredentials(query: CredentialListQuery): Promise<ItemList<CredentialListItem>>;
    getCredential(credentialId: CredentialListItem["id"]): Promise<CredentialDetail>;
    deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;
    getCredentialSchemas(query: ListQuery): Promise<ItemList<CredentialSchemaListItem>>;
    getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;
    checkRevocation(credentialIds: Array<CredentialListItem["id"]>): Promise<CredentialRevocationCheckResponse[]>;
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
    unpackBackup(password: string, inputPath: string): Promise<ImportBackupMetadata>;
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
export declare enum OneErrorCode {
    AlreadyExists = "AlreadyExists",
    NotFound = "NotFound",
    NotSupported = "NotSupported",
    ValidationError = "ValidationError",
    ConfigValidationError = "ConfigValidationError",
    Uninitialized = "Uninitialized",
    DbErr = "DbErr",
    IOError = "IOError",
    Unknown = "Unknown"
}
/**
 * Specific errors being throw from the {@link ONECore} functions
 */
export declare class OneError extends Error {
    readonly code: OneErrorCode;
    readonly cause: unknown;
    constructor(params: {
        code: OneErrorCode;
        cause: unknown;
        message?: string;
    });
}
/**
 * Initialize the ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export declare function initializeCore(): Promise<ONECore>;
export {};
