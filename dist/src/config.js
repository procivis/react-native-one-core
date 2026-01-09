export var KeyAlgorithmFeatureEnum;
(function (KeyAlgorithmFeatureEnum) {
    KeyAlgorithmFeatureEnum["GENERATE_CSR"] = "GENERATE_CSR";
})(KeyAlgorithmFeatureEnum || (KeyAlgorithmFeatureEnum = {}));
export var KeyStorageSecurityEnum;
(function (KeyStorageSecurityEnum) {
    KeyStorageSecurityEnum["HARDWARE"] = "HARDWARE";
    KeyStorageSecurityEnum["SOFTWARE"] = "SOFTWARE";
})(KeyStorageSecurityEnum || (KeyStorageSecurityEnum = {}));
export var KeyStorageFeatureEnum;
(function (KeyStorageFeatureEnum) {
    KeyStorageFeatureEnum["EXPORTABLE"] = "EXPORTABLE";
})(KeyStorageFeatureEnum || (KeyStorageFeatureEnum = {}));
export var DidOperationEnum;
(function (DidOperationEnum) {
    DidOperationEnum["RESOLVE"] = "RESOLVE";
    DidOperationEnum["CREATE"] = "CREATE";
    DidOperationEnum["DEACTIVATE"] = "DEACTIVATE";
})(DidOperationEnum || (DidOperationEnum = {}));
export var FormatFeatureEnum;
(function (FormatFeatureEnum) {
    FormatFeatureEnum["SelectiveDisclosure"] = "SELECTIVE_DISCLOSURE";
    FormatFeatureEnum["SupportsCredentialDesign"] = "SUPPORTS_CREDENTIAL_DESIGN";
    FormatFeatureEnum["RequiresSchemaId"] = "REQUIRES_SCHEMA_ID";
})(FormatFeatureEnum || (FormatFeatureEnum = {}));
export var FormatSelectiveDisclosureEnum;
(function (FormatSelectiveDisclosureEnum) {
    FormatSelectiveDisclosureEnum["AnyLevel"] = "ANY_LEVEL";
    FormatSelectiveDisclosureEnum["SecondLevel"] = "SECOND_LEVEL";
})(FormatSelectiveDisclosureEnum || (FormatSelectiveDisclosureEnum = {}));
export var RevocationOperationEnum;
(function (RevocationOperationEnum) {
    RevocationOperationEnum["REVOKE"] = "REVOKE";
    RevocationOperationEnum["SUSPEND"] = "SUSPEND";
})(RevocationOperationEnum || (RevocationOperationEnum = {}));
export var DataTypeEnum;
(function (DataTypeEnum) {
    DataTypeEnum["String"] = "STRING";
    DataTypeEnum["Number"] = "NUMBER";
    DataTypeEnum["Date"] = "DATE";
    DataTypeEnum["Picture"] = "PICTURE";
    DataTypeEnum["SwiyuPicture"] = "SWIYU_PICTURE";
    DataTypeEnum["Boolean"] = "BOOLEAN";
    DataTypeEnum["Object"] = "OBJECT";
    DataTypeEnum["Array"] = "ARRAY";
})(DataTypeEnum || (DataTypeEnum = {}));
export var IssuanceProtocolFeatureEnum;
(function (IssuanceProtocolFeatureEnum) {
    IssuanceProtocolFeatureEnum["SupportsRejection"] = "SUPPORTS_REJECTION";
})(IssuanceProtocolFeatureEnum || (IssuanceProtocolFeatureEnum = {}));
export var TrustOperation;
(function (TrustOperation) {
    TrustOperation["Publish"] = "PUBLISH";
    TrustOperation["Lookup"] = "LOOKUP";
})(TrustOperation || (TrustOperation = {}));
// Typescript automatic assertions to keep the fields of ONECore ConfigBindingDto and typed Config in sync
/** assert that all fields listed in {@link ConfigBindingDto} exist in {@link Config} */
const missingFieldsCheck = null;
/** assert that all fields listed in {@link Config} exist in {@link ConfigBindingDto} */
const extraFieldsCheck = null;
