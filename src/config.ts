import {
  TrustEntityType,
  Config,
  IdentifierType,
} from "./one-core-uniffi-intf";

export enum KeyAlgorithmFeature {
  GENERATE_CSR = "GENERATE_CSR",
}

export interface KeyAlgorithmCapabilities {
  features: KeyAlgorithmFeature[];
}

export enum KeyStorageFeature {
  EXPORTABLE = "EXPORTABLE",
  IMPORTABLE = "IMPORTABLE",
  ATTESTATION = "ATTESTATION",
}

export interface KeyStorageCapabilities {
  algorithms: string[];
  features: KeyStorageFeature[];
}

export enum DidOperation {
  RESOLVE = "RESOLVE",
  CREATE = "CREATE",
  DEACTIVATE = "DEACTIVATE",
}

export interface DidCapabilities {
  operations: DidOperation[];
  keyAlgorithms: string[];
}

export enum FormatFeature {
  SelectiveDisclosure = "SELECTIVE_DISCLOSURE",
  SupportsCredentialDesign = "SUPPORTS_CREDENTIAL_DESIGN",
  SupportsSchemaId = "SUPPORTS_SCHEMA_ID",
  RequiresPresentationEncryption = "REQUIRES_PRESENTATION_ENCRYPTION",
  SupportsCombinedPresentation = "SUPPORTS_COMBINED_PRESENTATION",
  SupportsTxCode = "SUPPORTS_TX_CODE",
}

export enum FormatSelectiveDisclosure {
  AnyLevel = "ANY_LEVEL",
  SecondLevel = "SECOND_LEVEL",
}

export interface FormatCapabilities {
  features: FormatFeature[];
  selectiveDisclosure: FormatSelectiveDisclosure[];
  issuanceDidMethods: string[];
  issuanceExchangeProtocols: string[];
  proofExchangeProtocols: string[];
  revocationMethods: string[];
  signingKeyAlgorithms: string[];
  verificationKeyAlgorithms: string[];
  verificationKeyStorages: string[];
  datatypes: Array<DataType | string>;
  forbiddenClaimNames: string[];
  issuanceIdentifierTypes: string[];
  verificationIdentifierTypes: string[];
  holderIdentifierTypes: string[];
  holderKeyAlgorithms: string[];
  holderDidMethods: string[];
  ecosystemSchemaIds: string[];
}

export enum RevocationOperation {
  REVOKE = "REVOKE",
  SUSPEND = "SUSPEND",
}

export interface RevocationCapabilities {
  operations: RevocationOperation[];
}

export interface ConfigEntity<Capabilities> {
  enabled?: boolean;
  capabilities: Capabilities;
  display: string | Record<string, string>;
  order: number;
}

export type ConfigEntities<
  Capabilities = undefined,
  Params = { type: string },
> = Record<string, ConfigEntity<Capabilities> & Params>;

export enum DataType {
  String = "STRING",
  Number = "NUMBER",
  Date = "DATE",
  Picture = "PICTURE",
  SwiyuPicture = "SWIYU_PICTURE",
  Boolean = "BOOLEAN",
  Object = "OBJECT",
  Array = "ARRAY",
}

type DataTypeError = string | Record<string, string>;

export interface StringDataTypeParams {
  autocomplete: boolean;
  error?: DataTypeError;
  pattern: string;
  placeholder: string;
}

export interface NumberDataTypeParams {
  error?: DataTypeError;
  max?: number;
  min?: number;
}

export interface DateDataTypeParams {
  error?: DataTypeError;
  max?: string;
  min?: string;
}

export interface FileDataTypeParams {
  accept?: string[];
  fileSize?: number;
  showAs: "IMAGE" | "VIDEO" | "FILE";
}

export type DataTypeParams =
  | {
      type: DataType.String;
      params?: StringDataTypeParams;
    }
  | {
      type: DataType.Number;
      params?: NumberDataTypeParams;
    }
  | {
      type: DataType.Date;
      params?: DateDataTypeParams;
    }
  | {
      type: DataType.Picture | DataType.SwiyuPicture;
      params?: FileDataTypeParams;
    }
  | {
      type: DataType.Object | DataType.Array | DataType.Boolean;
      params?: undefined;
    };

export enum IssuanceProtocolFeature {
  SupportsRejection = "SUPPORTS_REJECTION",
  SupportsWebhooks = "SUPPORTS_WEBHOOKS",
}

export interface IssuanceProtocolCapabilities {
  didMethods: string[];
  features: IssuanceProtocolFeature[];
}

export enum VerificationProtocolFeature {
  SupportsWebhooks = "SUPPORTS_WEBHOOKS",
}

export enum PresentationDefinitionVersion {
  V1 = "V1",
  V2 = "V2",
}

export interface VerificationProtocolCapabilities {
  features: VerificationProtocolFeature[];
  didMethods: string[];
  supportedTransports: string[];
  verifierIdentifierTypes: IdentifierType[];
  supportedPresentationDefinition: PresentationDefinitionVersion[];
}

export enum TrustOperation {
  Publish = "PUBLISH",
  Lookup = "LOOKUP",
}

export interface TrustCapabilities {
  operations: TrustOperation[];
  supportedTypes: TrustEntityType[];
}

export interface CoreConfig {
  format: ConfigEntities<FormatCapabilities>;
  issuanceProtocol: ConfigEntities<IssuanceProtocolCapabilities>;
  verificationProtocol: ConfigEntities<VerificationProtocolCapabilities>;
  transport: ConfigEntities;
  revocation: ConfigEntities<RevocationCapabilities>;
  did: ConfigEntities<DidCapabilities>;
  identifier: ConfigEntities;
  datatype: ConfigEntities<undefined, DataTypeParams>;
  keyAlgorithm: ConfigEntities<KeyAlgorithmCapabilities, {}>;
  keyStorage: ConfigEntities<KeyStorageCapabilities>;
  trustManagement: ConfigEntities<TrustCapabilities>;
  cacheEntities: ConfigEntities;
  task: ConfigEntities;
  credentialIssuer: ConfigEntities<undefined, {}>;
  walletProvider: ConfigEntities;
}

// Typescript automatic assertions to keep the fields of ONECore Config and typed Config in sync
/** assert that all fields listed in {@link CoreConfig} exist in {@link Config} */
const missingFieldsCheck: keyof Config = null as unknown as keyof CoreConfig;

/** assert that all fields listed in {@link Config} exist in {@link CoreConfig} */
const extraFieldsCheck: keyof CoreConfig = null as unknown as keyof Config;
