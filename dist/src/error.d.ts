import { ErrorData, Cause } from "./core";
/**
 * Specific errors being thrown from the {@link ONECore} functions
 */
export declare class OneError extends Error {
    readonly operation: string;
    readonly code: string;
    readonly cause?: Cause;
    readonly data?: ErrorData;
    readonly originalError: Error;
    constructor(params: {
        operation: string;
        code: string;
        message: string;
        cause?: Cause;
        data?: ErrorData;
        originalError: Error;
    });
}
