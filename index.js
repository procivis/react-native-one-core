import { NativeModules } from "react-native";
const ONE = NativeModules.ProcivisOneCoreModule;
export var CredentialState;
(function (CredentialState) {
    CredentialState["CREATED"] = "CREATED";
    CredentialState["PENDING"] = "PENDING";
    CredentialState["OFFERED"] = "OFFERED";
    CredentialState["ACCEPTED"] = "ACCEPTED";
    CredentialState["REJECTED"] = "REJECTED";
    CredentialState["REVOKED"] = "REVOKED";
    CredentialState["ERROR"] = "ERROR";
})(CredentialState || (CredentialState = {}));
export var RevocationMethod;
(function (RevocationMethod) {
    RevocationMethod["NONE"] = "NONE";
    RevocationMethod["STATUS_LIST2021"] = "STATUS_LIST2021";
    RevocationMethod["LVVC"] = "LVVC";
})(RevocationMethod || (RevocationMethod = {}));
export var CredentialFormat;
(function (CredentialFormat) {
    CredentialFormat["JWT"] = "JWT";
    CredentialFormat["SD_JWT"] = "SD_JWT";
    CredentialFormat["JSON_LD"] = "JSON_LD";
    CredentialFormat["MDOC"] = "MDOC";
})(CredentialFormat || (CredentialFormat = {}));
export var ClaimDataType;
(function (ClaimDataType) {
    ClaimDataType["STRING"] = "STRING";
    ClaimDataType["DATE"] = "DATE";
    ClaimDataType["NUMBER"] = "NUMBER";
})(ClaimDataType || (ClaimDataType = {}));
// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed
export var OneErrorCode;
(function (OneErrorCode) {
    // OneCoreError
    OneErrorCode["DataLayerError"] = "DataLayerError";
    OneErrorCode["SSIError"] = "SSIError";
    OneErrorCode["FormatterError"] = "FormatterError";
    // DataLayerError
    OneErrorCode["GeneralRuntimeError"] = "GeneralRuntimeError";
    OneErrorCode["AlreadyExists"] = "AlreadyExists";
    OneErrorCode["IncorrectParameters"] = "IncorrectParameters";
    OneErrorCode["RecordNotFound"] = "RecordNotFound";
    OneErrorCode["RecordNotUpdated"] = "RecordNotUpdated";
    OneErrorCode["Other"] = "Other";
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
                    message: cause.message,
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
const rnONE = wrapObj(ONE);
export default rnONE;
