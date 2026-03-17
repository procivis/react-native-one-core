// ==========
// Record definitions:
// ==========
export var CacheType;
(function (CacheType) {
    CacheType["DID_DOCUMENT"] = "DID_DOCUMENT";
    CacheType["JSON_LD_CONTEXT"] = "JSON_LD_CONTEXT";
    CacheType["STATUS_LIST_CREDENTIAL"] = "STATUS_LIST_CREDENTIAL";
    CacheType["VCT_METADATA"] = "VCT_METADATA";
    CacheType["JSON_SCHEMA"] = "JSON_SCHEMA";
    CacheType["TRUST_LIST"] = "TRUST_LIST";
    CacheType["X509_CRL"] = "X509_CRL";
    CacheType["ANDROID_ATTESTATION_CRL"] = "ANDROID_ATTESTATION_CRL";
    CacheType["OPEN_ID_METADATA"] = "OPEN_ID_METADATA";
})(CacheType || (CacheType = {}));
export var CertificateState;
(function (CertificateState) {
    CertificateState["NOT_YET_ACTIVE"] = "NOT_YET_ACTIVE";
    CertificateState["ACTIVE"] = "ACTIVE";
    CertificateState["REVOKED"] = "REVOKED";
    CertificateState["EXPIRED"] = "EXPIRED";
})(CertificateState || (CertificateState = {}));
export var CharacteristicPermission;
(function (CharacteristicPermission) {
    CharacteristicPermission["READ"] = "READ";
    CharacteristicPermission["WRITE"] = "WRITE";
})(CharacteristicPermission || (CharacteristicPermission = {}));
export var CharacteristicProperty;
(function (CharacteristicProperty) {
    CharacteristicProperty["READ"] = "READ";
    CharacteristicProperty["WRITE"] = "WRITE";
    CharacteristicProperty["NOTIFY"] = "NOTIFY";
    CharacteristicProperty["WRITE_WITHOUT_RESPONSE"] = "WRITE_WITHOUT_RESPONSE";
    CharacteristicProperty["INDICATE"] = "INDICATE";
})(CharacteristicProperty || (CharacteristicProperty = {}));
export var CharacteristicWriteType;
(function (CharacteristicWriteType) {
    CharacteristicWriteType["WITH_RESPONSE"] = "WITH_RESPONSE";
    CharacteristicWriteType["WITHOUT_RESPONSE"] = "WITHOUT_RESPONSE";
})(CharacteristicWriteType || (CharacteristicWriteType = {}));
export var ClientIdScheme;
(function (ClientIdScheme) {
    ClientIdScheme["REDIRECT_URI"] = "REDIRECT_URI";
    ClientIdScheme["VERIFIER_ATTESTATION"] = "VERIFIER_ATTESTATION";
    ClientIdScheme["DID"] = "DID";
    ClientIdScheme["X509_SAN_DNS"] = "X509_SAN_DNS";
})(ClientIdScheme || (ClientIdScheme = {}));
export var CreateSelfSignedCaRequestIssuerAlternativeNameType;
(function (CreateSelfSignedCaRequestIssuerAlternativeNameType) {
    CreateSelfSignedCaRequestIssuerAlternativeNameType["EMAIL"] = "EMAIL";
    CreateSelfSignedCaRequestIssuerAlternativeNameType["URI"] = "URI";
})(CreateSelfSignedCaRequestIssuerAlternativeNameType || (CreateSelfSignedCaRequestIssuerAlternativeNameType = {}));
export var CredentialListIncludeEntityType;
(function (CredentialListIncludeEntityType) {
    CredentialListIncludeEntityType["LAYOUT_PROPERTIES"] = "LAYOUT_PROPERTIES";
    CredentialListIncludeEntityType["CREDENTIAL"] = "CREDENTIAL";
})(CredentialListIncludeEntityType || (CredentialListIncludeEntityType = {}));
export var CredentialListQueryExactColumn;
(function (CredentialListQueryExactColumn) {
    CredentialListQueryExactColumn["NAME"] = "NAME";
})(CredentialListQueryExactColumn || (CredentialListQueryExactColumn = {}));
export var CredentialListQuerySearchType;
(function (CredentialListQuerySearchType) {
    CredentialListQuerySearchType["CLAIM_NAME"] = "CLAIM_NAME";
    CredentialListQuerySearchType["CLAIM_VALUE"] = "CLAIM_VALUE";
    CredentialListQuerySearchType["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
})(CredentialListQuerySearchType || (CredentialListQuerySearchType = {}));
export var CredentialQueryFailureReason;
(function (CredentialQueryFailureReason) {
    CredentialQueryFailureReason["NO_CREDENTIAL"] = "NO_CREDENTIAL";
    CredentialQueryFailureReason["VALIDITY"] = "VALIDITY";
    CredentialQueryFailureReason["CONSTRAINT"] = "CONSTRAINT";
})(CredentialQueryFailureReason || (CredentialQueryFailureReason = {}));
export var CredentialRole;
(function (CredentialRole) {
    CredentialRole["HOLDER"] = "HOLDER";
    CredentialRole["ISSUER"] = "ISSUER";
    CredentialRole["VERIFIER"] = "VERIFIER";
})(CredentialRole || (CredentialRole = {}));
export var CredentialSchemaCodeType;
(function (CredentialSchemaCodeType) {
    CredentialSchemaCodeType["BARCODE"] = "BARCODE";
    CredentialSchemaCodeType["MRZ"] = "MRZ";
    CredentialSchemaCodeType["QR_CODE"] = "QR_CODE";
})(CredentialSchemaCodeType || (CredentialSchemaCodeType = {}));
export var CredentialSchemaListIncludeEntityType;
(function (CredentialSchemaListIncludeEntityType) {
    CredentialSchemaListIncludeEntityType["LAYOUT_PROPERTIES"] = "LAYOUT_PROPERTIES";
})(CredentialSchemaListIncludeEntityType || (CredentialSchemaListIncludeEntityType = {}));
export var CredentialSchemaListQueryExactColumn;
(function (CredentialSchemaListQueryExactColumn) {
    CredentialSchemaListQueryExactColumn["NAME"] = "NAME";
    CredentialSchemaListQueryExactColumn["SCHEMA_ID"] = "SCHEMA_ID";
})(CredentialSchemaListQueryExactColumn || (CredentialSchemaListQueryExactColumn = {}));
export var CredentialState;
(function (CredentialState) {
    CredentialState["CREATED"] = "CREATED";
    CredentialState["PENDING"] = "PENDING";
    CredentialState["OFFERED"] = "OFFERED";
    CredentialState["ACCEPTED"] = "ACCEPTED";
    CredentialState["REJECTED"] = "REJECTED";
    CredentialState["REVOKED"] = "REVOKED";
    CredentialState["SUSPENDED"] = "SUSPENDED";
    CredentialState["ERROR"] = "ERROR";
    CredentialState["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
})(CredentialState || (CredentialState = {}));
export var DidListQueryExactColumn;
(function (DidListQueryExactColumn) {
    DidListQueryExactColumn["NAME"] = "NAME";
    DidListQueryExactColumn["DID"] = "DID";
})(DidListQueryExactColumn || (DidListQueryExactColumn = {}));
export var DidType;
(function (DidType) {
    DidType["LOCAL"] = "LOCAL";
    DidType["REMOTE"] = "REMOTE";
})(DidType || (DidType = {}));
export var HistoryAction;
(function (HistoryAction) {
    HistoryAction["ACCEPTED"] = "ACCEPTED";
    HistoryAction["CREATED"] = "CREATED";
    HistoryAction["CSR_GENERATED"] = "CSR_GENERATED";
    HistoryAction["DEACTIVATED"] = "DEACTIVATED";
    HistoryAction["DELETED"] = "DELETED";
    HistoryAction["ERRORED"] = "ERRORED";
    HistoryAction["ISSUED"] = "ISSUED";
    HistoryAction["OFFERED"] = "OFFERED";
    HistoryAction["REJECTED"] = "REJECTED";
    HistoryAction["REQUESTED"] = "REQUESTED";
    HistoryAction["REVOKED"] = "REVOKED";
    HistoryAction["SUSPENDED"] = "SUSPENDED";
    HistoryAction["PENDING"] = "PENDING";
    HistoryAction["RESTORED"] = "RESTORED";
    HistoryAction["SHARED"] = "SHARED";
    HistoryAction["IMPORTED"] = "IMPORTED";
    HistoryAction["CLAIMS_REMOVED"] = "CLAIMS_REMOVED";
    HistoryAction["ACTIVATED"] = "ACTIVATED";
    HistoryAction["WITHDRAWN"] = "WITHDRAWN";
    HistoryAction["REMOVED"] = "REMOVED";
    HistoryAction["RETRACTED"] = "RETRACTED";
    HistoryAction["UPDATED"] = "UPDATED";
    HistoryAction["REACTIVATED"] = "REACTIVATED";
    HistoryAction["EXPIRED"] = "EXPIRED";
    HistoryAction["INTERACTION_CREATED"] = "INTERACTION_CREATED";
    HistoryAction["INTERACTION_ERRORED"] = "INTERACTION_ERRORED";
    HistoryAction["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
    HistoryAction["DELIVERED"] = "DELIVERED";
})(HistoryAction || (HistoryAction = {}));
export var HistoryEntityType;
(function (HistoryEntityType) {
    HistoryEntityType["KEY"] = "KEY";
    HistoryEntityType["DID"] = "DID";
    HistoryEntityType["IDENTIFIER"] = "IDENTIFIER";
    HistoryEntityType["CERTIFICATE"] = "CERTIFICATE";
    HistoryEntityType["CREDENTIAL"] = "CREDENTIAL";
    HistoryEntityType["CREDENTIAL_SCHEMA"] = "CREDENTIAL_SCHEMA";
    HistoryEntityType["PROOF"] = "PROOF";
    HistoryEntityType["PROOF_SCHEMA"] = "PROOF_SCHEMA";
    HistoryEntityType["ORGANISATION"] = "ORGANISATION";
    HistoryEntityType["BACKUP"] = "BACKUP";
    HistoryEntityType["TRUST_ANCHOR"] = "TRUST_ANCHOR";
    HistoryEntityType["TRUST_ENTITY"] = "TRUST_ENTITY";
    HistoryEntityType["WALLET_UNIT"] = "WALLET_UNIT";
    HistoryEntityType["USER"] = "USER";
    HistoryEntityType["PROVIDER"] = "PROVIDER";
    HistoryEntityType["WALLET_RELYING_PARTY"] = "WALLET_RELYING_PARTY";
    HistoryEntityType["STS_ROLE"] = "STS_ROLE";
    HistoryEntityType["STS_ORGANISATION"] = "STS_ORGANISATION";
    HistoryEntityType["STS_IAM_ROLE"] = "STS_IAM_ROLE";
    HistoryEntityType["STS_SESSION"] = "STS_SESSION";
    HistoryEntityType["STS_TOKEN"] = "STS_TOKEN";
    HistoryEntityType["SIGNATURE"] = "SIGNATURE";
    HistoryEntityType["NOTIFICATION"] = "NOTIFICATION";
    HistoryEntityType["SUPERVISORY_AUTHORITY"] = "SUPERVISORY_AUTHORITY";
    HistoryEntityType["TRUST_LIST_PUBLICATION"] = "TRUST_LIST_PUBLICATION";
})(HistoryEntityType || (HistoryEntityType = {}));
export var HistorySearchType;
(function (HistorySearchType) {
    HistorySearchType["CLAIM_NAME"] = "CLAIM_NAME";
    HistorySearchType["CLAIM_VALUE"] = "CLAIM_VALUE";
    HistorySearchType["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
    HistorySearchType["ISSUER_DID"] = "ISSUER_DID";
    HistorySearchType["ISSUER_NAME"] = "ISSUER_NAME";
    HistorySearchType["VERIFIER_DID"] = "VERIFIER_DID";
    HistorySearchType["VERIFIER_NAME"] = "VERIFIER_NAME";
    HistorySearchType["PROOF_SCHEMA_NAME"] = "PROOF_SCHEMA_NAME";
})(HistorySearchType || (HistorySearchType = {}));
export var IdentifierListQueryExactColumn;
(function (IdentifierListQueryExactColumn) {
    IdentifierListQueryExactColumn["NAME"] = "NAME";
})(IdentifierListQueryExactColumn || (IdentifierListQueryExactColumn = {}));
export var IdentifierState;
(function (IdentifierState) {
    IdentifierState["ACTIVE"] = "ACTIVE";
    IdentifierState["DEACTIVATED"] = "DEACTIVATED";
})(IdentifierState || (IdentifierState = {}));
export var IdentifierType;
(function (IdentifierType) {
    IdentifierType["KEY"] = "KEY";
    IdentifierType["DID"] = "DID";
    IdentifierType["CERTIFICATE"] = "CERTIFICATE";
    IdentifierType["CERTIFICATE_AUTHORITY"] = "CERTIFICATE_AUTHORITY";
})(IdentifierType || (IdentifierType = {}));
export var KeyRole;
(function (KeyRole) {
    KeyRole["AUTHENTICATION"] = "AUTHENTICATION";
    KeyRole["ASSERTION_METHOD"] = "ASSERTION_METHOD";
    KeyRole["KEY_AGREEMENT"] = "KEY_AGREEMENT";
    KeyRole["CAPABILITY_INVOCATION"] = "CAPABILITY_INVOCATION";
    KeyRole["CAPABILITY_DELEGATION"] = "CAPABILITY_DELEGATION";
})(KeyRole || (KeyRole = {}));
export var KeyStorageSecurity;
(function (KeyStorageSecurity) {
    KeyStorageSecurity["HIGH"] = "HIGH";
    KeyStorageSecurity["MODERATE"] = "MODERATE";
    KeyStorageSecurity["ENHANCED_BASIC"] = "ENHANCED_BASIC";
    KeyStorageSecurity["BASIC"] = "BASIC";
})(KeyStorageSecurity || (KeyStorageSecurity = {}));
export var LayoutType;
(function (LayoutType) {
    LayoutType["CARD"] = "CARD";
    LayoutType["DOCUMENT"] = "DOCUMENT";
    LayoutType["SINGLE_ATTRIBUTE"] = "SINGLE_ATTRIBUTE";
})(LayoutType || (LayoutType = {}));
export var OpenId4vciTxCodeInputMode;
(function (OpenId4vciTxCodeInputMode) {
    OpenId4vciTxCodeInputMode["NUMERIC"] = "NUMERIC";
    OpenId4vciTxCodeInputMode["TEXT"] = "TEXT";
})(OpenId4vciTxCodeInputMode || (OpenId4vciTxCodeInputMode = {}));
export var PresentationDefinitionRuleType;
(function (PresentationDefinitionRuleType) {
    PresentationDefinitionRuleType["ALL"] = "ALL";
    PresentationDefinitionRuleType["PICK"] = "PICK";
})(PresentationDefinitionRuleType || (PresentationDefinitionRuleType = {}));
export var ProofListQueryExactColumn;
(function (ProofListQueryExactColumn) {
    ProofListQueryExactColumn["NAME"] = "NAME";
})(ProofListQueryExactColumn || (ProofListQueryExactColumn = {}));
export var ProofRole;
(function (ProofRole) {
    ProofRole["HOLDER"] = "HOLDER";
    ProofRole["VERIFIER"] = "VERIFIER";
})(ProofRole || (ProofRole = {}));
export var ProofSchemaListQueryExactColumn;
(function (ProofSchemaListQueryExactColumn) {
    ProofSchemaListQueryExactColumn["NAME"] = "NAME";
})(ProofSchemaListQueryExactColumn || (ProofSchemaListQueryExactColumn = {}));
export var ProofState;
(function (ProofState) {
    ProofState["CREATED"] = "CREATED";
    ProofState["PENDING"] = "PENDING";
    ProofState["REQUESTED"] = "REQUESTED";
    ProofState["ACCEPTED"] = "ACCEPTED";
    ProofState["REJECTED"] = "REJECTED";
    ProofState["RETRACTED"] = "RETRACTED";
    ProofState["ERROR"] = "ERROR";
    ProofState["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
})(ProofState || (ProofState = {}));
export var SortDirection;
(function (SortDirection) {
    SortDirection["ASCENDING"] = "ASCENDING";
    SortDirection["DESCENDING"] = "DESCENDING";
})(SortDirection || (SortDirection = {}));
export var SortableCredentialColumn;
(function (SortableCredentialColumn) {
    SortableCredentialColumn["CREATED_DATE"] = "CREATED_DATE";
    SortableCredentialColumn["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableCredentialColumn["ISSUER"] = "ISSUER";
    SortableCredentialColumn["STATE"] = "STATE";
})(SortableCredentialColumn || (SortableCredentialColumn = {}));
export var SortableCredentialSchemaColumn;
(function (SortableCredentialSchemaColumn) {
    SortableCredentialSchemaColumn["NAME"] = "NAME";
    SortableCredentialSchemaColumn["FORMAT"] = "FORMAT";
    SortableCredentialSchemaColumn["CREATED_DATE"] = "CREATED_DATE";
})(SortableCredentialSchemaColumn || (SortableCredentialSchemaColumn = {}));
export var SortableDidColumn;
(function (SortableDidColumn) {
    SortableDidColumn["NAME"] = "NAME";
    SortableDidColumn["CREATED_DATE"] = "CREATED_DATE";
    SortableDidColumn["METHOD"] = "METHOD";
    SortableDidColumn["TYPE"] = "TYPE";
    SortableDidColumn["DID"] = "DID";
    SortableDidColumn["DEACTIVATED"] = "DEACTIVATED";
})(SortableDidColumn || (SortableDidColumn = {}));
export var SortableIdentifierColumn;
(function (SortableIdentifierColumn) {
    SortableIdentifierColumn["NAME"] = "NAME";
    SortableIdentifierColumn["CREATED_DATE"] = "CREATED_DATE";
    SortableIdentifierColumn["TYPE"] = "TYPE";
    SortableIdentifierColumn["STATE"] = "STATE";
})(SortableIdentifierColumn || (SortableIdentifierColumn = {}));
export var SortableProofColumn;
(function (SortableProofColumn) {
    SortableProofColumn["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableProofColumn["VERIFIER"] = "VERIFIER";
    SortableProofColumn["STATE"] = "STATE";
    SortableProofColumn["CREATED_DATE"] = "CREATED_DATE";
})(SortableProofColumn || (SortableProofColumn = {}));
export var SortableProofSchemaColumn;
(function (SortableProofSchemaColumn) {
    SortableProofSchemaColumn["NAME"] = "NAME";
    SortableProofSchemaColumn["CREATED_DATE"] = "CREATED_DATE";
})(SortableProofSchemaColumn || (SortableProofSchemaColumn = {}));
export var SortableTrustAnchorColumn;
(function (SortableTrustAnchorColumn) {
    SortableTrustAnchorColumn["NAME"] = "NAME";
    SortableTrustAnchorColumn["CREATED_DATE"] = "CREATED_DATE";
    SortableTrustAnchorColumn["TYPE"] = "TYPE";
})(SortableTrustAnchorColumn || (SortableTrustAnchorColumn = {}));
export var SortableTrustEntityColumn;
(function (SortableTrustEntityColumn) {
    SortableTrustEntityColumn["NAME"] = "NAME";
    SortableTrustEntityColumn["ROLE"] = "ROLE";
    SortableTrustEntityColumn["LAST_MODIFIED"] = "LAST_MODIFIED";
    SortableTrustEntityColumn["STATE"] = "STATE";
})(SortableTrustEntityColumn || (SortableTrustEntityColumn = {}));
export var TransactionCodeType;
(function (TransactionCodeType) {
    TransactionCodeType["NUMERIC"] = "NUMERIC";
    TransactionCodeType["ALPHANUMERIC"] = "ALPHANUMERIC";
})(TransactionCodeType || (TransactionCodeType = {}));
export var TrustAnchorListQueryExactColumn;
(function (TrustAnchorListQueryExactColumn) {
    TrustAnchorListQueryExactColumn["NAME"] = "NAME";
    TrustAnchorListQueryExactColumn["TYPE"] = "TYPE";
})(TrustAnchorListQueryExactColumn || (TrustAnchorListQueryExactColumn = {}));
export var TrustEntityListQueryExactColumn;
(function (TrustEntityListQueryExactColumn) {
    TrustEntityListQueryExactColumn["NAME"] = "NAME";
})(TrustEntityListQueryExactColumn || (TrustEntityListQueryExactColumn = {}));
export var TrustEntityRole;
(function (TrustEntityRole) {
    TrustEntityRole["ISSUER"] = "ISSUER";
    TrustEntityRole["VERIFIER"] = "VERIFIER";
    TrustEntityRole["BOTH"] = "BOTH";
})(TrustEntityRole || (TrustEntityRole = {}));
export var TrustEntityState;
(function (TrustEntityState) {
    TrustEntityState["ACTIVE"] = "ACTIVE";
    TrustEntityState["REMOVED"] = "REMOVED";
    TrustEntityState["WITHDRAWN"] = "WITHDRAWN";
    TrustEntityState["REMOVED_AND_WITHDRAWN"] = "REMOVED_AND_WITHDRAWN";
})(TrustEntityState || (TrustEntityState = {}));
export var TrustEntityType;
(function (TrustEntityType) {
    TrustEntityType["DID"] = "DID";
    /** certificate authority */
    TrustEntityType["CA"] = "CA";
})(TrustEntityType || (TrustEntityType = {}));
export var TrustEntityUpdateAction;
(function (TrustEntityUpdateAction) {
    TrustEntityUpdateAction["ADMIN_ACTIVATE"] = "ADMIN_ACTIVATE";
    TrustEntityUpdateAction["ACTIVATE"] = "ACTIVATE";
    TrustEntityUpdateAction["WITHDRAW"] = "WITHDRAW";
    TrustEntityUpdateAction["REMOVE"] = "REMOVE";
})(TrustEntityUpdateAction || (TrustEntityUpdateAction = {}));
export var WalletProviderType;
(function (WalletProviderType) {
    WalletProviderType["PROCIVIS_ONE"] = "PROCIVIS_ONE";
})(WalletProviderType || (WalletProviderType = {}));
export var WalletUnitStatus;
(function (WalletUnitStatus) {
    WalletUnitStatus["PENDING"] = "PENDING";
    WalletUnitStatus["ACTIVE"] = "ACTIVE";
    WalletUnitStatus["REVOKED"] = "REVOKED";
    WalletUnitStatus["ERROR"] = "ERROR";
})(WalletUnitStatus || (WalletUnitStatus = {}));
