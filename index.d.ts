export interface Version {
    target: string;
    buildTime: string;
    branch: string;
    tag: string;
    commit: string;
    rustVersion: string;
    pipelineId: string;
}
export declare enum CredentialState {
    CREATED = "CREATED",
    PENDING = "PENDING",
    OFFERED = "OFFERED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    REVOKED = "REVOKED",
    ERROR = "ERROR"
}
export declare enum RevocationMethod {
    NONE = "NONE",
    STATUS_LIST2021 = "STATUS_LIST2021",
    LVVC = "LVVC"
}
export declare enum CredentialFormat {
    JWT = "JWT",
    SD_JWT = "SD_JWT",
    JSON_LD = "JSON_LD",
    MDOC = "MDOC"
}
export interface CredentialSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    format: CredentialFormat;
    revocationMethod: RevocationMethod;
}
export interface Claim {
    id: string;
    key: string;
    dataType: string;
    value: string;
}
export interface Credential {
    id: string;
    createdDate: string;
    issuanceDate: string;
    lastModified: string;
    issuerDid?: string | null;
    state: CredentialState;
    claims: Claim[];
    schema: CredentialSchema;
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
    handleInvitation(url: string): Promise<InvitationResult>;
    holderRejectProof(): Promise<void>;
    holderSubmitProof(credentialIds: string[]): Promise<void>;
    getCredentials(): Promise<Credential[]>;
}
export declare enum OneErrorCode {
    DataLayerError = "DataLayerError",
    SsiError = "SsiError",
    FormatterError = "FormatterError",
    GeneralRuntimeError = "GeneralRuntimeError",
    AlreadyExists = "AlreadyExists",
    IncorrectParameters = "IncorrectParameters",
    DatatypeValidationError = "DatatypeValidationError",
    RecordNotFound = "RecordNotFound",
    RecordNotUpdated = "RecordNotUpdated",
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
