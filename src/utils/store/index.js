import {
	applyMiddleware,
	createStore,
	compose
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {
	persistStore
} from 'redux-persist';
import {
	createBrowserHistory
} from "history";

import rootReducer from './reducers/persist';

import { routerMiddleware } from 'connected-react-router';

const history = createBrowserHistory();

const reducer = rootReducer(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(promise, thunk, logger, routerMiddleware(history));


let store = createStore(reducer, composeEnhancers(middleware));
let persistor = persistStore(store);

store.subscribe(() => {
	console.log('store updated');
})

export {
	store,
	persistor
}
