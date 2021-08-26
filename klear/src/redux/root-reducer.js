import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import layoutReducer from './base/layout/layout.reducer';
import datagridReducer from "./base/datagrid/datagrid.reducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['layout', 'datagrid']
};

const rootReducer = combineReducers({
    layout: layoutReducer,
    datagrid: datagridReducer
});

export default persistReducer(persistConfig, rootReducer);