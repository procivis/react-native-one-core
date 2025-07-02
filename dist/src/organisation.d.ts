export interface CreateOrganisationRequest {
    id?: string;
    name?: string;
}
export interface UpsertOrganisationRequest {
    id: string;
    name?: string;
    deactivate?: boolean;
}
