export enum OneErrorCode {
  // BindingError
  AlreadyExists = "AlreadyExists",
  NotFound = "NotFound",
  NotSupported = "NotSupported",
  ValidationError = "ValidationError",
  ConfigValidationError = "ConfigValidationError",
  Uninitialized = "Uninitialized",
  DbErr = "DbErr",
  IOError = "IOError",
  Unknown = "Unknown",
  IncorrectTxCode = "IncorrectTxCode",
}

/**
 * Specific errors being throw from the {@link ONECore} functions
 */
export class OneError extends Error {
  readonly code: OneErrorCode;
  readonly cause: unknown;

  constructor(params: {
    code: OneErrorCode;
    cause: unknown;
    message?: string;
  }) {
    super(params.message);
    this.code = params.code;
    this.cause = params.cause;
  }
}
