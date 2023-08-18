import { CUSTOMER_ITEM, HOME_ITEM } from "./constant";
type HomeAction = { type: string, payload: {} | any };

const home_data = (home: any): HomeAction => ({
    type: HOME_ITEM,
    payload: home,
});
const home_customer_data = (home: any): HomeAction => ({
    type: CUSTOMER_ITEM,
    payload: home,
});
export {home_data,home_customer_data}