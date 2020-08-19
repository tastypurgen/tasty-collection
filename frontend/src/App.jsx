import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewItem from './items/pages/NewItem';
import Header from './shared/Header';

export default function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route exact path="/items/add">
          <NewItem />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
