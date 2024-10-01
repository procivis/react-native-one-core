import { CredentialDetail } from "./credential";
import { DidListItem } from "./did";
import { HistoryListItem } from "./history";
import { KeyListItem } from "./key";

export interface UnexportableEntities {
  credentials: CredentialDetail[];
  keys: KeyListItem[];
  dids: DidListItem[];
  totalCredentials: number;
  totalKeys: number;
  totalDids: number;
}

export interface BackupCreate {
  historyId: HistoryListItem["id"];
  file: string;
  unexportable: UnexportableEntities;
}

export interface ImportBackupMetadata {
  dbVersion: string;
  dbHash: string;
  createdAt: string;
}
