import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './redux/store';
import './App.css';

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>
);

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const NotFound = () => <h1>NotFound</h1>;

const App = () => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Links />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;