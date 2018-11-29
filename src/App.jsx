import React, { Component } from 'react';
import Router from './Router' 
import Header from './Components/Template/Header'
import './Components/Styles/styleDefault.css'
import 'bootstrap/dist/js/bootstrap.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Router />
      </div>
    );
  }
}

export default App;
