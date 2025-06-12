export interface KeyRequest {
  organisationId: string;
  keyType: string;
  keyParams: Record<string, string>;
  name: string;
  storageType: string;
  storageParams: Record<string, string>;
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
