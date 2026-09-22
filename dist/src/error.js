/**
 * Specific errors being thrown from the {@link ONECore} functions
 */
export class OneError extends Error {
    operation;
    code;
    cause;
    data;
    originalError;
    constructor(params) {
        super(params.message);
        this.operation = params.operation;
        this.code = params.code;
        this.cause = params.cause;
        this.data = params.data;
        this.originalError = params.originalError;
    }
}
