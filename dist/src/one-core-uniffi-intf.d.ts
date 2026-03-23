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
    schema: ClaimSchema;
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
}
export interface Config {
    format: Record<string, string>;
    issuanceProtocol: Record<string, string>;
    verificationProtocol: Record<string, string>;
    transport: Record<string, string>;
    revocation: Record<string, string>;
    did: Record<string, string>;
    identifier: Record<string, string>;
    datatype: Record<string, string>;
    keyAlgorithm: Record<string, string>;
    keyStorage: Record<string, string>;
    trustManagement: Record<string, string>;
    cacheEntities: Record<string, string>;
    task: Record<string, string>;
    credentialIssuer: Record<string, string>;
    walletProvider: Record<string, string>;
}
export interface ContinueIssuanceResponse {
    /** For reference. */
    interactionId: string;
    keyStorageSecurityLevels?: Array<KeyStorageSecurity>;
    keyAlgorithms?: Array<string>;
    requiresWalletInstanceAttestation: boolean;
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
}
export interface CreateOrganisationRequest {
    id?: string;
    name?: string;
}
/**
 * If protocol is `ISO_MDL`, specify the device engagement type
 * by referencing an entry from `verificationEngagement` of your
 * configuration. `iso_mdl_engagement` accepts either QR code content
 * (for QR device engagement) or NFC engagement parameters from
 * `nfc_read_iso_mdl_engagement`.
 */
export interface CreateProofRequest {
    proofSchemaId: string;
    verifierDidId?: string;
    verifierIdentifierId?: string;
    protocol: string;
    redirectUri?: string;
    verifierKey?: string;
    verifierCertificate?: string;
    isoMdlEngagement?: string;
    transport?: Array<string>;
    profile?: string;
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
    expireDuration: number;
    proofInputSchemas: Array<CreateProofSchemaInput>;
}
export interface CreateRemoteTrustEntityRequest {
    didId: string;
    trustAnchorId?: string;
    name: string;
    logo?: string;
    termsUrl?: string;
    privacyUrl?: string;
    website?: string;
    role: TrustEntityRole;
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
export interface CreateTrustAnchorRequest {
    name: string;
    type: string;
    isPublisher?: boolean;
    publisherReference?: string;
}
export interface CreateTrustEntityRequest {
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRole;
    trustAnchorId: string;
    didId?: string;
    type?: TrustEntityType;
    identifierId?: string;
    content?: string;
    organisationId: string;
}
export interface CreatedBackup {
    historyId: string;
    file: string;
    unexportable: UnexportableEntities;
}
export interface CredentialDetail {
    id: string;
    createdDate: string;
    issuanceDate?: string;
    lastModified: string;
    revocationDate?: string;
    issuer?: IdentifierListItem;
    holder?: IdentifierListItem;
    state: CredentialState;
    schema: CredentialSchemaListItem;
    claims: Array<Claim>;
    redirectUri?: string;
    role: CredentialRole;
    suspendEndDate?: string;
    mdocMsoValidity?: MdocMsoValidity;
    protocol: string;
    profile?: string;
}
export interface CredentialList {
    values: Array<CredentialListItem>;
    totalPages: number;
    totalItems: number;
}
export interface CredentialListItem {
    id: string;
    createdDate: string;
    issuanceDate?: string;
    lastModified: string;
    revocationDate?: string;
    issuer?: string;
    state: CredentialState;
    schema: CredentialSchemaListItem;
    role: CredentialRole;
    suspendEndDate?: string;
    protocol: string;
    profile?: string;
}
export interface CredentialListQuery {
    page: number;
    pageSize: number;
    sort?: SortableCredentialColumn;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    profiles?: Array<string>;
    searchText?: string;
    searchType?: Array<CredentialListQuerySearchType>;
    exact?: Array<CredentialListQueryExactColumn>;
    roles?: Array<CredentialRole>;
    ids?: Array<string>;
    states?: Array<CredentialState>;
    include?: Array<CredentialListIncludeEntityType>;
    credentialSchemaIds?: Array<string>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
    issuanceDateAfter?: string;
    issuanceDateBefore?: string;
    revocationDateAfter?: string;
    revocationDateBefore?: string;
}
export interface CredentialQuery {
    multiple: boolean;
    credentialOrFailureHint: ApplicableCredentialOrFailureHint;
}
export interface CredentialQueryFailureHint {
    reason: CredentialQueryFailureReason;
    credentialSchema?: CredentialSchemaDetail;
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
    format: string;
    revocationMethod?: string;
    claims: Array<ClaimSchema>;
    keyStorageSecurity?: KeyStorageSecurity;
    schemaId: string;
    importedSourceUrl: string;
    layoutType?: LayoutType;
    layoutProperties?: CredentialSchemaLayoutProperties;
    allowSuspension: boolean;
    requiresWalletInstanceAttestation: boolean;
    transactionCode?: CredentialSchemaTransactionCode;
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
    totalPages: number;
    totalItems: number;
}
export interface CredentialSchemaListItem {
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
}
export interface CredentialSchemaListQuery {
    page: number;
    pageSize: number;
    organisationId: string;
    sort?: SortableCredentialSchemaColumn;
    sortDirection?: SortDirection;
    name?: string;
    ids?: Array<string>;
    exact?: Array<CredentialSchemaListQueryExactColumn>;
    include?: Array<CredentialSchemaListIncludeEntityType>;
    schemaId?: string;
    formats?: Array<string>;
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
    length: number;
    description?: string;
}
export interface CredentialSet {
    required: boolean;
    options: Array<Array<string>>;
}
export interface DeviceInfo {
    address: string;
    mtu: number;
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
    totalPages: number;
    totalItems: number;
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
    page: number;
    pageSize: number;
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
export interface DisplayName {
    lang: string;
    value: string;
}
export interface ErrorResponse {
    code: string;
    message: string;
    cause?: Cause;
}
export interface GenerateKeyRequest {
    organisationId: string;
    keyType: string;
    keyParams: Record<string, string>;
    name: string;
    storageType: string;
    storageParams: Record<string, string>;
}
export interface GeneratedKey {
    keyReference: number[];
    publicKey: number[];
}
export interface HandleInvitationRequest {
    /**
     * Typically encoded as a QR code or deep link by the issuer or
     * verifier. For example: "https://example.com/credential-offer".
     */
    url: string;
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
    totalPages: number;
    totalItems: number;
}
export interface HistoryListItem {
    id: string;
    createdDate: string;
    action: HistoryAction;
    name: string;
    entityId?: string;
    entityType: HistoryEntityType;
    metadata?: HistoryMetadata;
    organisationId?: string;
    target?: string;
    user?: string;
}
export interface HistoryListQuery {
    page: number;
    pageSize: number;
    organisationId: string;
    entityIds?: Array<string>;
    entityTypes?: Array<HistoryEntityType>;
    actions?: Array<HistoryAction>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    identifierId?: string;
    credentialId?: string;
    credentialSchemaId?: string;
    proofSchemaId?: string;
    search?: HistorySearch;
    users?: Array<string>;
}
export interface HistorySearch {
    text: string;
    type?: HistorySearchType;
}
export interface HolderAcceptCredentialRequest {
    interactionId: string;
    didId?: string;
    identifierId?: string;
    keyId?: string;
    txCode?: string;
    holderWalletUnitId?: string;
}
export interface HolderRegisterWalletUnitRequest {
    organisationId: string;
    /** Reference the `walletProvider` configuration of the Wallet Provider. */
    walletProvider: WalletProvider;
    keyType: string;
}
export interface HolderRegisterWalletUnitResponse {
    id: string;
    status: WalletUnitStatus;
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
}
export interface HolderWalletUnitUpdateRequest {
    trustCollections: Array<string>;
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
}
export interface IdentifierList {
    values: Array<IdentifierListItem>;
    totalPages: number;
    totalItems: number;
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
    page: number;
    pageSize: number;
    sort?: SortableIdentifierColumn;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    types?: Array<IdentifierType>;
    states?: Array<IdentifierState>;
    exact?: Array<IdentifierListQueryExactColumn>;
    didMethods?: Array<string>;
    isRemote?: boolean;
    keyAlgorithms?: Array<string>;
    keyRoles?: Array<KeyRole>;
    keyStorages?: Array<string>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
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
    format: string;
    revocationMethod: string;
    organisationId: string;
    claims: Array<ImportCredentialSchemaClaimSchema>;
    keyStorageSecurity?: KeyStorageSecurity;
    schemaId: string;
    importedSourceUrl: string;
    layoutType?: LayoutType;
    layoutProperties?: ImportCredentialSchemaLayoutProperties;
    allowSuspension?: boolean;
    requiresWalletInstanceAttestation?: boolean;
    transactionCode?: ImportCredentialSchemaTransactionCode;
}
export interface ImportCredentialSchemaTransactionCode {
    type: TransactionCodeType;
    length: number;
    description?: string;
}
export interface ImportProofSchema {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    expireDuration: number;
    importedSourceUrl: string;
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
    configJson?: string;
    nativeSecureElement?: NativeKeyStorage;
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
    organisationId: string;
    protocol: string;
    issuer: string;
    clientId: string;
    redirectUri?: string;
    scope?: Array<string>;
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
    publicKey: number[];
    keyType: string;
    storageType: string;
}
export interface KeyListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    publicKey: number[];
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
/** Optional messages to be displayed on (iOS) system overlay */
export interface NfcScanRequest {
    inProgressMessage?: string;
    failureMessage?: string;
    successMessage?: string;
}
export interface OpenId4vciTxCode {
    inputMode: OpenId4vciTxCodeInputMode;
    length?: number;
    description?: string;
}
export interface PeripheralDiscoveryData {
    deviceAddress: string;
    localDeviceName?: string;
    advertisedServices: Array<string>;
    advertisedServiceData?: Record<string, number[]>;
}
export interface PresentationDefinition {
    requestGroups: Array<PresentationDefinitionRequestGroup>;
    credentials: Array<CredentialDetail>;
}
export interface PresentationDefinitionField {
    id: string;
    name?: string;
    purpose?: string;
    required: boolean;
    keyMap: Record<string, string>;
}
export interface PresentationDefinitionRequestGroup {
    id: string;
    name?: string;
    purpose?: string;
    rule: PresentationDefinitionRule;
    requestedCredentials: Array<PresentationDefinitionRequestedCredential>;
}
export interface PresentationDefinitionRequestedCredential {
    id: string;
    name?: string;
    purpose?: string;
    fields: Array<PresentationDefinitionField>;
    applicableCredentials: Array<string>;
    inapplicableCredentials: Array<string>;
    multiple?: boolean;
}
export interface PresentationDefinitionRule {
    type: PresentationDefinitionRuleType;
    min?: number;
    max?: number;
    count?: number;
}
export interface PresentationDefinitionV2 {
    credentialQueries: Record<string, CredentialQuery>;
    credentialSets: Array<CredentialSet>;
}
export interface PresentationDefinitionV2Claim {
    path: string;
    schema: ClaimSchema;
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
    schema: CredentialSchemaListItem;
    claims: Array<PresentationDefinitionV2Claim>;
    redirectUri?: string;
    role: CredentialRole;
    suspendEndDate?: string;
    mdocMsoValidity?: MdocMsoValidity;
    protocol: string;
    profile?: string;
}
export interface PresentationSubmitCredentialRequest {
    credentialId: string;
    submitClaims: Array<string>;
}
export interface PresentationSubmitV2CredentialRequest {
    credentialId: string;
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
    verifier?: IdentifierListItem;
    state: ProofState;
    role: ProofRole;
    proofSchema?: ProofSchemaListItem;
    protocol: string;
    engagement?: string;
    transport: string;
    redirectUri?: string;
    proofInputs: Array<ProofInput>;
    retainUntilDate?: string;
    requestedDate?: string;
    completedDate?: string;
    claimsRemovedAt?: string;
    profile?: string;
}
export interface ProofInput {
    claims: Array<ProofClaim>;
    credential?: CredentialDetail;
    credentialSchema: CredentialSchemaListItem;
}
export interface ProofInputSchema {
    claimSchemas: Array<ProofClaimSchema>;
    credentialSchema: CredentialSchemaListItem;
}
export interface ProofList {
    values: Array<ProofListItem>;
    totalPages: number;
    totalItems: number;
}
export interface ProofListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    requestedDate?: string;
    completedDate?: string;
    verifier?: string;
    protocol: string;
    transport: string;
    engagement?: string;
    state: ProofState;
    role: ProofRole;
    schema?: ProofSchemaListItem;
    retainUntilDate?: string;
    profile?: string;
}
export interface ProofListQuery {
    page: number;
    pageSize: number;
    organisationId: string;
    sort?: SortableProofColumn;
    sortDirection?: SortDirection;
    name?: string;
    profiles?: Array<string>;
    ids?: Array<string>;
    proofStates?: Array<ProofState>;
    proofRoles?: Array<ProofRole>;
    proofSchemaIds?: Array<string>;
    exact?: Array<ProofListQueryExactColumn>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
    requestedDateAfter?: string;
    requestedDateBefore?: string;
    completedDateAfter?: string;
    completedDateBefore?: string;
}
export interface ProofSchemaDetail {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    expireDuration: number;
    proofInputSchemas: Array<ProofInputSchema>;
    importedSourceUrl?: string;
}
export interface ProofSchemaList {
    values: Array<ProofSchemaListItem>;
    totalPages: number;
    totalItems: number;
}
export interface ProofSchemaListItem {
    id: string;
    createdDate: string;
    lastModified: string;
    deletedAt?: string;
    name: string;
    expireDuration: number;
}
export interface ProofSchemaListQuery {
    page: number;
    pageSize: number;
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
export interface RemoteTrustEntityDetail {
    id: string;
    organisationId?: string;
    createdDate: string;
    lastModified: string;
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRole;
    trustAnchor: TrustAnchorDetail;
    did?: DidListItem;
    state: TrustEntityState;
}
export interface ResolveTrustEntitiesRequest {
    identifiers: Array<ResolveTrustEntityRequest>;
}
export interface ResolveTrustEntityRequest {
    id: string;
    certificateId?: string;
}
export interface ResolvedJsonLdContext {
    context: string;
}
export interface ResolvedTrustEntity {
    trustEntity: TrustEntityDetail;
    certificateIds?: Array<string>;
}
export interface ServiceDescription {
    uuid: string;
    advertise: boolean;
    advertisedServiceData?: number[];
    characteristics: Array<CharacteristicSettings>;
}
export interface ShareProofRequest {
    params?: ShareProofRequestParams;
}
export interface ShareProofRequestParams {
    clientIdScheme?: ClientIdScheme;
}
export interface ShareProofResponse {
    url: string;
    expiresAt?: string;
}
export interface TrustAnchorDetail {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    type: string;
    isPublisher: boolean;
    publisherReference: string;
}
export interface TrustAnchorList {
    values: Array<TrustAnchorListItem>;
    totalPages: number;
    totalItems: number;
}
export interface TrustAnchorListItem {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    type: string;
    isPublisher: boolean;
    publisherReference: string;
    entities: number;
}
export interface TrustAnchorListQuery {
    page: number;
    pageSize: number;
    sort?: SortableTrustAnchorColumn;
    sortDirection?: SortDirection;
    name?: string;
    isPublisher?: boolean;
    type?: string;
    exact?: Array<TrustAnchorListQueryExactColumn>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface TrustCollectionInfo {
    selected: boolean;
    id: string;
    name: string;
    logo: string;
    displayName: Array<DisplayName>;
    description: Array<DisplayName>;
}
export interface TrustCollections {
    trustCollections: Array<TrustCollectionInfo>;
}
export interface TrustEntityCertificate {
    state: CertificateState;
    publicKey: string;
    commonName?: string;
    serialNumber: string;
    notBefore: string;
    notAfter: string;
    issuer: string;
    subject: string;
    fingerprint: string;
    extensions: Array<CertificateX509Extension>;
}
export interface TrustEntityDetail {
    id: string;
    organisationId?: string;
    createdDate: string;
    lastModified: string;
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRole;
    trustAnchor: TrustAnchorDetail;
    did?: DidListItem;
    state: TrustEntityState;
    entityKey: string;
    type: TrustEntityType;
    identifier?: IdentifierListItem;
    content?: string;
    ca?: TrustEntityCertificate;
}
export interface TrustEntityList {
    values: Array<TrustEntityListItem>;
    totalPages: number;
    totalItems: number;
}
export interface TrustEntityListItem {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    state: TrustEntityState;
    privacyUrl?: string;
    role: TrustEntityRole;
    trustAnchor: TrustAnchorDetail;
    did?: DidListItem;
}
export interface TrustEntityListQuery {
    page: number;
    pageSize: number;
    sort?: SortableTrustEntityColumn;
    sortDirection?: SortDirection;
    name?: string;
    role?: TrustEntityRole;
    trustAnchor?: string;
    didId?: string;
    organisationId?: string;
    types?: Array<TrustEntityType>;
    entityKey?: string;
    states?: Array<TrustEntityState>;
    exact?: Array<TrustEntityListQueryExactColumn>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface UnexportableEntities {
    credentials: Array<CredentialDetail>;
    keys: Array<KeyListItem>;
    dids: Array<DidListItem>;
    identifiers: Array<IdentifierListItem>;
    totalCredentials: number;
    totalKeys: number;
    totalDids: number;
    totalIdentifiers: number;
}
export interface UpdateRemoteTrustEntityRequest {
    didId: string;
    action?: TrustEntityUpdateAction;
    name?: string;
    logo?: string | null;
    website?: string | null;
    termsUrl?: string | null;
    privacyUrl?: string | null;
    role?: TrustEntityRole;
}
export interface UpsertOrganisationRequest {
    id: string;
    name?: string;
    deactivate?: boolean;
    walletProvider?: string | null;
    walletProviderIssuer?: string | null;
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
    url: string;
    type: WalletProviderType;
}
export type ApplicableCredentialOrFailureHint = {
    type_: "APPLICABLE_CREDENTIALS";
    applicableCredentials: Array<PresentationDefinitionV2Credential>;
} | {
    type_: "FAILURE_HINT";
    failureHint: CredentialQueryFailureHint;
};
export type BleError = {
    type_: "ADAPTER_NOT_ENABLED";
} | {
    type_: "SCAN_ALREADY_STARTED";
} | {
    type_: "SCAN_NOT_STARTED";
} | {
    type_: "BROADCAST_ALREADY_STARTED";
} | {
    type_: "BROADCAST_NOT_STARTED";
} | {
    type_: "ANOTHER_OPERATION_IN_PROGRESS";
} | {
    type_: "WRITE_DATA_TOO_LONG";
} | {
    type_: "DEVICE_ADDRESS_NOT_FOUND";
    address: string;
} | {
    type_: "SERVICE_NOT_FOUND";
    service: string;
} | {
    type_: "CHARACTERISTIC_NOT_FOUND";
    characteristic: string;
} | {
    type_: "INVALID_UUID";
    uuid: string;
} | {
    type_: "DEVICE_NOT_CONNECTED";
    address: string;
} | {
    type_: "INVALID_CHARACTERISTIC_OPERATION";
    service: string;
    characteristic: string;
    operation: string;
} | {
    type_: "NOT_SUPPORTED";
} | {
    type_: "NOT_AUTHORIZED";
} | {
    type_: "SERVER_NOT_RUNNING";
} | {
    type_: "UNKNOWN";
    reason: string;
};
export declare enum CacheType {
    DID_DOCUMENT = "DID_DOCUMENT",
    JSON_LD_CONTEXT = "JSON_LD_CONTEXT",
    STATUS_LIST_CREDENTIAL = "STATUS_LIST_CREDENTIAL",
    VCT_METADATA = "VCT_METADATA",
    JSON_SCHEMA = "JSON_SCHEMA",
    TRUST_LIST = "TRUST_LIST",
    X509_CRL = "X509_CRL",
    ANDROID_ATTESTATION_CRL = "ANDROID_ATTESTATION_CRL",
    OPEN_ID_METADATA = "OPEN_ID_METADATA"
}
export declare enum CertificateState {
    NOT_YET_ACTIVE = "NOT_YET_ACTIVE",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED"
}
export declare enum CharacteristicPermission {
    READ = "READ",
    WRITE = "WRITE"
}
export declare enum CharacteristicProperty {
    READ = "READ",
    WRITE = "WRITE",
    NOTIFY = "NOTIFY",
    WRITE_WITHOUT_RESPONSE = "WRITE_WITHOUT_RESPONSE",
    INDICATE = "INDICATE"
}
export declare enum CharacteristicWriteType {
    WITH_RESPONSE = "WITH_RESPONSE",
    WITHOUT_RESPONSE = "WITHOUT_RESPONSE"
}
export type ClaimValue = {
    type_: "BOOLEAN";
    value: boolean;
} | {
    type_: "FLOAT";
    value: number;
} | {
    type_: "INTEGER";
    value: number;
} | {
    type_: "STRING";
    value: string;
} | {
    type_: "NESTED";
    value: Array<Claim>;
};
export declare enum ClientIdScheme {
    REDIRECT_URI = "REDIRECT_URI",
    VERIFIER_ATTESTATION = "VERIFIER_ATTESTATION",
    DID = "DID",
    X509_SAN_DNS = "X509_SAN_DNS"
}
export type ConnectionEvent = {
    type_: "CONNECTED";
    deviceInfo: DeviceInfo;
} | {
    type_: "DISCONNECTED";
    deviceAddress: string;
};
export declare enum CreateSelfSignedCaRequestIssuerAlternativeNameType {
    EMAIL = "EMAIL",
    URI = "URI"
}
export declare enum CredentialListIncludeEntityType {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
    CREDENTIAL = "CREDENTIAL"
}
export declare enum CredentialListQueryExactColumn {
    NAME = "NAME"
}
export declare enum CredentialListQuerySearchType {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME"
}
export declare enum CredentialQueryFailureReason {
    NO_CREDENTIAL = "NO_CREDENTIAL",
    VALIDITY = "VALIDITY",
    CONSTRAINT = "CONSTRAINT"
}
export declare enum CredentialRole {
    HOLDER = "HOLDER",
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER"
}
export declare enum CredentialSchemaCodeType {
    BARCODE = "BARCODE",
    MRZ = "MRZ",
    QR_CODE = "QR_CODE"
}
export declare enum CredentialSchemaListIncludeEntityType {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES"
}
export declare enum CredentialSchemaListQueryExactColumn {
    NAME = "NAME",
    SCHEMA_ID = "SCHEMA_ID"
}
export declare enum CredentialState {
    CREATED = "CREATED",
    PENDING = "PENDING",
    OFFERED = "OFFERED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    REVOKED = "REVOKED",
    SUSPENDED = "SUSPENDED",
    ERROR = "ERROR",
    INTERACTION_EXPIRED = "INTERACTION_EXPIRED"
}
export declare enum DidListQueryExactColumn {
    NAME = "NAME",
    DID = "DID"
}
export declare enum DidType {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE"
}
export type HandleInvitationResponse = {
    type_: "CREDENTIAL_ISSUANCE";
    /** For reference. */
    interactionId: string;
    keyStorageSecurityLevels?: Array<KeyStorageSecurity>;
    keyAlgorithms?: Array<string>;
    /**
     * Metadata for entering a transaction code
     * If a pre-authorized code is issued with a transaction code object, the
     * wallet user must input a transaction code to receive the offered credential.
     * This code is typically sent through a separate channel such as SMS or email.
     */
    txCode?: OpenId4vciTxCode;
    protocol: string;
    requiresWalletInstanceAttestation: boolean;
} | {
    type_: "AUTHORIZATION_CODE_FLOW";
    /** For reference. */
    interactionId: string;
    /**
     * For issuer-initiated Authorization Code Flows, use this URL to start
     * the authorization process with the authorization server.
     */
    authorizationCodeFlowUrl: string;
    protocol: string;
} | {
    type_: "PROOF_REQUEST";
    /** For reference. */
    interactionId: string;
    /** Proof request. */
    proofId: string;
    protocol: string;
};
export declare enum HistoryAction {
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
    DELIVERED = "DELIVERED"
}
export declare enum HistoryEntityType {
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
    TRUST_ANCHOR = "TRUST_ANCHOR",
    TRUST_ENTITY = "TRUST_ENTITY",
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
    TRUST_LIST_SUBSCRIPTION = "TRUST_LIST_SUBSCRIPTION"
}
export type HistoryMetadata = {
    type_: "UNEXPORTABLE_ENTITIES";
    value: UnexportableEntities;
} | {
    type_: "ERROR_METADATA";
    value: HistoryErrorMetadata;
} | {
    type_: "WALLET_UNIT_JWT";
    value: [string];
};
export declare enum HistorySearchType {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
    ISSUER_DID = "ISSUER_DID",
    ISSUER_NAME = "ISSUER_NAME",
    VERIFIER_DID = "VERIFIER_DID",
    VERIFIER_NAME = "VERIFIER_NAME",
    PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME"
}
export declare enum IdentifierListQueryExactColumn {
    NAME = "NAME"
}
export declare enum IdentifierState {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum IdentifierType {
    KEY = "KEY",
    DID = "DID",
    CERTIFICATE = "CERTIFICATE",
    CERTIFICATE_AUTHORITY = "CERTIFICATE_AUTHORITY"
}
export declare enum KeyRole {
    AUTHENTICATION = "AUTHENTICATION",
    ASSERTION_METHOD = "ASSERTION_METHOD",
    KEY_AGREEMENT = "KEY_AGREEMENT",
    CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
    CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION"
}
export declare enum KeyStorageSecurity {
    HIGH = "HIGH",
    MODERATE = "MODERATE",
    ENHANCED_BASIC = "ENHANCED_BASIC",
    BASIC = "BASIC"
}
export declare enum LayoutType {
    CARD = "CARD",
    DOCUMENT = "DOCUMENT",
    SINGLE_ATTRIBUTE = "SINGLE_ATTRIBUTE"
}
export type NativeKeyStorageError = {
    type_: "KEY_GENERATION_FAILURE";
    reason: string;
} | {
    type_: "SIGNATURE_FAILURE";
    reason: string;
} | {
    type_: "UNSUPPORTED";
} | {
    type_: "UNKNOWN";
    reason: string;
};
export type NfcError = {
    type_: "NOT_ENABLED";
} | {
    type_: "NOT_SUPPORTED";
} | {
    type_: "ALREADY_STARTED";
} | {
    type_: "NOT_STARTED";
} | {
    type_: "CANCELLED";
} | {
    type_: "SESSION_CLOSED";
} | {
    type_: "UNKNOWN";
    reason: string;
};
export type OneCoreError = {
    type_: "RESPONSE";
    data: ErrorResponse;
};
export declare enum OpenId4vciTxCodeInputMode {
    NUMERIC = "NUMERIC",
    TEXT = "TEXT"
}
export declare enum PresentationDefinitionRuleType {
    ALL = "ALL",
    PICK = "PICK"
}
export type PresentationDefinitionV2ClaimValue = {
    type_: "BOOLEAN";
    value: boolean;
} | {
    type_: "FLOAT";
    value: number;
} | {
    type_: "INTEGER";
    value: number;
} | {
    type_: "STRING";
    value: string;
} | {
    type_: "NESTED";
    value: Array<PresentationDefinitionV2Claim>;
};
export type ProofClaimValue = {
    type_: "VALUE";
    value: string;
} | {
    type_: "CLAIMS";
    value: Array<ProofClaim>;
};
export declare enum ProofListQueryExactColumn {
    NAME = "NAME"
}
export declare enum ProofRole {
    HOLDER = "HOLDER",
    VERIFIER = "VERIFIER"
}
export declare enum ProofSchemaListQueryExactColumn {
    NAME = "NAME"
}
export declare enum ProofState {
    CREATED = "CREATED",
    PENDING = "PENDING",
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    RETRACTED = "RETRACTED",
    ERROR = "ERROR",
    INTERACTION_EXPIRED = "INTERACTION_EXPIRED"
}
export declare enum SortDirection {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}
export declare enum SortableCredentialColumn {
    CREATED_DATE = "CREATED_DATE",
    SCHEMA_NAME = "SCHEMA_NAME",
    ISSUER = "ISSUER",
    STATE = "STATE"
}
export declare enum SortableCredentialSchemaColumn {
    NAME = "NAME",
    FORMAT = "FORMAT",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableDidColumn {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    METHOD = "METHOD",
    TYPE = "TYPE",
    DID = "DID",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum SortableIdentifierColumn {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE",
    STATE = "STATE"
}
export declare enum SortableProofColumn {
    SCHEMA_NAME = "SCHEMA_NAME",
    VERIFIER = "VERIFIER",
    STATE = "STATE",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableProofSchemaColumn {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableTrustAnchorColumn {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE"
}
export declare enum SortableTrustEntityColumn {
    NAME = "NAME",
    ROLE = "ROLE",
    LAST_MODIFIED = "LAST_MODIFIED",
    STATE = "STATE"
}
export declare enum TransactionCodeType {
    NUMERIC = "NUMERIC",
    ALPHANUMERIC = "ALPHANUMERIC"
}
export declare enum TrustAnchorListQueryExactColumn {
    NAME = "NAME",
    TYPE = "TYPE"
}
export declare enum TrustEntityListQueryExactColumn {
    NAME = "NAME"
}
export declare enum TrustEntityRole {
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER",
    BOTH = "BOTH"
}
export declare enum TrustEntityState {
    ACTIVE = "ACTIVE",
    REMOVED = "REMOVED",
    WITHDRAWN = "WITHDRAWN",
    REMOVED_AND_WITHDRAWN = "REMOVED_AND_WITHDRAWN"
}
export declare enum TrustEntityType {
    DID = "DID",
    /** certificate authority */
    CA = "CA"
}
export declare enum TrustEntityUpdateAction {
    ADMIN_ACTIVATE = "ADMIN_ACTIVATE",
    ACTIVATE = "ACTIVATE",
    WITHDRAW = "WITHDRAW",
    REMOVE = "REMOVE"
}
export declare enum WalletProviderType {
    PROCIVIS_ONE = "PROCIVIS_ONE"
}
export declare enum WalletUnitStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    UNATTESTED = "UNATTESTED",
    ERROR = "ERROR"
}
export interface BleCentral {
    connect(peripheral: string): Promise<number>;
    disconnect(peripheral: string): Promise<void>;
    getDiscoveredDevices(): Promise<Array<PeripheralDiscoveryData>>;
    getNotifications(peripheral: string, service: string, characteristic: string): Promise<Array<number[]>>;
    isAdapterEnabled(): Promise<boolean>;
    isScanning(): Promise<boolean>;
    readData(peripheral: string, service: string, characteristic: string): Promise<number[]>;
    startScan(filterServices: Array<string> | undefined): Promise<void>;
    stopScan(): Promise<void>;
    subscribeToCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
    unsubscribeFromCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
    writeData(peripheral: string, service: string, characteristic: string, data: number[], writeType: CharacteristicWriteType): Promise<void>;
}
export interface BlePeripheral {
    getCharacteristicWrites(device: string, service: string, characteristic: string): Promise<Array<number[]>>;
    getConnectionChangeEvents(): Promise<Array<ConnectionEvent>>;
    isAdapterEnabled(): Promise<boolean>;
    isAdvertising(): Promise<boolean>;
    notifyCharacteristicData(deviceAddress: string, service: string, characteristic: string, data: number[]): Promise<void>;
    setCharacteristicData(service: string, characteristic: string, data: number[]): Promise<void>;
    startAdvertisement(deviceName: string | undefined, services: Array<ServiceDescription>): Promise<string | undefined>;
    stopAdvertisement(): Promise<void>;
    stopServer(): Promise<void>;
    waitForCharacteristicRead(device: string, service: string, characteristic: string): Promise<void>;
}
export interface NativeKeyStorage {
    generateAttestation(keyReference: number[], nonce: string | undefined): Promise<Array<string>>;
    generateAttestationKey(keyAlias: string, nonce: string | undefined): Promise<GeneratedKey>;
    generateKey(keyAlias: string): Promise<GeneratedKey>;
    sign(keyReference: number[], message: number[]): Promise<number[]>;
    signWithAttestationKey(keyReference: number[], message: number[]): Promise<number[]>;
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
    handleCommand(apdu: number[]): number[];
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
    transceive(commandApdu: number[]): Promise<number[]>;
}
export interface OneCore {
    backupInfo(): Promise<UnexportableEntities>;
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
    createBackup(password: string, outputPath: string): Promise<CreatedBackup>;
    createDid(request: CreateDidRequest): Promise<string>;
    createIdentifier(request: CreateIdentifierRequest): Promise<string>;
    createOrganisation(request: CreateOrganisationRequest): Promise<string>;
    /** For verifiers, creates a proof request. */
    createProof(request: CreateProofRequest): Promise<string>;
    createProofSchema(request: CreateProofSchemaRequest): Promise<string>;
    createRemoteTrustEntity(request: CreateRemoteTrustEntityRequest): Promise<string>;
    createTrustAnchor(anchor: CreateTrustAnchorRequest): Promise<string>;
    createTrustEntity(request: CreateTrustEntityRequest): Promise<string>;
    deleteCache(types: Array<CacheType> | undefined): Promise<void>;
    deleteCredential(credentialId: string): Promise<void>;
    deleteCredentialSchema(credentialSchemaId: string): Promise<void>;
    deleteIdentifier(id: string): Promise<void>;
    deleteProof(proofId: string): Promise<void>;
    deleteProofClaims(proofId: string): Promise<void>;
    deleteProofSchema(proofSchemaId: string): Promise<void>;
    deleteTrustAnchor(anchorId: string): Promise<void>;
    finalizeImport(): Promise<void>;
    generateKey(request: GenerateKeyRequest): Promise<string>;
    getConfig(): Promise<Config>;
    getCredential(credentialId: string): Promise<CredentialDetail>;
    getCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaDetail>;
    getHistoryEntry(historyId: string): Promise<HistoryListItem>;
    getIdentifier(id: string): Promise<IdentifierDetail>;
    getPresentationDefinition(proofId: string): Promise<PresentationDefinition>;
    getPresentationDefinitionV2(proofId: string): Promise<PresentationDefinitionV2>;
    getProof(proofId: string): Promise<ProofDetail>;
    getProofSchema(proofSchemaId: string): Promise<ProofSchemaDetail>;
    getRemoteTrustEntity(didId: string): Promise<RemoteTrustEntityDetail>;
    getTrustAnchor(trustAnchorId: string): Promise<TrustAnchorDetail>;
    getTrustEntity(trustEntityId: string): Promise<TrustEntityDetail>;
    getTrustEntityByDid(didId: string): Promise<TrustEntityDetail>;
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
    holderGetWalletUnit(id: string): Promise<HolderWalletUnit>;
    holderGetWalletUnitTrustCollections(id: string): Promise<TrustCollections>;
    /** Register with a Wallet Provider. */
    holderRegisterWalletUnit(request: HolderRegisterWalletUnitRequest): Promise<HolderRegisterWalletUnitResponse>;
    /** Rejects an offered credential. */
    holderRejectCredential(interactionId: string): Promise<void>;
    holderRejectProof(interactionId: string): Promise<void>;
    holderSubmitProof(interactionId: string, submitCredentials: Record<string, Array<PresentationSubmitCredentialRequest>>): Promise<void>;
    holderSubmitProofV2(interactionId: string, submission: Record<string, Array<PresentationSubmitV2CredentialRequest>>): Promise<void>;
    /**
     * Check status of wallet unit with the Wallet Provider. Will return an error
     * if the unit has been revoked.
     */
    holderWalletUnitStatus(id: string): Promise<void>;
    /** Edit holder wallet unit */
    holderWalletUnitUpdate(id: string, request: HolderWalletUnitUpdateRequest): Promise<void>;
    importCredentialSchema(request: ImportCredentialSchemaRequest): Promise<string>;
    importProofSchema(request: ImportProofSchemaRequest): Promise<string>;
    /** For wallets, starts the OpenID4VCI Authorization Code Flow. */
    initiateIssuance(request: InitiateIssuanceRequest): Promise<InitiateIssuanceResponse>;
    listCredentialSchemas(query: CredentialSchemaListQuery): Promise<CredentialSchemaList>;
    listCredentials(query: CredentialListQuery): Promise<CredentialList>;
    listDids(query: DidListQuery): Promise<DidList>;
    listHistory(query: HistoryListQuery): Promise<HistoryList>;
    listIdentifiers(query: IdentifierListQuery): Promise<IdentifierList>;
    listProofSchemas(filter: ProofSchemaListQuery): Promise<ProofSchemaList>;
    listProofs(query: ProofListQuery): Promise<ProofList>;
    listTrustAnchors(filters: TrustAnchorListQuery): Promise<TrustAnchorList>;
    listTrustEntities(filters: TrustEntityListQuery): Promise<TrustEntityList>;
    /** Scan NFC for ISO 18013-5 engagment */
    nfcReadIsoMdlEngagement(request: NfcScanRequest): Promise<string>;
    /** Cancel previously started NFC scan via `nfc_read_iso_mdl_engagement` */
    nfcStopIsoMdlEngagement(): Promise<void>;
    /**
     * For wallets, initiates device engagement for offline flows. Reference
     * the `verificationEngagement` entry of your configuration for your
     * options for `engagement`.
     */
    proposeProof(request: ProposeProofRequest): Promise<ProposeProofResponse>;
    resolveJsonldContext(url: string): Promise<ResolvedJsonLdContext>;
    resolveTrustEntityByIdentifier(request: ResolveTrustEntitiesRequest): Promise<Record<string, Array<ResolvedTrustEntity>>>;
    rollbackImport(): Promise<void>;
    runTask(task: string, params: string | undefined): Promise<string>;
    shareCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaShareResponse>;
    shareProof(proofId: string, params: ShareProofRequest): Promise<ShareProofResponse>;
    shareProofSchema(proofSchemaId: string): Promise<ProofSchemaShareResponse>;
    uninitialize(deleteData: boolean): Promise<void>;
    unpackBackup(password: string, inputPath: string): Promise<Metadata>;
    updateRemoteTrustEntity(request: UpdateRemoteTrustEntityRequest): Promise<void>;
    upsertOrganisation(request: UpsertOrganisationRequest): Promise<void>;
    version(): Version;
}
