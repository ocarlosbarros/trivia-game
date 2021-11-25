import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Config from './ReactPages/Config';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/config" component={ Config } />
      </Switch>
      <header className="App-header">
        <button
          type="submit"
          data-testid="btn-settings"
        >
          <Link to="config">
            Configurações
          </Link>
        </button>
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Login />
      </header>
    </div>
  );
}
