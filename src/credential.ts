import { DataTypeEnum } from "./config";
import { CredentialSchema } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
import { IdentifierListItem } from "./identifier";

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
  issuanceDate?: string;
  lastModified: string;
  revocationDate?: string;
  issuer?: IdentifierListItem["id"];
  state: CredentialStateEnum;
  schema: CredentialSchema;
  role: CredentialRoleEnum;
  suspendEndDate?: string;
  protocol: string;
  profile?: string;
}

export interface CredentialDetail
  extends Omit<CredentialListItem, "issuerDid" | "issuer"> {
  claims: Claim[];
  redirectUri?: string;
  lvvcIssuanceDate?: string;
  mdocMsoValidity?: MdocMsoValidity;
  issuer?: IdentifierListItem;
  holder?: IdentifierListItem;
}

export interface MdocMsoValidity {
  expiration: string;
  nextUpdate: string;
  lastUpdate: string;
}

export enum CredentialRoleEnum {
  HOLDER = "HOLDER",
  ISSUER = "ISSUER",
  VERIFIER = "VERIFIER",
}

export enum CredentialListQueryExactColumnEnum {
  NAME = "NAME",
}

export enum SortableCredentialColumnEnum {
  CREATED_DATE = "CREATED_DATE",
  SCHEMA_NAME = "SCHEMA_NAME",
  ISSUER = "ISSUER",
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
  profile?: string;
  include?: CredentialListIncludeEntityType[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  issuanceDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  issuanceDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  revocationDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  revocationDateBefore?: string;
} & (
    | { name?: string; searchType?: never; searchText?: never }
    | {
        searchText?: string;
        searchType?: CredentialListSearchType[];
        name?: never;
      }
  );

export interface CredentialRevocationCheckResponse {
  credentialId: string;
  status: CredentialStateEnum;
  success: boolean;
  reason?: string;
}

export interface InvitationResultCredentialIssuance {
  interactionId: string;
  credentialIds: Array<CredentialListItem["id"]>;
  txCode?: OpenID4VCITxCode;
  credentialConfigurationsSupported: Record<
    CredentialListItem["id"],
    CredentialConfigurationSupported
  >;
}

export interface OpenID4VCITxCode {
  inputMode?: OpenID4VCITxCodeInputMode;
  length?: number;
  description?: string;
}

export enum OpenID4VCITxCodeInputMode {
  NUMERIC = "NUMERIC",
  TEXT = "TEXT",
}

export interface InitiateIssuanceRequest {
  organisationId: string;
  protocol: string;
  issuer: string;
  clientId: string;
  redirectUri?: string;
  scope?: string[];
  authorizationDetails?: InitiateIssuanceAuthorizationDetail[];
}

export interface InitiateIssuanceAuthorizationDetail {
  type: string;
  credentialConfigurationId: string;
}

export interface InitiateIssuanceResponse {
  url: string;
}

export interface ContinueIssuanceResponse {
  interactionId: string;
  credentialIds: Array<CredentialListItem["id"]>;
  credentialConfigurationsSupported: Record<
    CredentialListItem["id"],
    CredentialConfigurationSupported
  >;
}

export interface CredentialConfigurationSupported {
  proofTypesSupported: Record<string, OpenID4VCIProofTypeSupported>;
}

export interface OpenID4VCIProofTypeSupported {
  proofSigningAlgValuesSupported: string[];
}
