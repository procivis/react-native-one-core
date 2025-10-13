import { DidRequestKeys, DidTypeEnum, KeyRoleEnum } from "./did";
import { KeyListItem } from "./key";
import { ListQuery, SortDirection } from "./list";

export enum IdentifierStateEnum {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
}

export enum IdentifierTypeEnum {
  KEY = "KEY",
  DID = "DID",
  CERTIFICATE = "CERTIFICATE",
}

export interface CreateIdentifierRequest {
  organisationId: string;
  name: string;
  keyId?: KeyListItem["id"];
  did?: CreateIdentifierDidRequest;
  certificates?: CreateIdentifierCertificateRequest[];
}

export interface CreateIdentifierDidRequest {
  name?: string;
  method: string;
  keys: DidRequestKeys;
  params: Record<string, string>;
}

export interface CreateIdentifierCertificateRequest {
  name?: string;
  chain: string;
  keyId: string;
}

export interface IdentifierListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  type: IdentifierTypeEnum;
  isRemote: boolean;
  state: IdentifierStateEnum;
  organisationId?: string;
}

export interface IdentifierDetail extends IdentifierListItem {
  did?: IdentifierDidDetail;
  key?: IdentifierKeyDetail;
  certificates?: IdentifierCertificateDetail[];
}

export interface IdentifierDidDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId: string;
  did: string;
  didType: DidTypeEnum;
  didMethod: string;
  keys: {
    authentication: KeyListItem[];
    assertionMethod: KeyListItem[];
    keyAgreement: KeyListItem[];
    capabilityInvocation: KeyListItem[];
    capabilityDelegation: KeyListItem[];
  };
  deactivated: boolean;
}

export interface IdentifierKeyDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  organisationId: string;
  name: string;
  publicKey: number[];
  keyType: string;
  storageType: string;
}

export interface IdentifierCertificateDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  state: CertificateStateEnum;
  name: string;
  chain: string;
  key: KeyListItem;
  x509Attributes: X509Attributes;
}

export enum CertificateStateEnum {
  NOT_YET_ACTIVE = "NOT_YET_ACTIVE",
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
}

export interface X509Attributes {
  serialNumber: string;
  notBefore: string;
  notAfter: string;
  issuer: string;
  subject: string;
  fingerprint: string;
  extensions: X509Extension[];
}

export interface X509Extension {
  oid: string;
  value: string;
  critical: boolean;
}

export enum SortableIdentifierColumnEnum {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  TYPE = "TYPE",
  STATE = "STATE",
}

export enum ExactIdentifierFilterColumnEnum {
  NAME = "NAME",
}

export interface IdentifierListQuery extends ListQuery {
  sort?: SortableIdentifierColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  types?: IdentifierTypeEnum[];
  states?: IdentifierStateEnum[];
  exact?: ExactIdentifierFilterColumnEnum[];
  didMethods?: string[];
  isRemote?: boolean;
  keyAlgorithms?: string[];
  keyRoles?: KeyRoleEnum[];
  keyStorages?: string[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedBefore?: string;
}
