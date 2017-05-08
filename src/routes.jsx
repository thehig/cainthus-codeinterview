import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About, NotFound } from './components/index';
import { Home } from './containers/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;