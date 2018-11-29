import React, { Component } from 'react'
import Utils from '../Helper/Utils'
export default class Header extends Component {

  constructor(){
    super();
    this.state = {
      isAuthenticated: false
    }

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount(){
    const isAuthenticated = localStorage.getItem('authenticated');
    this.setState({isAuthenticated});
  }

  doLogout(e){
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    window.location.href = "/"

  }

  render() {
    return (
      <div className="bs-component">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/home">Accenture</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
          {
              this.state.isAuthenticated ?
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <a className="nav-link" href="/home">Home<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clientes">Clientes</a>
            </li> 
          
            </ul>
           
            : ''
          }
          {
            this.state.isAuthenticated ? <div class=" form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <span className="nav-link">Bem vindo {Utils.getUser()}!</span>
            </li>
            <li className="nav-item">
              <a href="/logout" onClick={this.doLogout} className="nav-link">Logout</a>
            </li> 
          
            </ul>
          </div> : ''
          }
          </div>
        </nav>
      </div>
    )
  }
}

