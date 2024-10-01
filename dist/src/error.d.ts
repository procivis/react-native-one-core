export declare enum OneErrorCode {
    AlreadyExists = "AlreadyExists",
    NotFound = "NotFound",
    NotSupported = "NotSupported",
    ValidationError = "ValidationError",
    ConfigValidationError = "ConfigValidationError",
    Uninitialized = "Uninitialized",
    DbErr = "DbErr",
    IOError = "IOError",
    Unknown = "Unknown"
}
/**
 * Specific errors being throw from the {@link ONECore} functions
 */
export declare class OneError extends Error {
    readonly code: OneErrorCode;
    readonly cause: unknown;
    constructor(params: {
        code: OneErrorCode;
        cause: unknown;
        message?: string;
    });
}
