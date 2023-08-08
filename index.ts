import { NativeModules } from "react-native";

const ONE = NativeModules.ProcivisOneCoreModule;

export interface Version {
  target: string;
  buildTime: string;
  branch: string;
  tag: string;
  commit: string;
  rustVersion: string;
  pipelineId: string;
}

export interface InvitationResult {
  issuedCredentialId: string;
}

export enum CredentialState {
  CREATED = "CREATED",
  PENDING = "PENDING",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  REVOKED = "REVOKED",
  ERROR = "ERROR",
}

export enum RevocationMethod {
  NONE = "NONE",
  STATUS_LIST2021 = "STATUS_LIST2021",
  LVVC = "LVVC",
}

export enum CredentialFormat {
  JWT = "JWT",
  SD_JWT = "SD_JWT",
  JSON_LD = "JSON_LD",
  MDOC = "MDOC",
}

export enum ClaimDataType {
  STRING = "STRING",
  DATE = "DATE",
  NUMBER = "NUMBER",
}

export interface CredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId: string;
  format: CredentialFormat;
  revocationMethod: RevocationMethod;
}

export interface Claim {
  id: string;
  key: string;
  dataType: ClaimDataType;
  value: string;
}

export interface Credential {
  id: string;
  createdDate: string;
  issuanceDate: string;
  lastModified: string;
  issuerDid?: string | null;
  state: CredentialState;
  claims: Claim[];
  schema: CredentialSchema;
}

export interface ONECore {
  getVersion(): Promise<Version>;
  createOrganisation(uuid: string | undefined): Promise<string>;
  createLocalDid(did: string, organisationId: string): Promise<string>;
  handleInvitation(url: string): Promise<InvitationResult>;
  getCredentials(): Promise<Credential[]>;
}

// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed

export enum OneErrorCode {
  // OneCoreError
  DataLayerError = "DataLayerError",
  SSIError = "SSIError",
  FormatterError = "FormatterError",
  // DataLayerError
  GeneralRuntimeError = "GeneralRuntimeError",
  AlreadyExists = "AlreadyExists",
  IncorrectParameters = "IncorrectParameters",
  RecordNotFound = "RecordNotFound",
  RecordNotUpdated = "RecordNotUpdated",
  Other = "Other",
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

function wrapFn<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn,
  name: string
) {
  return (...args: any[]) => {
    const errHandler = (cause: any) => {
      const code = (cause ?? {}).code;
      if (Object.values(OneErrorCode).includes(code)) {
        // throw a specific error to be able to handle it easily
        throw new OneError({
          code,
          cause,
          message: cause.message,
        });
      } else {
        throw cause;
      }
    };

    // set name on the err handler to display the original function name in callstack
    Object.defineProperty(errHandler, "name", { value: name });

    // convert undefined parameters to null for proper parameter matching in native code
    return fn(...args.map((x) => (x === undefined ? null : x))).catch(
      errHandler
    ) as unknown as Fn;
  };
}

function wrapObj<T extends Record<string, (...args: any[]) => Promise<any>>>(
  obj: T
): T {
  return Object.entries(obj).reduce(
    (aggr, [key, fn]) => ({
      ...aggr,
      [key]: typeof fn === "function" ? wrapFn(fn, key) : fn,
    }),
    {} as T
  );
}

const rnONE: ONECore = wrapObj(ONE);
export default rnONE;
