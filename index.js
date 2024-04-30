import { NativeModules } from "react-native";
const ONE = NativeModules.ProcivisOneCoreModule;
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
export var WalletStorageType;
(function (WalletStorageType) {
    WalletStorageType["HARDWARE"] = "HARDWARE";
    WalletStorageType["SOFTWARE"] = "SOFTWARE";
})(WalletStorageType || (WalletStorageType = {}));
export var KnownCredentialSchemaType;
(function (KnownCredentialSchemaType) {
    KnownCredentialSchemaType["PROCIVIS_ONE_SCHEMA2024"] = "PROCIVIS_ONE_SCHEMA2024";
    KnownCredentialSchemaType["FALLBACK_SCHEMA2024"] = "FALLBACK_SCHEMA2024";
    KnownCredentialSchemaType["MDOC"] = "MDOC";
})(KnownCredentialSchemaType || (KnownCredentialSchemaType = {}));
export var LayoutType;
(function (LayoutType) {
    LayoutType["CARD"] = "CARD";
    LayoutType["DOCUMENT"] = "DOCUMENT";
    LayoutType["SINGLE_ATTRIBUTE"] = "SINGLE_ATTRIBUTE";
})(LayoutType || (LayoutType = {}));
export var CredentialSchemaCodeType;
(function (CredentialSchemaCodeType) {
    CredentialSchemaCodeType["BARCODE"] = "BARCODE";
    CredentialSchemaCodeType["MRZ"] = "MRZ";
    CredentialSchemaCodeType["QR_CODE"] = "QR_CODE";
})(CredentialSchemaCodeType || (CredentialSchemaCodeType = {}));
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
export var SortDirection;
(function (SortDirection) {
    SortDirection["ASCENDING"] = "ASCENDING";
    SortDirection["DESCENDING"] = "DESCENDING";
})(SortDirection || (SortDirection = {}));
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
})(CredentialListIncludeEntityType || (CredentialListIncludeEntityType = {}));
export var SortableDidColumnEnum;
(function (SortableDidColumnEnum) {
    SortableDidColumnEnum["NAME"] = "NAME";
    SortableDidColumnEnum["CREATED_DATE"] = "CREATED_DATE";
    SortableDidColumnEnum["METHOD"] = "METHOD";
    SortableDidColumnEnum["TYPE"] = "TYPE";
    SortableDidColumnEnum["DID"] = "DID";
    SortableDidColumnEnum["DEACTIVATED"] = "DEACTIVATED";
})(SortableDidColumnEnum || (SortableDidColumnEnum = {}));
export var ExactDidFilterColumnEnum;
(function (ExactDidFilterColumnEnum) {
    ExactDidFilterColumnEnum["NAME"] = "NAME";
    ExactDidFilterColumnEnum["DID"] = "DID";
})(ExactDidFilterColumnEnum || (ExactDidFilterColumnEnum = {}));
export var KeyRoleEnum;
(function (KeyRoleEnum) {
    KeyRoleEnum["AUTHENTICATION"] = "AUTHENTICATION";
    KeyRoleEnum["ASSERTION_METHOD"] = "ASSERTION_METHOD";
    KeyRoleEnum["KEY_AGREEMENT"] = "KEY_AGREEMENT";
    KeyRoleEnum["CAPABILITY_INVOCATION"] = "CAPABILITY_INVOCATION";
    KeyRoleEnum["CAPABILITY_DELEGATION"] = "CAPABILITY_DELEGATION";
})(KeyRoleEnum || (KeyRoleEnum = {}));
export var HistoryActionEnum;
(function (HistoryActionEnum) {
    HistoryActionEnum["ACCEPTED"] = "ACCEPTED";
    HistoryActionEnum["CREATED"] = "CREATED";
    HistoryActionEnum["DEACTIVATED"] = "DEACTIVATED";
    HistoryActionEnum["DELETED"] = "DELETED";
    HistoryActionEnum["ISSUED"] = "ISSUED";
    HistoryActionEnum["OFFERED"] = "OFFERED";
    HistoryActionEnum["REACTIVATED"] = "REACTIVATED";
    HistoryActionEnum["REJECTED"] = "REJECTED";
    HistoryActionEnum["REQUESTED"] = "REQUESTED";
    HistoryActionEnum["REVOKED"] = "REVOKED";
    HistoryActionEnum["PENDING"] = "PENDING";
    HistoryActionEnum["SUSPENDED"] = "SUSPENDED";
    HistoryActionEnum["RESTORED"] = "RESTORED";
})(HistoryActionEnum || (HistoryActionEnum = {}));
export var HistoryEntityTypeEnum;
(function (HistoryEntityTypeEnum) {
    HistoryEntityTypeEnum["KEY"] = "KEY";
    HistoryEntityTypeEnum["DID"] = "DID";
    HistoryEntityTypeEnum["CREDENTIAL"] = "CREDENTIAL";
    HistoryEntityTypeEnum["CREDENTIAL_SCHEMA"] = "CREDENTIAL_SCHEMA";
    HistoryEntityTypeEnum["PROOF"] = "PROOF";
    HistoryEntityTypeEnum["PROOF_SCHEMA"] = "PROOF_SCHEMA";
    HistoryEntityTypeEnum["ORGANISATION"] = "ORGANISATION";
    HistoryEntityTypeEnum["BACKUP"] = "BACKUP";
})(HistoryEntityTypeEnum || (HistoryEntityTypeEnum = {}));
export var HistorySearchTypeEnum;
(function (HistorySearchTypeEnum) {
    HistorySearchTypeEnum["CLAIM_NAME"] = "CLAIM_NAME";
    HistorySearchTypeEnum["CLAIM_VALUE"] = "CLAIM_VALUE";
    HistorySearchTypeEnum["CREDENTIAL_SCHEMA_NAME"] = "CREDENTIAL_SCHEMA_NAME";
    HistorySearchTypeEnum["ISSUER_DID"] = "ISSUER_DID";
    HistorySearchTypeEnum["ISSUER_NAME"] = "ISSUER_NAME";
    HistorySearchTypeEnum["VERIFIER_DID"] = "VERIFIER_DID";
    HistorySearchTypeEnum["VERIFIER_NAME"] = "VERIFIER_NAME";
})(HistorySearchTypeEnum || (HistorySearchTypeEnum = {}));
export var PresentationDefinitionRuleTypeEnum;
(function (PresentationDefinitionRuleTypeEnum) {
    PresentationDefinitionRuleTypeEnum["ALL"] = "ALL";
    PresentationDefinitionRuleTypeEnum["PICK"] = "PICK";
})(PresentationDefinitionRuleTypeEnum || (PresentationDefinitionRuleTypeEnum = {}));
export var DidTypeEnum;
(function (DidTypeEnum) {
    DidTypeEnum["LOCAL"] = "LOCAL";
    DidTypeEnum["REMOTE"] = "REMOTE";
})(DidTypeEnum || (DidTypeEnum = {}));
export var KeyStorageSecurityEnum;
(function (KeyStorageSecurityEnum) {
    KeyStorageSecurityEnum["HARDWARE"] = "HARDWARE";
    KeyStorageSecurityEnum["SOFTWARE"] = "SOFTWARE";
})(KeyStorageSecurityEnum || (KeyStorageSecurityEnum = {}));
export var FormatFeatureEnum;
(function (FormatFeatureEnum) {
    FormatFeatureEnum["SelectiveDisclosure"] = "SELECTIVE_DISCLOSURE";
})(FormatFeatureEnum || (FormatFeatureEnum = {}));
export var DataTypeEnum;
(function (DataTypeEnum) {
    DataTypeEnum["String"] = "STRING";
    DataTypeEnum["Number"] = "NUMBER";
    DataTypeEnum["Date"] = "DATE";
    DataTypeEnum["File"] = "FILE";
    DataTypeEnum["Object"] = "OBJECT";
})(DataTypeEnum || (DataTypeEnum = {}));
// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed
export var OneErrorCode;
(function (OneErrorCode) {
    // BindingError
    OneErrorCode["AlreadyExists"] = "AlreadyExists";
    OneErrorCode["NotFound"] = "NotFound";
    OneErrorCode["NotSupported"] = "NotSupported";
    OneErrorCode["ValidationError"] = "ValidationError";
    OneErrorCode["ConfigValidationError"] = "ConfigValidationError";
    OneErrorCode["Uninitialized"] = "Uninitialized";
    OneErrorCode["DbErr"] = "DbErr";
    OneErrorCode["IOError"] = "IOError";
    OneErrorCode["Unknown"] = "Unknown";
})(OneErrorCode || (OneErrorCode = {}));
/**
 * Specific errors being throw from the {@link ONECore} functions
 */
export class OneError extends Error {
    code;
    cause;
    constructor(params) {
        super(params.message);
        this.code = params.code;
        this.cause = params.cause;
    }
}
function wrapFn(fn, name) {
    return (...args) => {
        const errHandler = (cause) => {
            const code = (cause ?? {}).code;
            if (Object.values(OneErrorCode).includes(code)) {
                // throw a specific error to be able to handle it easily
                throw new OneError({
                    code,
                    cause,
                    message: cause?.message,
                });
            }
            else {
                throw cause;
            }
        };
        // set name on the err handler to display the original function name in callstack
        Object.defineProperty(errHandler, "name", { value: name });
        // convert undefined parameters to null for proper parameter matching in native code
        return fn(...args.map((x) => (x === undefined ? null : x))).catch(errHandler);
    };
}
function wrapObj(obj) {
    return Object.entries(obj).reduce((aggr, [key, fn]) => ({
        ...aggr,
        [key]: typeof fn === "function" ? wrapFn(fn, key) : fn,
    }), {});
}
// Config entities are exposed as serialized JSON, here conversion to structs
const originalGetConfig = ONE.getConfig;
ONE.getConfig = () => originalGetConfig().then((config) => objectMap(config, (entities) => objectMap(entities, (json) => JSON.parse(json))));
/**
 * Initialize the ONE Core
 * @note Beware that only one instance can be initialized at a time, repeated calls will fail
 * @returns ONE Core instance
 */
export async function initializeCore() {
    await wrapFn(ONE.initialize, "initializeCore")();
    return wrapObj(ONE);
}
// UTILS
// returns a new object with the values at each key mapped using fn(value)
const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
