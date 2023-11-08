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
    CredentialStateEnum["ERROR"] = "ERROR";
})(CredentialStateEnum || (CredentialStateEnum = {}));
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
const rnONE = wrapObj(ONE);
export default rnONE;
