import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';

import reducer from './reducer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middlewares = [
    routerMiddleware(history),
    apiMiddleware,
];

const masterReducer = combineReducers({
    data: reducer,
    router: routerReducer,
    form: formReducer,
});

// if (process.env.NODE_ENV === 'dev') {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
// }

// Link in with the Redux dev tools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);

export const store = createStoreWithMiddleware(masterReducer);
