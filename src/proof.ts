import { CredentialDetail, CredentialListItem } from "./credential";
import { CredentialSchema } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
import { ProofInputClaimSchema, ProofSchemaListItem } from "./proofSchema";
import { DidListItem } from "./did";
import { IdentifierListItem } from "./identifier";

export enum ProofStateEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  RETRACTED = "RETRACTED",
  ERROR = "ERROR",
}

export enum ProofRoleEnum {
  HOLDER = "HOLDER",
  VERIFIER = "VERIFIER",
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
  role: ProofRoleEnum;
  proofSchema?: ProofSchemaListItem;
  verifierDid?: DidListItem;
  verifier?: IdentifierListItem;
  holderDid?: DidListItem;
  holder?: IdentifierListItem;
  protocol: string;
  transport: string;
  redirectUri?: string;
  retainUntilDate?: string;
  requestedDate?: string;
  completedDate?: string;
  claimsRemovedAt?: string;
}

export interface ProofListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  issuanceDate: string;
  requestedDate?: string;
  completedDate?: string;
  verifierDid?: DidListItem["id"];
  verifier?: IdentifierListItem["id"];
  protocol: string;
  transport: string;
  state: ProofStateEnum;
  role: ProofRoleEnum;
  schema?: ProofSchemaListItem;
  retainUntilDate?: string;
}

export interface CreateProofRequest {
  proofSchemaId: ProofSchemaListItem["id"];
  verifierDidId?: DidListItem["id"];
  verifierIdentifierId?: IdentifierListItem["id"];
  protocol: string;
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

export enum ScanToVerifyBarcodeTypeEnum {
  MRZ = "MRZ",
  PDF417 = "PDF417",
}

export interface ShareProofResponse {
  url: string;
}

export interface PresentationDefinition {
  requestGroups: PresentationDefinitionRequestGroup[];
  credentials: CredentialDetail[];
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
  proofRoles?: ProofRoleEnum[];
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

export interface ShareProofRequest {
  params?: ShareProofRequestParams;
}

export interface ShareProofRequestParams {
  clientIdScheme?: ClientIdSchemeEnum;
}

export enum ClientIdSchemeEnum {
  REDIRECT_URI = "REDIRECT_URI",
  VERIFIER_ATTESTATION = "VERIFIER_ATTESTATION",
  DID = "DID",
  X509_SAN_DNS = "X509_SAN_DNS",
}
