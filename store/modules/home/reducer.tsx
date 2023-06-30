import { HOME_ITEM } from "./constant";
const INIT_STATE = {
    home: "",
    loading: false,
};
type HomeAction = { type: string, payload: {} | string };
type State = { home?: {} | null, loading?: boolean};
const HomeReducer = (state: State = INIT_STATE, action: HomeAction) => {
    switch (action.type) {
        case HOME_ITEM:
            return { ...state, home: action.payload, loading: false, error: null };
        default:
            return { ...state };
    }
}
export default HomeReducer;