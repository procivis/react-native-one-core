export var KeyAlgorithmFeature;
(function (KeyAlgorithmFeature) {
    KeyAlgorithmFeature["GENERATE_CSR"] = "GENERATE_CSR";
})(KeyAlgorithmFeature || (KeyAlgorithmFeature = {}));
export var KeyStorageFeature;
(function (KeyStorageFeature) {
    KeyStorageFeature["EXPORTABLE"] = "EXPORTABLE";
    KeyStorageFeature["IMPORTABLE"] = "IMPORTABLE";
    KeyStorageFeature["ATTESTATION"] = "ATTESTATION";
})(KeyStorageFeature || (KeyStorageFeature = {}));
export var DidOperation;
(function (DidOperation) {
    DidOperation["RESOLVE"] = "RESOLVE";
    DidOperation["CREATE"] = "CREATE";
    DidOperation["DEACTIVATE"] = "DEACTIVATE";
})(DidOperation || (DidOperation = {}));
export var FormatFeature;
(function (FormatFeature) {
    FormatFeature["SelectiveDisclosure"] = "SELECTIVE_DISCLOSURE";
    FormatFeature["SupportsCredentialDesign"] = "SUPPORTS_CREDENTIAL_DESIGN";
    FormatFeature["SupportsSchemaId"] = "SUPPORTS_SCHEMA_ID";
    FormatFeature["RequiresPresentationEncryption"] = "REQUIRES_PRESENTATION_ENCRYPTION";
    FormatFeature["SupportsCombinedPresentation"] = "SUPPORTS_COMBINED_PRESENTATION";
    FormatFeature["SupportsTxCode"] = "SUPPORTS_TX_CODE";
})(FormatFeature || (FormatFeature = {}));
export var FormatSelectiveDisclosure;
(function (FormatSelectiveDisclosure) {
    FormatSelectiveDisclosure["AnyLevel"] = "ANY_LEVEL";
    FormatSelectiveDisclosure["SecondLevel"] = "SECOND_LEVEL";
})(FormatSelectiveDisclosure || (FormatSelectiveDisclosure = {}));
export var RevocationOperation;
(function (RevocationOperation) {
    RevocationOperation["REVOKE"] = "REVOKE";
    RevocationOperation["SUSPEND"] = "SUSPEND";
})(RevocationOperation || (RevocationOperation = {}));
export var DataType;
(function (DataType) {
    DataType["String"] = "STRING";
    DataType["Number"] = "NUMBER";
    DataType["Date"] = "DATE";
    DataType["Picture"] = "PICTURE";
    DataType["SwiyuPicture"] = "SWIYU_PICTURE";
    DataType["Boolean"] = "BOOLEAN";
    DataType["Object"] = "OBJECT";
    DataType["Array"] = "ARRAY";
})(DataType || (DataType = {}));
export var IssuanceProtocolFeature;
(function (IssuanceProtocolFeature) {
    IssuanceProtocolFeature["SupportsRejection"] = "SUPPORTS_REJECTION";
    IssuanceProtocolFeature["SupportsWebhooks"] = "SUPPORTS_WEBHOOKS";
})(IssuanceProtocolFeature || (IssuanceProtocolFeature = {}));
export var VerificationProtocolFeature;
(function (VerificationProtocolFeature) {
    VerificationProtocolFeature["SupportsWebhooks"] = "SUPPORTS_WEBHOOKS";
})(VerificationProtocolFeature || (VerificationProtocolFeature = {}));
export var PresentationDefinitionVersion;
(function (PresentationDefinitionVersion) {
    PresentationDefinitionVersion["V1"] = "V1";
    PresentationDefinitionVersion["V2"] = "V2";
})(PresentationDefinitionVersion || (PresentationDefinitionVersion = {}));
export var TrustOperation;
(function (TrustOperation) {
    TrustOperation["Publish"] = "PUBLISH";
    TrustOperation["Lookup"] = "LOOKUP";
})(TrustOperation || (TrustOperation = {}));
// Typescript automatic assertions to keep the fields of ONECore Config and typed Config in sync
/** assert that all fields listed in {@link CoreConfig} exist in {@link Config} */
const missingFieldsCheck = null;
/** assert that all fields listed in {@link Config} exist in {@link CoreConfig} */
const extraFieldsCheck = null;
