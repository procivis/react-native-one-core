import { KeyListItem } from "./key";

export enum WalletProviderTypeEnum {
  PROCIVIS_ONE = "PROCIVIS_ONE",
}

export interface WalletProvider {
  url: string;
  type: WalletProviderTypeEnum;
}

export interface HolderRegisterWalletUnitRequest {
  organisationId: string;
  walletProvider: WalletProvider;
  keyType: KeyListItem["keyType"];
}

export interface HolderWalletUnitDetail {
  id: string;
  createdDate: string;
  lastModified: string;
  providerWalletUnitId: string;
  walletProviderUrl: string;
  walletProviderType: WalletProviderTypeEnum;
  walletProviderName: string;
  status: WalletUnitStatus;
  authenticationKey: KeyListItem;
}

export enum WalletUnitStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  ERROR = "ERROR",
}
