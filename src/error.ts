import { ONECore, ErrorData, Cause } from "./core";

/**
 * Specific errors being thrown from the {@link ONECore} functions
 */
export class OneError extends Error {
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
  }) {
    super(params.message);
    this.operation = params.operation;
    this.code = params.code;
    this.cause = params.cause;
    this.data = params.data;
    this.originalError = params.originalError;
  }
}
