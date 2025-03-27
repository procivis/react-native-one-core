export var ProofStateEnum;
(function (ProofStateEnum) {
    ProofStateEnum["CREATED"] = "CREATED";
    ProofStateEnum["PENDING"] = "PENDING";
    ProofStateEnum["REQUESTED"] = "REQUESTED";
    ProofStateEnum["ACCEPTED"] = "ACCEPTED";
    ProofStateEnum["REJECTED"] = "REJECTED";
    ProofStateEnum["RETRACTED"] = "RETRACTED";
    ProofStateEnum["ERROR"] = "ERROR";
})(ProofStateEnum || (ProofStateEnum = {}));
export var ProofRoleEnum;
(function (ProofRoleEnum) {
    ProofRoleEnum["HOLDER"] = "HOLDER";
    ProofRoleEnum["VERIFIER"] = "VERIFIER";
})(ProofRoleEnum || (ProofRoleEnum = {}));
export var ScanToVerifyBarcodeTypeEnum;
(function (ScanToVerifyBarcodeTypeEnum) {
    ScanToVerifyBarcodeTypeEnum["MRZ"] = "MRZ";
    ScanToVerifyBarcodeTypeEnum["PDF417"] = "PDF417";
})(ScanToVerifyBarcodeTypeEnum || (ScanToVerifyBarcodeTypeEnum = {}));
export var PresentationDefinitionRuleTypeEnum;
(function (PresentationDefinitionRuleTypeEnum) {
    PresentationDefinitionRuleTypeEnum["ALL"] = "ALL";
    PresentationDefinitionRuleTypeEnum["PICK"] = "PICK";
})(PresentationDefinitionRuleTypeEnum || (PresentationDefinitionRuleTypeEnum = {}));
export var SortableProofColumnEnum;
(function (SortableProofColumnEnum) {
    SortableProofColumnEnum["SCHEMA_NAME"] = "SCHEMA_NAME";
    SortableProofColumnEnum["VERIFIER_DID"] = "VERIFIER_DID";
    SortableProofColumnEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableProofColumnEnum["STATE"] = "STATE";
})(SortableProofColumnEnum || (SortableProofColumnEnum = {}));
export var ExactProofFilterColumnEnum;
(function (ExactProofFilterColumnEnum) {
    ExactProofFilterColumnEnum["NAME"] = "NAME";
})(ExactProofFilterColumnEnum || (ExactProofFilterColumnEnum = {}));
export var ClientIdSchemeEnum;
(function (ClientIdSchemeEnum) {
    ClientIdSchemeEnum["REDIRECT_URI"] = "REDIRECT_URI";
    ClientIdSchemeEnum["VERIFIER_ATTESTATION"] = "VERIFIER_ATTESTATION";
    ClientIdSchemeEnum["DID"] = "DID";
    ClientIdSchemeEnum["X509_SAN_DNS"] = "X509_SAN_DNS";
})(ClientIdSchemeEnum || (ClientIdSchemeEnum = {}));
