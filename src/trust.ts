import { ListQuery, SortDirection } from "./list";

export enum TrustAnchorRoleEnum {
  PUBLISHER = "PUBLISHER",
  CLIENT = "CLIENT",
}

export interface CreateTrustAnchorRequest {
  name: string;
  type: string;
  publisherReference?: string;
  role: TrustAnchorRoleEnum;
}

export interface TrustAnchor {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  type: string;
  publisherReference?: string;
  role: TrustAnchorRoleEnum;
}

export interface TrustAnchorListItem extends TrustAnchor {
  entities: number;
}

export enum SortableTrustAnchorColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  TYPE = "TYPE",
}

export enum ExactTrustAnchorFilterColumnEnum {
  NAME = "NAME",
  TYPE = "TYPE",
}

export interface TrustAnchorListQuery
  extends Omit<ListQuery, "organisationId"> {
  sort?: SortableTrustAnchorColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  exact?: ExactTrustAnchorFilterColumnEnum[];
  type?: string;
  role?: TrustAnchorRoleEnum;
}
