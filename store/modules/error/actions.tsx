import { ERROR_ITEAM } from "./constant";
type ErrorAction = { type: string, payload: {} | any };

const normal_error = (home: any): ErrorAction => ({
    type: ERROR_ITEAM,
    payload: home,
});
const error_406 = (home: any): ErrorAction => ({
    type: ERROR_ITEAM,
    payload: home,
});

export {normal_error,error_406}