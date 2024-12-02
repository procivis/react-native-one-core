import { ONECore } from "./core";

/**
 * Specific errors being thrown from the {@link ONECore} functions
 */
export class OneError extends Error {
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
  }) {
    super(params.message);
    this.operation = params.operation;
    this.code = params.code;
    this.cause = params.cause;
    this.originalError = params.originalError;
  }
}
