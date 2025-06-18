import { ListQuery, SortDirection } from "./list";
import { DidListItem } from "./did";
import { CertificateStateEnum, IdentifierListItem, X509Attributes } from "./identifier";
import { UpsertOrganisationRequest } from "./organisation";
export type CreateTrustAnchorRequest = {
    name: string;
    type: string;
} & ({
    isPublisher: true;
    publisherReference?: never;
} | {
    isPublisher?: false;
    publisherReference: string;
});
export interface TrustAnchor {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    type: string;
    isPublisher: boolean;
    publisherReference: string;
}
export interface TrustAnchorListItem extends TrustAnchor {
    entities: number;
}
export declare enum SortableTrustAnchorColumnEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE"
}
export declare enum ExactTrustAnchorFilterColumnEnum {
    NAME = "NAME",
    TYPE = "TYPE"
}
export interface TrustAnchorListQuery extends Omit<ListQuery, "organisationId"> {
    sort?: SortableTrustAnchorColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    exact?: ExactTrustAnchorFilterColumnEnum[];
    type?: string;
    isPublisher?: boolean;
}
export interface TrustEntityListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleEnum;
    state: TrustEntityStateEnum;
    did?: DidListItem;
    trustAnchor: TrustAnchor;
}
export interface RemoteTrustEntity extends TrustEntityListItem {
    organisationId?: string;
}
export interface TrustEntity extends RemoteTrustEntity {
    entityKey: string;
    type: TrustEntityTypeEnum;
    identifier?: IdentifierListItem;
    content?: string;
    ca?: TrustEntityCertificate;
}
export interface TrustEntityCertificate extends X509Attributes {
    state: CertificateStateEnum;
    publicKey: string;
    commonName?: string;
}
export declare enum TrustEntityRoleEnum {
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER",
    BOTH = "BOTH"
}
export declare enum TrustEntityStateEnum {
    ACTIVE = "ACTIVE",
    REMOVED = "REMOVED",
    WITHDRAWN = "WITHDRAWN",
    REMOVED_AND_WITHDRAWN = "REMOVED_AND_WITHDRAWN"
}
export declare enum TrustEntityTypeEnum {
    Did = "DID",
    CertificateAuthority = "CA"
}
export interface CreateTrustEntityRequest {
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleEnum;
    trustAnchorId: TrustAnchor["id"];
    didId?: DidListItem["id"];
    type: TrustEntityTypeEnum;
    identifierId?: IdentifierListItem["id"];
    content?: string;
    organisationId: UpsertOrganisationRequest["id"];
}
export interface TrustEntityListQuery {
    sort?: SortableTrustEntityColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    exact?: ExactTrustEntityFilterColumnEnum[];
    type?: string;
    isPublisher?: boolean;
}
export declare enum SortableTrustEntityColumnEnum {
    NAME = "NAME",
    ROLE = "ROLE"
}
export declare enum ExactTrustEntityFilterColumnEnum {
    NAME = "NAME"
}
export interface CreateRemoteTrustEntityRequest {
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleEnum;
    trustAnchorId?: TrustAnchor["id"];
    didId: DidListItem["id"];
}
export interface UpdateRemoteTrustEntityRequest {
    didId: DidListItem["id"];
    action?: TrustEntityUpdateActionEnum;
    name?: string;
    logo?: string | null;
    website?: string | null;
    termsUrl?: string | null;
    privacyUrl?: string | null;
    role?: TrustEntityRoleEnum;
    content?: string;
}
export declare enum TrustEntityUpdateActionEnum {
    ACTIVATE = "ACTIVATE",
    WITHDRAW = "WITHDRAW",
    REMOVE = "REMOVE"
}
