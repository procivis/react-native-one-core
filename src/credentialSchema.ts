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
  keyStorageSecurity?: KeyStorageSecurity;
  schemaId: string;
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

export enum CredentialSchemaListIncludeEntityType {
  LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
}

export enum SortableCredentialSchemaColumnEnum {
  NAME = "NAME",
  FORMAT = "FORMAT",
  CREATED_DATE = "CREATED_DATE",
}

export enum ExactCredentialSchemaFilterColumnEnum {
  NAME = "NAME",
  SCHEMA_ID = "SCHEMA_ID",
}

export interface CredentialSchemaListQuery extends ListQuery {
  sort?: SortableCredentialSchemaColumnEnum;
  sortDirection?: SortDirection;
  name?: string;
  ids?: string[];
  exact?: ExactCredentialSchemaFilterColumnEnum[];
  include?: CredentialSchemaListIncludeEntityType[];
  schemaId?: string;
  formats?: string[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateBefore?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedAfter?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  lastModifiedBefore?: string;
}

export enum KeyStorageSecurity {
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  ENHANCED_BASIC = "ENHANCED_BASIC",
  BASIC = "BASIC",
}

export enum LayoutType {
  CARD = "CARD",
  DOCUMENT = "DOCUMENT",
  SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE",
}

export interface CredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
  keyStorageSecurity?: KeyStorageSecurity;
  schemaId: string;
  importedSourceUrl: string;
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

export enum CredentialSchemaCodeType {
  BARCODE = "BARCODE",
  MRZ = "MRZ",
  QR_CODE = "QR_CODE",
}
