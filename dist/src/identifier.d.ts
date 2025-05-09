import { DidRequestKeys, KeyRoleEnum } from "./did";
import { KeyListItem } from "./key";
import { ListQuery, SortDirection } from "./list";
export declare enum IdentifierStatusEnum {
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
}
export interface CreateIdentifierDidRequest {
    name?: string;
    method: string;
    keys: DidRequestKeys;
    params: Record<string, string>;
}
export interface IdentifierListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    type: IdentifierTypeEnum;
    isRemote: boolean;
    status: IdentifierStatusEnum;
}
export declare enum SortableIdentifierColumnEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE",
    STATUS = "STATUS"
}
export declare enum ExactIdentifierFilterColumnEnum {
    NAME = "NAME"
}
export interface IdentifierListQuery extends ListQuery {
    sort?: SortableIdentifierColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    type?: IdentifierTypeEnum;
    status?: IdentifierStatusEnum;
    exact?: ExactIdentifierFilterColumnEnum[];
    didMethods?: string[];
    isRemote?: boolean;
    keyAlgorithms?: string[];
    keyRoles?: KeyRoleEnum[];
    keyStorages?: string[];
}
