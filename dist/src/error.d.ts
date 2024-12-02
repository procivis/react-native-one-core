/**
 * Specific errors being thrown from the {@link ONECore} functions
 */
export declare class OneError extends Error {
    readonly operation: string;
    readonly code: string;
    readonly cause?: string;
    readonly originalError: Error;
    constructor(params: {
        operation: string;
        code: string;
        message: string;
        cause?: string;
        originalError: Error;
    });
}
