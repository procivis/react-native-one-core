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
    ERROR = "ERROR"
}
export interface CredentialSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod: string;
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
}
export interface CredentialDetail extends CredentialListItem {
    claims: Claim[];
    redirectUri?: string | null;
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
export declare enum CredentialRoleEnum {
    HOLDER = "HOLDER",
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER"
}
export interface CredentialListQuery extends ListQuery {
    role?: CredentialRoleEnum;
}
export declare enum HistoryActionEnum {
    ACCEPTED = "ACCEPTED",
    CREATED = "CREATED",
    DEACTIVATED = "DEACTIVATED",
    DELETED = "DELETED",
    ISSUED = "ISSUED",
    OFFERED = "OFFERED",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED",
    REVOKED = "REVOKED"
}
export declare enum HistoryEntityTypeEnum {
    KEY = "KEY",
    DID = "DID",
    CREDENTIAL = "CREDENTIAL",
    CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
    PROOF = "PROOF",
    PROOF_SCHEMA = "PROOF_SCHEMA",
    ORGANISATION = "ORGANISATION"
}
export interface HistoryListQuery extends ListQuery {
    entityId?: string;
    action?: HistoryActionEnum;
    entityType?: HistoryEntityTypeEnum;
    /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
    createdDateFrom?: string;
    /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
    createdDateTo?: string;
    didId?: string;
    credentialId?: string;
    credentialSchemaId?: string;
}
export interface HistoryListItem {
    id: string;
    createdDate: string;
    action: HistoryActionEnum;
    entityId: string;
    entityType: HistoryEntityTypeEnum;
    organisationId: string;
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
    didType: DidTypeEnum;
    didMethod: string;
    keys: DidRequestKeys;
    params: Record<string, string>;
}
export interface DidRequestKeys {
    authentication: string[];
    assertion: string[];
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
    File = "FILE"
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
export interface ONECore {
    getVersion(): Promise<Version>;
    getConfig(): Promise<Config>;
    createOrganisation(uuid: string | undefined): Promise<string>;
    generateKey(keyRequest: KeyRequest): Promise<string>;
    createDid(didRequest: DidRequest): Promise<string>;
    handleInvitation(url: string, didId: string): Promise<InvitationResult>;
    holderAcceptCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    holderRejectCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    getPresentationDefinition(proofId: ProofDetail["id"]): Promise<PresentationDefinition>;
    holderRejectProof(interactionId: InvitationResultProofRequest["interactionId"]): Promise<void>;
    holderSubmitProof(interactionId: InvitationResultProofRequest["interactionId"], credentials: Record<PresentationDefinitionRequestedCredential["id"], PresentationSubmitCredentialRequest>): Promise<void>;
    getCredentials(query: CredentialListQuery): Promise<ItemList<CredentialListItem>>;
    getCredential(credentialId: CredentialListItem["id"]): Promise<CredentialDetail>;
    deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;
    getCredentialSchemas(query: ListQuery): Promise<ItemList<CredentialSchema>>;
    getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;
    checkRevocation(credentialIds: Array<CredentialListItem["id"]>): Promise<CredentialRevocationCheckResponse[]>;
    getHistory(query: HistoryListQuery): Promise<ItemList<HistoryListItem>>;
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
