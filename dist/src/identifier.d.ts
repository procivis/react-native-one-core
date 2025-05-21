import { DidRequestKeys, DidTypeEnum, KeyRoleEnum } from "./did";
import { KeyListItem } from "./key";
import { ListQuery, SortDirection } from "./list";
export declare enum IdentifierStateEnum {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum IdentifierTypeEnum {
    KEY = "KEY",
    DID = "DID",
    CERTIFICATE = "CERTIFICATE"
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
export interface IdentifierDetail {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    type: IdentifierTypeEnum;
    isRemote: boolean;
    state: IdentifierStateEnum;
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
export declare enum CertificateStateEnum {
    NOT_YET_ACTIVE = "NOT_YET_ACTIVE",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED"
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
export interface IdentifierListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    type: IdentifierTypeEnum;
    isRemote: boolean;
    state: IdentifierStateEnum;
}
export declare enum SortableIdentifierColumnEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE",
    STATE = "STATE"
}
export declare enum ExactIdentifierFilterColumnEnum {
    NAME = "NAME"
}
export interface IdentifierListQuery extends ListQuery {
    sort?: SortableIdentifierColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    types?: IdentifierTypeEnum[];
    state?: IdentifierStateEnum;
    exact?: ExactIdentifierFilterColumnEnum[];
    didMethods?: string[];
    isRemote?: boolean;
    keyAlgorithms?: string[];
    keyRoles?: KeyRoleEnum[];
    keyStorages?: string[];
}
