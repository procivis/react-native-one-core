import { ListQuery, SortDirection } from "./list";

export type CreateTrustAnchorRequest = {
  name: string;
  type: string;
} & (
  | {
      isPublisher: true;
      publisherReference?: never;
    }
  | {
      isPublisher?: false;
      publisherReference: string;
    }
);

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
  isPublisher?: boolean;
}
