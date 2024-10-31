import { BackupCreate, ImportBackupMetadata, UnexportableEntities } from "./backup";
import { Config } from "./config";
import { CredentialDetail, CredentialListItem, CredentialListQuery, CredentialRevocationCheckResponse, InvitationResultCredentialIssuance } from "./credential";
import { CredentialSchema, CredentialSchemaDetail, CredentialSchemaListQuery, ImportCredentialSchemaRequest, ShareCredentialSchemaResponse } from "./credentialSchema";
import { DidListItem, DidListQuery, DidRequest } from "./did";
import { HistoryListItem, HistoryListQuery } from "./history";
import { KeyCheckCertificateRequestBindingDto, KeyListItem, KeyRequest } from "./key";
import { ItemList } from "./list";
import { CreateProofRequest, InvitationResultProofRequest, PresentationDefinition, PresentationDefinitionRequestedCredential, PresentationSubmitCredentialRequest, ProofDetail, ProofListItem, ProofListQuery, ProposeProofResponse, ShareProofResponse } from "./proof";
import { CreateProofSchemaRequest, ImportProofSchemaRequest, ProofSchema, ProofSchemaListItem, ProofSchemaListQuery, ShareProofSchemaResponse } from "./proofSchema";
import { CreateTrustAnchorRequest, TrustAnchor, TrustAnchorListItem, TrustAnchorListQuery } from "./trust";
export * from "./backup";
export * from "./config";
export * from "./credential";
export * from "./credentialSchema";
export * from "./did";
export * from "./history";
export * from "./key";
export * from "./list";
export * from "./proof";
export * from "./proofSchema";
export * from "./trust";
export interface Version {
    target: string;
    buildTime: string;
    branch: string;
    tag: string;
    commit: string;
    rustVersion: string;
    pipelineId: string;
}
export type InvitationResult = InvitationResultCredentialIssuance | InvitationResultProofRequest;
export interface ResolveJsonLdContextResponse {
    context: string;
}
export interface ONECore {
    getVersion(): Promise<Version>;
    getConfig(): Promise<Config>;
    createOrganisation(uuid: string | undefined): Promise<string>;
    generateKey(keyRequest: KeyRequest): Promise<string>;
    createDid(didRequest: DidRequest): Promise<string>;
    getDids(query: DidListQuery): Promise<ItemList<DidListItem>>;
    handleInvitation(url: string, organisationId: string, transport: string[] | undefined): Promise<InvitationResult>;
    holderAcceptCredential(interactionId: InvitationResultCredentialIssuance["interactionId"], didId: string, keyId: string | undefined, txCode: string | undefined): Promise<void>;
    holderRejectCredential(interactionId: InvitationResultCredentialIssuance["interactionId"]): Promise<void>;
    getPresentationDefinition(proofId: ProofDetail["id"]): Promise<PresentationDefinition>;
    holderRejectProof(interactionId: InvitationResultProofRequest["interactionId"]): Promise<void>;
    holderSubmitProof(interactionId: InvitationResultProofRequest["interactionId"], credentials: Record<PresentationDefinitionRequestedCredential["id"], PresentationSubmitCredentialRequest>, didId: string, keyId: string | undefined): Promise<void>;
    getCredentials(query: CredentialListQuery): Promise<ItemList<CredentialListItem>>;
    runTask(task: string): Promise<string>;
    checkCertificate(keyId: KeyListItem["id"], certificate: KeyCheckCertificateRequestBindingDto): Promise<void>;
    deleteProofClaims(proofId: ProofDetail["id"]): Promise<void>;
    getCredential(credentialId: CredentialListItem["id"]): Promise<CredentialDetail>;
    deleteCredential(credentialId: CredentialListItem["id"]): Promise<void>;
    importCredentialSchema(request: ImportCredentialSchemaRequest): Promise<CredentialSchema["id"]>;
    getCredentialSchema(credentialSchemaId: CredentialSchema["id"]): Promise<CredentialSchemaDetail>;
    getCredentialSchemas(query: CredentialSchemaListQuery): Promise<ItemList<CredentialSchema>>;
    deleteCredentialSchema(credentialSchemaId: CredentialSchema["id"]): Promise<void>;
    createProof(request: CreateProofRequest): Promise<ProofDetail["id"]>;
    shareProof(proofId: ProofDetail["id"]): Promise<ShareProofResponse>;
    shareProofSchema(proofSchemaId: ProofSchema["id"]): Promise<ShareProofSchemaResponse>;
    shareCredentialSchema(credentialSchemaId: CredentialSchema["id"]): Promise<ShareCredentialSchemaResponse>;
    getProof(proofId: ProofDetail["id"]): Promise<ProofDetail>;
    getProofs(query: ProofListQuery): Promise<ItemList<ProofListItem>>;
    retractProof(proofId: ProofDetail["id"]): Promise<ProofDetail["id"]>;
    proposeProof(exchange: string, organisationId: string): Promise<ProposeProofResponse>;
    createProofSchema(request: CreateProofSchemaRequest): Promise<ProofSchema["id"]>;
    getProofSchemas(query: ProofSchemaListQuery): Promise<ItemList<ProofSchemaListItem>>;
    getProofSchema(proofSchemaId: ProofSchema["id"]): Promise<ProofSchema>;
    deleteProofSchema(proofSchemaId: ProofSchema["id"]): Promise<void>;
    importProofSchema(request: ImportProofSchemaRequest): Promise<ProofSchema["id"]>;
    checkRevocation(credentialIds: Array<CredentialListItem["id"]>): Promise<CredentialRevocationCheckResponse[]>;
    createTrustAnchor(request: CreateTrustAnchorRequest): Promise<TrustAnchor["id"]>;
    getTrustAnchor(trustAnchorId: TrustAnchor["id"]): Promise<TrustAnchor>;
    getTrustAnchors(query: TrustAnchorListQuery): Promise<ItemList<TrustAnchorListItem>>;
    getHistory(query: HistoryListQuery): Promise<ItemList<HistoryListItem>>;
    getHistoryEntry(historyId: HistoryListItem["id"]): Promise<HistoryListItem>;
    createBackup(password: string, outputPath: string): Promise<BackupCreate>;
    backupInfo(): Promise<UnexportableEntities>;
    /**
     * Start import procedure
     *
     * This call will open the provided backup file, other subsequent function calls like {@link getCredentials} will return data from the imported package
     * After this successful call, either {@link finalizeImport} (to persist the changes) or {@link rollbackImport} (to revert to old data) must be called
     * @param {string} password User password matching selected during creation of the backup file
     * @param {string} inputPath Path to the stored backup file
     */
    unpackBackup(password: string, inputPath: string): Promise<ImportBackupMetadata>;
    /**
     * Persist unpacked backup
     *
     * This call will delete/overwrite the previously stored entries
     */
    finalizeImport(): Promise<void>;
    /**
     * Close unpacked backup
     *
     * This call will restore the old entries prior calling {@link unpackBackup}
     */
    rollbackImport(): Promise<void>;
    resolveJsonldContext(url: string): Promise<ResolveJsonLdContextResponse>;
    /**
     * Uninitialize the core instance
     *
     * Any following calls on this instance will fail.
     * A new core instance has to be initialized after.
     * @param {boolean} deleteData If true, also delete all data from the DB, otherwise data will be persisted for the next core instance
     */
    uninitialize(deleteData: boolean): Promise<void>;
}
