export interface BackupCreateBindingDto {
    historyId: string;
    file: string;
    unexportable: UnexportableEntitiesBindingDto;
}
export interface Cause {
    message: string;
}
export interface CertificateResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    state: CertificateStateBindingEnum;
    name: string;
    chain: string;
    key?: KeyListItemResponseBindingDto;
    x509Attributes: CertificateX509AttributesBindingDto;
}
export interface CertificateX509AttributesBindingDto {
    serialNumber: string;
    notBefore: string;
    notAfter: string;
    issuer: string;
    subject: string;
    fingerprint: string;
    extensions: Array<CertificateX509ExtensionBindingDto>;
}
export interface CertificateX509ExtensionBindingDto {
    oid: string;
    value: string;
    critical: boolean;
}
export interface CharacteristicBindingDto {
    uuid: string;
    permissions: Array<CharacteristicPermissionBindingEnum>;
    properties: Array<CharacteristicPropertyBindingEnum>;
}
export interface ClaimBindingDto {
    path: string;
    schema: CredentialClaimSchemaBindingDto;
    value: ClaimValueBindingDto;
}
export interface ConfigBindingDto {
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
export interface ContinueIssuanceResponseBindingDto {
    /** For reference. */
    interactionId: string;
    keyStorageSecurityLevels?: Array<KeyStorageSecurityBindingEnum>;
    keyAlgorithms?: Array<string>;
}
export interface CreateCaCsrRequestBindingDto {
    subject: KeyGenerateCsrRequestSubjectBindingDto;
}
export interface CreateCertificateAuthorityRequestBindingDto {
    name?: string;
    keyId: string;
    chain?: string;
    selfSigned?: CreateSelfSignedCertificateAuthorityRequestBindingDto;
}
export interface CreateCertificateRequestBindingDto {
    name?: string;
    chain: string;
    keyId: string;
}
export interface CreateIdentifierDidRequestBindingDto {
    name?: string;
    method: string;
    keys: DidRequestKeysBindingDto;
    params: Record<string, string>;
}
export interface CreateIdentifierKeyRequestBindingDto {
    keyId: string;
}
export interface CreateIdentifierRequestBindingDto {
    organisationId: string;
    name: string;
    /** Deprecated. Use the `key` field instead. */
    keyId?: string;
    key?: CreateIdentifierKeyRequestBindingDto;
    did?: CreateIdentifierDidRequestBindingDto;
    certificates?: Array<CreateCertificateRequestBindingDto>;
    certificateAuthorities?: Array<CreateCertificateAuthorityRequestBindingDto>;
}
export interface CreateOrganisationRequestBindingDto {
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
export interface CreateProofRequestBindingDto {
    proofSchemaId: string;
    verifierDidId?: string;
    verifierIdentifierId?: string;
    protocol: string;
    redirectUri?: string;
    verifierKey?: string;
    verifierCertificate?: string;
    scanToVerify?: ScanToVerifyRequestBindingDto;
    isoMdlEngagement?: string;
    transport?: Array<string>;
    profile?: string;
    engagement?: string;
}
export interface CreateProofSchemaClaimRequestDto {
    id: string;
    required: boolean;
}
export interface CreateProofSchemaRequestDto {
    name: string;
    organisationId: string;
    expireDuration: number;
    proofInputSchemas: Array<ProofInputSchemaRequestDto>;
}
export interface CreateRemoteTrustEntityRequestBindingDto {
    didId: string;
    trustAnchorId?: string;
    name: string;
    logo?: string;
    termsUrl?: string;
    privacyUrl?: string;
    website?: string;
    role: TrustEntityRoleBindingEnum;
}
export interface CreateSelfSignedCertificateAuthorityRequestBindingDto {
    content: CreateCaCsrRequestBindingDto;
    signer: string;
    validityStart?: string;
    validityEnd?: string;
}
export interface CreateTrustAnchorRequestBindingDto {
    name: string;
    type: string;
    isPublisher?: boolean;
    publisherReference?: string;
}
export interface CreateTrustEntityRequestBindingDto {
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleBindingEnum;
    trustAnchorId: string;
    didId?: string;
    type?: TrustEntityTypeBindingEnum;
    identifierId?: string;
    content?: string;
    organisationId: string;
}
export interface CredentialClaimSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    key: string;
    datatype: string;
    required: boolean;
    array: boolean;
    claims: Array<CredentialClaimSchemaBindingDto>;
}
export interface CredentialConfigurationSupportedResponseBindingDto {
    proofTypesSupported?: Record<string, OpenId4vciProofTypeSupportedBindingDto>;
}
export interface CredentialDetailBindingDto {
    id: string;
    createdDate: string;
    issuanceDate?: string;
    lastModified: string;
    revocationDate?: string;
    issuer?: GetIdentifierListItemBindingDto;
    holder?: GetIdentifierListItemBindingDto;
    state: CredentialStateBindingEnum;
    schema: CredentialSchemaBindingDto;
    claims: Array<ClaimBindingDto>;
    redirectUri?: string;
    role: CredentialRoleBindingDto;
    lvvcIssuanceDate?: string;
    suspendEndDate?: string;
    mdocMsoValidity?: MdocMsoValidityResponseBindingDto;
    protocol: string;
    profile?: string;
}
export interface CredentialListBindingDto {
    values: Array<CredentialListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface CredentialListItemBindingDto {
    id: string;
    createdDate: string;
    issuanceDate?: string;
    lastModified: string;
    revocationDate?: string;
    issuer?: string;
    state: CredentialStateBindingEnum;
    schema: CredentialSchemaBindingDto;
    role: CredentialRoleBindingDto;
    suspendEndDate?: string;
    protocol: string;
    profile?: string;
}
export interface CredentialListQueryBindingDto {
    page: number;
    pageSize: number;
    sort?: SortableCredentialColumnBindingEnum;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    profiles?: Array<string>;
    searchText?: string;
    searchType?: Array<SearchTypeBindingEnum>;
    exact?: Array<CredentialListQueryExactColumnBindingEnum>;
    roles?: Array<CredentialRoleBindingDto>;
    ids?: Array<string>;
    states?: Array<CredentialStateBindingEnum>;
    include?: Array<CredentialListIncludeEntityTypeBindingEnum>;
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
export interface CredentialQueryFailureHintResponseBindingDto {
    reason: CredentialQueryFailureReasonBindingEnum;
    credentialSchema?: CredentialSchemaDetailBindingDto;
}
export interface CredentialQueryResponseBindingDto {
    multiple: boolean;
    credentialOrFailureHint: ApplicableCredentialOrFailureHintBindingEnum;
}
export interface CredentialRevocationCheckResponseBindingDto {
    credentialId: string;
    status: CredentialStateBindingEnum;
    success: boolean;
    reason?: string;
}
export interface CredentialSchemaBackgroundPropertiesBindingDto {
    color?: string;
    image?: string;
}
export interface CredentialSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod?: string;
    keyStorageSecurity?: KeyStorageSecurityBindingEnum;
    schemaId: string;
    layoutType?: LayoutTypeBindingEnum;
    importedSourceUrl: string;
    layoutProperties?: CredentialSchemaLayoutPropertiesBindingDto;
    allowSuspension: boolean;
    requiresWalletInstanceAttestation: boolean;
}
export interface CredentialSchemaCodePropertiesBindingDto {
    attribute: string;
    type: CredentialSchemaCodeTypeBindingDto;
}
export interface CredentialSchemaDetailBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod?: string;
    claims: Array<CredentialClaimSchemaBindingDto>;
    keyStorageSecurity?: KeyStorageSecurityBindingEnum;
    schemaId: string;
    importedSourceUrl: string;
    layoutType?: LayoutTypeBindingEnum;
    layoutProperties?: CredentialSchemaLayoutPropertiesBindingDto;
    allowSuspension: boolean;
    requiresWalletInstanceAttestation: boolean;
    transactionCode?: CredentialSchemaTransactionCodeBindingDto;
}
export interface CredentialSchemaLayoutPropertiesBindingDto {
    background?: CredentialSchemaBackgroundPropertiesBindingDto;
    logo?: CredentialSchemaLogoPropertiesBindingDto;
    primaryAttribute?: string;
    secondaryAttribute?: string;
    pictureAttribute?: string;
    code?: CredentialSchemaCodePropertiesBindingDto;
}
export interface CredentialSchemaListBindingDto {
    values: Array<CredentialSchemaBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface CredentialSchemaListQueryBindingDto {
    page: number;
    pageSize: number;
    organisationId: string;
    sort?: SortableCredentialSchemaColumnBindingEnum;
    sortDirection?: SortDirection;
    name?: string;
    ids?: Array<string>;
    exact?: Array<CredentialSchemaListQueryExactColumnBindingEnum>;
    include?: Array<CredentialSchemaListIncludeEntityType>;
    schemaId?: string;
    formats?: Array<string>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface CredentialSchemaLogoPropertiesBindingDto {
    fontColor?: string;
    backgroundColor?: string;
    image?: string;
}
export interface CredentialSchemaShareResponseBindingDto {
    url: string;
}
export interface CredentialSchemaTransactionCodeBindingDto {
    type: TransactionCodeTypeBindingEnum;
    length: number;
    description?: string;
}
export interface CredentialSetResponseBindingDto {
    required: boolean;
    options: Array<Array<string>>;
}
export interface DeviceInfoBindingDto {
    address: string;
    mtu: number;
}
export interface DidListBindingDto {
    values: Array<DidListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface DidListItemBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    did: string;
    didType: DidTypeBindingEnum;
    didMethod: string;
    deactivated: boolean;
}
export interface DidListQueryBindingDto {
    page: number;
    pageSize: number;
    sort?: SortableDidColumnBindingEnum;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    did?: string;
    type?: DidTypeBindingEnum;
    deactivated?: boolean;
    exact?: Array<ExactDidFilterColumnBindingEnum>;
    keyAlgorithms?: Array<string>;
    keyRoles?: Array<KeyRoleBindingEnum>;
    keyStorages?: Array<string>;
    keyIds?: Array<string>;
    didMethods?: Array<string>;
}
export interface DidRequestBindingDto {
    organisationId: string;
    name: string;
    didMethod: string;
    keys: DidRequestKeysBindingDto;
    params: Record<string, string>;
}
export interface DidRequestKeysBindingDto {
    authentication: Array<string>;
    assertionMethod: Array<string>;
    keyAgreement: Array<string>;
    capabilityInvocation: Array<string>;
    capabilityDelegation: Array<string>;
}
export interface DidResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId?: string;
    did: string;
    didType: DidTypeBindingEnum;
    didMethod: string;
    keys: DidResponseKeysBindingDto;
    deactivated: boolean;
}
export interface DidResponseKeysBindingDto {
    authentication: Array<KeyListItemResponseBindingDto>;
    assertionMethod: Array<KeyListItemResponseBindingDto>;
    keyAgreement: Array<KeyListItemResponseBindingDto>;
    capabilityInvocation: Array<KeyListItemResponseBindingDto>;
    capabilityDelegation: Array<KeyListItemResponseBindingDto>;
}
export interface ErrorResponseBindingDto {
    code: string;
    message: string;
    cause?: Cause;
}
export interface GeneratedKeyBindingDto {
    keyReference: number[];
    publicKey: number[];
}
export interface GetIdentifierBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId?: string;
    type: IdentifierTypeBindingEnum;
    isRemote: boolean;
    state: IdentifierStateBindingEnum;
    did?: DidResponseBindingDto;
    key?: KeyResponseBindingDto;
    certificates?: Array<CertificateResponseBindingDto>;
}
export interface GetIdentifierListBindingDto {
    values: Array<GetIdentifierListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface GetIdentifierListItemBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    type: IdentifierTypeBindingEnum;
    isRemote: boolean;
    state: IdentifierStateBindingEnum;
    organisationId?: string;
}
export interface GetProofSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    expireDuration: number;
    proofInputSchemas: Array<ProofInputSchemaBindingDto>;
    importedSourceUrl?: string;
}
export interface GetProofSchemaListItemBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    deletedAt?: string;
    name: string;
    expireDuration: number;
}
export interface GetRemoteTrustEntityResponseBindingDto {
    id: string;
    organisationId?: string;
    createdDate: string;
    lastModified: string;
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleBindingEnum;
    trustAnchor: GetTrustAnchorResponseBindingDto;
    did?: DidListItemBindingDto;
    state: TrustEntityStateBindingEnum;
}
export interface GetTrustAnchorResponseBindingDto {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    type: string;
    isPublisher: boolean;
    publisherReference: string;
}
export interface GetTrustEntityResponseBindingDto {
    id: string;
    organisationId?: string;
    createdDate: string;
    lastModified: string;
    name: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    privacyUrl?: string;
    role: TrustEntityRoleBindingEnum;
    trustAnchor: GetTrustAnchorResponseBindingDto;
    did?: DidListItemBindingDto;
    state: TrustEntityStateBindingEnum;
    entityKey: string;
    type: TrustEntityTypeBindingEnum;
    identifier?: GetIdentifierListItemBindingDto;
    content?: string;
    ca?: TrustEntityCertificateResponseBindingDto;
}
export interface HandleInvitationRequestBindingDto {
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
export interface HistoryErrorMetadataBindingDto {
    errorCode: string;
    message: string;
}
export interface HistoryListBindingDto {
    values: Array<HistoryListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface HistoryListItemBindingDto {
    id: string;
    createdDate: string;
    action: HistoryActionBindingEnum;
    name: string;
    entityId?: string;
    entityType: HistoryEntityTypeBindingEnum;
    metadata?: HistoryMetadataBinding;
    organisationId?: string;
    target?: string;
    user?: string;
}
export interface HistoryListQueryBindingDto {
    page: number;
    pageSize: number;
    organisationId: string;
    entityIds?: Array<string>;
    entityTypes?: Array<HistoryEntityTypeBindingEnum>;
    actions?: Array<HistoryActionBindingEnum>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    identifierId?: string;
    credentialId?: string;
    credentialSchemaId?: string;
    proofSchemaId?: string;
    search?: HistorySearchBindingDto;
    users?: Array<string>;
}
export interface HistorySearchBindingDto {
    text: string;
    type?: HistorySearchEnumBindingEnum;
}
export interface HolderAcceptCredentialRequestBindingDto {
    interactionId: string;
    didId?: string;
    identifierId?: string;
    keyId?: string;
    txCode?: string;
    holderWalletUnitId?: string;
}
export interface HolderRegisterWalletUnitRequestBindingDto {
    organisationId: string;
    /** Reference the `walletProvider` configuration of the Wallet Provider. */
    walletProvider: WalletProviderBindingDto;
    keyType: string;
}
export interface HolderWalletUnitResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    providerWalletUnitId: string;
    walletProviderUrl: string;
    walletProviderType: WalletProviderTypeBindingEnum;
    walletProviderName: string;
    status: WalletUnitStatusBindingEnum;
    authenticationKey: KeyListItemResponseBindingDto;
}
export interface IdentifierListQueryBindingDto {
    page: number;
    pageSize: number;
    sort?: SortableIdentifierColumnBindingEnum;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    types?: Array<IdentifierTypeBindingEnum>;
    states?: Array<IdentifierStateBindingEnum>;
    exact?: Array<ExactIdentifierFilterColumnBindingEnum>;
    didMethods?: Array<string>;
    isRemote?: boolean;
    keyAlgorithms?: Array<string>;
    keyRoles?: Array<KeyRoleBindingEnum>;
    keyStorages?: Array<string>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface ImportCredentialSchemaClaimSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    required: boolean;
    key: string;
    datatype: string;
    array?: boolean;
    claims?: Array<ImportCredentialSchemaClaimSchemaBindingDto>;
}
export interface ImportCredentialSchemaLayoutPropertiesBindingDto {
    background?: CredentialSchemaBackgroundPropertiesBindingDto;
    logo?: CredentialSchemaLogoPropertiesBindingDto;
    primaryAttribute?: string;
    secondaryAttribute?: string;
    pictureAttribute?: string;
    code?: CredentialSchemaCodePropertiesBindingDto;
}
export interface ImportCredentialSchemaRequestBindingDto {
    organisationId: string;
    schema: ImportCredentialSchemaRequestSchemaBindingDto;
}
export interface ImportCredentialSchemaRequestSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    format: string;
    revocationMethod: string;
    organisationId: string;
    claims: Array<ImportCredentialSchemaClaimSchemaBindingDto>;
    keyStorageSecurity?: KeyStorageSecurityBindingEnum;
    schemaId: string;
    importedSourceUrl: string;
    layoutType?: LayoutTypeBindingEnum;
    layoutProperties?: ImportCredentialSchemaLayoutPropertiesBindingDto;
    allowSuspension?: boolean;
    requiresWalletInstanceAttestation?: boolean;
    transactionCode?: ImportCredentialSchemaTransactionCodeBindingDto;
}
export interface ImportCredentialSchemaTransactionCodeBindingDto {
    type: TransactionCodeTypeBindingEnum;
    length: number;
    description?: string;
}
export interface ImportProofSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    organisationId: string;
    expireDuration: number;
    importedSourceUrl: string;
    proofInputSchemas: Array<ImportProofSchemaInputSchemaBindingDto>;
}
export interface ImportProofSchemaClaimSchemaBindingDto {
    id: string;
    requested: boolean;
    required: boolean;
    key: string;
    dataType: string;
    claims?: Array<ImportProofSchemaClaimSchemaBindingDto>;
    array: boolean;
}
export interface ImportProofSchemaCredentialSchemaBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    deletedAt?: string;
    name: string;
    format: string;
    revocationMethod?: string;
    keyStorageSecurity?: KeyStorageSecurityBindingEnum;
    schemaId: string;
    importedSourceUrl: string;
    layoutType?: LayoutTypeBindingEnum;
    layoutProperties?: CredentialSchemaLayoutPropertiesBindingDto;
    allowSuspension?: boolean;
    requiresWalletInstanceAttestation?: boolean;
}
export interface ImportProofSchemaInputSchemaBindingDto {
    claimSchemas: Array<ImportProofSchemaClaimSchemaBindingDto>;
    credentialSchema: ImportProofSchemaCredentialSchemaBindingDto;
    validityConstraint?: number;
}
export interface ImportProofSchemaRequestBindingsDto {
    schema: ImportProofSchemaBindingDto;
    organisationId: string;
}
export interface InitParamsDto {
    configJson?: string;
    nativeSecureElement?: NativeKeyStorage;
    remoteSecureElement?: NativeKeyStorage;
    bleCentral?: BleCentral;
    blePeripheral?: BlePeripheral;
    nfcHce?: NfcHce;
    nfcScanner?: NfcScanner;
}
export interface InitiateIssuanceAuthorizationDetailBindingDto {
    type: string;
    credentialConfigurationId: string;
}
export interface InitiateIssuanceRequestBindingDto {
    organisationId: string;
    protocol: string;
    issuer: string;
    clientId: string;
    redirectUri?: string;
    scope?: Array<string>;
    authorizationDetails?: Array<InitiateIssuanceAuthorizationDetailBindingDto>;
}
export interface InitiateIssuanceResponseBindingDto {
    url: string;
}
export interface KeyGenerateCsrRequestBindingDto {
    profile: KeyGenerateCsrRequestProfileBinding;
    subject: KeyGenerateCsrRequestSubjectBindingDto;
}
export interface KeyGenerateCsrRequestSubjectBindingDto {
    /** Two-letter country code. */
    countryName?: string;
    /** Common name to include in the CSR, typically the domain name of the organization. */
    commonName?: string;
    stateOrProvinceName?: string;
    organisationName?: string;
    localityName?: string;
    serialNumber?: string;
}
export interface KeyListItemBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    publicKey: number[];
    keyType: string;
    storageType: string;
}
export interface KeyListItemResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    name: string;
    publicKey: number[];
    keyType: string;
    storageType: string;
}
export interface KeyRequestBindingDto {
    organisationId: string;
    keyType: string;
    keyParams: Record<string, string>;
    name: string;
    storageType: string;
    storageParams: Record<string, string>;
}
export interface KeyResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    organisationId: string;
    name: string;
    publicKey: number[];
    keyType: string;
    storageType: string;
}
export interface ListProofSchemasFiltersBindingDto {
    page: number;
    pageSize: number;
    sort?: SortableProofSchemaColumnBinding;
    sortDirection?: SortDirection;
    organisationId: string;
    name?: string;
    exact?: Array<ProofSchemaListQueryExactColumnBinding>;
    ids?: Array<string>;
    formats?: Array<string>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface ListTrustAnchorsFiltersBindings {
    page: number;
    pageSize: number;
    sort?: SortableTrustAnchorColumnBindings;
    sortDirection?: SortDirection;
    name?: string;
    isPublisher?: boolean;
    type?: string;
    exact?: Array<ExactTrustAnchorFilterColumnBindings>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface ListTrustEntitiesFiltersBindings {
    page: number;
    pageSize: number;
    sort?: SortableTrustEntityColumnBindings;
    sortDirection?: SortDirection;
    name?: string;
    role?: TrustEntityRoleBindingEnum;
    trustAnchor?: string;
    didId?: string;
    organisationId?: string;
    types?: Array<TrustEntityTypeBindingEnum>;
    entityKey?: string;
    states?: Array<TrustEntityStateBindingEnum>;
    exact?: Array<ExactTrustEntityFilterColumnBindings>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
}
export interface MdocMsoValidityResponseBindingDto {
    expiration: string;
    nextUpdate: string;
    lastUpdate: string;
}
export interface MetadataBindingDto {
    dbVersion: string;
    dbHash: string;
    createdAt: string;
}
/** Optional messages to be displayed on (iOS) system overlay */
export interface NfcScanRequestBindingDto {
    inProgressMessage?: string;
    failureMessage?: string;
    successMessage?: string;
}
export interface OpenId4vciProofTypeSupportedBindingDto {
    proofSigningAlgValuesSupported: Array<string>;
}
export interface OpenId4vciTxCodeBindingDto {
    inputMode: OpenId4vciTxCodeInputModeBindingEnum;
    length?: number;
    description?: string;
}
export interface PeripheralDiscoveryDataBindingDto {
    deviceAddress: string;
    localDeviceName?: string;
    advertisedServices: Array<string>;
    advertisedServiceData?: Record<string, number[]>;
}
export interface PresentationDefinitionBindingDto {
    requestGroups: Array<PresentationDefinitionRequestGroupBindingDto>;
    credentials: Array<CredentialDetailBindingDto>;
}
export interface PresentationDefinitionFieldBindingDto {
    id: string;
    name?: string;
    purpose?: string;
    required: boolean;
    keyMap: Record<string, string>;
}
export interface PresentationDefinitionRequestGroupBindingDto {
    id: string;
    name?: string;
    purpose?: string;
    rule: PresentationDefinitionRuleBindingDto;
    requestedCredentials: Array<PresentationDefinitionRequestedCredentialBindingDto>;
}
export interface PresentationDefinitionRequestedCredentialBindingDto {
    id: string;
    name?: string;
    purpose?: string;
    fields: Array<PresentationDefinitionFieldBindingDto>;
    applicableCredentials: Array<string>;
    inapplicableCredentials: Array<string>;
    validityCredentialNbf?: string;
    multiple?: boolean;
}
export interface PresentationDefinitionRuleBindingDto {
    type: PresentationDefinitionRuleTypeBindingEnum;
    min?: number;
    max?: number;
    count?: number;
}
export interface PresentationDefinitionV2ClaimBindingDto {
    path: string;
    schema: CredentialClaimSchemaBindingDto;
    value: PresentationDefinitionV2ClaimValueBindingDto;
    userSelection: boolean;
    required: boolean;
}
export interface PresentationDefinitionV2CredentialDetailBindingDto {
    id: string;
    createdDate: string;
    issuanceDate?: string;
    lastModified: string;
    revocationDate?: string;
    issuer?: GetIdentifierListItemBindingDto;
    issuerCertificate?: CertificateResponseBindingDto;
    holder?: GetIdentifierListItemBindingDto;
    state: CredentialStateBindingEnum;
    schema: CredentialSchemaBindingDto;
    claims: Array<PresentationDefinitionV2ClaimBindingDto>;
    redirectUri?: string;
    role: CredentialRoleBindingDto;
    lvvcIssuanceDate?: string;
    suspendEndDate?: string;
    mdocMsoValidity?: MdocMsoValidityResponseBindingDto;
    protocol: string;
    profile?: string;
}
export interface PresentationDefinitionV2ResponseBindingDto {
    credentialQueries: Record<string, CredentialQueryResponseBindingDto>;
    credentialSets: Array<CredentialSetResponseBindingDto>;
}
export interface PresentationSubmitCredentialRequestBindingDto {
    credentialId: string;
    submitClaims: Array<string>;
}
export interface PresentationSubmitV2CredentialRequestBindingDto {
    credentialId: string;
    userSelections: Array<string>;
}
export interface ProofClaimSchemaBindingDto {
    id: string;
    requested: boolean;
    required: boolean;
    key: string;
    dataType: string;
    claims: Array<ProofClaimSchemaBindingDto>;
    array: boolean;
}
export interface ProofInputBindingDto {
    claims: Array<ProofRequestClaimBindingDto>;
    credential?: CredentialDetailBindingDto;
    credentialSchema: CredentialSchemaBindingDto;
    validityConstraint?: number;
}
export interface ProofInputSchemaBindingDto {
    claimSchemas: Array<ProofClaimSchemaBindingDto>;
    credentialSchema: CredentialSchemaBindingDto;
    validityConstraint?: number;
}
export interface ProofInputSchemaRequestDto {
    credentialSchemaId: string;
    validityConstraint?: number;
    claimSchemas: Array<CreateProofSchemaClaimRequestDto>;
}
export interface ProofListBindingDto {
    values: Array<ProofListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface ProofListItemBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    requestedDate?: string;
    completedDate?: string;
    verifier?: string;
    protocol: string;
    transport: string;
    engagement?: string;
    state: ProofStateBindingEnum;
    role: ProofRoleBindingEnum;
    schema?: GetProofSchemaListItemBindingDto;
    retainUntilDate?: string;
    profile?: string;
}
export interface ProofListQueryBindingDto {
    page: number;
    pageSize: number;
    organisationId: string;
    sort?: SortableProofListColumnBinding;
    sortDirection?: SortDirection;
    name?: string;
    profiles?: Array<string>;
    ids?: Array<string>;
    proofStates?: Array<ProofStateBindingEnum>;
    proofRoles?: Array<ProofRoleBindingEnum>;
    proofSchemaIds?: Array<string>;
    exact?: Array<ProofListQueryExactColumnBindingEnum>;
    createdDateAfter?: string;
    createdDateBefore?: string;
    lastModifiedAfter?: string;
    lastModifiedBefore?: string;
    requestedDateAfter?: string;
    requestedDateBefore?: string;
    completedDateAfter?: string;
    completedDateBefore?: string;
}
export interface ProofRequestClaimBindingDto {
    schema: ProofClaimSchemaBindingDto;
    value?: ProofRequestClaimValueBindingDto;
}
export interface ProofResponseBindingDto {
    id: string;
    createdDate: string;
    lastModified: string;
    verifier?: GetIdentifierListItemBindingDto;
    state: ProofStateBindingEnum;
    role: ProofRoleBindingEnum;
    proofSchema?: GetProofSchemaListItemBindingDto;
    protocol: string;
    engagement?: string;
    transport: string;
    redirectUri?: string;
    proofInputs: Array<ProofInputBindingDto>;
    retainUntilDate?: string;
    requestedDate?: string;
    completedDate?: string;
    claimsRemovedAt?: string;
    profile?: string;
}
export interface ProofSchemaListBindingDto {
    values: Array<GetProofSchemaListItemBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface ProofSchemaShareResponseBindingDto {
    url: string;
}
export interface ProposeProofRequestBindingDto {
    protocol: string;
    organisationId: string;
    engagement: Array<string>;
    uiMessage?: string;
}
export interface ProposeProofResponseBindingDto {
    proofId: string;
    interactionId: string;
    url?: string;
}
export interface ResolveJsonLdContextResponseBindingDto {
    context: string;
}
export interface ResolveTrustEntitiesRequestBindingDto {
    identifiers: Array<ResolveTrustEntityRequestBindingDto>;
}
export interface ResolveTrustEntityRequestBindingDto {
    id: string;
    certificateId?: string;
}
export interface ResolvedIdentifierTrustEntityResponseBindingDto {
    trustEntity: GetTrustEntityResponseBindingDto;
    certificateIds?: Array<string>;
}
export interface ScanToVerifyRequestBindingDto {
    credential: string;
    barcode: string;
    barcodeType: ScanToVerifyBarcodeTypeBindingEnum;
}
export interface ServiceDescriptionBindingDto {
    uuid: string;
    advertise: boolean;
    advertisedServiceData?: number[];
    characteristics: Array<CharacteristicBindingDto>;
}
export interface ShareProofRequestBindingDto {
    params?: ShareProofRequestParamsBindingDto;
}
export interface ShareProofRequestParamsBindingDto {
    clientIdScheme?: ClientIdSchemeBindingEnum;
}
export interface ShareProofResponseBindingDto {
    url: string;
    expiresAt?: string;
}
export interface TrustAnchorsListBindingDto {
    values: Array<TrustAnchorsListItemResponseBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface TrustAnchorsListItemResponseBindingDto {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    type: string;
    isPublisher: boolean;
    publisherReference: string;
    entities: number;
}
export interface TrustEntitiesListBindingDto {
    values: Array<TrustEntitiesListItemResponseBindingDto>;
    totalPages: number;
    totalItems: number;
}
export interface TrustEntitiesListItemResponseBindingDto {
    id: string;
    name: string;
    createdDate: string;
    lastModified: string;
    logo?: string;
    website?: string;
    termsUrl?: string;
    state: TrustEntityStateBindingEnum;
    privacyUrl?: string;
    role: TrustEntityRoleBindingEnum;
    trustAnchor: GetTrustAnchorResponseBindingDto;
    did?: DidListItemBindingDto;
}
export interface TrustEntityCertificateResponseBindingDto {
    state: CertificateStateBindingEnum;
    publicKey: string;
    commonName?: string;
    serialNumber: string;
    notBefore: string;
    notAfter: string;
    issuer: string;
    subject: string;
    fingerprint: string;
    extensions: Array<CertificateX509ExtensionBindingDto>;
}
export interface UnexportableEntitiesBindingDto {
    credentials: Array<CredentialDetailBindingDto>;
    keys: Array<KeyListItemBindingDto>;
    dids: Array<DidListItemBindingDto>;
    identifiers: Array<GetIdentifierListItemBindingDto>;
    totalCredentials: number;
    totalKeys: number;
    totalDids: number;
    totalIdentifiers: number;
}
export interface UpdateRemoteTrustEntityFromDidRequestBindingDto {
    didId: string;
    action?: TrustEntityUpdateActionBindingEnum;
    name?: string;
    logo?: string | null;
    website?: string | null;
    termsUrl?: string | null;
    privacyUrl?: string | null;
    role?: TrustEntityRoleBindingEnum;
}
export interface UpsertOrganisationRequestBindingDto {
    id: string;
    name?: string;
    deactivate?: boolean;
    walletProvider?: string | null;
    walletProviderIssuer?: string | null;
}
export interface VersionBindingDto {
    target: string;
    buildTime: string;
    branch: string;
    tag: string;
    commit: string;
    rustVersion: string;
    pipelineId: string;
}
export interface WalletProviderBindingDto {
    url: string;
    type: WalletProviderTypeBindingEnum;
}
export type ApplicableCredentialOrFailureHintBindingEnum = {
    type_: "APPLICABLE_CREDENTIALS";
    applicableCredentials: Array<PresentationDefinitionV2CredentialDetailBindingDto>;
} | {
    type_: "FAILURE_HINT";
    failureHint: CredentialQueryFailureHintResponseBindingDto;
};
export type BindingError = {
    type_: "ERROR_RESPONSE";
    data: ErrorResponseBindingDto;
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
export declare enum CacheTypeBindingDto {
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
export declare enum CertificateStateBindingEnum {
    NOT_YET_ACTIVE = "NOT_YET_ACTIVE",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED"
}
export declare enum CharacteristicPermissionBindingEnum {
    READ = "READ",
    WRITE = "WRITE"
}
export declare enum CharacteristicPropertyBindingEnum {
    READ = "READ",
    WRITE = "WRITE",
    NOTIFY = "NOTIFY",
    WRITE_WITHOUT_RESPONSE = "WRITE_WITHOUT_RESPONSE",
    INDICATE = "INDICATE"
}
export declare enum CharacteristicWriteTypeBindingEnum {
    WITH_RESPONSE = "WITH_RESPONSE",
    WITHOUT_RESPONSE = "WITHOUT_RESPONSE"
}
export type ClaimValueBindingDto = {
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
    value: Array<ClaimBindingDto>;
};
export declare enum ClientIdSchemeBindingEnum {
    REDIRECT_URI = "REDIRECT_URI",
    VERIFIER_ATTESTATION = "VERIFIER_ATTESTATION",
    DID = "DID",
    X509_SAN_DNS = "X509_SAN_DNS"
}
export type ConnectionEventBindingEnum = {
    type_: "CONNECTED";
    deviceInfo: DeviceInfoBindingDto;
} | {
    type_: "DISCONNECTED";
    deviceAddress: string;
};
export declare enum CredentialListIncludeEntityTypeBindingEnum {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES",
    CREDENTIAL = "CREDENTIAL"
}
export declare enum CredentialListQueryExactColumnBindingEnum {
    NAME = "NAME"
}
export declare enum CredentialQueryFailureReasonBindingEnum {
    NO_CREDENTIAL = "NO_CREDENTIAL",
    VALIDITY = "VALIDITY",
    CONSTRAINT = "CONSTRAINT"
}
export declare enum CredentialRoleBindingDto {
    HOLDER = "HOLDER",
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER"
}
export declare enum CredentialSchemaCodeTypeBindingDto {
    BARCODE = "BARCODE",
    MRZ = "MRZ",
    QR_CODE = "QR_CODE"
}
export declare enum CredentialSchemaListIncludeEntityType {
    LAYOUT_PROPERTIES = "LAYOUT_PROPERTIES"
}
export declare enum CredentialSchemaListQueryExactColumnBindingEnum {
    NAME = "NAME",
    SCHEMA_ID = "SCHEMA_ID"
}
export declare enum CredentialStateBindingEnum {
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
export declare enum DidTypeBindingEnum {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE"
}
export declare enum ExactDidFilterColumnBindingEnum {
    NAME = "NAME",
    DID = "DID"
}
export declare enum ExactIdentifierFilterColumnBindingEnum {
    NAME = "NAME"
}
export declare enum ExactTrustAnchorFilterColumnBindings {
    NAME = "NAME",
    TYPE = "TYPE"
}
export declare enum ExactTrustEntityFilterColumnBindings {
    NAME = "NAME"
}
export type HandleInvitationResponseBindingEnum = {
    type_: "CREDENTIAL_ISSUANCE";
    /** For reference. */
    interactionId: string;
    keyStorageSecurityLevels?: Array<KeyStorageSecurityBindingEnum>;
    keyAlgorithms?: Array<string>;
    /**
     * Metadata for entering a transaction code
     * If a pre-authorized code is issued with a transaction code object, the
     * wallet user must input a transaction code to receive the offered credential.
     * This code is typically sent through a separate channel such as SMS or email.
     */
    txCode?: OpenId4vciTxCodeBindingDto;
} | {
    type_: "AUTHORIZATION_CODE_FLOW";
    /** For reference. */
    interactionId: string;
    /**
     * For issuer-initiated Authorization Code Flows, use this URL to start
     * the authorization process with the authorization server.
     */
    authorizationCodeFlowUrl: string;
} | {
    type_: "PROOF_REQUEST";
    /** For reference. */
    interactionId: string;
    /** Proof request. */
    proofId: string;
};
export declare enum HistoryActionBindingEnum {
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
    INTERACTION_EXPIRED = "INTERACTION_EXPIRED"
}
export declare enum HistoryEntityTypeBindingEnum {
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
    STS_TOKEN = "STS_TOKEN",
    SIGNATURE = "SIGNATURE"
}
export type HistoryMetadataBinding = {
    type_: "UNEXPORTABLE_ENTITIES";
    value: UnexportableEntitiesBindingDto;
} | {
    type_: "ERROR_METADATA";
    value: HistoryErrorMetadataBindingDto;
} | {
    type_: "WALLET_UNIT_JWT";
    value: [string];
};
export declare enum HistorySearchEnumBindingEnum {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME",
    ISSUER_DID = "ISSUER_DID",
    ISSUER_NAME = "ISSUER_NAME",
    VERIFIER_DID = "VERIFIER_DID",
    VERIFIER_NAME = "VERIFIER_NAME",
    PROOF_SCHEMA_NAME = "PROOF_SCHEMA_NAME"
}
export declare enum IdentifierStateBindingEnum {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum IdentifierTypeBindingEnum {
    KEY = "KEY",
    DID = "DID",
    CERTIFICATE = "CERTIFICATE",
    CERTIFICATE_AUTHORITY = "CERTIFICATE_AUTHORITY"
}
export declare enum KeyGenerateCsrRequestProfileBinding {
    GENERIC = "GENERIC",
    MDL = "MDL",
    CA = "CA"
}
export declare enum KeyRoleBindingEnum {
    AUTHENTICATION = "AUTHENTICATION",
    ASSERTION_METHOD = "ASSERTION_METHOD",
    KEY_AGREEMENT = "KEY_AGREEMENT",
    CAPABILITY_INVOCATION = "CAPABILITY_INVOCATION",
    CAPABILITY_DELEGATION = "CAPABILITY_DELEGATION"
}
export declare enum KeyStorageSecurityBindingEnum {
    HIGH = "HIGH",
    MODERATE = "MODERATE",
    ENHANCED_BASIC = "ENHANCED_BASIC",
    BASIC = "BASIC"
}
export declare enum LayoutTypeBindingEnum {
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
export declare enum OpenId4vciTxCodeInputModeBindingEnum {
    NUMERIC = "NUMERIC",
    TEXT = "TEXT"
}
export declare enum PresentationDefinitionRuleTypeBindingEnum {
    ALL = "ALL",
    PICK = "PICK"
}
export type PresentationDefinitionV2ClaimValueBindingDto = {
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
    value: Array<PresentationDefinitionV2ClaimBindingDto>;
};
export declare enum ProofListQueryExactColumnBindingEnum {
    NAME = "NAME"
}
export type ProofRequestClaimValueBindingDto = {
    type_: "VALUE";
    value: string;
} | {
    type_: "CLAIMS";
    value: Array<ProofRequestClaimBindingDto>;
};
export declare enum ProofRoleBindingEnum {
    HOLDER = "HOLDER",
    VERIFIER = "VERIFIER"
}
export declare enum ProofSchemaListQueryExactColumnBinding {
    NAME = "NAME"
}
export declare enum ProofStateBindingEnum {
    CREATED = "CREATED",
    PENDING = "PENDING",
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    RETRACTED = "RETRACTED",
    ERROR = "ERROR",
    INTERACTION_EXPIRED = "INTERACTION_EXPIRED"
}
export declare enum ScanToVerifyBarcodeTypeBindingEnum {
    MRZ = "MRZ",
    PDF417 = "PDF417"
}
export declare enum SearchTypeBindingEnum {
    CLAIM_NAME = "CLAIM_NAME",
    CLAIM_VALUE = "CLAIM_VALUE",
    CREDENTIAL_SCHEMA_NAME = "CREDENTIAL_SCHEMA_NAME"
}
export declare enum SortDirection {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}
export declare enum SortableCredentialColumnBindingEnum {
    CREATED_DATE = "CREATED_DATE",
    SCHEMA_NAME = "SCHEMA_NAME",
    ISSUER = "ISSUER",
    STATE = "STATE"
}
export declare enum SortableCredentialSchemaColumnBindingEnum {
    NAME = "NAME",
    FORMAT = "FORMAT",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableDidColumnBindingEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    METHOD = "METHOD",
    TYPE = "TYPE",
    DID = "DID",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum SortableIdentifierColumnBindingEnum {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE",
    STATE = "STATE"
}
export declare enum SortableProofListColumnBinding {
    SCHEMA_NAME = "SCHEMA_NAME",
    VERIFIER = "VERIFIER",
    STATE = "STATE",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableProofSchemaColumnBinding {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE"
}
export declare enum SortableTrustAnchorColumnBindings {
    NAME = "NAME",
    CREATED_DATE = "CREATED_DATE",
    TYPE = "TYPE"
}
export declare enum SortableTrustEntityColumnBindings {
    NAME = "NAME",
    ROLE = "ROLE",
    LAST_MODIFIED = "LAST_MODIFIED",
    STATE = "STATE"
}
export declare enum TransactionCodeTypeBindingEnum {
    NUMERIC = "NUMERIC",
    ALPHANUMERIC = "ALPHANUMERIC"
}
export declare enum TrustEntityRoleBindingEnum {
    ISSUER = "ISSUER",
    VERIFIER = "VERIFIER",
    BOTH = "BOTH"
}
export declare enum TrustEntityStateBindingEnum {
    ACTIVE = "ACTIVE",
    REMOVED = "REMOVED",
    WITHDRAWN = "WITHDRAWN",
    REMOVED_AND_WITHDRAWN = "REMOVED_AND_WITHDRAWN"
}
export declare enum TrustEntityTypeBindingEnum {
    DID = "DID",
    /** certificate authority */
    CA = "CA"
}
export declare enum TrustEntityUpdateActionBindingEnum {
    ADMIN_ACTIVATE = "ADMIN_ACTIVATE",
    ACTIVATE = "ACTIVATE",
    WITHDRAW = "WITHDRAW",
    REMOVE = "REMOVE"
}
export declare enum WalletProviderTypeBindingEnum {
    PROCIVIS_ONE = "PROCIVIS_ONE"
}
export declare enum WalletUnitStatusBindingEnum {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    ERROR = "ERROR"
}
export interface BleCentral {
    isAdapterEnabled(): Promise<boolean>;
    startScan(filterServices: Array<string> | undefined): Promise<void>;
    stopScan(): Promise<void>;
    isScanning(): Promise<boolean>;
    writeData(peripheral: string, service: string, characteristic: string, data: number[], writeType: CharacteristicWriteTypeBindingEnum): Promise<void>;
    readData(peripheral: string, service: string, characteristic: string): Promise<number[]>;
    connect(peripheral: string): Promise<number>;
    disconnect(peripheral: string): Promise<void>;
    getDiscoveredDevices(): Promise<Array<PeripheralDiscoveryDataBindingDto>>;
    subscribeToCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
    unsubscribeFromCharacteristicNotifications(peripheral: string, service: string, characteristic: string): Promise<void>;
    getNotifications(peripheral: string, service: string, characteristic: string): Promise<Array<number[]>>;
}
export interface BlePeripheral {
    isAdapterEnabled(): Promise<boolean>;
    startAdvertisement(deviceName: string | undefined, services: Array<ServiceDescriptionBindingDto>): Promise<string | undefined>;
    stopAdvertisement(): Promise<void>;
    isAdvertising(): Promise<boolean>;
    setCharacteristicData(service: string, characteristic: string, data: number[]): Promise<void>;
    notifyCharacteristicData(deviceAddress: string, service: string, characteristic: string, data: number[]): Promise<void>;
    getConnectionChangeEvents(): Promise<Array<ConnectionEventBindingEnum>>;
    getCharacteristicWrites(device: string, service: string, characteristic: string): Promise<Array<number[]>>;
    waitForCharacteristicRead(device: string, service: string, characteristic: string): Promise<void>;
    stopServer(): Promise<void>;
}
export interface NativeKeyStorage {
    generateKey(keyAlias: string): Promise<GeneratedKeyBindingDto>;
    sign(keyReference: number[], message: number[]): Promise<number[]>;
    generateAttestationKey(keyAlias: string, nonce: string | undefined): Promise<GeneratedKeyBindingDto>;
    generateAttestation(keyReference: number[], nonce: string | undefined): Promise<Array<string>>;
    signWithAttestationKey(keyReference: number[], message: number[]): Promise<number[]>;
}
/** Provider of NFC host-card emulation (HCE) */
export interface NfcHce {
    isSupported(): Promise<boolean>;
    isEnabled(): Promise<boolean>;
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
    /** Check whether NFC scanning is supported on the device */
    isSupported(): Promise<boolean>;
    /** Check whether NFC adapter is enabled on the device (android only, iOS always enabled) */
    isEnabled(): Promise<boolean>;
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
    /**
     * Stops scanning previously started via `scan`
     * or disconnects the established session
     * * `error_message` - error UI message to display on the system NFC overlay (iOS)
     */
    cancelScan(errorMessage: string | undefined): Promise<void>;
    /** Send APDU request and wait for response APDU */
    transceive(commandApdu: number[]): Promise<number[]>;
}
export interface OneCoreBinding {
    backupInfo(): Promise<UnexportableEntitiesBindingDto>;
    checkRevocation(credentialIds: Array<string>, forceRefresh: boolean | undefined): Promise<Array<CredentialRevocationCheckResponseBindingDto>>;
    /**
     * For wallet-initiated flows, continues the OpenID4VCI issuance
     * process after completing authorization.
     *
     * * url - Starts with the `redirectUri` and is used to continue the
     * Authorization Code Flow issuance process. For example:
     * `myapp://example/credential-offer?code=xxx&clientId=myWallet&...`
     */
    continueIssuance(url: string): Promise<ContinueIssuanceResponseBindingDto>;
    createBackup(password: string, outputPath: string): Promise<BackupCreateBindingDto>;
    createDid(request: DidRequestBindingDto): Promise<string>;
    createIdentifier(request: CreateIdentifierRequestBindingDto): Promise<string>;
    createOrganisation(request: CreateOrganisationRequestBindingDto): Promise<string>;
    /** For verifiers, creates a proof request. */
    createProof(request: CreateProofRequestBindingDto): Promise<string>;
    createProofSchema(request: CreateProofSchemaRequestDto): Promise<string>;
    createRemoteTrustEntity(request: CreateRemoteTrustEntityRequestBindingDto): Promise<string>;
    createTrustAnchor(anchor: CreateTrustAnchorRequestBindingDto): Promise<string>;
    createTrustEntity(request: CreateTrustEntityRequestBindingDto): Promise<string>;
    deleteCache(types: Array<CacheTypeBindingDto> | undefined): Promise<void>;
    deleteCredential(credentialId: string): Promise<void>;
    deleteCredentialSchema(credentialSchemaId: string): Promise<void>;
    deleteIdentifier(id: string): Promise<void>;
    deleteProof(proofId: string): Promise<void>;
    deleteProofClaims(proofId: string): Promise<void>;
    deleteProofSchema(proofSchemaId: string): Promise<void>;
    deleteTrustAnchor(anchorId: string): Promise<void>;
    finalizeImport(): Promise<void>;
    generateKey(request: KeyRequestBindingDto): Promise<string>;
    getConfig(): Promise<ConfigBindingDto>;
    getCredential(credentialId: string): Promise<CredentialDetailBindingDto>;
    getCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaDetailBindingDto>;
    getCredentialSchemas(query: CredentialSchemaListQueryBindingDto): Promise<CredentialSchemaListBindingDto>;
    getCredentials(query: CredentialListQueryBindingDto): Promise<CredentialListBindingDto>;
    getDids(query: DidListQueryBindingDto): Promise<DidListBindingDto>;
    getHistoryEntry(historyId: string): Promise<HistoryListItemBindingDto>;
    getHistoryList(query: HistoryListQueryBindingDto): Promise<HistoryListBindingDto>;
    getIdentifier(id: string): Promise<GetIdentifierBindingDto>;
    getPresentationDefinition(proofId: string): Promise<PresentationDefinitionBindingDto>;
    getPresentationDefinitionV2(proofId: string): Promise<PresentationDefinitionV2ResponseBindingDto>;
    getProof(proofId: string): Promise<ProofResponseBindingDto>;
    getProofSchema(proofSchemaId: string): Promise<GetProofSchemaBindingDto>;
    getProofSchemas(filter: ListProofSchemasFiltersBindingDto): Promise<ProofSchemaListBindingDto>;
    getProofs(query: ProofListQueryBindingDto): Promise<ProofListBindingDto>;
    getRemoteTrustEntity(didId: string): Promise<GetRemoteTrustEntityResponseBindingDto>;
    getTrustAnchor(trustAnchorId: string): Promise<GetTrustAnchorResponseBindingDto>;
    getTrustEntity(trustEntityId: string): Promise<GetTrustEntityResponseBindingDto>;
    getTrustEntityByDid(didId: string): Promise<GetTrustEntityResponseBindingDto>;
    /**
     * For a wallet, handles the interaction once the wallet connects to a share
     * endpoint URL (for example, scans the QR code of an offered credential or
     * request for proof).
     */
    handleInvitation(request: HandleInvitationRequestBindingDto): Promise<HandleInvitationResponseBindingEnum>;
    /**
     * Accepts an offered credential. The system will generate a new
     * identifier that matches issuer's restrictions. Alternatively,
     * you can specify an existing identifier.
     */
    holderAcceptCredential(request: HolderAcceptCredentialRequestBindingDto): Promise<string>;
    holderGetWalletUnit(id: string): Promise<HolderWalletUnitResponseBindingDto>;
    /** Register with a Wallet Provider. */
    holderRegisterWalletUnit(request: HolderRegisterWalletUnitRequestBindingDto): Promise<string>;
    /** Rejects an offered credential. */
    holderRejectCredential(interactionId: string): Promise<void>;
    holderRejectProof(interactionId: string): Promise<void>;
    holderSubmitProof(interactionId: string, submitCredentials: Record<string, Array<PresentationSubmitCredentialRequestBindingDto>>): Promise<void>;
    holderSubmitProofV2(interactionId: string, submission: Record<string, Array<PresentationSubmitV2CredentialRequestBindingDto>>): Promise<void>;
    /**
     * Check status of wallet unit with the Wallet Provider. Will return an error
     * if the unit has been revoked.
     */
    holderWalletUnitStatus(id: string): Promise<void>;
    importCredentialSchema(request: ImportCredentialSchemaRequestBindingDto): Promise<string>;
    importProofSchema(request: ImportProofSchemaRequestBindingsDto): Promise<string>;
    /** For wallets, starts the OpenID4VCI Authorization Code Flow. */
    initiateIssuance(request: InitiateIssuanceRequestBindingDto): Promise<InitiateIssuanceResponseBindingDto>;
    listIdentifiers(query: IdentifierListQueryBindingDto): Promise<GetIdentifierListBindingDto>;
    listTrustAnchors(filters: ListTrustAnchorsFiltersBindings): Promise<TrustAnchorsListBindingDto>;
    listTrustEntities(filters: ListTrustEntitiesFiltersBindings): Promise<TrustEntitiesListBindingDto>;
    /** Scan NFC for ISO 18013-5 engagment */
    nfcReadIsoMdlEngagement(request: NfcScanRequestBindingDto): Promise<string>;
    /** Cancel previously started NFC scan via `nfc_read_iso_mdl_engagement` */
    nfcStopIsoMdlEngagement(): Promise<void>;
    /**
     * For wallets, initiates device engagement for offline flows. Reference
     * the `verificationEngagement` entry of your configuration for your
     * options for `engagement`.
     */
    proposeProof(request: ProposeProofRequestBindingDto): Promise<ProposeProofResponseBindingDto>;
    resolveJsonldContext(url: string): Promise<ResolveJsonLdContextResponseBindingDto>;
    resolveTrustEntityByIdentifier(request: ResolveTrustEntitiesRequestBindingDto): Promise<Record<string, Array<ResolvedIdentifierTrustEntityResponseBindingDto>>>;
    rollbackImport(): Promise<void>;
    runTask(task: string): Promise<string>;
    shareCredentialSchema(credentialSchemaId: string): Promise<CredentialSchemaShareResponseBindingDto>;
    shareProof(proofId: string, params: ShareProofRequestBindingDto): Promise<ShareProofResponseBindingDto>;
    shareProofSchema(proofSchemaId: string): Promise<ProofSchemaShareResponseBindingDto>;
    uninitialize(deleteData: boolean): Promise<void>;
    unpackBackup(password: string, inputPath: string): Promise<MetadataBindingDto>;
    updateRemoteTrustEntity(request: UpdateRemoteTrustEntityFromDidRequestBindingDto): Promise<void>;
    upsertOrganisation(request: UpsertOrganisationRequestBindingDto): Promise<void>;
    version(): VersionBindingDto;
}
