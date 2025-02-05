import { ListQuery, SortDirection } from "./list";
export interface ImportCredentialSchemaRequest {
    organisationId: string;
    schema: ImportCredentialSchemaRequestSchema;
}
export interface ImportCredentialSchemaRequestSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod: string;
    organisationId: string;
    importedSourceUrl: string;
    claims: ImportCredentialSchemaClaimSchema[];
    walletStorageType?: WalletStorageType;
    schemaId: string;
    schemaType: CredentialSchemaType;
    layoutType?: LayoutType;
    layoutProperties?: ImportCredentialSchemaLayoutProperties;
    allowSuspension?: boolean;
}
export interface ImportCredentialSchemaClaimSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    required: boolean;
    key: string;
    datatype: string;
    claims?: ImportCredentialSchemaClaimSchema[];
    array?: boolean;
}
export interface ImportCredentialSchemaLayoutProperties {
    background?: CredentialSchemaBackgroundProperties;
    logo?: CredentialSchemaLogoProperties;
    primaryAttribute?: string;
    secondaryAttribute?: string;
    pictureAttribute?: string;
    code?: CredentialSchemaCodeProperties;
}
export interface ShareCredentialSchemaResponse {
    url: string;
}
export declare enum CredentialSchemaListIncludeEntityType {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES"
}
export declare enum SortableCredentialSchemaColumnEnum {
    NAME = "NAME",
    FORMAT = "FORMAT",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum ExactCredentialSchemaFilterColumnEnum {
    NAME = "NAME"
}
export interface CredentialSchemaListQuery extends ListQuery {
    sort?: SortableCredentialSchemaColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    ids?: string[];
    exact?: ExactCredentialSchemaFilterColumnEnum[];
    include?: CredentialSchemaListIncludeEntityType[];
}
export declare enum WalletStorageType {
    HARDWARE = "HARDWARE",
    SOFTWARE = "SOFTWARE",
    REMOTE_SECURE_ELEMENT = "REMOTE_SECURE_ELEMENT"
}
export declare enum KnownCredentialSchemaType {
    PROCIVIS_ONE_SCHEMA2024 = "PROCIVIS_ONE_SCHEMA2024",
    FALLBACK_SCHEMA2024 = "FALLBACK_SCHEMA2024",
    MDOC = "MDOC"
}
export type CredentialSchemaType = KnownCredentialSchemaType | string;
export declare enum LayoutType {
    CARD = "CARD",
    DOCUMENT = "DOCUMENT",
    SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE"
}
export interface CredentialSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod: string;
    walletStorageType?: WalletStorageType;
    schemaId: string;
    importedSourceUrl: string;
    schemaType: CredentialSchemaType;
    layoutType?: LayoutType;
    layoutProperties?: CredentialSchemaLayoutProperties;
}
export interface CredentialSchemaDetail extends CredentialSchema {
    claims: ClaimSchema[];
}
export interface ClaimSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    key: string;
    datatype: string;
    required: boolean;
    array: boolean;
    claims: ClaimSchema[];
}
export interface CredentialSchemaLayoutProperties {
    background?: CredentialSchemaBackgroundProperties;
    logo?: CredentialSchemaLogoProperties;
    primaryAttribute?: string;
    secondaryAttribute?: string;
    pictureAttribute?: string;
    code?: CredentialSchemaCodeProperties;
}
export interface CredentialSchemaBackgroundProperties {
    color?: string;
    image?: string;
}
export interface CredentialSchemaLogoProperties {
    fontColor?: string;
    backgroundColor?: string;
    image?: string;
}
export interface CredentialSchemaCodeProperties {
    attribute: string;
    type: CredentialSchemaCodeType;
}
export declare enum CredentialSchemaCodeType {
    BARCODE = "BARCODE",
    MRZ = "MRZ",
    QR_CODE = "QR_CODE"
}
