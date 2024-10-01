export var CredentialStateEnum;
(function (CredentialStateEnum) {
    CredentialStateEnum["CREATED"] = "CREATED";
    CredentialStateEnum["PENDING"] = "PENDING";
    CredentialStateEnum["OFFERED"] = "OFFERED";
    CredentialStateEnum["ACCEPTED"] = "ACCEPTED";
    CredentialStateEnum["REJECTED"] = "REJECTED";
    CredentialStateEnum["REVOKED"] = "REVOKED";
    CredentialStateEnum["SUSPENDED"] = "SUSPENDED";
    CredentialStateEnum["ERROR"] = "ERROR";
})(CredentialStateEnum || (CredentialStateEnum = {}));
export var CredentialRoleEnum;
(function (CredentialRoleEnum) {
    CredentialRoleEnum["HOLDER"] = "HOLDER";
    CredentialRoleEnum["ISSUER"] = "ISSUER";
    CredentialRoleEnum["VERIFIER"] = "VERIFIER";
})(CredentialRoleEnum || (CredentialRoleEnum = {}));
export var CredentialListQueryExactColumnEnum;
(function (CredentialListQueryExactColumnEnum) {
    CredentialListQueryExactColumnEnum["NAME"] = "NAME";
})(CredentialListQueryExactColumnEnum || (CredentialListQueryExactColumnEnum = {}));
export var SortableCredentialColumnEnum;
(function (SortableCredentialColumnEnum) {
    SortableCredentialColumnEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableCredentialColumnEnum["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableCredentialColumnEnum["ISSUER_DID"] = "ISSUER_DID";
    SortableCredentialColumnEnum["STATE"] = "STATE";
})(SortableCredentialColumnEnum || (SortableCredentialColumnEnum = {}));
export var CredentialListIncludeEntityType;
(function (CredentialListIncludeEntityType) {
    CredentialListIncludeEntityType["LAYOUT_PROPERTIES"] = "LAYOUT_PROPERTIES";
    CredentialListIncludeEntityType["CREDENTIAL"] = "CREDENTIAL";
})(CredentialListIncludeEntityType || (CredentialListIncludeEntityType = {}));
export var CredentialListSearchType;
(function (CredentialListSearchType) {
    CredentialListSearchType["CLAIM_NAME"] = "CLAIM_NAME";
    CredentialListSearchType["CLAIM_VALUE"] = "CLAIM_VALUE";
    CredentialListSearchType["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
})(CredentialListSearchType || (CredentialListSearchType = {}));
