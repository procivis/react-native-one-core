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

export enum CredentialStateEnum {
  CREATED = "CREATED",
  PENDING = "PENDING",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  REVOKED = "REVOKED",
  ERROR = "ERROR",
}

export interface CredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod: string;
}

export interface Claim {
  id: string;
  key: string;
  dataType: string;
  value: string;
}

export interface CredentialListItem {
  id: string;
  createdDate: string;
  issuanceDate: string;
  lastModified: string;
  issuerDid?: string | null;
  state: CredentialStateEnum;
  schema: CredentialSchema;
}

export interface CredentialDetail extends CredentialListItem {
  claims: Claim[];
}

export interface ProofRequestClaim {
  id: string;
  createdDate: string;
  lastModified: string;
  key: string;
  dataType: string;
  required: boolean;
  credentialSchema: CredentialSchema;
}

export interface ListQuery {
  page: number;
  pageSize: number;
  organisationId: string;
}

export interface ItemList<Item> {
  totalItems: number;
  totalPages: number;
  values: Item[];
}

export interface InvitationResultCredentialIssuance {
  issuedCredentialId: string;
}

export interface InvitationResultProofRequest {
  claims: ProofRequestClaim[];
}

export type InvitationResult =
  | InvitationResultCredentialIssuance
  | InvitationResultProofRequest;

export interface ONECore {
  getVersion(): Promise<Version>;
  createOrganisation(uuid: string | undefined): Promise<string>;
  createLocalDid(did: string, organisationId: string): Promise<string>;
  handleInvitation(url: string, didId: string): Promise<InvitationResult>;
  holderRejectProof(): Promise<void>;
  holderSubmitProof(credentialIds: string[]): Promise<void>;
  getCredentials(query: ListQuery): Promise<ItemList<CredentialListItem>>;
  getCredential(credentialId: string): Promise<CredentialDetail>;
}

// Function call arguments/Error transformation
// for devs: Beware to not declare function parameters as optional, otherwise automatic conversion to null will not be performed

export enum OneErrorCode {
  // ServiceError
  GeneralRuntimeError = "GeneralRuntimeError",
  MappingError = "MappingError",
  AlreadyExists = "AlreadyExists",
  IncorrectParameters = "IncorrectParameters",
  NotFound = "NotFound",
  NotUpdated = "NotUpdated",
  ValidationError = "ValidationError",
  ConfigValidationError = "ConfigValidationError",
  TransportProtocolError = "TransportProtocolError",
  FormatterError = "FormatterError",
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
          message: cause?.message,
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
