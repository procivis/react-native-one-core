// ==========
// Record definitions:
// ==========
export var CacheTypeBindingDto;
(function (CacheTypeBindingDto) {
    CacheTypeBindingDto["DID_DOCUMENT"] = "DID_DOCUMENT";
    CacheTypeBindingDto["JSON_LD_CONTEXT"] = "JSON_LD_CONTEXT";
    CacheTypeBindingDto["STATUS_LIST_CREDENTIAL"] = "STATUS_LIST_CREDENTIAL";
    CacheTypeBindingDto["VCT_METADATA"] = "VCT_METADATA";
    CacheTypeBindingDto["JSON_SCHEMA"] = "JSON_SCHEMA";
    CacheTypeBindingDto["TRUST_LIST"] = "TRUST_LIST";
    CacheTypeBindingDto["X509_CRL"] = "X509_CRL";
    CacheTypeBindingDto["ANDROID_ATTESTATION_CRL"] = "ANDROID_ATTESTATION_CRL";
    CacheTypeBindingDto["OPEN_ID_METADATA"] = "OPEN_ID_METADATA";
})(CacheTypeBindingDto || (CacheTypeBindingDto = {}));
export var CertificateStateBindingEnum;
(function (CertificateStateBindingEnum) {
    CertificateStateBindingEnum["NOT_YET_ACTIVE"] = "NOT_YET_ACTIVE";
    CertificateStateBindingEnum["ACTIVE"] = "ACTIVE";
    CertificateStateBindingEnum["REVOKED"] = "REVOKED";
    CertificateStateBindingEnum["EXPIRED"] = "EXPIRED";
})(CertificateStateBindingEnum || (CertificateStateBindingEnum = {}));
export var CharacteristicPermissionBindingEnum;
(function (CharacteristicPermissionBindingEnum) {
    CharacteristicPermissionBindingEnum["READ"] = "READ";
    CharacteristicPermissionBindingEnum["WRITE"] = "WRITE";
})(CharacteristicPermissionBindingEnum || (CharacteristicPermissionBindingEnum = {}));
export var CharacteristicPropertyBindingEnum;
(function (CharacteristicPropertyBindingEnum) {
    CharacteristicPropertyBindingEnum["READ"] = "READ";
    CharacteristicPropertyBindingEnum["WRITE"] = "WRITE";
    CharacteristicPropertyBindingEnum["NOTIFY"] = "NOTIFY";
    CharacteristicPropertyBindingEnum["WRITE_WITHOUT_RESPONSE"] = "WRITE_WITHOUT_RESPONSE";
    CharacteristicPropertyBindingEnum["INDICATE"] = "INDICATE";
})(CharacteristicPropertyBindingEnum || (CharacteristicPropertyBindingEnum = {}));
export var CharacteristicWriteTypeBindingEnum;
(function (CharacteristicWriteTypeBindingEnum) {
    CharacteristicWriteTypeBindingEnum["WITH_RESPONSE"] = "WITH_RESPONSE";
    CharacteristicWriteTypeBindingEnum["WITHOUT_RESPONSE"] = "WITHOUT_RESPONSE";
})(CharacteristicWriteTypeBindingEnum || (CharacteristicWriteTypeBindingEnum = {}));
export var ClientIdSchemeBindingEnum;
(function (ClientIdSchemeBindingEnum) {
    ClientIdSchemeBindingEnum["REDIRECT_URI"] = "REDIRECT_URI";
    ClientIdSchemeBindingEnum["VERIFIER_ATTESTATION"] = "VERIFIER_ATTESTATION";
    ClientIdSchemeBindingEnum["DID"] = "DID";
    ClientIdSchemeBindingEnum["X509_SAN_DNS"] = "X509_SAN_DNS";
})(ClientIdSchemeBindingEnum || (ClientIdSchemeBindingEnum = {}));
export var CredentialListIncludeEntityTypeBindingEnum;
(function (CredentialListIncludeEntityTypeBindingEnum) {
    CredentialListIncludeEntityTypeBindingEnum["LAYOUT_PROPERTIES"] = "LAYOUT_PROPERTIES";
    CredentialListIncludeEntityTypeBindingEnum["CREDENTIAL"] = "CREDENTIAL";
})(CredentialListIncludeEntityTypeBindingEnum || (CredentialListIncludeEntityTypeBindingEnum = {}));
export var CredentialListQueryExactColumnBindingEnum;
(function (CredentialListQueryExactColumnBindingEnum) {
    CredentialListQueryExactColumnBindingEnum["NAME"] = "NAME";
})(CredentialListQueryExactColumnBindingEnum || (CredentialListQueryExactColumnBindingEnum = {}));
export var CredentialQueryFailureReasonBindingEnum;
(function (CredentialQueryFailureReasonBindingEnum) {
    CredentialQueryFailureReasonBindingEnum["NO_CREDENTIAL"] = "NO_CREDENTIAL";
    CredentialQueryFailureReasonBindingEnum["VALIDITY"] = "VALIDITY";
    CredentialQueryFailureReasonBindingEnum["CONSTRAINT"] = "CONSTRAINT";
})(CredentialQueryFailureReasonBindingEnum || (CredentialQueryFailureReasonBindingEnum = {}));
export var CredentialRoleBindingDto;
(function (CredentialRoleBindingDto) {
    CredentialRoleBindingDto["HOLDER"] = "HOLDER";
    CredentialRoleBindingDto["ISSUER"] = "ISSUER";
    CredentialRoleBindingDto["VERIFIER"] = "VERIFIER";
})(CredentialRoleBindingDto || (CredentialRoleBindingDto = {}));
export var CredentialSchemaCodeTypeBindingDto;
(function (CredentialSchemaCodeTypeBindingDto) {
    CredentialSchemaCodeTypeBindingDto["BARCODE"] = "BARCODE";
    CredentialSchemaCodeTypeBindingDto["MRZ"] = "MRZ";
    CredentialSchemaCodeTypeBindingDto["QR_CODE"] = "QR_CODE";
})(CredentialSchemaCodeTypeBindingDto || (CredentialSchemaCodeTypeBindingDto = {}));
export var CredentialSchemaListIncludeEntityType;
(function (CredentialSchemaListIncludeEntityType) {
    CredentialSchemaListIncludeEntityType["LAYOUT_PROPERTIES"] = "LAYOUT_PROPERTIES";
})(CredentialSchemaListIncludeEntityType || (CredentialSchemaListIncludeEntityType = {}));
export var CredentialSchemaListQueryExactColumnBindingEnum;
(function (CredentialSchemaListQueryExactColumnBindingEnum) {
    CredentialSchemaListQueryExactColumnBindingEnum["NAME"] = "NAME";
    CredentialSchemaListQueryExactColumnBindingEnum["SCHEMA_ID"] = "SCHEMA_ID";
})(CredentialSchemaListQueryExactColumnBindingEnum || (CredentialSchemaListQueryExactColumnBindingEnum = {}));
export var CredentialStateBindingEnum;
(function (CredentialStateBindingEnum) {
    CredentialStateBindingEnum["CREATED"] = "CREATED";
    CredentialStateBindingEnum["PENDING"] = "PENDING";
    CredentialStateBindingEnum["OFFERED"] = "OFFERED";
    CredentialStateBindingEnum["ACCEPTED"] = "ACCEPTED";
    CredentialStateBindingEnum["REJECTED"] = "REJECTED";
    CredentialStateBindingEnum["REVOKED"] = "REVOKED";
    CredentialStateBindingEnum["SUSPENDED"] = "SUSPENDED";
    CredentialStateBindingEnum["ERROR"] = "ERROR";
    CredentialStateBindingEnum["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
})(CredentialStateBindingEnum || (CredentialStateBindingEnum = {}));
export var DidTypeBindingEnum;
(function (DidTypeBindingEnum) {
    DidTypeBindingEnum["LOCAL"] = "LOCAL";
    DidTypeBindingEnum["REMOTE"] = "REMOTE";
})(DidTypeBindingEnum || (DidTypeBindingEnum = {}));
export var ExactDidFilterColumnBindingEnum;
(function (ExactDidFilterColumnBindingEnum) {
    ExactDidFilterColumnBindingEnum["NAME"] = "NAME";
    ExactDidFilterColumnBindingEnum["DID"] = "DID";
})(ExactDidFilterColumnBindingEnum || (ExactDidFilterColumnBindingEnum = {}));
export var ExactIdentifierFilterColumnBindingEnum;
(function (ExactIdentifierFilterColumnBindingEnum) {
    ExactIdentifierFilterColumnBindingEnum["NAME"] = "NAME";
})(ExactIdentifierFilterColumnBindingEnum || (ExactIdentifierFilterColumnBindingEnum = {}));
export var ExactTrustAnchorFilterColumnBindings;
(function (ExactTrustAnchorFilterColumnBindings) {
    ExactTrustAnchorFilterColumnBindings["NAME"] = "NAME";
    ExactTrustAnchorFilterColumnBindings["TYPE"] = "TYPE";
})(ExactTrustAnchorFilterColumnBindings || (ExactTrustAnchorFilterColumnBindings = {}));
export var ExactTrustEntityFilterColumnBindings;
(function (ExactTrustEntityFilterColumnBindings) {
    ExactTrustEntityFilterColumnBindings["NAME"] = "NAME";
})(ExactTrustEntityFilterColumnBindings || (ExactTrustEntityFilterColumnBindings = {}));
export var HistoryActionBindingEnum;
(function (HistoryActionBindingEnum) {
    HistoryActionBindingEnum["ACCEPTED"] = "ACCEPTED";
    HistoryActionBindingEnum["CREATED"] = "CREATED";
    HistoryActionBindingEnum["CSR_GENERATED"] = "CSR_GENERATED";
    HistoryActionBindingEnum["DEACTIVATED"] = "DEACTIVATED";
    HistoryActionBindingEnum["DELETED"] = "DELETED";
    HistoryActionBindingEnum["ERRORED"] = "ERRORED";
    HistoryActionBindingEnum["ISSUED"] = "ISSUED";
    HistoryActionBindingEnum["OFFERED"] = "OFFERED";
    HistoryActionBindingEnum["REJECTED"] = "REJECTED";
    HistoryActionBindingEnum["REQUESTED"] = "REQUESTED";
    HistoryActionBindingEnum["REVOKED"] = "REVOKED";
    HistoryActionBindingEnum["SUSPENDED"] = "SUSPENDED";
    HistoryActionBindingEnum["PENDING"] = "PENDING";
    HistoryActionBindingEnum["RESTORED"] = "RESTORED";
    HistoryActionBindingEnum["SHARED"] = "SHARED";
    HistoryActionBindingEnum["IMPORTED"] = "IMPORTED";
    HistoryActionBindingEnum["CLAIMS_REMOVED"] = "CLAIMS_REMOVED";
    HistoryActionBindingEnum["ACTIVATED"] = "ACTIVATED";
    HistoryActionBindingEnum["WITHDRAWN"] = "WITHDRAWN";
    HistoryActionBindingEnum["REMOVED"] = "REMOVED";
    HistoryActionBindingEnum["RETRACTED"] = "RETRACTED";
    HistoryActionBindingEnum["UPDATED"] = "UPDATED";
    HistoryActionBindingEnum["REACTIVATED"] = "REACTIVATED";
    HistoryActionBindingEnum["EXPIRED"] = "EXPIRED";
    HistoryActionBindingEnum["INTERACTION_CREATED"] = "INTERACTION_CREATED";
    HistoryActionBindingEnum["INTERACTION_ERRORED"] = "INTERACTION_ERRORED";
    HistoryActionBindingEnum["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
    HistoryActionBindingEnum["REGISTRATION_CERTIFICATE_CREATED"] = "REGISTRATION_CERTIFICATE_CREATED";
    HistoryActionBindingEnum["REGISTRATION_CERTIFICATE_REVOKED"] = "REGISTRATION_CERTIFICATE_REVOKED";
})(HistoryActionBindingEnum || (HistoryActionBindingEnum = {}));
export var HistoryEntityTypeBindingEnum;
(function (HistoryEntityTypeBindingEnum) {
    HistoryEntityTypeBindingEnum["KEY"] = "KEY";
    HistoryEntityTypeBindingEnum["DID"] = "DID";
    HistoryEntityTypeBindingEnum["IDENTIFIER"] = "IDENTIFIER";
    HistoryEntityTypeBindingEnum["CERTIFICATE"] = "CERTIFICATE";
    HistoryEntityTypeBindingEnum["CREDENTIAL"] = "CREDENTIAL";
    HistoryEntityTypeBindingEnum["CREDENTIAL_SCHEMA"] = "CREDENTIAL_SCHEMA";
    HistoryEntityTypeBindingEnum["PROOF"] = "PROOF";
    HistoryEntityTypeBindingEnum["PROOF_SCHEMA"] = "PROOF_SCHEMA";
    HistoryEntityTypeBindingEnum["ORGANISATION"] = "ORGANISATION";
    HistoryEntityTypeBindingEnum["BACKUP"] = "BACKUP";
    HistoryEntityTypeBindingEnum["TRUST_ANCHOR"] = "TRUST_ANCHOR";
    HistoryEntityTypeBindingEnum["TRUST_ENTITY"] = "TRUST_ENTITY";
    HistoryEntityTypeBindingEnum["WALLET_UNIT"] = "WALLET_UNIT";
    HistoryEntityTypeBindingEnum["USER"] = "USER";
    HistoryEntityTypeBindingEnum["PROVIDER"] = "PROVIDER";
    HistoryEntityTypeBindingEnum["WALLET_RELYING_PARTY"] = "WALLET_RELYING_PARTY";
    HistoryEntityTypeBindingEnum["STS_ROLE"] = "STS_ROLE";
    HistoryEntityTypeBindingEnum["STS_ORGANISATION"] = "STS_ORGANISATION";
    HistoryEntityTypeBindingEnum["STS_IAM_ROLE"] = "STS_IAM_ROLE";
    HistoryEntityTypeBindingEnum["STS_TOKEN"] = "STS_TOKEN";
    HistoryEntityTypeBindingEnum["SIGNATURE"] = "SIGNATURE";
})(HistoryEntityTypeBindingEnum || (HistoryEntityTypeBindingEnum = {}));
export var HistorySearchEnumBindingEnum;
(function (HistorySearchEnumBindingEnum) {
    HistorySearchEnumBindingEnum["CLAIM_NAME"] = "CLAIM_NAME";
    HistorySearchEnumBindingEnum["CLAIM_VALUE"] = "CLAIM_VALUE";
    HistorySearchEnumBindingEnum["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
    HistorySearchEnumBindingEnum["ISSUER_DID"] = "ISSUER_DID";
    HistorySearchEnumBindingEnum["ISSUER_NAME"] = "ISSUER_NAME";
    HistorySearchEnumBindingEnum["VERIFIER_DID"] = "VERIFIER_DID";
    HistorySearchEnumBindingEnum["VERIFIER_NAME"] = "VERIFIER_NAME";
    HistorySearchEnumBindingEnum["PROOF_SCHEMA_NAME"] = "PROOF_SCHEMA_NAME";
})(HistorySearchEnumBindingEnum || (HistorySearchEnumBindingEnum = {}));
export var IdentifierStateBindingEnum;
(function (IdentifierStateBindingEnum) {
    IdentifierStateBindingEnum["ACTIVE"] = "ACTIVE";
    IdentifierStateBindingEnum["DEACTIVATED"] = "DEACTIVATED";
})(IdentifierStateBindingEnum || (IdentifierStateBindingEnum = {}));
export var IdentifierTypeBindingEnum;
(function (IdentifierTypeBindingEnum) {
    IdentifierTypeBindingEnum["KEY"] = "KEY";
    IdentifierTypeBindingEnum["DID"] = "DID";
    IdentifierTypeBindingEnum["CERTIFICATE"] = "CERTIFICATE";
})(IdentifierTypeBindingEnum || (IdentifierTypeBindingEnum = {}));
export var KeyRoleBindingEnum;
(function (KeyRoleBindingEnum) {
    KeyRoleBindingEnum["AUTHENTICATION"] = "AUTHENTICATION";
    KeyRoleBindingEnum["ASSERTION_METHOD"] = "ASSERTION_METHOD";
    KeyRoleBindingEnum["KEY_AGREEMENT"] = "KEY_AGREEMENT";
    KeyRoleBindingEnum["CAPABILITY_INVOCATION"] = "CAPABILITY_INVOCATION";
    KeyRoleBindingEnum["CAPABILITY_DELEGATION"] = "CAPABILITY_DELEGATION";
})(KeyRoleBindingEnum || (KeyRoleBindingEnum = {}));
export var KeyStorageSecurityBindingEnum;
(function (KeyStorageSecurityBindingEnum) {
    KeyStorageSecurityBindingEnum["HIGH"] = "HIGH";
    KeyStorageSecurityBindingEnum["MODERATE"] = "MODERATE";
    KeyStorageSecurityBindingEnum["ENHANCED_BASIC"] = "ENHANCED_BASIC";
    KeyStorageSecurityBindingEnum["BASIC"] = "BASIC";
})(KeyStorageSecurityBindingEnum || (KeyStorageSecurityBindingEnum = {}));
export var LayoutTypeBindingEnum;
(function (LayoutTypeBindingEnum) {
    LayoutTypeBindingEnum["CARD"] = "CARD";
    LayoutTypeBindingEnum["DOCUMENT"] = "DOCUMENT";
    LayoutTypeBindingEnum["SINGLE_ATTRIBUTE"] = "SINGLE_ATTRIBUTE";
})(LayoutTypeBindingEnum || (LayoutTypeBindingEnum = {}));
export var OpenId4vciTxCodeInputModeBindingEnum;
(function (OpenId4vciTxCodeInputModeBindingEnum) {
    OpenId4vciTxCodeInputModeBindingEnum["NUMERIC"] = "NUMERIC";
    OpenId4vciTxCodeInputModeBindingEnum["TEXT"] = "TEXT";
})(OpenId4vciTxCodeInputModeBindingEnum || (OpenId4vciTxCodeInputModeBindingEnum = {}));
export var PresentationDefinitionRuleTypeBindingEnum;
(function (PresentationDefinitionRuleTypeBindingEnum) {
    PresentationDefinitionRuleTypeBindingEnum["ALL"] = "ALL";
    PresentationDefinitionRuleTypeBindingEnum["PICK"] = "PICK";
})(PresentationDefinitionRuleTypeBindingEnum || (PresentationDefinitionRuleTypeBindingEnum = {}));
export var ProofListQueryExactColumnBindingEnum;
(function (ProofListQueryExactColumnBindingEnum) {
    ProofListQueryExactColumnBindingEnum["NAME"] = "NAME";
})(ProofListQueryExactColumnBindingEnum || (ProofListQueryExactColumnBindingEnum = {}));
export var ProofRoleBindingEnum;
(function (ProofRoleBindingEnum) {
    ProofRoleBindingEnum["HOLDER"] = "HOLDER";
    ProofRoleBindingEnum["VERIFIER"] = "VERIFIER";
})(ProofRoleBindingEnum || (ProofRoleBindingEnum = {}));
export var ProofSchemaListQueryExactColumnBinding;
(function (ProofSchemaListQueryExactColumnBinding) {
    ProofSchemaListQueryExactColumnBinding["NAME"] = "NAME";
})(ProofSchemaListQueryExactColumnBinding || (ProofSchemaListQueryExactColumnBinding = {}));
export var ProofStateBindingEnum;
(function (ProofStateBindingEnum) {
    ProofStateBindingEnum["CREATED"] = "CREATED";
    ProofStateBindingEnum["PENDING"] = "PENDING";
    ProofStateBindingEnum["REQUESTED"] = "REQUESTED";
    ProofStateBindingEnum["ACCEPTED"] = "ACCEPTED";
    ProofStateBindingEnum["REJECTED"] = "REJECTED";
    ProofStateBindingEnum["RETRACTED"] = "RETRACTED";
    ProofStateBindingEnum["ERROR"] = "ERROR";
    ProofStateBindingEnum["INTERACTION_EXPIRED"] = "INTERACTION_EXPIRED";
})(ProofStateBindingEnum || (ProofStateBindingEnum = {}));
export var ScanToVerifyBarcodeTypeBindingEnum;
(function (ScanToVerifyBarcodeTypeBindingEnum) {
    ScanToVerifyBarcodeTypeBindingEnum["MRZ"] = "MRZ";
    ScanToVerifyBarcodeTypeBindingEnum["PDF417"] = "PDF417";
})(ScanToVerifyBarcodeTypeBindingEnum || (ScanToVerifyBarcodeTypeBindingEnum = {}));
export var SearchTypeBindingEnum;
(function (SearchTypeBindingEnum) {
    SearchTypeBindingEnum["CLAIM_NAME"] = "CLAIM_NAME";
    SearchTypeBindingEnum["CLAIM_VALUE"] = "CLAIM_VALUE";
    SearchTypeBindingEnum["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
})(SearchTypeBindingEnum || (SearchTypeBindingEnum = {}));
export var SortDirection;
(function (SortDirection) {
    SortDirection["ASCENDING"] = "ASCENDING";
    SortDirection["DESCENDING"] = "DESCENDING";
})(SortDirection || (SortDirection = {}));
export var SortableCredentialColumnBindingEnum;
(function (SortableCredentialColumnBindingEnum) {
    SortableCredentialColumnBindingEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableCredentialColumnBindingEnum["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableCredentialColumnBindingEnum["ISSUER"] = "ISSUER";
    SortableCredentialColumnBindingEnum["STATE"] = "STATE";
})(SortableCredentialColumnBindingEnum || (SortableCredentialColumnBindingEnum = {}));
export var SortableCredentialSchemaColumnBindingEnum;
(function (SortableCredentialSchemaColumnBindingEnum) {
    SortableCredentialSchemaColumnBindingEnum["NAME"] = "NAME";
    SortableCredentialSchemaColumnBindingEnum["FORMAT"] = "FORMAT";
    SortableCredentialSchemaColumnBindingEnum["CREATED_DATE"] = "CREATED_DATE";
})(SortableCredentialSchemaColumnBindingEnum || (SortableCredentialSchemaColumnBindingEnum = {}));
export var SortableDidColumnBindingEnum;
(function (SortableDidColumnBindingEnum) {
    SortableDidColumnBindingEnum["NAME"] = "NAME";
    SortableDidColumnBindingEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableDidColumnBindingEnum["METHOD"] = "METHOD";
    SortableDidColumnBindingEnum["TYPE"] = "TYPE";
    SortableDidColumnBindingEnum["DID"] = "DID";
    SortableDidColumnBindingEnum["DEACTIVATED"] = "DEACTIVATED";
})(SortableDidColumnBindingEnum || (SortableDidColumnBindingEnum = {}));
export var SortableIdentifierColumnBindingEnum;
(function (SortableIdentifierColumnBindingEnum) {
    SortableIdentifierColumnBindingEnum["NAME"] = "NAME";
    SortableIdentifierColumnBindingEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableIdentifierColumnBindingEnum["TYPE"] = "TYPE";
    SortableIdentifierColumnBindingEnum["STATE"] = "STATE";
})(SortableIdentifierColumnBindingEnum || (SortableIdentifierColumnBindingEnum = {}));
export var SortableProofListColumnBinding;
(function (SortableProofListColumnBinding) {
    SortableProofListColumnBinding["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableProofListColumnBinding["VERIFIER"] = "VERIFIER";
    SortableProofListColumnBinding["STATE"] = "STATE";
    SortableProofListColumnBinding["CREATED_DATE"] = "CREATED_DATE";
})(SortableProofListColumnBinding || (SortableProofListColumnBinding = {}));
export var SortableProofSchemaColumnBinding;
(function (SortableProofSchemaColumnBinding) {
    SortableProofSchemaColumnBinding["NAME"] = "NAME";
    SortableProofSchemaColumnBinding["CREATED_DATE"] = "CREATED_DATE";
})(SortableProofSchemaColumnBinding || (SortableProofSchemaColumnBinding = {}));
export var SortableTrustAnchorColumnBindings;
(function (SortableTrustAnchorColumnBindings) {
    SortableTrustAnchorColumnBindings["NAME"] = "NAME";
    SortableTrustAnchorColumnBindings["CREATED_DATE"] = "CREATED_DATE";
    SortableTrustAnchorColumnBindings["TYPE"] = "TYPE";
})(SortableTrustAnchorColumnBindings || (SortableTrustAnchorColumnBindings = {}));
export var SortableTrustEntityColumnBindings;
(function (SortableTrustEntityColumnBindings) {
    SortableTrustEntityColumnBindings["NAME"] = "NAME";
    SortableTrustEntityColumnBindings["ROLE"] = "ROLE";
    SortableTrustEntityColumnBindings["LAST_MODIFIED"] = "LAST_MODIFIED";
    SortableTrustEntityColumnBindings["STATE"] = "STATE";
})(SortableTrustEntityColumnBindings || (SortableTrustEntityColumnBindings = {}));
export var TrustEntityRoleBindingEnum;
(function (TrustEntityRoleBindingEnum) {
    TrustEntityRoleBindingEnum["ISSUER"] = "ISSUER";
    TrustEntityRoleBindingEnum["VERIFIER"] = "VERIFIER";
    TrustEntityRoleBindingEnum["BOTH"] = "BOTH";
})(TrustEntityRoleBindingEnum || (TrustEntityRoleBindingEnum = {}));
export var TrustEntityStateBindingEnum;
(function (TrustEntityStateBindingEnum) {
    TrustEntityStateBindingEnum["ACTIVE"] = "ACTIVE";
    TrustEntityStateBindingEnum["REMOVED"] = "REMOVED";
    TrustEntityStateBindingEnum["WITHDRAWN"] = "WITHDRAWN";
    TrustEntityStateBindingEnum["REMOVED_AND_WITHDRAWN"] = "REMOVED_AND_WITHDRAWN";
})(TrustEntityStateBindingEnum || (TrustEntityStateBindingEnum = {}));
export var TrustEntityTypeBindingEnum;
(function (TrustEntityTypeBindingEnum) {
    TrustEntityTypeBindingEnum["DID"] = "DID";
    /** certificate authority */
    TrustEntityTypeBindingEnum["CA"] = "CA";
})(TrustEntityTypeBindingEnum || (TrustEntityTypeBindingEnum = {}));
export var TrustEntityUpdateActionBindingEnum;
(function (TrustEntityUpdateActionBindingEnum) {
    TrustEntityUpdateActionBindingEnum["ADMIN_ACTIVATE"] = "ADMIN_ACTIVATE";
    TrustEntityUpdateActionBindingEnum["ACTIVATE"] = "ACTIVATE";
    TrustEntityUpdateActionBindingEnum["WITHDRAW"] = "WITHDRAW";
    TrustEntityUpdateActionBindingEnum["REMOVE"] = "REMOVE";
})(TrustEntityUpdateActionBindingEnum || (TrustEntityUpdateActionBindingEnum = {}));
export var WalletProviderTypeBindingEnum;
(function (WalletProviderTypeBindingEnum) {
    WalletProviderTypeBindingEnum["PROCIVIS_ONE"] = "PROCIVIS_ONE";
})(WalletProviderTypeBindingEnum || (WalletProviderTypeBindingEnum = {}));
export var WalletUnitStatusBindingEnum;
(function (WalletUnitStatusBindingEnum) {
    WalletUnitStatusBindingEnum["PENDING"] = "PENDING";
    WalletUnitStatusBindingEnum["ACTIVE"] = "ACTIVE";
    WalletUnitStatusBindingEnum["REVOKED"] = "REVOKED";
    WalletUnitStatusBindingEnum["ERROR"] = "ERROR";
})(WalletUnitStatusBindingEnum || (WalletUnitStatusBindingEnum = {}));
