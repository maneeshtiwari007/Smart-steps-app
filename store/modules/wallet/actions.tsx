import { IS_WALLET_CUSTOMER_DATA, WALLET_API_STATUS, WALLET_ITEM } from "./constant";
type WalletAction = { type: string, payload: null | any };

const wallet_data = (wallet: any): WalletAction => ({
    type: WALLET_ITEM,
    payload: wallet,
});
const wallet_data_status = (wallet: any): WalletAction => ({
    type: WALLET_API_STATUS,
    payload: wallet,
});
const is_wallet_customer = (wallet: boolean): WalletAction => ({
    type: IS_WALLET_CUSTOMER_DATA,
    payload: wallet,
});
export { wallet_data,wallet_data_status,is_wallet_customer}