import { KeyListItem } from "./key";
export declare enum WalletProviderTypeEnum {
    PROCIVIS_ONE = "PROCIVIS_ONE"
}
export declare enum WalletUnitStatusEnum {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    ERROR = "ERROR"
}
export interface WalletProvider {
    url: string;
    type: WalletProviderTypeEnum;
    name: string;
}
export interface HolderRegisterWalletUnitRequest {
    organisationId: string;
    walletProvider: WalletProvider;
    keyId: KeyListItem["id"];
}
export interface HolderRefreshWalletUnitRequest {
    organisationId: string;
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
