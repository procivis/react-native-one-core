export interface Version {
    target: string;
    buildTime: string;
    branch: string;
    tag: string;
    commit: string;
    rustVersion: string;
    pipelineId: string;
}
export interface InvitationResult {
    issuedCredentialId: string;
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
export declare enum ClaimDataType {
    STRING = "STRING",
    DATE = "DATE",
    NUMBER = "NUMBER"
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
    dataType: ClaimDataType;
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
interface ONECore {
    handleInvitation(url: string): Promise<InvitationResult>;
    getCredentials(): Promise<Credential[]>;
    getVersion(): Promise<Version>;
}
declare const rnONE: ONECore;
export default rnONE;
