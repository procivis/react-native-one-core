export var IdentifierStateEnum;
(function (IdentifierStateEnum) {
    IdentifierStateEnum["ACTIVE"] = "ACTIVE";
    IdentifierStateEnum["DEACTIVATED"] = "DEACTIVATED";
})(IdentifierStateEnum || (IdentifierStateEnum = {}));
export var IdentifierTypeEnum;
(function (IdentifierTypeEnum) {
    IdentifierTypeEnum["KEY"] = "KEY";
    IdentifierTypeEnum["DID"] = "DID";
    IdentifierTypeEnum["CERTIFICATE"] = "CERTIFICATE";
})(IdentifierTypeEnum || (IdentifierTypeEnum = {}));
export var CertificateStateEnum;
(function (CertificateStateEnum) {
    CertificateStateEnum["NOT_YET_ACTIVE"] = "NOT_YET_ACTIVE";
    CertificateStateEnum["ACTIVE"] = "ACTIVE";
    CertificateStateEnum["REVOKED"] = "REVOKED";
    CertificateStateEnum["EXPIRED"] = "EXPIRED";
})(CertificateStateEnum || (CertificateStateEnum = {}));
export var SortableIdentifierColumnEnum;
(function (SortableIdentifierColumnEnum) {
    SortableIdentifierColumnEnum["NAME"] = "NAME";
    SortableIdentifierColumnEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableIdentifierColumnEnum["TYPE"] = "TYPE";
    SortableIdentifierColumnEnum["STATE"] = "STATE";
})(SortableIdentifierColumnEnum || (SortableIdentifierColumnEnum = {}));
export var ExactIdentifierFilterColumnEnum;
(function (ExactIdentifierFilterColumnEnum) {
    ExactIdentifierFilterColumnEnum["NAME"] = "NAME";
})(ExactIdentifierFilterColumnEnum || (ExactIdentifierFilterColumnEnum = {}));
