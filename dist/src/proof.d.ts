import { CredentialDetail, CredentialListItem } from "./credential";
import { CredentialSchema } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
import { ProofInputClaimSchema, ProofSchemaListItem } from "./proofSchema";
export declare enum ProofStateEnum {
    CREATED = "CREATED",
    PENDING = "PENDING",
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    ERROR = "ERROR"
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
export interface CreateProofRequest {
    proofSchemaId: string;
    verifierDidId: string;
    exchange: string;
    redirectUri?: string;
    verifierKey?: string;
    scanToVerify?: ScanToVerifyRequest;
    isoMdlEngagement?: string;
    transport?: string[];
}
export interface ScanToVerifyRequest {
    credential: string;
    barcode: string;
    barcodeType: ScanToVerifyBarcodeTypeEnum;
}
export declare enum ScanToVerifyBarcodeTypeEnum {
    MRZ = "MRZ",
    PDF417 = "PDF417"
}
export interface ShareProofResponse {
    url: string;
}
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
export declare enum PresentationDefinitionRuleTypeEnum {
    ALL = "ALL",
    PICK = "PICK"
}
export interface PresentationDefinitionRequestedCredential {
    id: string;
    name?: string;
    purpose?: string;
    fields: PresentationDefinitionField[];
    applicableCredentials: Array<CredentialListItem["id"]>;
    inapplicableCredentials: Array<CredentialListItem["id"]>;
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
export declare enum SortableProofColumnEnum {
    SCHEMA_NAME = "SCHEMA_NAME",
    VERIFIER_DID = "VERIFIER_DID",
    CREATED_DATE = "CREATED_DATE",
    STATE = "STATE"
}
export declare enum ExactProofFilterColumnEnum {
    NAME = "NAME"
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
export interface ProposeProofResponse {
    proofId: string;
    interactionId: string;
    url: string;
}
export interface InvitationResultProofRequest {
    interactionId: string;
    proofId: ProofDetail["id"];
}
