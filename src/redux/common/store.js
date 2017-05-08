import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import logger from 'redux-logger';

import reducer from './reducer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [logger, routerMiddleware(history)];

// Link in with the Redux dev tools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);
