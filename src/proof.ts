import { Claim, CredentialDetail, CredentialListItem } from "./credential";
import { ClaimSchema, CredentialSchema } from "./credentialSchema";
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
  verifier?: IdentifierListItem;
  holder?: IdentifierListItem;
  protocol: string;
  transport: string;
  redirectUri?: string;
  retainUntilDate?: string;
  requestedDate?: string;
  completedDate?: string;
  claimsRemovedAt?: string;
  profile?: string;
  engagement?: string;
}

export interface ProofListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  requestedDate?: string;
  completedDate?: string;
  verifier?: IdentifierListItem["id"];
  protocol: string;
  transport: string;
  state: ProofStateEnum;
  role: ProofRoleEnum;
  schema?: ProofSchemaListItem;
  retainUntilDate?: string;
  profile?: string;
  engagement?: string;
}

/** If protocol is `ISO_MDL`, specify the device engagement
 * type by referencing an entry from `verificationEngagement`
 * of your configurationi. `isoMdlEngagement` accepts either
 * QR code content (for QR device engagement) or NFC engagement
 * parameters from {@link nfcReadIsoMdlEngagement}.
 */
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
  profile?: string;
  engagement?: string;
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
  multiple?: boolean;
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
  keyMap: Record<CredentialListItem["id"], Claim["key"]>;
}

export interface PresentationSubmitCredentialRequest {
  credentialId: CredentialListItem["id"];
  submitClaims: Array<PresentationDefinitionField["id"]>;
}

export interface PresentationDefinitionV2 {
  credentialQueries: Record<string, PresentationDefinitionV2CredentialQuery>;
  credentialSets: {
    required: boolean;
    options: Array<Array<string>>;
  };
}

export type PresentationDefinitionV2CredentialQuery = {
  multiple: boolean;
} & (ApplicableCredentials | FailureHint);

export interface ApplicableCredentials {
  applicableCredentials: Array<PresentationDefinitionV2CredentialDetail>;
}

export interface FailureHint {
  failureHint: {
    credentialSchema?: CredentialSchema;
    reason: "NO_CREDENTIAL" | "VALIDITY" | "CONSTRAINT";
  };
}

export interface PresentationDefinitionV2CredentialDetail
  extends Omit<CredentialDetail, "claims"> {
  claims: Array<PresentationDefinitionV2CredentialClaim>;
}

export interface PresentationDefinitionV2CredentialClaim {
  path: string;
  schema: ClaimSchema;
  value: PresentationDefinitionV2ClaimValue;
  userSelection: boolean;
  required: boolean;
}

export type PresentationDefinitionV2ClaimValue =
  | string
  | number
  | boolean
  | PresentationDefinitionV2CredentialClaim[];

export interface PresentationSubmitV2CredentialRequest {
  credentialId: CredentialListItem["id"];
  userSelections: Array<string>;
}

export enum SortableProofColumnEnum {
  SCHEMA_NAME = "SCHEMA_NAME",
  VERIFIER = "VERIFIER",
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
  profiles?: string[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  requestedDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  requestedDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  completedDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  completedDateBefore?: string;
}

export interface ProposeProofRequest {
  protocol: string;
  organisationId: string;
  engagement: string[];
  uiMessage?: string;
}

export interface ProposeProofResponse {
  proofId: string;
  interactionId: string;
  url?: string;
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
