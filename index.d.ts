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
    issuerDid?: string | null;
    state: CredentialStateEnum;
    schema: CredentialSchema;
}
export interface CredentialDetail extends CredentialListItem {
    claims: Claim[];
}
export interface ProofRequestClaim {
    id: string;
    createdDate: string;
    lastModified: string;
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
    issuedCredentialId: string;
}
export interface InvitationResultProofRequest {
    claims: ProofRequestClaim[];
}
export type InvitationResult = InvitationResultCredentialIssuance | InvitationResultProofRequest;
export interface ONECore {
    getVersion(): Promise<Version>;
    createOrganisation(uuid: string | undefined): Promise<string>;
    createLocalDid(did: string, organisationId: string): Promise<string>;
    handleInvitation(url: string, didId: string): Promise<InvitationResult>;
    holderRejectProof(): Promise<void>;
    holderSubmitProof(credentialIds: string[]): Promise<void>;
    getCredentials(query: ListQuery): Promise<ItemList<CredentialListItem>>;
    getCredential(credentialId: string): Promise<CredentialDetail>;
}
export declare enum OneErrorCode {
    GeneralRuntimeError = "GeneralRuntimeError",
    MappingError = "MappingError",
    AlreadyExists = "AlreadyExists",
    IncorrectParameters = "IncorrectParameters",
    NotFound = "NotFound",
    NotUpdated = "NotUpdated",
    ValidationError = "ValidationError",
    ConfigValidationError = "ConfigValidationError",
    TransportProtocolError = "TransportProtocolError",
    FormatterError = "FormatterError",
    Other = "Other"
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
declare const rnONE: ONECore;
export default rnONE;
