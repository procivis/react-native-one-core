// ==========
// Record definitions:
// ==========

export interface CsrSubject {
  /** Two-letter country code. */
  countryName?: string;
  /** Common name to include in the CSR, typically the domain name of the organization. */
  commonName?: string;
  stateOrProvinceName?: string;
  organisationName?: string;
  localityName?: string;
  serialNumber?: string;
}

export interface Cause {
  message: string;
}

export interface CertificateDetail {
  id: string;
  identifierId: string;
  createdDate: string;
  lastModified: string;
  state: CertificateState;
  name: string;
  chain: string;
  key?: KeyListItem;
  x509Attributes: CertificateX509Attributes;
  roles: Array<CertificateRole>;
}

export interface CertificateX509Attributes {
  serialNumber: string;
  notBefore: string;
  notAfter: string;
  issuer: string;
  subject: string;
  fingerprint: string;
  extensions: Array<CertificateX509Extension>;
}

export interface CertificateX509Extension {
  oid: string;
  value: string;
  critical: boolean;
}

export interface CharacteristicSettings {
  uuid: string;
  permissions: Array<CharacteristicPermission>;
  properties: Array<CharacteristicProperty>;
}

export interface Claim {
  path: string;
  schema: ClaimSchemaInfo;
  value: ClaimValue;
}

export interface ClaimSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  key: string;
  datatype: string;
  required: boolean;
  array: boolean;
  claims: Array<ClaimSchema>;
  mappings?: Array<CredentialClaimSchemaMapping>;
  translations: CredentialClaimSchemaTranslations;
}

export interface ClaimSchemaInfo {
  id: string;
  createdDate: string;
  lastModified: string;
  key: string;
  datatype: string;
  required: boolean;
  array: boolean;
  claims: Array<ClaimSchemaInfo>;
  translations: CredentialClaimSchemaTranslations;
}

export interface Config {
  /** Credential formats. */
  format: Record<string, string>;
  /** Protocols used for issuance. */
  issuanceProtocol: Record<string, string>;
  /** Protocols used for presentation and verification. */
  verificationProtocol: Record<string, string>;
  /** Protocols used for communicating. */
  transport: Record<string, string>;
  /** Methods for managing credential status. */
  revocation: Record<string, string>;
  /** DID methods for identifying agents. */
  did: Record<string, string>;
  /** Identifier types for representing agent's identities. */
  identifier: Record<string, string>;
  /** Data types for validation. */
  datatype: Record<string, string>;
  /** Key algorithms used for signatures. */
  keyAlgorithm: Record<string, string>;
  /** Storage options for keys. */
  keyStorage: Record<string, string>;
  /** Entities held in temporary storage. */
  cacheEntities: Record<string, string>;
  /** Tasks which can be run via the `runTask` method. */
  task: Record<string, string>;
  /** Configuration for wallet-initiated issuance flows. */
  credentialIssuer: Record<string, string>;
  /**
   * Configurations from the Wallet Provider, including version
   * management, trust collections, and feature flags.
   */
  walletProvider: Record<string, string>;
  verifierProvider: Record<string, string>;
  /** Deployment-wide settings that are not tied to a specific config entity. */
  globalSettings: GlobalSettings;
}

export interface ContinueIssuanceResponse {
  /** For reference. */
  interactionId: string;
  /** Key storage required to complete issuance. */
  keyStorageSecurityLevels?: Array<KeyStorageSecurity>;
  /** Key algorithms suitable for issuance. */
  keyAlgorithms?: Array<string>;
  /** Whether a valid WIA is required to complete issuance. */
  requiresWalletInstanceAttestation: boolean;
  /** Protocol used for issuance. */
  protocol: string;
}

export interface CreateCertificateAuthorityRequest {
  name?: string;
  keyId: string;
  chain?: string;
  selfSigned?: CreateSelfSignedCertificateAuthorityRequest;
}

export interface CreateCertificateRequest {
  name?: string;
  chain: string;
  keyId: string;
  roles: Array<CertificateRole>;
}

export interface CreateCredentialSchemaRequest {
  name: string;
  formats: Array<CredentialSchemaFormatRequest>;
  organisationId: string;
  claims: Array<CredentialClaimSchemaRequest>;
  keyStorageSecurity?: KeyStorageSecurity;
  layoutType: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension?: boolean;
  allowRevocation?: boolean;
  batchSize?: number /*i32*/;
  requiresWalletInstanceAttestation: boolean;
  transactionCode?: CredentialSchemaTransactionCodeRequest;
  translations?: CredentialSchemaTranslations;
  embeddedDisclosurePolicy?: DisclosurePolicyCreateRequest;
}

export interface CreateDidRequest {
  organisationId: string;
  name: string;
  didMethod: string;
  keys: DidRequestKeys;
  params: Record<string, string>;
}

export interface CreateIdentifierDidRequest {
  name?: string;
  method: string;
  keys: DidRequestKeys;
  params: Record<string, string>;
}

export interface CreateIdentifierKeyRequest {
  keyId: string;
}

export interface CreateIdentifierRequest {
  organisationId: string;
  name: string;
  /** Deprecated. Use the `key` field instead. */
  keyId?: string;
  key?: CreateIdentifierKeyRequest;
  did?: CreateIdentifierDidRequest;
  certificates?: Array<CreateCertificateRequest>;
  certificateAuthorities?: Array<CreateCertificateAuthorityRequest>;
  trustInformation: Array<CreateIdentifierTrustInformationRequest>;
}

export interface CreateIdentifierTrustInformationRequest {
  data: string;
  type: IdentifierTrustInformationType;
}

export interface CreateOrganisationRequest {
  /** If no UUID is passed, one will be created. */
  id?: string;
  parentOrganisation?: string;
}

/**
 * If protocol is `ISO_MDL`, specify the device engagement type
 * by referencing an entry from `verificationEngagement` of your
 * configuration. `iso_mdl_engagement` accepts either QR code content
 * (for QR device engagement) or NFC engagement parameters from
 * `nfc_read_iso_mdl_engagement`.
 */
export interface CreateProofRequest {
  /** Choose a proof schema to use. */
  proofSchemaId: string;
  /** Deprecated. Use `verifierIdentifierId`. */
  verifierDidId?: string;
  /** Choose the identifier to use to make the request. */
  verifierIdentifierId?: string;
  /**
   * Choose the protocol to use for verification. Check the
   * `verificationProtocol` object of your configuration for
   * supported options and reference the configuration instance.
   */
  protocol: string;
  /**
   * When a shared proof is accepted, the wallet will be redirected
   * to the resource specified here, if redirects are enabled in the
   * configuration. The URI must use a scheme that is allowed by the
   * configuration.
   */
  redirectUri?: string;
  /**
   * If the identifier contains multiple keys, use this to specify
   * which key to use. If omitted, the first suitable key is used.
   */
  verifierKey?: string;
  /**
   * If the identifier contains multiple certificates, use this to
   * specify which key to use. If omitted, the first suitable
   * certificate is used.
   */
  verifierCertificate?: string;
  /** Use to specify device engagement type. */
  isoMdlEngagement?: string;
  /**
   * Choose the transport protocol for the exchange. Check the
   * `transport` object of your configuration for supported
   * options and reference the configuration instance.
   */
  transport?: Array<string>;
  /** Country profile to associate with this request. */
  profile?: string;
  /** Use for ISO mDL verification over BLE. */
  engagement?: string;
}

export interface CreateProofSchemaInput {
  credentialSchemaId: string;
  claimSchemas: Array<CreateProofSchemaInputClaim>;
}

export interface CreateProofSchemaInputClaim {
  id: string;
  required: boolean;
}

export interface CreateProofSchemaRequest {
  name: string;
  organisationId: string;
  expireDuration: number /*u32*/;
  /** Set of all claims to request. */
  proofInputSchemas: Array<CreateProofSchemaInput>;
}

export interface CreateSelfSignedCertificateAuthorityIssuerAlternativeNameRequest {
  type: CreateSelfSignedCaRequestIssuerAlternativeNameType;
  name: string;
}

export interface CreateSelfSignedCertificateAuthorityRequest {
  content: CreateSelfSignedCertificateAuthorityRequestContent;
  signer: string;
  validityStart?: string;
  validityEnd?: string;
}

export interface CreateSelfSignedCertificateAuthorityRequestContent {
  subject: CsrSubject;
  issuerAlternativeName?: CreateSelfSignedCertificateAuthorityIssuerAlternativeNameRequest;
}

export interface CreatedBackup {
  historyId: string;
  file: string;
  unexportable: UnexportableEntities;
}

export interface CredentialClaimSchemaMapping {
  format: string;
  technicalKey: string;
  namespace?: string;
}

export interface CredentialClaimSchemaRequest {
  key: string;
  datatype: string;
  required: boolean;
  array?: boolean;
  claims: Array<CredentialClaimSchemaRequest>;
  mappings?: Array<CredentialClaimSchemaMapping>;
  translations?: CredentialClaimSchemaTranslations;
}

export interface CredentialClaimSchemaTranslations {
  name: Record<string, string>;
}

export interface CredentialDetail {
  id: string;
  createdDate: string;
  issuanceDate?: string;
  lastModified: string;
  revocationDate?: string;
  /** Credential issuer metadata. */
  issuer?: IdentifierListItem;
  /** Credential holder metadata. */
  holder?: IdentifierListItem;
  /** State representation of the credential in the system. */
  state: CredentialState;
  /** Schema of the credential. */
  schema: CredentialSchemaInfo;
  claims: Array<Claim>;
  redirectUri?: string;
  /**
   * The role the system has in relation to the credential. For example,
   * if the system received the credential as a wallet this value will
   * be `HOLDER`. If the system verified this credential during a presentation,
   * this value will be `VERIFIER`.
   */
  role: CredentialRole;
  interactionId?: string;
  /** Scheduled date for credential reactivation. */
  suspendEndDate?: string;
  /** Validity details for ISO mdocs. */
  mdocMsoValidity?: MdocMsoValidity;
  /** Protocol used to issue the credential. */
  protocol: string;
  /** Country profile associated with the credential. */
  profile?: string;
  trustInformation?: TrustInformation;
  consumedAt?: string;
  type: CredentialType;
  remainingBatchItemCount?: number /*u32*/;
  parentId?: string;
}

export interface CredentialList {
  values: Array<CredentialListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface CredentialListItem {
  id: string;
  createdDate: string;
  issuanceDate?: string;
  lastModified: string;
  revocationDate?: string;
  /** Credential issuer metadata. */
  issuer?: string;
  /** State representation of the credential in the system. */
  state: CredentialState;
  /** Schema of the credential. */
  schema: CredentialSchemaInfo;
  /**
   * The role the system has in relation to the credential. For example,
   * if the system received the credential as a wallet this value will
   * be `HOLDER`. If the system verified this credential during a presentation,
   * this value will be `VERIFIER`.
   */
  role: CredentialRole;
  /** Scheduled date for credential reactivation. */
  suspendEndDate?: string;
  /** Protocol used to issue the credential. */
  protocol: string;
  /** Country profile associated with the credential. */
  profile?: string;
  consumedAt?: string;
  type: CredentialType;
  parentId?: string;
}

export interface CredentialListQuery {
  /** Page number to retrieve (0-based indexing). */
  page: number /*u32*/;
  /** Number of items to return per page. */
  pageSize: number /*u32*/;
  /** Field value to sort results by. */
  sort?: SortableCredentialColumn;
  /** Direction to sort results by. */
  sortDirection?: SortDirection;
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /** Return only credentials with a name starting with this string. */
  name?: string;
  /** Filter by one or more country profiles. */
  profiles?: Array<string>;
  /** Search for a string. */
  searchText?: string;
  /**
   * Changes where `searchText` is searched. Choose one or more
   * `searchType`s and pass a `searchText`.
   */
  searchType?: Array<CredentialListQuerySearchType>;
  /** Set which filters apply in an exact way. */
  exact?: Array<CredentialListQueryExactColumn>;
  /**
   * Filter credentials by one or more roles: issued by the system,
   * verified by the system, or held by the system as a wallet.
   */
  roles?: Array<CredentialRole>;
  /** Filter by one or more UUIDs. */
  ids?: Array<string>;
  /** Filter by batch parent UUID. */
  parentId?: string;
  /** Filter by one or more credential states. */
  states?: Array<CredentialState>;
  /** Filter by one or more credential types. */
  types?: Array<CredentialType>;
  /**
   * Additional fields to include in response objects. Omitting
   * this keeps responses shorter.
   */
  include?: Array<CredentialListIncludeEntityType>;
  /** Return only credentials with the specified credential schema(s). */
  credentialSchemaIds?: Array<string>;
  /**
   * Return only credentials created after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateAfter?: string;
  /**
   * Return only credentials created before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateBefore?: string;
  /**
   * Return only credentials last modified after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  lastModifiedAfter?: string;
  /**
   * Return only credentials last modified before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  lastModifiedBefore?: string;
  /**
   * Return only credentials issued after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  issuanceDateAfter?: string;
  /**
   * Return only credentials issued before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  issuanceDateBefore?: string;
  /**
   * Return only credentials revoked after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  revocationDateAfter?: string;
  /**
   * Return only credentials revoked before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  revocationDateBefore?: string;
}

export interface CredentialQuery {
  multiple: boolean;
  credentialOrFailureHint: ApplicableCredentialOrFailureHint;
}

export interface CredentialQueryFailureHint {
  reason: CredentialQueryFailureReason;
  credentialSchema?: CredentialSchemaDetailInfo;
}

export interface CredentialRevocationCheckResponse {
  credentialId: string;
  status: CredentialState;
  success: boolean;
  reason?: string;
}

export interface CredentialSchemaBackgroundProperties {
  color?: string;
  image?: string;
}

export interface CredentialSchemaCodeProperties {
  attribute: string;
  type: CredentialSchemaCodeType;
}

export interface CredentialSchemaDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  formats: Array<CredentialSchemaFormatResponse>;
  organisationId: string;
  claims: Array<ClaimSchema>;
  keyStorageSecurity?: KeyStorageSecurity;
  importedSourceUrl: string;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension: boolean;
  allowRevocation?: boolean;
  batchSize?: number /*i32*/;
  requiresWalletInstanceAttestation: boolean;
  transactionCode?: CredentialSchemaTransactionCode;
  translations: CredentialSchemaTranslations;
}

export interface CredentialSchemaDetailInfo {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod?: string;
  claims: Array<ClaimSchemaInfo>;
  keyStorageSecurity?: KeyStorageSecurity;
  schemaId: string;
  importedSourceUrl: string;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension: boolean;
  requiresWalletInstanceAttestation: boolean;
  transactionCode?: CredentialSchemaTransactionCode;
  translations: CredentialSchemaTranslations;
}

export interface CredentialSchemaFormatRequest {
  format: string;
  schemaId?: string;
}

export interface CredentialSchemaFormatResponse {
  format: string;
  schemaId: string;
}

export interface CredentialSchemaInfo {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  format: string;
  revocationMethod?: string;
  keyStorageSecurity?: KeyStorageSecurity;
  schemaId: string;
  layoutType?: LayoutType;
  importedSourceUrl: string;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension: boolean;
  requiresWalletInstanceAttestation: boolean;
  translations?: CredentialSchemaTranslations;
}

export interface CredentialSchemaLayoutProperties {
  background?: CredentialSchemaBackgroundProperties;
  logo?: CredentialSchemaLogoProperties;
  primaryAttribute?: string;
  secondaryAttribute?: string;
  pictureAttribute?: string;
  code?: CredentialSchemaCodeProperties;
}

export interface CredentialSchemaList {
  values: Array<CredentialSchemaListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface CredentialSchemaListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  formats: Array<CredentialSchemaFormatResponse>;
  keyStorageSecurity?: KeyStorageSecurity;
  importedSourceUrl: string;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension: boolean;
  allowRevocation?: boolean;
  batchSize?: number /*i32*/;
  requiresWalletInstanceAttestation: boolean;
}

export interface CredentialSchemaListQuery {
  page: number /*u32*/;
  pageSize: number /*u32*/;
  organisationId: string;
  sort?: SortableCredentialSchemaColumn;
  sortDirection?: SortDirection;
  name?: string;
  ids?: Array<string>;
  exact?: Array<CredentialSchemaListQueryExactColumn>;
  include?: Array<CredentialSchemaListIncludeEntityType>;
  schemaIds?: Array<string>;
  formats?: Array<string>;
  usesBatchIssuance?: boolean;
  isMultiformatSchema?: boolean;
  createdDateAfter?: string;
  createdDateBefore?: string;
  lastModifiedAfter?: string;
  lastModifiedBefore?: string;
}

export interface CredentialSchemaLogoProperties {
  fontColor?: string;
  backgroundColor?: string;
  image?: string;
}

export interface CredentialSchemaShareResponse {
  url: string;
}

export interface CredentialSchemaTransactionCode {
  type: TransactionCodeType;
  length: number /*u32*/;
  description?: string;
}

export interface CredentialSchemaTransactionCodeRequest {
  type: TransactionCodeType;
  length: number /*u32*/;
  description?: string;
}

export interface CredentialSchemaTranslations {
  name: Record<string, string>;
  description?: Record<string, string>;
}

export interface CredentialSet {
  required: boolean;
  options: Array<Array<string>>;
}

export interface DeviceInfo {
  address: string;
  mtu: number /*u16*/;
}

export interface DidDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId?: string;
  did: string;
  didType: DidType;
  didMethod: string;
  keys: DidKeys;
  deactivated: boolean;
}

export interface DidKeys {
  authentication: Array<KeyListItem>;
  assertionMethod: Array<KeyListItem>;
  keyAgreement: Array<KeyListItem>;
  capabilityInvocation: Array<KeyListItem>;
  capabilityDelegation: Array<KeyListItem>;
}

export interface DidList {
  values: Array<DidListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface DidListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  did: string;
  didType: DidType;
  didMethod: string;
  deactivated: boolean;
}

export interface DidListQuery {
  page: number /*u32*/;
  pageSize: number /*u32*/;
  sort?: SortableDidColumn;
  sortDirection?: SortDirection;
  organisationId: string;
  name?: string;
  did?: string;
  type?: DidType;
  deactivated?: boolean;
  exact?: Array<DidListQueryExactColumn>;
  keyAlgorithms?: Array<string>;
  keyRoles?: Array<KeyRole>;
  keyStorages?: Array<string>;
  keyIds?: Array<string>;
  didMethods?: Array<string>;
}

export interface DidRequestKeys {
  authentication: Array<string>;
  assertionMethod: Array<string>;
  keyAgreement: Array<string>;
  capabilityInvocation: Array<string>;
  capabilityDelegation: Array<string>;
}

export interface DisclosurePolicy {
  id: string;
  policy: string;
  description?: string;
  url?: string;
  options?: DisclosurePolicyOptions;
}

export interface DisclosurePolicyCreateRequest {
  policy: string;
  description?: string;
  url?: string;
  options?: DisclosurePolicyOptions;
}

export interface DisclosurePolicyOption {
  dn?: string;
  entitlement?: string;
  serial?: string;
}

export interface DisclosurePolicyOptions {
  values: Array<DisclosurePolicyOption>;
}

export interface DisclosurePolicyViolation {
  id: string;
  description?: string;
  url?: string;
}

export interface DisplayName {
  lang: string;
  value: string;
}

export interface ErrorResponse {
  code: string;
  message: string;
  cause?: Cause;
}

export interface EudiIntermediary {
  name?: string;
  identifier: string;
  website: string;
  email?: string;
  phone?: string;
  country: string;
}

export interface EudiSupervisoryAuthority {
  email: string;
  phone: string;
  uri: string;
}

export interface EudiTrustInformation {
  name: string;
  website: string;
  email?: string;
  phone?: string;
  country: string;
  identifier: string;
  serviceDescription: Array<Record<string, string>>;
  supervisoryAuthority: EudiSupervisoryAuthority;
  intermediary?: EudiIntermediary;
  isPublicSector: boolean;
}

export interface GenerateKeyRequest {
  /** Specifies the organizational context of this operation. */
  organisationId: string;
  /**
   * Choose which key algorithm to use to create the key pair. Check
   * `keyAlgorithm` of your configuration for supported options and
   * reference the configured instance.
   */
  keyType: string;
  keyParams: Record<string, string>;
  /** Internal label for created key pair. */
  name: string;
  /**
   * Choose how to store the key. Check `keyStorage` of your configuration
   * for supported options and reference the configured instance.
   */
  storageType: string;
  storageParams: Record<string, string>;
}

export interface GeneratedKey {
  keyReference: number[] /*bytearray*/;
  publicKey: number[] /*bytearray*/;
}

export interface GlobalSettings {
  defaultLanguage: string;
}

export interface HandleInvitationRequest {
  /**
   * Typically encoded as a QR code or deep link by the issuer or
   * verifier. For example: "https://example.com/credential-offer".
   */
  url: string;
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /**
   * For configurations with multiple transport protocols enabled you
   * can specify which one to use for this interaction. For example:
   * "HTTP".
   */
  transport?: Array<string>;
  /**
   * For issuer-initiated Authorization Code Flows, provide the
   * authorization server with the URI it should return the user
   * to once authorization is complete. For example:
   * "myapp://example".
   */
  redirectUri?: string;
}

export interface HistoryErrorMetadata {
  errorCode: string;
  message: string;
}

export interface HistoryList {
  values: Array<HistoryListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface HistoryListItem {
  id: string;
  createdDate: string;
  action: HistoryAction;
  /**
   * For credential events, this is the credential schema name. For
   * presentation events, this is the proof schema name. For all other
   * entity types, it is the entity name.
   */
  name: string;
  entityId?: string;
  entityType: HistoryEntityType;
  /**
   * Structured metadata attached to the event. The variant depends on
   * the type.
   */
  metadata?: HistoryMetadata;
  organisationId?: string;
  /**
   * Identifier UUID of the external participant in the interaction, if
   * applicable. For credential events, this is the counterpart's identifier
   * (holder when the system is issuer, issuer when the system is holder).
   * For presentation events, this is the holder's identifier when the system
   * is verifier, or the verifier's identifier when the system is holder.
   */
  target?: string;
  /** Identifier of the user who triggered the event. */
  user?: string;
}

export interface HistoryListQuery {
  /** Page number to retrieve (0-based indexing). */
  page: number /*u32*/;
  /** Number of items to return per page. */
  pageSize: number /*u32*/;
  /** Field value to sort results by. */
  sort?: SortableHistoryColumn;
  /** Direction to sort results by. */
  sortDirection?: SortDirection;
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /** Return only events associated with the provided entity IDs. */
  entityIds?: Array<string>;
  /** Return only events associated with the provided entity types. */
  entityTypes?: Array<HistoryEntityType>;
  /** Return only events of the specified action types. */
  actions?: Array<HistoryAction>;
  /**
   * Return only entries created after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateAfter?: string;
  /**
   * Return only entries created before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateBefore?: string;
  /** Return only events associated with the provided identifier ID. */
  identifierId?: string;
  /** Return only events associated with the provided credential ID. */
  credentialId?: string;
  /** Return only events associated with the provided credential schema ID. */
  credentialSchemaId?: string;
  /** Return only events associated with the provided proof ID. */
  proofId?: string;
  /** Return only events associated with the provided proof schema ID. */
  proofSchemaId?: string;
  /** Return only events associated with the provided trust collection D. */
  trustCollectionId?: string;
  /**
   * Search history events by string. Set `text` to specify the search
   * string and optionally `type` to restrict which field is searched.
   * When `type` is omitted, all searchable fields are checked.
   */
  search?: HistorySearch;
  /** Return only events triggered by the specified users. */
  users?: Array<string>;
}

export interface HistorySearch {
  text: string;
  /**
   * When omitted, all searchable fields are checked. Set to restrict
   * the search to a specific field.
   */
  type?: HistorySearchType;
}

export interface HolderAcceptCredentialRequest {
  /** ID for this issuance. */
  interactionId: string;
  /** Deprecated. Use `identifierId`. */
  didId?: string;
  identifierId?: string;
  /**
   * If you are using an identifier with multiple keys for authentication,
   * specify which key to use. If no key is specified, the first suitable
   * key listed will be used.
   */
  keyId?: string;
  /** User-provided transaction code. */
  txCode?: string;
}

export interface HolderActivateWalletUnitRequest {
  /** Key type for the authentication key generated during activation. */
  keyType: string;
  /** Identity token obtained from the identity provider after user authentication. */
  userIdToken?: string;
}

export interface HolderRefreshCredentialResponse {
  credentialIds: Array<string>;
}

export interface HolderRegisterWalletUnitRequest {
  /** The wallet unit's organization. */
  organisationId: string;
  /** Wallet Provider details. */
  walletProvider: WalletProvider;
  /**
   * Choose a key type and the system will generate a key to use for
   * registration.
   */
  keyType: string;
  /**
   * When true, the wallet will only interact with entities that can be
   * verified as trusted. Requires the Wallet Provider to have the
   * `trustEcosystemsEnabled` feature flag enabled.
   */
  trustedRpRequired: boolean;
}

export interface HolderRegisterWalletUnitResponse {
  id: string;
  status: WalletUnitStatus;
  userNonce?: string;
}

export interface HolderWalletInstanceDetail {
  id: string;
  trustedRpRequired: boolean;
  walletProviderUrl: string;
  walletProviderName: string;
  authenticationKeyType: string;
}

export interface HolderWalletUnit {
  id: string;
  createdDate: string;
  lastModified: string;
  providerWalletUnitId: string;
  walletProviderUrl: string;
  walletProviderType: WalletProviderType;
  walletProviderName: string;
  status: WalletUnitStatus;
  authenticationKey?: KeyListItem;
  trustedRpRequired: boolean;
  userNonce?: string;
}

export interface HolderWalletUnitUpdateRequest {
  /**
   * The trust collections the wallet subscribes to, selected from those
   * made available by the Wallet Provider. The wallet will evaluate trust
   * against the lists contained in these collections. To keep subscribed
   * collections in sync with the Wallet Provider, run the
   * `TRUST_COLLECTION_SYNC` task.
   */
  trustCollections?: Array<string>;
  /**
   * When true, the wallet will only interact with entities that can be
   * verified as trusted. Requires the Wallet Provider to have the
   * `trustEcosystemsEnabled` feature flag enabled.
   */
  trustedRpRequired?: boolean;
}

export interface IdentifierDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  organisationId?: string;
  type: IdentifierType;
  isRemote: boolean;
  state: IdentifierState;
  did?: DidDetail;
  key?: KeyDetail;
  certificates?: Array<CertificateDetail>;
  trustInformation: Array<IdentifierTrustInformationResponseDto>;
}

export interface IdentifierList {
  values: Array<IdentifierListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface IdentifierListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  type: IdentifierType;
  isRemote: boolean;
  state: IdentifierState;
  organisationId?: string;
}

export interface IdentifierListQuery {
  page: number /*u32*/;
  pageSize: number /*u32*/;
  sort?: SortableIdentifierColumn;
  sortDirection?: SortDirection;
  organisationId: string;
  ids?: Array<string>;
  name?: string;
  types?: Array<IdentifierType>;
  states?: Array<IdentifierState>;
  exact?: Array<IdentifierListQueryExactColumn>;
  didMethods?: Array<string>;
  isRemote?: boolean;
  keyAlgorithms?: Array<string>;
  keyRoles?: Array<KeyRole>;
  keyStorages?: Array<string>;
  certificateRoles?: Array<CertificateRole>;
  certificateRolesMatchMode?: CertificateRolesMatchMode;
  trustIssuanceSchemaId?: string;
  trustVerificationSchemaId?: string;
  createdDateAfter?: string;
  createdDateBefore?: string;
  lastModifiedAfter?: string;
  lastModifiedBefore?: string;
}

export interface IdentifierTrustInformationResponseDto {
  data: string;
  type: IdentifierTrustInformationType;
  validFrom?: string;
  validTo?: string;
}

export interface ImportCredentialSchemaClaimSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  required: boolean;
  key: string;
  datatype: string;
  array?: boolean;
  claims?: Array<ImportCredentialSchemaClaimSchema>;
  mappings?: Array<CredentialClaimSchemaMapping>;
  translations?: CredentialClaimSchemaTranslations;
}

export interface ImportCredentialSchemaFormat {
  format: string;
  schemaId: string;
}

export interface ImportCredentialSchemaLayoutProperties {
  background?: CredentialSchemaBackgroundProperties;
  logo?: CredentialSchemaLogoProperties;
  primaryAttribute?: string;
  secondaryAttribute?: string;
  pictureAttribute?: string;
  code?: CredentialSchemaCodeProperties;
}

export interface ImportCredentialSchemaRequest {
  organisationId: string;
  schema: ImportCredentialSchemaRequestSchema;
}

export interface ImportCredentialSchemaRequestSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  formats: Array<ImportCredentialSchemaFormat>;
  organisationId: string;
  claims: Array<ImportCredentialSchemaClaimSchema>;
  keyStorageSecurity?: KeyStorageSecurity;
  importedSourceUrl: string;
  layoutType?: LayoutType;
  layoutProperties?: ImportCredentialSchemaLayoutProperties;
  allowSuspension?: boolean;
  requiresWalletInstanceAttestation?: boolean;
  transactionCode?: ImportCredentialSchemaTransactionCode;
  allowRevocation?: boolean;
  batchSize?: number /*i32*/;
  translations?: CredentialSchemaTranslations;
  embeddedDisclosurePolicy?: DisclosurePolicy;
}

export interface ImportCredentialSchemaTransactionCode {
  type: TransactionCodeType;
  length: number /*u32*/;
  description?: string;
}

export interface ImportProofSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /**
   * Defines how long the system will store data received from wallets. After
   * the defined duration, the received proof and its data are deleted from
   * the system. If 0, proofs received when using this schema will not be
   * deleted.
   */
  expireDuration: number /*u32*/;
  importedSourceUrl: string;
  /** Set of all claims to request. */
  proofInputSchemas: Array<ImportProofSchemaInputSchema>;
}

export interface ImportProofSchemaClaimSchema {
  id: string;
  requested: boolean;
  required: boolean;
  key: string;
  dataType: string;
  claims?: Array<ImportProofSchemaClaimSchema>;
  array: boolean;
}

export interface ImportProofSchemaCredentialSchema {
  id: string;
  createdDate: string;
  lastModified: string;
  deletedAt?: string;
  name: string;
  format: string;
  revocationMethod?: string;
  keyStorageSecurity?: KeyStorageSecurity;
  schemaId: string;
  importedSourceUrl: string;
  layoutType?: LayoutType;
  layoutProperties?: CredentialSchemaLayoutProperties;
  allowSuspension?: boolean;
  requiresWalletInstanceAttestation?: boolean;
}

export interface ImportProofSchemaInputSchema {
  claimSchemas: Array<ImportProofSchemaClaimSchema>;
  credentialSchema: ImportProofSchemaCredentialSchema;
}

export interface ImportProofSchemaRequest {
  schema: ImportProofSchema;
  organisationId: string;
}

export interface InitParams {
  /** Pass a serialized JSON to override the default configuration. */
  configJson?: string;
  /** Create an instance of the native implementation of Secure Element and pass it here. */
  nativeSecureElement?: NativeKeyStorage;
  /** Create a custom implementation of HSM and pass it. */
  remoteSecureElement?: NativeKeyStorage;
  bleCentral?: BleCentral;
  blePeripheral?: BlePeripheral;
  nfcHce?: NfcHce;
  nfcScanner?: NfcScanner;
}

export interface InitiateIssuanceAuthorizationDetail {
  type: string;
  credentialConfigurationId: string;
}

export interface InitiateIssuanceRequest {
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /** Choose a protocol to complete issuance. */
  protocol: string;
  /** OpenID4VCI authorization request parameter. */
  issuer: string;
  /** OpenID4VCI authorization request parameter. */
  clientId: string;
  /** OpenID4VCI authorization request parameter. */
  redirectUri?: string;
  /** OpenID4VCI authorization request parameter. */
  scope?: Array<string>;
  /** OpenID4VCI authorization request parameter. */
  authorizationDetails?: Array<InitiateIssuanceAuthorizationDetail>;
}

export interface InitiateIssuanceResponse {
  url: string;
}

export interface KeyDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  organisationId: string;
  name: string;
  publicKey: number[] /*bytearray*/;
  keyType: string;
  storageType: string;
}

export interface KeyListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  publicKey: number[] /*bytearray*/;
  keyType: string;
  storageType: string;
}

export interface MdocMsoValidity {
  expiration: string;
  nextUpdate: string;
  lastUpdate: string;
}

export interface Metadata {
  dbVersion: string;
  dbHash: string;
  createdAt: string;
}

export interface MultiLangString {
  lang: string;
  value: string;
}

/** Optional messages to be displayed on (iOS) system overlay. */
export interface NfcScanRequest {
  inProgressMessage?: string;
  failureMessage?: string;
  successMessage?: string;
}

export interface OpenId4vciTxCode {
  /** For validation. */
  inputMode: OpenId4vciTxCodeInputMode;
  /** Character length of code, to assist the user. */
  length?: number /*i64*/;
  /**
   * Guidance text displayed in the wallet, describing how to
   * obtain the transaction code.
   */
  description?: string;
}

export interface OrganisationDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  deactivatedAt?: string;
  /**
   * The parent organization this organization inherits policy-level
   * configuration from, if any.
   */
  parentOrganisation?: string;
  walletProvider?: WalletProviderDetail;
  /**
   * Wallet registration details for this organization's Business
   * Wallet.
   */
  walletInstance?: HolderWalletInstanceDetail;
  /**
   * Wallet registration details for this organization's Business
   * Wallet.
   */
  verifierInstance?: VerifierInstanceDetail;
}

export interface PeripheralDiscoveryData {
  deviceAddress: string;
  localDeviceName?: string;
  advertisedServices: Array<string>;
  advertisedServiceData?: Record<string, number[] /*bytearray*/>;
}

export interface PresentationDefinitionV2 {
  credentialQueries: Record<string, CredentialQuery>;
  credentialSets: Array<CredentialSet>;
}

export interface PresentationDefinitionV2Claim {
  path: string;
  schema: ClaimSchemaInfo;
  value: PresentationDefinitionV2ClaimValue;
  userSelection: boolean;
  required: boolean;
}

export interface PresentationDefinitionV2Credential {
  id: string;
  createdDate: string;
  issuanceDate?: string;
  lastModified: string;
  revocationDate?: string;
  issuer?: IdentifierListItem;
  issuerCertificate?: CertificateDetail;
  holder?: IdentifierListItem;
  state: CredentialState;
  schema: CredentialSchemaInfo;
  claims: Array<PresentationDefinitionV2Claim>;
  redirectUri?: string;
  role: CredentialRole;
  suspendEndDate?: string;
  mdocMsoValidity?: MdocMsoValidity;
  protocol: string;
  profile?: string;
  /**
   * Present when the relying party's certificates do not satisfy
   * the embedded disclosure policy attached to the requested
   * credential. The wallet should surface this to the user as a
   * warning before they proceed with disclosure. See
   * [Handling Trust Information](https://docs.procivis.ch/wallet/handling-trust).
   */
  embeddedDisclosurePolicyViolation?: DisclosurePolicyViolation;
}

export interface PresentationSubmitV2CredentialRequest {
  /** ID of the credential to submit. */
  credentialId: string;
  /**
   * Array of claim paths for claims where `userSelection: true` that the
   * holder chooses to share. Only include paths for optional claims the
   * holder selects. Omit entirely or use an empty array if withholding all
   * optional claims.
   */
  userSelections: Array<string>;
}

export interface ProofClaim {
  schema: ProofClaimSchema;
  value?: ProofClaimValue;
}

export interface ProofClaimSchema {
  id: string;
  requested: boolean;
  required: boolean;
  key: string;
  dataType: string;
  claims: Array<ProofClaimSchema>;
  array: boolean;
}

export interface ProofDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  /** Identifier of the verifier of this request. */
  verifier?: IdentifierListItem;
  state: ProofState;
  /** The role the system has in relation to this request. */
  role: ProofRole;
  /** Schema used for this request. */
  proofSchema?: ProofSchemaListItem;
  /** Protocol used for verification. */
  protocol: string;
  /** Engagement method used for this request. */
  engagement?: string;
  /** Channel used for this request. */
  transport: string;
  /**
   * The wallet is redirected to this resource once a shared proof
   * is accepted.
   */
  redirectUri?: string;
  /** Credential and claim data shared by the wallet holder. */
  proofInputs: Array<ProofInput>;
  /**
   * Time at which the data shared by the wallet holder for this request
   * will be deleted. Determined by the `expireDuration` parameter of the
   * proof schema.
   */
  retainUntilDate?: string;
  /** When the request was shared with the wallet holder. */
  requestedDate?: string;
  /** When the wallet holder submitted valid proof. */
  completedDate?: string;
  /** When claim data was deleted. */
  claimsRemovedAt?: string;
  /** Country profile associated with this request. */
  profile?: string;
  /** Trust information of the verifier, if any. */
  trustInformation?: TrustInformation;
}

export interface ProofInput {
  /** Set of claims asserted by the shared credential. */
  claims: Array<ProofClaim>;
  /** Shared credential metadata. */
  credential?: CredentialDetail;
  /** Credential schema metadata. */
  credentialSchema: CredentialSchemaInfo;
}

export interface ProofInputSchema {
  claimSchemas: Array<ProofClaimSchema>;
  credentialSchema: CredentialSchemaInfo;
}

export interface ProofList {
  values: Array<ProofListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface ProofListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  requestedDate?: string;
  /** When the wallet holder submitted valid proof. */
  completedDate?: string;
  verifier?: string;
  /** Protocol used for verification. */
  protocol: string;
  /** Channel used for this request. */
  transport: string;
  /** Engagement method used for this request. */
  engagement?: string;
  /** State representation of this request. */
  state: ProofState;
  /** The role the system has in relation to this request. */
  role: ProofRole;
  schema?: ProofSchemaListItem;
  /**
   * Time at which the data shared by the wallet holder for this request
   * will be deleted. Determined by the `expireDuration` parameter of the
   * proof schema.
   */
  retainUntilDate?: string;
  /** Country profile associated with this request. */
  profile?: string;
}

export interface ProofListQuery {
  /** Page number to retrieve (0-based indexing). */
  page: number /*u32*/;
  /** Number of items to return per page. */
  pageSize: number /*u32*/;
  /** Specifies the organizational context for this operation. */
  organisationId: string;
  /** Field value to sort results by. */
  sort?: SortableProofColumn;
  /** Direction to sort results by. */
  sortDirection?: SortDirection;
  /** Return only proof requests with a name starting with this string. */
  name?: string;
  /** Filter by one or more country profiles. */
  profiles?: Array<string>;
  /** Filter by one or more UUIDs. */
  ids?: Array<string>;
  /** Filter by one or more proof request states. */
  proofStates?: Array<ProofState>;
  /**
   * Filter proof requests by one or more roles: requested by the
   * system (`VERIFIER`) or received by the system (`HOLDER`).
   */
  proofRoles?: Array<ProofRole>;
  /** Filter by associated proof schemas. */
  proofSchemaIds?: Array<string>;
  /** Set which filters apply in an exact way. */
  exact?: Array<ProofListQueryExactColumn>;
  /**
   * Return only proof requests created after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateAfter?: string;
  /**
   * Return only proof requests created before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  createdDateBefore?: string;
  /**
   * Return only proof requests last modified after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  lastModifiedAfter?: string;
  /**
   * Return only proof requests last modified before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  lastModifiedBefore?: string;
  /**
   * Return only proofs requested after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  requestedDateAfter?: string;
  /**
   * Return only proofs requested before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  requestedDateBefore?: string;
  /**
   * Return only proofs requested completed after this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  completedDateAfter?: string;
  /**
   * Return only proofs requested completed before this time. Timestamp in
   * RFC 3339 format (for example `2023-06-09T14:19:57.000Z`).
   */
  completedDateBefore?: string;
}

export interface ProofSchemaDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  name: string;
  /** Specifies organizational context for this operation. */
  organisationId: string;
  /**
   * Defines how long the system will store data received from wallets. After
   * the defined duration, the received proof and its data are deleted from
   * the system. If 0, proofs received when using this schema will not be
   * deleted.
   */
  expireDuration: number /*u32*/;
  /** Set of requested claims. */
  proofInputSchemas: Array<ProofInputSchema>;
  /** Source URL for imported schema. */
  importedSourceUrl?: string;
}

export interface ProofSchemaList {
  values: Array<ProofSchemaListItem>;
  totalPages: number /*u64*/;
  totalItems: number /*u64*/;
}

export interface ProofSchemaListItem {
  id: string;
  createdDate: string;
  lastModified: string;
  deletedAt?: string;
  name: string;
  /**
   * Defines how long the system will store data received from wallets. After
   * the defined duration, the received proof and its data are deleted from
   * the system. If 0, proofs received when using this schema will not be
   * deleted.
   */
  expireDuration: number /*u32*/;
}

export interface ProofSchemaListQuery {
  page: number /*u32*/;
  pageSize: number /*u32*/;
  sort?: SortableProofSchemaColumn;
  sortDirection?: SortDirection;
  organisationId: string;
  name?: string;
  exact?: Array<ProofSchemaListQueryExactColumn>;
  ids?: Array<string>;
  formats?: Array<string>;
  createdDateAfter?: string;
  createdDateBefore?: string;
  lastModifiedAfter?: string;
  lastModifiedBefore?: string;
}

export interface ProofSchemaShareResponse {
  url: string;
}

export interface ProposeProofRequest {
  protocol: string;
  organisationId: string;
  engagement: Array<string>;
  uiMessage?: string;
}

export interface ProposeProofResponse {
  proofId: string;
  interactionId: string;
  url?: string;
}

export interface QesAuthorizeRequest {
  /** Configured document signer name (for example, `SIGN8`). */
  provider: string;
  /** Base64-encoded document to be signed. */
  document: string;
  /**
   * Wallet deep link to which the provider redirects after authorization,
   * appending the authorization `code`. When omitted, the configured
   * default is used.
   */
  redirectUri?: string;
  /** Organizational context. Optional when resolvable from STS auth. */
  organisationId?: string;
}

export interface QesAuthorizeResponse {
  /** Authorization URL the wallet opens to identify and authorize signing. */
  authorizationUrl: string;
  /** PKCE `code_verifier` to pass back to `qesSign`. */
  codeVerifier: string;
}

export interface QesSignRequest {
  /** Configured document signer name (for example, `SIGN8`). */
  provider: string;
  /** Authorization code from the document signer redirect. */
  code: string;
  /** `codeVerifier` returned from the `qesAuthorize` method. */
  codeVerifier: string;
  /**
   * Base64-encoded document to be signed. Must be identical to the
   * document provided to `qes_authorize`.
   */
  document: string;
  /**
   * Wallet deep link. Must be identical to the one used at
   * `qesAuthorize`. When omitted, the configured default
   * is used.
   */
  redirectUri?: string;
  /** Organizational context. Optional when resolvable from STS auth. */
  organisationId?: string;
}

export interface QesSignResponse {
  /** Base64-encoded signed document returned by the QES provider. */
  signedDocument: string;
}

export interface RegisterVerifierInstanceRequest {
  /** The verifier unit's organization. */
  organisationId: string;
  /** The Verifier Provider's reference URL. */
  verifierProviderUrl: string;
  /** Reference a configured `verifierProvider` instance. */
  type: string;
  /**
   * When true, the verifier will only validate presentations of
   * credentials issued by trusted issuers. Requires the Verifier
   * Provider to have the `trustEcosystemsEnabled` feature flag
   * enabled.
   */
  trustedIssuerRequired: boolean;
}

export interface RegisterVerifierInstanceResponse {
  id: string;
}

export interface ResolvedJsonLdContext {
  context: string;
}

export interface ServiceDescription {
  uuid: string;
  advertise: boolean;
  advertisedServiceData?: number[] /*bytearray*/;
  characteristics: Array<CharacteristicSettings>;
}

export interface ShareProofRequest {
  params?: ShareProofRequestParams;
}

export interface ShareProofRequestParams {
  /**
   * For requests made with OpenID4VC, a Client ID Scheme can be
   * specified here. If no scheme is specified the default scheme
   * from the configuration is used.
   */
  clientIdScheme?: ClientIdScheme;
}

export interface ShareProofResponse {
  url: string;
  expiresAt?: string;
}

export interface TrustCollectionInfo {
  /** When true, the wallet is subscribed to this trust collection. */
  selected: boolean;
  id: string;
  name: string;
  logo: string;
  displayName: Array<DisplayName>;
  description: Array<DisplayName>;
  defaultSelected?: boolean;
}

export interface TrustCollections {
  /** Trust collections available from the Wallet Provider. */
  trustCollections: Array<TrustCollectionInfo>;
}

export interface TrustInformation {
  receivedAt: string;
  name?: string;
  result: TrustResolutionResult;
}

export interface TrustInformationDetail {
  /**
   * EUDI trust information received from Access Certificates, Registration
   * Certificates, or National Registry public APIs.
   */
  eudiEcosystem?: EudiTrustInformation;
}

export interface TrustResolutionMetadata {
  result: TrustResolutionResult;
}

export interface UnexportableEntities {
  credentials: Array<CredentialDetail>;
  keys: Array<KeyListItem>;
  dids: Array<DidListItem>;
  identifiers: Array<IdentifierListItem>;
  totalCredentials: number /*u64*/;
  totalKeys: number /*u64*/;
  totalDids: number /*u64*/;
  totalIdentifiers: number /*u64*/;
}

export interface UpdateVerifierInstanceRequest {
  /**
   * The trust collections the verifier subscribes to, selected from
   * those made available by the Verifier Provider. The verifier will
   * evaluate trust against the lists contained in these collections.
   * To keep subscribed collections in sync with the Verifier Provider,
   * run the `TRUST_COLLECTION_SYNC` task.
   */
  trustCollections?: Array<string>;
  /**
   * When true, the verifier will only validate presentations of
   * credentials issued by trusted issuers. Requires the Verifier
   * Provider to have the `trustEcosystemsEnabled` feature flag
   * enabled.
   */
  trustedIssuerRequired?: boolean;
}

export interface UpsertOrganisationRequest {
  /** Unique identifier of the organization to create or update. */
  id: string;
  /** Set to `true` to deactivate the organization. */
  deactivate?: boolean;
  /** Wallet Provider use only. */
  walletProvider?: string | null /* pass null to clear the value */;
  /** Wallet Provider use only. */
  walletProviderIssuer?: string | null /* pass null to clear the value */;
  /**
   * The parent organization this organization inherits policy-level
   * configuration from, if any.
   */
  parentOrganisation?: string | null /* pass null to clear the value */;
}

export interface VerifierInstanceDetail {
  id: string;
  /**
   * When true, the verifier will only validate presentations of
   * credentials issued by trusted issuers. Requires the Verifier
   * Provider to have the `trustEcosystemsEnabled` feature flag
   * enabled.
   */
  trustedIssuerRequired: boolean;
}

export interface Version {
  target: string;
  buildTime: string;
  branch: string;
  tag: string;
  commit: string;
  rustVersion: string;
  pipelineId: string;
}

export interface WalletProvider {
  /**
   * Full URL for the GET Wallet Provider metadata endpoint,
   * for example: <domain>/ssi/wallet-provider/v1/<walletProvider>
   */
  url: string;
  /** Choose the Wallet Provider implementation. */
  type: WalletProviderType;
}

export interface WalletProviderDetail {
  /**
   * Wallet Provider configuration used by this organization to provide
   * wallets.
   */
  providerName?: string;
  /** Identifier used by this organization to provide wallets. */
  issuer?: IdentifierListItem;
}

export interface WalletRelyingPartyMetadata {
  name: string;
}

// ==========
// Enum definitions:
// ==========

export type ApplicableCredentialOrFailureHint =
  | {
      type_: "APPLICABLE_CREDENTIALS";
      applicableCredentials: Array<PresentationDefinitionV2Credential>;
      purpose?: Record<string, string>;
    }
  | {
      type_: "FAILURE_HINT";
      failureHint: CredentialQueryFailureHint;
    };

export type BleError =
  | {
      type_: "ADAPTER_NOT_ENABLED";
    }
  | {
      type_: "SCAN_ALREADY_STARTED";
    }
  | {
      type_: "SCAN_NOT_STARTED";
    }
  | {
      type_: "BROADCAST_ALREADY_STARTED";
    }
  | {
      type_: "BROADCAST_NOT_STARTED";
    }
  | {
      type_: "ANOTHER_OPERATION_IN_PROGRESS";
    }
  | {
      type_: "WRITE_DATA_TOO_LONG";
    }
  | {
      type_: "DEVICE_ADDRESS_NOT_FOUND";
      address: string;
    }
  | {
      type_: "SERVICE_NOT_FOUND";
      service: string;
    }
  | {
      type_: "CHARACTERISTIC_NOT_FOUND";
      characteristic: string;
    }
  | {
      type_: "INVALID_UUID";
      uuid: string;
    }
  | {
      type_: "DEVICE_NOT_CONNECTED";
      address: string;
    }
  | {
      type_: "INVALID_CHARACTERISTIC_OPERATION";
      service: string;
      characteristic: string;
      operation: string;
    }
  | {
      type_: "NOT_SUPPORTED";
    }
  | {
      type_: "NOT_AUTHORIZED";
    }
  | {
      type_: "SERVER_NOT_RUNNING";
    }
  | {
      type_: "UNKNOWN";
      reason: string;
    };

export enum CacheType {
  DID_DOCUMENT = "DID_DOCUMENT",
  JSON_LD_CONTEXT = "JSON_LD_CONTEXT",
  /** Credential status list fetched from an external source. */
  STATUS_LIST_CREDENTIAL = "STATUS_LIST_CREDENTIAL",
  /** Metadata for SD-JWT VC type (VCT). */
  VCT_METADATA = "VCT_METADATA",
  JSON_SCHEMA = "JSON_SCHEMA",
  TRUST_LIST = "TRUST_LIST",
  /** X.509 certificate revocation list. */
  X509_CRL = "X509_CRL",
  /** Certificate revocation list used for Android key attestation. */
  ANDROID_ATTESTATION_CRL = "ANDROID_ATTESTATION_CRL",
  /** OpenID provider metadata fetched from holder endpoints. */
  OPEN_ID_METADATA_HOLDER = "OPEN_ID_METADATA_HOLDER",
  /** OpenID provider metadata fetched from issuer endpoints. */
  OPEN_ID_METADATA_ISSUER = "OPEN_ID_METADATA_ISSUER",
  /** Metadata fetched from the registered wallet provider. */
  WALLET_PROVIDER_METADATA = "WALLET_PROVIDER_METADATA",
  /** Trust collection data fetched from a remote source. */
  REMOTE_TRUST_COLLECTION = "REMOTE_TRUST_COLLECTION",
}

export enum CertificateRole {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
}

/** The mode used to match certificate roles. Default any. */
export enum CertificateRolesMatchMode {
  ALL = "ALL",
  ANY = "ANY",
}

export enum CertificateState {
  NOT_YET_ACTIVE = "NOT_YET_ACTIVE",
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
}

export enum CharacteristicPermission {
  READ = "READ",
  WRITE = "WRITE",
}

export enum CharacteristicProperty {
  READ = "READ",
  WRITE = "WRITE",
  NOTIFY = "NOTIFY",
  WRITE_WITHOUT_RESPONSE = "WRITE_WITHOUT_RESPONSE",
  INDICATE = "INDICATE",
}

export enum CharacteristicWriteType {
  WITH_RESPONSE = "WITH_RESPONSE",
  WITHOUT_RESPONSE = "WITHOUT_RESPONSE",
}

export type ClaimValue =
  | {
      type_: "BOOLEAN";
      value: boolean;
    }
  | {
      type_: "FLOAT";
      value: number /*f64*/;
    }
  | {
      type_: "INTEGER";
      value: number /*i64*/;
    }
  | {
      type_: "STRING";
      value: string;
    }
  | {
      type_: "NESTED";
      value: Array<Claim>;
    };

export enum ClientIdScheme {
  REDIRECT_URI = "REDIRECT_URI",
  VERIFIER_ATTESTATION = "VERIFIER_ATTESTATION",
  DID = "DID",
  X509_SAN_DNS = "X509_SAN_DNS",
}

export type ConnectionEvent =
  | {
      type_: "CONNECTED";
      deviceInfo: DeviceInfo;
    }
  | {
      type_: "DISCONNECTED";
      deviceAddress: string;
    };

export enum CreateSelfSignedCaRequestIssuerAlternativeNameType {
  EMAIL = "EMAIL",
  URI = "URI",
}

export enum CredentialListIncludeEntityType {
  LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
  TRANSLATIONS = "TRANSLATIONS",
}

export enum CredentialListQueryExactColumn {
  NAME = "NAME",
}

export enum CredentialListQuerySearchType {
  CLAIM_NAME = "CLAIM_NAME",
  CLAIM_VALUE = "CLAIM_VALUE",
  CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
}

export enum CredentialQueryFailureReason {
  NO_CREDENTIAL = "NO_CREDENTIAL",
  VALIDITY = "VALIDITY",
  CONSTRAINT = "CONSTRAINT",
}

export enum CredentialRole {
  HOLDER = "HOLDER",
  ISSUER = "ISSUER",
  VERIFIER = "VERIFIER",
}

export enum CredentialSchemaCodeType {
  BARCODE = "BARCODE",
  MRZ = "MRZ",
  QR_CODE = "QR_CODE",
}

export enum CredentialSchemaListIncludeEntityType {
  LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
  TRANSLATIONS = "TRANSLATIONS",
}

export enum CredentialSchemaListQueryExactColumn {
  NAME = "NAME",
  SCHEMA_ID = "SCHEMA_ID",
}

export enum CredentialState {
  CREATED = "CREATED",
  PENDING = "PENDING",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  ERROR = "ERROR",
  INTERACTION_EXPIRED = "INTERACTION_EXPIRED",
}

export enum CredentialType {
  SINGLE = "SINGLE",
  BATCH_PARENT = "BATCH_PARENT",
  BATCH_ITEM = "BATCH_ITEM",
}

export enum DidListQueryExactColumn {
  NAME = "NAME",
  DID = "DID",
}

export enum DidType {
  LOCAL = "LOCAL",
  REMOTE = "REMOTE",
}

export type HandleInvitationResponse =
  | {
      type_: "CREDENTIAL_ISSUANCE";
      /** For reference. */
      interactionId: string;
      /** Key storage required to complete issuance. */
      keyStorageSecurityLevels?: Array<KeyStorageSecurity>;
      /** Key algorithms suitable for issuance. */
      keyAlgorithms?: Array<string>;
      /**
       * Metadata for entering a transaction code
       * If a pre-authorized code is issued with a transaction code object, the
       * wallet user must input a transaction code to receive the offered credential.
       * This code is typically sent through a separate channel such as SMS or email.
       */
      txCode?: OpenId4vciTxCode;
      /** Protocol used for issuance. */
      protocol: string;
      /** Whether a valid WIA is required to complete issuance. */
      requiresWalletInstanceAttestation: boolean;
    }
  | {
      type_: "AUTHORIZATION_CODE_FLOW";
      /** For reference. */
      interactionId: string;
      /**
       * For issuer-initiated Authorization Code Flows, use this URL to start
       * the authorization process with the authorization server.
       */
      authorizationCodeFlowUrl: string;
      /** Protocol used for issuance. */
      protocol: string;
    }
  | {
      type_: "PROOF_REQUEST";
      /** For reference. */
      interactionId: string;
      /** Proof request. */
      proofId: string;
      /** Protocol used for issuance. */
      protocol: string;
    };

export enum HistoryAction {
  ACCEPTED = "ACCEPTED",
  CREATED = "CREATED",
  CSR_GENERATED = "CSR_GENERATED",
  DEACTIVATED = "DEACTIVATED",
  DELETED = "DELETED",
  ERRORED = "ERRORED",
  ISSUED = "ISSUED",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
  REVOKED = "REVOKED",
  SUSPENDED = "SUSPENDED",
  PENDING = "PENDING",
  RESTORED = "RESTORED",
  SHARED = "SHARED",
  IMPORTED = "IMPORTED",
  CLAIMS_REMOVED = "CLAIMS_REMOVED",
  ACTIVATED = "ACTIVATED",
  WITHDRAWN = "WITHDRAWN",
  REMOVED = "REMOVED",
  RETRACTED = "RETRACTED",
  UPDATED = "UPDATED",
  REACTIVATED = "REACTIVATED",
  EXPIRED = "EXPIRED",
  INTERACTION_CREATED = "INTERACTION_CREATED",
  INTERACTION_ERRORED = "INTERACTION_ERRORED",
  INTERACTION_EXPIRED = "INTERACTION_EXPIRED",
  DELIVERED = "DELIVERED",
  WRP_AC_RECEIVED = "WRP_AC_RECEIVED",
  WRP_RC_RECEIVED = "WRP_RC_RECEIVED",
  WRP_NR_RECEIVED = "WRP_NR_RECEIVED",
  TRUST_RESOLVED = "TRUST_RESOLVED",
  REFRESHED = "REFRESHED",
  SIGNED = "SIGNED",
}

export enum HistoryEntityType {
  KEY = "KEY",
  DID = "DID",
  IDENTIFIER = "IDENTIFIER",
  CERTIFICATE = "CERTIFICATE",
  CREDENTIAL = "CREDENTIAL",
  CREDENTIAL_SCHEMA = "CREDENTIAL_SCHEMA",
  PROOF = "PROOF",
  PROOF_SCHEMA = "PROOF_SCHEMA",
  ORGANISATION = "ORGANISATION",
  BACKUP = "BACKUP",
  WALLET_UNIT = "WALLET_UNIT",
  USER = "USER",
  PROVIDER = "PROVIDER",
  WALLET_RELYING_PARTY = "WALLET_RELYING_PARTY",
  STS_ROLE = "STS_ROLE",
  STS_ORGANISATION = "STS_ORGANISATION",
  STS_IAM_ROLE = "STS_IAM_ROLE",
  STS_SESSION = "STS_SESSION",
  STS_TOKEN = "STS_TOKEN",
  SIGNATURE = "SIGNATURE",
  NOTIFICATION = "NOTIFICATION",
  SUPERVISORY_AUTHORITY = "SUPERVISORY_AUTHORITY",
  TRUST_LIST_PUBLICATION = "TRUST_LIST_PUBLICATION",
  TRUST_COLLECTION = "TRUST_COLLECTION",
  TRUST_LIST_SUBSCRIPTION = "TRUST_LIST_SUBSCRIPTION",
  VERIFIER_INSTANCE = "VERIFIER_INSTANCE",
  QES_DOCUMENT = "QES_DOCUMENT",
}

export type HistoryMetadata =
  | {
      type_: "UNEXPORTABLE_ENTITIES";
      value: UnexportableEntities;
    }
  | {
      type_: "ERROR_METADATA";
      value: HistoryErrorMetadata;
    }
  | {
      type_: "WALLET_UNIT_JWT";
      value: [string]
    }
  | {
      type_: "WALLET_RELYING_PARTY";
      value: WalletRelyingPartyMetadata;
    }
  | {
      type_: "TRUST_RESOLUTION";
      value: TrustResolutionMetadata;
    };

export enum HistorySearchType {
  ALL = "ALL",
  CLAIM_NAME = "CLAIM_NAME",
  CLAIM_VALUE = "CLAIM_VALUE",
  CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
  ISSUER_DID = "ISSUER_DID",
  ISSUER_NAME = "ISSUER_NAME",
  VERIFIER_DID = "VERIFIER_DID",
  VERIFIER_NAME = "VERIFIER_NAME",
  PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME",
}

export enum IdentifierListQueryExactColumn {
  NAME = "NAME",
}

export enum IdentifierState {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
}

export enum IdentifierTrustInformationType {
  REGISTRATION_CERTIFICATE = "REGISTRATION_CERTIFICATE",
}

export enum IdentifierType {
  KEY = "KEY",
  DID = "DID",
  CERTIFICATE = "CERTIFICATE",
  CERTIFICATE_AUTHORITY = "CERTIFICATE_AUTHORITY",
}

export enum KeyRole {
  AUTHENTICATION = "AUTHENTICATION",
  ASSERTION_METHOD = "ASSERTION_METHOD",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
  CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION",
}

export enum KeyStorageSecurity {
  HIGH = "HIGH",
  MODERATE = "MODERATE",
  ENHANCED_BASIC = "ENHANCED_BASIC",
  BASIC = "BASIC",
}

export enum LayoutType {
  CARD = "CARD",
  DOCUMENT = "DOCUMENT",
  SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE",
}

export type NativeKeyStorageError =
  | {
      type_: "KEY_GENERATION_FAILURE";
      reason: string;
    }
  | {
      type_: "SIGNATURE_FAILURE";
      reason: string;
    }
  | {
      type_: "UNSUPPORTED";
    }
  | {
      type_: "UNKNOWN";
      reason: string;
    };

export type NfcError =
  | {
      type_: "NOT_ENABLED";
    }
  | {
      type_: "NOT_SUPPORTED";
    }
  | {
      type_: "ALREADY_STARTED";
    }
  | {
      type_: "NOT_STARTED";
    }
  | {
      type_: "CANCELLED";
    }
  | {
      type_: "SESSION_CLOSED";
    }
  | {
      type_: "UNKNOWN";
      reason: string;
    };

export type OneCoreError =
  | {
      type_: "RESPONSE";
      data: ErrorResponse;
    };

export enum OpenId4vciTxCodeInputMode {
  NUMERIC = "NUMERIC",
  TEXT = "TEXT",
}

export type PresentationDefinitionV2ClaimValue =
  | {
      type_: "BOOLEAN";
      value: boolean;
    }
  | {
      type_: "FLOAT";
      value: number /*f64*/;
    }
  | {
      type_: "INTEGER";
      value: number /*i64*/;
    }
  | {
      type_: "STRING";
      value: string;
    }
  | {
      type_: "NESTED";
      value: Array<PresentationDefinitionV2Claim>;
    };

export type ProofClaimValue =
  | {
      type_: "VALUE";
      value: string;
    }
  | {
      type_: "CLAIMS";
      value: Array<ProofClaim>;
    };

export enum ProofListQueryExactColumn {
  NAME = "NAME",
}

export enum ProofRole {
  HOLDER = "HOLDER",
  VERIFIER = "VERIFIER",
}

export enum ProofSchemaListQueryExactColumn {
  NAME = "NAME",
}

export enum ProofState {
  CREATED = "CREATED",
  PENDING = "PENDING",
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  RETRACTED = "RETRACTED",
  ERROR = "ERROR",
  INTERACTION_EXPIRED = "INTERACTION_EXPIRED",
}

export enum SortDirection {
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}

export enum SortableCredentialColumn {
  CREATED_DATE = "CREATED_DATE",
  SCHEMA_NAME = "SCHEMA_NAME",
  ISSUER = "ISSUER",
  STATE = "STATE",
}

export enum SortableCredentialSchemaColumn {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
}

export enum SortableDidColumn {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  METHOD = "METHOD",
  TYPE = "TYPE",
  DID = "DID",
  DEACTIVATED = "DEACTIVATED",
}

export enum SortableHistoryColumn {
  CREATED_DATE = "CREATED_DATE",
  ACTION = "ACTION",
  ENTITY_TYPE = "ENTITY_TYPE",
  SOURCE = "SOURCE",
  USER = "USER",
  ORGANISATION_ID = "ORGANISATION_ID",
}

export enum SortableIdentifierColumn {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
  TYPE = "TYPE",
  STATE = "STATE",
}

export enum SortableProofColumn {
  SCHEMA_NAME = "SCHEMA_NAME",
  VERIFIER = "VERIFIER",
  STATE = "STATE",
  CREATED_DATE = "CREATED_DATE",
}

export enum SortableProofSchemaColumn {
  NAME = "NAME",
  CREATED_DATE = "CREATED_DATE",
}

export enum TransactionCodeType {
  NUMERIC = "NUMERIC",
  ALPHANUMERIC = "ALPHANUMERIC",
}

export enum TrustResolutionResult {
  TRUSTED = "TRUSTED",
  UNTRUSTED = "UNTRUSTED",
  UNKNOWN = "UNKNOWN",
}

export enum WalletProviderType {
  PROCIVIS_ONE = "PROCIVIS_ONE",
}

export enum WalletUnitStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  UNATTESTED = "UNATTESTED",
  ERROR = "ERROR",
}

// ==========
// Object definitions:
// ==========

export interface BleCentral {
  connect(peripheral: string): Promise<number /*u16*/>;
  disconnect(peripheral: string): Promise<void>;
  getDiscoveredDevices(): Promise<Array<PeripheralDiscoveryData>>;
  getNotifications(peripheral: string, service: string, characteristic: string): Promise<Array<number[] /*bytearray*/>>;
  isAdapterEnabled(): Promise<boolean>;
  isScanning(): Promise<boolean>;
  readData(peripheral: string, service: string, characteristic: string): Promise<number[] /*bytearray*/>;
  startScan(filterServices: Array<string> | undefined): Promise<void>;
  stopScan(): Promise<void>;
  subscribeToCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
  unsubscribeFromCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
  writeData(peripheral: string, service: string, characteristic: string, data: number[] /*bytearray*/, writeType: CharacteristicWriteType): Promise<void>;
}

export interface BlePeripheral {
  getCharacteristicWrites(device: string, service: string, characteristic: string): Promise<Array<number[] /*bytearray*/>>;
  getConnectionChangeEvents(): Promise<Array<ConnectionEvent>>;
  isAdapterEnabled(): Promise<boolean>;
  isAdvertising(): Promise<boolean>;
  notifyCharacteristicData(deviceAddress: string, service: string, characteristic: string, data: number[] /*bytearray*/): Promise<void>;
  setCharacteristicData(service: string, characteristic: string, data: number[] /*bytearray*/): Promise<void>;
  startAdvertisement(deviceName: string | undefined, services: Array<ServiceDescription>): Promise<string | undefined>;
  stopAdvertisement(): Promise<void>;
  stopServer(): Promise<void>;
  waitForCharacteristicRead(device: string, service: string, characteristic: string): Promise<void>;
}

export interface NativeKeyStorage {
  generateAttestation(keyReference: number[] /*bytearray*/, nonce: string | undefined): Promise<Array<string>>;
  generateAttestationKey(keyAlias: string, nonce: string | undefined): Promise<GeneratedKey>;
  generateKey(keyAlias: string): Promise<GeneratedKey>;
  sign(keyReference: number[] /*bytearray*/, message: number[] /*bytearray*/): Promise<number[] /*bytearray*/>;
  signWithAttestationKey(keyReference: number[] /*bytearray*/, message: number[] /*bytearray*/): Promise<number[] /*bytearray*/>;
}

/** Provider of NFC host-card emulation (HCE) */
export interface NfcHce {
  isEnabled(): Promise<boolean>;
  isSupported(): Promise<boolean>;
  /**
   * Starts NFC host-card emulation (HCE)
   * * `handler` implementation for handling NFC events
   * * `message` UI message to be placed on the system overlay (iOS)
   */
  startHosting(handler: NfcHceHandler, message: string | undefined): Promise<void>;
  /**
   * stops emulation started via `start_hosting`
   * * `success` true if hosting should be ended with a success or failure (iOS)
   */
  stopHosting(success: boolean): Promise<void>;
}

export interface NfcHceHandler {
  /** Handle incoming APDU command, return response */
  handleCommand(apdu: number[] /*bytearray*/): number[] /*bytearray*/;
  /** Called when NFC scanner disconnects */
  onScannerDisconnected(): Promise<void>;
  /** Called when NFC HCE hosting stops */
  onSessionStopped(reason: NfcError): Promise<void>;
}

/** Provider of NFC scanner functionality */
export interface NfcScanner {
  /**
   * Stops scanning previously started via `scan`
   * or disconnects the established session
   * * `error_message` - error UI message to display on the system NFC overlay (iOS)
   */
  cancelScan(errorMessage: string | undefined): Promise<void>;
  /** Check whether NFC adapter is enabled on the device (android only, iOS always enabled) */
  isEnabled(): Promise<boolean>;
  /** Check whether NFC scanning is supported on the device */
  isSupported(): Promise<boolean>;
  /**
   * Starts scanning for ISO 7816-4 NFC tag
   * * `message` - UI message to display on the system NFC overlay (iOS)
   *
   * This function returns when:
   * * an IsoDep tag is scanned and session established
   * * on cancellation (`cancel_scan`) - `NfcError::Cancelled`
   * * or on failure
   */
  scan(message: string | undefined): Promise<void>;
  /** Update UI message on the system NFC scanner overlay (iOS) - previously set via `scan` */
  setMessage(message: string): Promise<void>;
  /** Send APDU request and wait for response APDU */
  transceive(commandApdu: number[] /*bytearray*/): Promise<number[] /*bytearray*/>;
}

export interface OneCore {
  /**
   * Returns information about items that will be excluded from the
   * export.
   */
  backupInfo(): Promise<UnexportableEntities>;
  /**
   * Checks whether a held credential has been suspended or revoked.
   *
   * For list-based revocation methods, the signed lists and any DID
   * documents containing public keys used to verify the lists are
   * cached. Use `forceRefresh` to force the system to retrieve these
   * from the external resource.
   *
   * For modcs, use `forceRefresh` to force the system to request a
   * new MSO.
   */
  checkRevocation(credentialIds: Array<string>, forceRefresh: boolean | undefined): Promise<Array<CredentialRevocationCheckResponse>>;
  /**
   * For wallet-initiated flows, continues the OpenID4VCI issuance
   * process after completing authorization.
   *
   * * url - Starts with the `redirectUri` and is used to continue the
   * Authorization Code Flow issuance process. For example:
   * `myapp://example/credential-offer?code=xxx&clientId=myWallet&...`
   */
  continueIssuance(url: string): Promise<ContinueIssuanceResponse>;
  /** Creates a backup of the current database and writes it to a file. */
  createBackup(password: string, outputPath: string): Promise<CreatedBackup>;
  /** Creates a credential schema */
  createCredentialSchema(request: CreateCredentialSchemaRequest): Promise<string>;
  /** Deprecated. Use the `createIdentifier` method. */
  createDid(request: CreateDidRequest): Promise<string>;
  /** Creates a new identifier. */
  createIdentifier(request: CreateIdentifierRequest): Promise<string>;
  /** Creates an organization. */
  createOrganisation(request: CreateOrganisationRequest): Promise<string>;
  /**
   * For verifiers, creates a proof request. Choose what information to
   * request via a proof schema, an identifier, and which protocol to use
   * for making the request.
   */
  createProof(request: CreateProofRequest): Promise<string>;
  /**
   * Creates a proof schema, which defines the credentials and claims to
   * request from a wallet. Proof schemas reference credential schemas
   * already created in your own system; create or import those first
   * before building a proof schema that includes their claims.
   */
  createProofSchema(request: CreateProofSchemaRequest): Promise<string>;
  /**
   * Deletes entries from the system cache. See
   * [Caching](https://docs.procivis.ch/configure/caching#cached-entities)
   * for details on cached entity types.
   */
  deleteCache(types: Array<CacheType> | undefined): Promise<void>;
  deleteCredential(credentialId: string): Promise<void>;
  /** Permanently removes a credential schema. */
  deleteCredentialSchema(credentialSchemaId: string): Promise<void>;
  deleteIdentifier(id: string): Promise<void>;
  /**
   * Deletes an incomplete proof request. If the request is in `REQUESTED`
   * state the proof is retracted instead, retaining history of the interaction.
   */
  deleteProof(proofId: string): Promise<void>;
  deleteProofClaims(proofId: string): Promise<void>;
  deleteProofSchema(proofSchemaId: string): Promise<void>;
  /**
   * Commits to the restored database, replacing the original. The old
   * database is deleted.
   */
  finalizeImport(): Promise<void>;
  generateKey(request: GenerateKeyRequest): Promise<string>;
  /** Returns the system configuration. */
  getConfig(): Promise<Config>;
  /** Returns detailed information about a credential in the system. */
  getCredential(credentialId: string): Promise<CredentialDetail>;
  /**
   * Returns detailed information about a credential schema.
   * A credential schema defines the structure and format of a credential,
   * including the attributes that issuers make claims about. Schemas also
   * specify how issued credentials should be presented in wallets, whether
   * a revocation method is used to manage credential status, and issuer
   * preferences for suitable key storage types for wallets to use.
   */
  getCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaDetail>;
  /** Returns detailed trust information about a credential issuer. */
  getCredentialTrustInformation(credentialId: string): Promise<TrustInformationDetail>;
  /**
   * Returns the full record for a single history event, including metadata
   * if present.
   */
  getHistoryEntry(historyId: string): Promise<HistoryListItem>;
  getIdentifier(id: string): Promise<IdentifierDetail>;
  /** Returns details of an existing organization. */
  getOrganisation(id: string): Promise<OrganisationDetail>;
  getPresentationDefinitionV2(proofId: string): Promise<PresentationDefinitionV2>;
  /** Returns detailed information about a proof request. */
  getProof(proofId: string): Promise<ProofDetail>;
  getProofSchema(proofSchemaId: string): Promise<ProofSchemaDetail>;
  /**
   * Returns detailed trust information about the requesting entity for a
   * proof request.
   */
  getProofTrustInformation(proofId: string): Promise<TrustInformationDetail>;
  /** Returns trust collections curated by the Verifier Provider. */
  getVerifierInstanceTrustCollections(id: string): Promise<TrustCollections>;
  /**
   * For a wallet, handles the interaction once the wallet connects to a share
   * endpoint URL (for example, scans the QR code of an offered credential or
   * request for proof).
   */
  handleInvitation(request: HandleInvitationRequest): Promise<HandleInvitationResponse>;
  /**
   * Accepts an offered credential. The system will generate a new
   * identifier that matches issuer's restrictions. Alternatively,
   * you can specify an existing identifier.
   */
  holderAcceptCredential(request: HolderAcceptCredentialRequest): Promise<string>;
  /** Activates the wallet instance with the Wallet Provider after user authentication. */
  holderActivateWalletUnit(id: string, request: HolderActivateWalletUnitRequest): Promise<void>;
  /** Returns wallet registration details from the Wallet Provider. */
  holderGetWalletUnit(id: string): Promise<HolderWalletUnit>;
  /** Returns trust collections curated by the Wallet Provider. */
  holderGetWalletUnitTrustCollections(id: string): Promise<TrustCollections>;
  /** Receive a new credential batch */
  holderRefreshCredential(interactionId: string): Promise<HolderRefreshCredentialResponse>;
  /** Registers the wallet unit with a Wallet Provider. */
  holderRegisterWalletUnit(request: HolderRegisterWalletUnitRequest): Promise<HolderRegisterWalletUnitResponse>;
  /** Rejects an offered credential. */
  holderRejectCredential(interactionId: string): Promise<void>;
  /** Rejects a proof request. */
  holderRejectProof(interactionId: string): Promise<void>;
  /**
   * Submits a presentation using DCQL as a query language; this should
   * be used after `getPresentationDefinitionv2`.
   */
  holderSubmitProofV2(interactionId: string, submission: Record<string, Array<PresentationSubmitV2CredentialRequest>>): Promise<void>;
  /**
   * Check status of wallet unit with the Wallet Provider. Will return an error
   * if the unit has been revoked.
   */
  holderWalletUnitStatus(id: string): Promise<void>;
  /** Modifies wallet unit's settings. */
  holderWalletUnitUpdate(id: string, request: HolderWalletUnitUpdateRequest): Promise<void>;
  /**
   * Imports a credential schema shared from another mobile verifier device
   * using the one-core.
   */
  importCredentialSchema(request: ImportCredentialSchemaRequest): Promise<string>;
  importProofSchema(request: ImportProofSchemaRequest): Promise<string>;
  /** For wallets, starts the OpenID4VCI Authorization Code Flow. */
  initiateIssuance(request: InitiateIssuanceRequest): Promise<InitiateIssuanceResponse>;
  /** Returns a filterable list of credential schemas. */
  listCredentialSchemas(query: CredentialSchemaListQuery): Promise<CredentialSchemaList>;
  /** Returns a filterable list of credentials in the system. */
  listCredentials(query: CredentialListQuery): Promise<CredentialList>;
  /** Deprecated. Use the `listIdentifiers` method. */
  listDids(query: DidListQuery): Promise<DidList>;
  /** Returns a filterable list of history events. */
  listHistory(query: HistoryListQuery): Promise<HistoryList>;
  /** Returns a filterable list of identifiers. */
  listIdentifiers(query: IdentifierListQuery): Promise<IdentifierList>;
  listProofSchemas(filter: ProofSchemaListQuery): Promise<ProofSchemaList>;
  /** Returns a filterable list of proof requests. */
  listProofs(query: ProofListQuery): Promise<ProofList>;
  /** Scan NFC for ISO 18013-5 engagment. */
  nfcReadIsoMdlEngagement(request: NfcScanRequest): Promise<string>;
  /** Cancel previously started NFC scan via `nfc_read_iso_mdl_engagement`. */
  nfcStopIsoMdlEngagement(): Promise<void>;
  /**
   * For wallets, initiates device engagement for offline flows. Reference
   * the `verificationEngagement` entry of your configuration for your
   * options for `engagement`.
   */
  proposeProof(request: ProposeProofRequest): Promise<ProposeProofResponse>;
  /**
   * Initiates the QES signing flow for a document with a configured
   * QES provider. Returns an `authorizationUrl` for the user to
   * authenticate with the provider, and a `codeVerifier` to be passed
   * to the `qesSign` method on return.
   */
  qesAuthorize(request: QesAuthorizeRequest): Promise<QesAuthorizeResponse>;
  /**
   * Completes the QES signing flow. Exchanges the authorization
   * `code` received from the provider redirect and the `codeVerifier`
   * from `qesAuthorize` for a signed document.
   */
  qesSign(request: QesSignRequest): Promise<QesSignResponse>;
  /** Registers the verifier unit with a Verifier Provider. */
  registerVerifierInstance(request: RegisterVerifierInstanceRequest): Promise<RegisterVerifierInstanceResponse>;
  /**
   * Returns the JSON-LD context document for a given URI. This is a
   * [cached entity](https://docs.procivis.ch/configure/caching).
   */
  resolveJsonldContext(url: string): Promise<ResolvedJsonLdContext>;
  /** Discards the restored database and continues using the original. */
  rollbackImport(): Promise<void>;
  /**
   * Triggers a configured task by name. Pass the task name as defined in the
   * `task` configuration object, and optionally a JSON string of task-specific
   * parameters. Returns the result as a JSON string.
   */
  runTask(task: string, params: string | undefined): Promise<string>;
  /**
   * Produces a URL for sharing a credential schema with another mobile
   * verifier device using the one-core.
   */
  shareCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaShareResponse>;
  /**
   * Creates a share URL from a proof request. A wallet holder can use this
   * URL to access the request.
   */
  shareProof(proofId: string, params: ShareProofRequest): Promise<ShareProofResponse>;
  shareProofSchema(proofSchemaId: string): Promise<ProofSchemaShareResponse>;
  /**
   * Deleting data while uninitializing the Core erases all wallet data permanently.
   * If data is not deleted it is reused when Core is reinitialized.
   */
  uninitialize(deleteData: boolean): Promise<void>;
  /**
   * Makes the restored database active for calls.
   * Follow by calling either `finalizeImport` or `rollbackImport`.
   */
  unpackBackup(password: string, inputPath: string): Promise<Metadata>;
  /** Modifies verifier unit's settings. */
  updateVerifierInstance(id: string, request: UpdateVerifierInstanceRequest): Promise<void>;
  /**
   * Updates or deactivates an organization if it exists, otherwise
   * creates a new organization using the provided UUID and name.
   */
  upsertOrganisation(request: UpsertOrganisationRequest): Promise<void>;
  /** Returns build information. */
  version(): Version;
}
