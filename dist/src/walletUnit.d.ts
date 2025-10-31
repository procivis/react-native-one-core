import { KeyListItem } from "./key";
export declare enum WalletProviderTypeEnum {
    PROCIVIS_ONE = "PROCIVIS_ONE"
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
