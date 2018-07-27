import React, { Component } from 'react';
import logo from './logo.svg';
import Results from "./pages/Results";

import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Test</h1>
        <h1>Test_1</h1>
        <Results />
      </div>
    );
  }
}

export default App;
