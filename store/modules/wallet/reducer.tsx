import { WALLET_API_STATUS,WALLET_ITEM } from "./constant";
const INIT_STATE = {
    data: {},
    loading: false,
};
type WalletAction = { type: string, payload: {} | string };
type State = { data?: {} | null, loading?: boolean};
const WalletReducer = (state: State = INIT_STATE, action: WalletAction) => {
    switch (action.type) {
        case WALLET_API_STATUS:
            return { ...state, loading: action.payload, error: null };
        case WALLET_ITEM:
            return { data: action.payload,loading:false, error: null };
        default:
            return { ...state };
    }
}
export default WalletReducer;