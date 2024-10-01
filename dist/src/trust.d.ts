import { ListQuery, SortDirection } from "./list";
export declare enum TrustAnchorRoleEnum {
    PUBLISHER = "PUBLISHER",
    CLIENT = "CLIENT"
}
export interface CreateTrustAnchorRequest {
    name: string;
    type: string;
    publisherReference?: string;
    role: TrustAnchorRoleEnum;
    priority?: number;
    organisationId: string;
}
export interface TrustAnchor {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    type: string;
    publisherReference?: string;
    role: TrustAnchorRoleEnum;
    priority?: number;
    organisationId: string;
}
export interface TrustAnchorListItem extends TrustAnchor {
    entities: number;
}
export declare enum SortableTrustAnchorColumnEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE",
    ROLE = "ROLE",
    PRIORITY = "PRIORITY"
}
export declare enum ExactTrustAnchorFilterColumnEnum {
    NAME = "NAME",
    TYPE = "TYPE"
}
export interface TrustAnchorListQuery extends ListQuery {
    sort?: SortableTrustAnchorColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    exact?: ExactTrustAnchorFilterColumnEnum[];
    type?: string;
    role?: TrustAnchorRoleEnum;
}
