import {
  TrustEntityTypeBindingEnum,
  ConfigBindingDto,
} from "./one-core-uniffi-intf";

export enum KeyAlgorithmFeatureEnum {
  GENERATE_CSR = "GENERATE_CSR",
}

export interface KeyAlgorithmCapabilities {
  features: KeyAlgorithmFeatureEnum[];
}

export enum KeyStorageSecurityEnum {
  HARDWARE = "HARDWARE",
  SOFTWARE = "SOFTWARE",
}

export enum KeyStorageFeatureEnum {
  EXPORTABLE = "EXPORTABLE",
}

export interface KeyStorageCapabilities {
  algorithms: string[];
  features: KeyStorageFeatureEnum[];
  security: KeyStorageSecurityEnum[];
}

export enum DidOperationEnum {
  RESOLVE = "RESOLVE",
  CREATE = "CREATE",
  DEACTIVATE = "DEACTIVATE",
}

export interface DidCapabilities {
  operations: DidOperationEnum[];
  keyAlgorithms: string[];
}

export enum FormatFeatureEnum {
  SelectiveDisclosure = "SELECTIVE_DISCLOSURE",
  SupportsCredentialDesign = "SUPPORTS_CREDENTIAL_DESIGN",
  RequiresSchemaId = "REQUIRES_SCHEMA_ID",
}

export enum FormatSelectiveDisclosureEnum {
  AnyLevel = "ANY_LEVEL",
  SecondLevel = "SECOND_LEVEL",
}

export interface FormatCapabilities {
  features: FormatFeatureEnum[];
  selectiveDisclosure: FormatSelectiveDisclosureEnum[];
  issuanceDidMethods: string[];
  issuanceExchangeProtocols: string[];
  proofExchangeProtocols: string[];
  revocationMethods: string[];
  signingKeyAlgorithms: string[];
  verificationKeyAlgorithms: string[];
  verificationKeyStorages: string[];
  datatypes: Array<DataTypeEnum | string>;
  allowedSchemaIds: string[];
  forbiddenClaimNames: string[];
  issuanceIdentifierTypes: string[];
  verificationIdentifierTypes: string[];
}

export enum RevocationOperationEnum {
  REVOKE = "REVOKE",
  SUSPEND = "SUSPEND",
}

export interface RevocationCapabilities {
  operations: RevocationOperationEnum[];
}

export interface ConfigEntity<Capabilities> {
  enabled?: boolean;
  capabilities: Capabilities;
  display: string | Record<string, string>;
  order: number;
}

export type ConfigEntities<
  Capabilities = undefined,
  Params = { type: string }
> = Record<string, ConfigEntity<Capabilities> & Params>;

export enum DataTypeEnum {
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
      type: DataTypeEnum.String;
      params?: StringDataTypeParams;
    }
  | {
      type: DataTypeEnum.Number;
      params?: NumberDataTypeParams;
    }
  | {
      type: DataTypeEnum.Date;
      params?: DateDataTypeParams;
    }
  | {
      type: DataTypeEnum.Picture | DataTypeEnum.SwiyuPicture;
      params?: FileDataTypeParams;
    }
  | {
      type: DataTypeEnum.Object | DataTypeEnum.Array | DataTypeEnum.Boolean;
      params?: undefined;
    };

export enum IssuanceProtocolFeatureEnum {
  SupportsRejection = "SUPPORTS_REJECTION",
}

export interface IssuanceProtocolCapabilities {
  didMethods: string[];
  features: IssuanceProtocolFeatureEnum[];
}

export interface VerificationProtocolCapabilities {
  didMethods: string[];
  supportedTransports: string[];
}

export enum TrustOperation {
  Publish = "PUBLISH",
  Lookup = "LOOKUP",
}

export interface TrustCapabilities {
  operations: TrustOperation[];
  supportedTypes: TrustEntityTypeBindingEnum[];
}

export interface Config {
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

// Typescript automatic assertions to keep the fields of ONECore ConfigBindingDto and typed Config in sync
/** assert that all fields listed in {@link ConfigBindingDto} exist in {@link Config} */
const missingFieldsCheck: keyof Config =
  null as unknown as keyof ConfigBindingDto;

/** assert that all fields listed in {@link Config} exist in {@link ConfigBindingDto} */
const extraFieldsCheck: keyof ConfigBindingDto =
  null as unknown as keyof Config;
