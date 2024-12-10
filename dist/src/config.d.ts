export declare enum KeyStorageSecurityEnum {
    HARDWARE = "HARDWARE",
    SOFTWARE = "SOFTWARE"
}
export interface KeyStorageCapabilities {
    algorithms: string[];
    security: KeyStorageSecurityEnum[];
}
export interface DidCapabilities {
    operations: string[];
}
export declare enum FormatFeatureEnum {
    SelectiveDisclosure = "SELECTIVE_DISCLOSURE",
    SupportsCredentialDesign = "SUPPORTS_CREDENTIAL_DESIGN",
    RequiresSchemaId = "REQUIRES_SCHEMA_ID"
}
export declare enum FormatSelectiveDisclosureEnum {
    AnyLevel = "ANY_LEVEL",
    SecondLevel = "SECOND_LEVEL"
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
    datatypes: Array<DataTypeEnum | string>;
    allowedSchemaIds: string[];
    forbiddenClaimNames: string[];
}
export interface ConfigEntity<Capabilities> {
    disabled?: boolean;
    capabilities?: Capabilities;
    display: string;
    order: number;
}
export type ConfigEntities<Capabilities = undefined, Params = {
    type: string;
}> = Record<string, ConfigEntity<Capabilities> & Params>;
export declare enum DataTypeEnum {
    String = "STRING",
    Number = "NUMBER",
    Date = "DATE",
    File = "FILE",
    Boolean = "BOOLEAN",
    Object = "OBJECT"
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
export type DataTypeParams = {
    type: DataTypeEnum.String;
    params?: StringDataTypeParams;
} | {
    type: DataTypeEnum.Number;
    params?: NumberDataTypeParams;
} | {
    type: DataTypeEnum.Date;
    params?: DateDataTypeParams;
} | {
    type: DataTypeEnum.File;
    params?: FileDataTypeParams;
} | {
    type: DataTypeEnum.Object;
    params?: undefined;
};
export interface Config {
    format: ConfigEntities<FormatCapabilities>;
    exchange: ConfigEntities;
    transport: ConfigEntities;
    revocation: ConfigEntities;
    did: ConfigEntities<DidCapabilities>;
    datatype: ConfigEntities<undefined, DataTypeParams>;
    keyAlgorithm: ConfigEntities;
    keyStorage: ConfigEntities<KeyStorageCapabilities>;
    trustManagement: ConfigEntities;
    cacheEntities: ConfigEntities;
}
export {};
