import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './components/Login';
import Game from './ReactPages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
