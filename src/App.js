import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './ReactPages/Login';
import Game from './ReactPages/Game';
import Config from './ReactPages/Config';
import Feedback from './ReactPages/Feedback';
import Ranking from './ReactPages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
