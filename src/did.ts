import { KeyListItem } from "./key";
import { ListQuery, SortDirection } from "./list";

export enum DidTypeEnum {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export interface DidRequest {
  organisationId: string;
  name: string;
  didMethod: string;
  keys: DidRequestKeys;
  params: Record<string, string>;
}

export interface DidRequestKeys {
  authentication: Array<KeyListItem["id"]>;
  assertionMethod: Array<KeyListItem["id"]>;
  keyAgreement: Array<KeyListItem["id"]>;
  capabilityInvocation: Array<KeyListItem["id"]>;
  capabilityDelegation: Array<KeyListItem["id"]>;
}

export interface DidListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  did: string;
  didType: DidTypeEnum;
  didMethod: string;
  deactivated: boolean;
}

export enum SortableDidColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  METHOD = "METHOD",
  TYPE = "TYPE",
  DID = "DID",
  DEACTIVATED = "DEACTIVATED",
}

export enum ExactDidFilterColumnEnum {
  NAME = "NAME",
  DID = "DID",
}

export enum KeyRoleEnum {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
  CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION",
}

export interface DidListQuery extends ListQuery {
  sort?: SortableDidColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  did?: string;
  type?: DidTypeEnum;
  deactivated?: boolean;
  exact?: ExactDidFilterColumnEnum[];
  keyAlgorithms?: string[];
  keyRoles?: KeyRoleEnum[];
  keyStorages?: string[];
  keyIds?: Array<KeyListItem["id"]>;
  didMethods?: string[];
}
