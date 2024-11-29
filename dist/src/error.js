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
    OneErrorCode["IncorrectTxCode"] = "IncorrectTxCode";
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
