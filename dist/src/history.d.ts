import { UnexportableEntities } from "./backup";
import { ListQuery } from "./list";
export declare enum HistoryActionEnum {
    ACCEPTED = "ACCEPTED",
    CREATED = "CREATED",
    DEACTIVATED = "DEACTIVATED",
    DELETED = "DELETED",
    ISSUED = "ISSUED",
    OFFERED = "OFFERED",
    REACTIVATED = "REACTIVATED",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED",
    REVOKED = "REVOKED",
    PENDING = "PENDING",
    SUSPENDED = "SUSPENDED",
    RESTORED = "RESTORED",
    ERRORED = "ERRORED",
    SHARED = "SHARED",
    IMPORTED = "IMPORTED",
    CLAIMS_REMOVED = "CLAIMS_REMOVED"
}
export declare enum HistoryEntityTypeEnum {
    KEY = "KEY",
    DID = "DID",
    CREDENTIAL = "CREDENTIAL",
    CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
    PROOF = "PROOF",
    PROOF_SCHEMA = "PROOF_SCHEMA",
    ORGANISATION = "ORGANISATION",
    BACKUP = "BACKUP"
}
export declare enum HistorySearchTypeEnum {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
    ISSUER_DID = "ISSUER_DID",
    ISSUER_NAME = "ISSUER_NAME",
    VERIFIER_DID = "VERIFIER_DID",
    VERIFIER_NAME = "VERIFIER_NAME",
    PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME"
}
export interface HistoryListQuery extends ListQuery {
    entityId?: string;
    action?: HistoryActionEnum;
    entityTypes?: HistoryEntityTypeEnum[];
    /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
    createdDateFrom?: string;
    /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
    createdDateTo?: string;
    didId?: string;
    credentialId?: string;
    credentialSchemaId?: string;
    proofSchemaId?: string;
    searchText?: string;
    searchType?: HistorySearchTypeEnum;
}
export type HistoryMetadata = UnexportableEntities;
export interface HistoryListItem {
    id: string;
    createdDate: string;
    action: HistoryActionEnum;
    entityId?: string;
    entityType: HistoryEntityTypeEnum;
    organisationId: string;
    metadata?: HistoryMetadata;
}
