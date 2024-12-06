import { DataTypeEnum } from "./config";
import { CredentialSchema } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
import {DidListItem} from "./did";

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
  issuanceDate: string;
  lastModified: string;
  revocationDate?: string;
  issuerDid?: string;
  state: CredentialStateEnum;
  schema: CredentialSchema;
  role: CredentialRoleEnum;
  suspendEndDate?: string;
}

export interface CredentialDetail extends Omit<CredentialListItem, "issuerDid"> {
  claims: Claim[];
  redirectUri?: string;
  lvvcIssuanceDate?: string;
  mdocMsoValidity?: MdocMsoValidity;
  issuerDid?: DidListItem
  holderDid?: DidListItem
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
  ISSUER_DID = "ISSUER_DID",
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
  include?: CredentialListIncludeEntityType[];
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
}

export interface OpenID4VCITxCode {
  inputMode?: OpenID4VCITxCodeInputMode;
  length?: number;
  description?: string;
}

export enum OpenID4VCITxCodeInputMode {
  NUMERIC = "NUMERIC",
  TEXT = "TEXT"
}
