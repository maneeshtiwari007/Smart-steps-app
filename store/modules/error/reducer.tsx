import { ERROR_406, ERROR_ITEAM } from "./constant";
const INIT_STATE = {
    error:null,
    error_406:null
};
type ErrorAction = { type: string, payload: {} | string };
type State = { error?: null | null, loading?: boolean,error_406?: null | null};
const ErrorReducer = (state: State = INIT_STATE, action: ErrorAction) => {
    switch (action.type) {
        case ERROR_ITEAM:
            return { ...state, error: action.payload, loading: false };
        case ERROR_406:
            return { ...state, error_406: action.payload, loading: false };
        default:
            return { ...state };
    }
}
export default ErrorReducer;