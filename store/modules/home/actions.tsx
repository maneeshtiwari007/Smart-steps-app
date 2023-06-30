import { HOME_ITEM } from "./constant";
type HomeAction = { type: string, payload: {} | any };

export const home_data = (home: any): HomeAction => ({
    type: HOME_ITEM,
    payload: home,
});