import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const Home = () => <h1>Home</h1>;
const NotFound = () => <h1>NotFound</h1>;

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
