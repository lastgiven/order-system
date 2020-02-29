import React from 'react';
import ReactDOM from 'react-dom';

import indexRoutes from "./routes/defaultRoutes";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// import * as serviceWorker from './serviceWorker';
import './assets/scss/index.scss';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './utils/api'

const hist = createBrowserHistory();


ReactDOM.render(
	<ApolloProvider client={client}>
		<Router history={hist}>
			<Switch>
				{indexRoutes.map((prop, key) => {
					return <Route path={prop.path} component={prop.component} key={key} />;
				})}
			</Switch>
		</Router>
	</ApolloProvider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
