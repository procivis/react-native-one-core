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
export var ShareProofRequestClientIdSchemaType;
(function (ShareProofRequestClientIdSchemaType) {
    ShareProofRequestClientIdSchemaType["REDIRECT_URI"] = "REDIRECT_URI";
    ShareProofRequestClientIdSchemaType["VERIFIER_ATTESTATION"] = "VERIFIER_ATTESTATION";
})(ShareProofRequestClientIdSchemaType || (ShareProofRequestClientIdSchemaType = {}));
