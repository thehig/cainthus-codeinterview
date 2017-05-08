import React from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from '../redux/common/store';
import Routes from '../routes';
import { Links } from '../components/index';

import './App.css';
const App = () => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Links />
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;