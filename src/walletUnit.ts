import { KeyListItem } from "./key";

export enum WalletProviderTypeEnum {
  PROCIVIS_ONE = "PROCIVIS_ONE",
}

export enum WalletUnitStatusEnum {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  ERROR = "ERROR",
}

export interface WalletProvider {
  url: string;
  type: WalletProviderTypeEnum;
  name: string;
  appIntegrityCheckRequired: boolean;
}

export interface HolderRegisterWalletUnitRequest {
  organisationId: string;
  walletProvider: WalletProvider;
  keyType: KeyListItem["keyType"];
}

export interface HolderRegisterWalletUnitResponse {
  id: string;
  keyId: KeyListItem["id"];
}

export interface HolderRefreshWalletUnitRequest {
  organisationId: string;
  appIntegrityCheckRequired: boolean;
}

export interface HolderAttestationWalletUnitResponse {
  id: string;
  createdDate: string;
  lastModified: string;
  expirationDate: string;
  status: WalletUnitStatusEnum;
  attestation: string;
  walletUnitId: string;
  walletProviderUrl: string;
  walletProviderType: WalletProviderTypeEnum;
  walletProviderName: string;
}
