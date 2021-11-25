import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './ReactPages/Login';
import Game from './ReactPages/Game';
import Config from './ReactPages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/config" component={ Config } />
    </Switch>
  );
}
