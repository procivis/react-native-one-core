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
export interface ONECore {
    getVersion(): Promise<Version>;
    createOrganisation(uuid: string | undefined): Promise<string>;
    generateKey(keyRequest: KeyRequest): Promise<string>;
    createDid(didRequest: DidRequest): Promise<string>;
    handleInvitation(url: string, didId: string): Promise<InvitationResult>;
    holderAcceptCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    holderRejectCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    getPresentationDefinition(proofId: ProofDetail["id"]): Promise<PresentationDefinition>;
    holderRejectProof(interactionId: InvitationResultProofRequest["interactionId"]): Promise<void>;
    holderSubmitProof(interactionId: InvitationResultProofRequest["interactionId"], credentials: Record<PresentationDefinitionRequestedCredential["id"], PresentationSubmitCredentialRequest>): Promise<void>;
    getCredentials(query: ListQuery): Promise<ItemList<CredentialListItem>>;
    getCredential(credentialId: CredentialListItem["id"]): Promise<CredentialDetail>;
    deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;
    getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;
    checkRevocation(credentialIds: Array<CredentialListItem["id"]>): Promise<CredentialRevocationCheckResponse[]>;
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
