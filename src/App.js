import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Login />
      </header> */}
      <Header />
    </div>
  );
}
