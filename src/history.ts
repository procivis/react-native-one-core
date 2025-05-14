import { UnexportableEntities } from "./backup";
import { ListQuery } from "./list";

export enum HistoryActionEnum {
  ACCEPTED = "ACCEPTED",
  CREATED = "CREATED",
  DEACTIVATED = "DEACTIVATED",
  DELETED = "DELETED",
  ERRORED = "ERRORED",
  ISSUED = "ISSUED",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
  RESTORED = "RESTORED",
  SHARED = "SHARED",
  IMPORTED = "IMPORTED",
  CLAIMS_REMOVED = "CLAIMS_REMOVED",
  RETRACTED = "RETRACTED",
  ACTIVATED = "ACTIVATED",
  WITHDRAWN = "WITHDRAWN",
  REMOVED = "REMOVED",
  UPDATED = "UPDATED",
  REACTIVATED = "REACTIVATED",
  CSR_GENERATED = "CSR_GENERATED",
  EXPIRED = "EXPIRED",
}

export enum HistoryEntityTypeEnum {
  KEY = "KEY",
  DID = "DID",
  IDENTIFIER = "IDENTIFIER",
  CERTIFICATE = "CERTIFICATE",
  CREDENTIAL = "CREDENTIAL",
  CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
  PROOF = "PROOF",
  PROOF_SCHEMA = "PROOF_SCHEMA",
  ORGANISATION = "ORGANISATION",
  BACKUP = "BACKUP",
  TRUST_ANCHOR = "TRUST_ANCHOR",
  TRUST_ENTITY = "TRUST_ENTITY",
}

export enum HistorySearchTypeEnum {
  CLAIM_NAME = "CLAIM_NAME",
  CLAIM_VALUE = "CLAIM_VALUE",
  CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
  ISSUER_DID = "ISSUER_DID",
  ISSUER_NAME = "ISSUER_NAME",
  VERIFIER_DID = "VERIFIER_DID",
  VERIFIER_NAME = "VERIFIER_NAME",
  PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME",
}

export interface HistoryListQuery extends ListQuery {
  entityId?: string;
  action?: HistoryActionEnum;
  entityTypes?: HistoryEntityTypeEnum[];
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateFrom?: string;
  /** accepts the RFC3339 format, e.g. use the {@link Date.toISOString} */
  createdDateTo?: string;
  identifierId?: string;
  credentialId?: string;
  credentialSchemaId?: string;
  proofSchemaId?: string;
  searchText?: string;
  searchType?: HistorySearchTypeEnum;
}

export interface HistoryErrorMetadata {
  errorCode: string;
  message: string;
}

export type HistoryMetadata = UnexportableEntities | HistoryErrorMetadata;

export interface HistoryListItem {
  id: string;
  createdDate: string;
  action: HistoryActionEnum;
  name: string;
  target?: string;
  entityId?: string;
  entityType: HistoryEntityTypeEnum;
  organisationId: string;
  metadata?: HistoryMetadata;
}
