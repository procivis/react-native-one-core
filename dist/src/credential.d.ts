import { DataTypeEnum } from "./config";
import { CredentialSchema, WalletStorageType } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
import { IdentifierListItem } from "./identifier";
export declare enum CredentialStateEnum {
    CREATED = "CREATED",
    PENDING = "PENDING",
    OFFERED = "OFFERED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    REVOKED = "REVOKED",
    SUSPENDED = "SUSPENDED",
    ERROR = "ERROR"
}
export type ClaimValue = {
    dataType: DataTypeEnum.String | DataTypeEnum.Date | DataTypeEnum.Picture | DataTypeEnum.SwiyuPicture;
    value: string;
    array: false;
} | {
    dataType: DataTypeEnum.Number;
    value: number;
    array: false;
} | {
    dataType: DataTypeEnum.Boolean;
    value: boolean;
    array: false;
} | {
    dataType: DataTypeEnum.Object;
    value: Claim[];
    array: false;
} | {
    dataType: string;
    value: string | number | boolean;
    array: false;
} | {
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
export interface CredentialDetail extends Omit<CredentialListItem, "issuerDid" | "issuer"> {
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
export declare enum CredentialRoleEnum {
    HOLDER = "HOLDER",
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER"
}
export declare enum CredentialListQueryExactColumnEnum {
    NAME = "NAME"
}
export declare enum SortableCredentialColumnEnum {
    CREATED_DATE = "CREATED_DATE",
    SCHEMA_NAME = "SCHEMA_NAME",
    ISSUER = "ISSUER",
    STATE = "STATE"
}
export declare enum CredentialListIncludeEntityType {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
    CREDENTIAL = "CREDENTIAL"
}
export declare enum CredentialListSearchType {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME"
}
export type CredentialListQuery = ListQuery & {
    sort?: SortableCredentialColumnEnum;
    sortDirection?: SortDirection;
    exact?: CredentialListQueryExactColumnEnum[];
    roles?: CredentialRoleEnum[];
    ids?: Array<CredentialListItem["id"]>;
    states?: CredentialStateEnum[];
    profiles?: string[];
    credentialSchemaIds?: Array<CredentialSchema["id"]>;
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
} & ({
    name?: string;
    searchType?: never;
    searchText?: never;
} | {
    searchText?: string;
    searchType?: CredentialListSearchType[];
    name?: never;
});
export interface CredentialRevocationCheckResponse {
    credentialId: string;
    status: CredentialStateEnum;
    success: boolean;
    reason?: string;
}
export interface InvitationResultCredentialIssuance {
    /** For reference. */
    interactionId: string;
    /** Metadata for entering a transaction code.
     * If a pre-authorized code is issued with a transaction code object, the wallet
     * user must input a transaction code to receive the offered credential. This code
     * is typically sent through a separate channel such as SMS or email.
     */
    txCode?: OpenID4VCITxCode;
    /** Required storage type for holder binding key */
    walletStorageType?: WalletStorageType;
}
export interface OpenID4VCITxCode {
    inputMode?: OpenID4VCITxCodeInputMode;
    length?: number;
    description?: string;
}
export declare enum OpenID4VCITxCodeInputMode {
    NUMERIC = "NUMERIC",
    TEXT = "TEXT"
}
/** OID4VCI authorization request parameters. Use either `scope` or `authorizationDetails`. */
export interface InitiateIssuanceRequest {
    organisationId: string;
    protocol: string;
    /** Issuer URL */
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
    /** For reference. */
    interactionId: string;
    /** Required storage type for holder binding key */
    walletStorageType?: WalletStorageType;
}
export interface OpenID4VCIProofTypeSupported {
    proofSigningAlgValuesSupported: string[];
}
export interface AuthorizationCodeFlow {
    /** For reference. */
    interactionId: string;
    /** For issuer-initiated Authorization Code Flows, use this URL to start
     * the authorization process with the authorization server. */
    authorizationCodeFlowUrl: string;
}
export interface HolderAcceptCredentialRequest {
    interactionId: string;
    didId?: string;
    identifierId?: string;
    keyId?: string;
    txCode?: string;
    holderWalletUnitId?: string;
}
