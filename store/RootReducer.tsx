import { combineReducers } from 'redux'
import HomeReducer from './modules/home/reducer';
import ErrorReducer from './modules/error/reducer';
import WalletReducer from './modules/wallet/reducer';

const rootReducer = combineReducers({
    home:HomeReducer,
    error:ErrorReducer,
    wallet:WalletReducer
});

export default rootReducer;