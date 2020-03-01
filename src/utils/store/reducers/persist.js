import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import {
	persistReducer
} from 'redux-persist';

import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


//As we create more reducers we will have to add them in here
import data from './reducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: hardSet
}

export default (history) => persistReducer(persistConfig,  combineReducers({
	router: connectRouter(history),
	data
}));