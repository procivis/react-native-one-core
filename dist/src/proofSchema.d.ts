import { CredentialSchema, CredentialSchemaLayoutProperties, LayoutType, KeyStorageSecurity } from "./credentialSchema";
import { ListQuery, SortDirection } from "./list";
export interface ProofInputClaimSchema {
    id: string;
    requested: boolean;
    required: boolean;
    key: string;
    dataType: string;
    claims: ProofInputClaimSchema[];
    array: boolean;
}
export interface ProofSchemaListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    deletedAt?: string;
    name: string;
    expireDuration: number;
}
export interface ProofSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    expireDuration: number;
    proofInputSchemas: ProofInputSchema[];
    importedSourceUrl?: string;
}
export interface ProofInputSchema {
    claimSchemas: ProofInputClaimSchema[];
    credentialSchema: CredentialSchema;
    validityConstraint?: number;
}
export interface ShareProofSchemaResponse {
    url: string;
}
export declare enum SortableProofSchemasColumnEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum ExactProofSchemaFilterColumnEnum {
    NAME = "NAME"
}
export interface ProofSchemaListQuery extends ListQuery {
    sort?: SortableProofSchemasColumnEnum;
    sortDirection?: SortDirection;
    name?: string;
    exact?: ExactProofSchemaFilterColumnEnum[];
    ids?: Array<ProofSchema["id"]>;
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
export interface ImportProofSchemaRequest {
    organisationId: string;
    schema: ImportProofSchema;
}
export interface ImportProofSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    importedSourceUrl: string;
    expireDuration: number;
    proofInputSchemas: ImportProofSchemaInputSchema[];
}
export interface ImportProofSchemaInputSchema {
    claimSchemas: ImportProofSchemaClaimSchema[];
    credentialSchema: ImportProofSchemaCredentialSchema;
    validityConstraint?: number;
}
export interface ImportProofSchemaClaimSchema {
    id: string;
    requested: boolean;
    required: boolean;
    key: string;
    dataType: string;
    claims?: ImportProofSchemaClaimSchema[];
    array: boolean;
}
export interface ImportProofSchemaCredentialSchema {
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
export interface CreateProofSchemaRequest {
    name: string;
    organisationId: string;
    expireDuration: number;
    proofInputSchemas: ProofInputSchemaRequest[];
}
export interface ProofInputSchemaRequest {
    credentialSchemaId: string;
    validityConstraint?: number;
    claimSchemas: ProofSchemaClaimRequest[];
}
export interface ProofSchemaClaimRequest {
    id: string;
    required: boolean;
}
