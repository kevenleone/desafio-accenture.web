import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './Components/Home'
import Clientes from './Components/Clientes'
import ClienteProfile from './Components/ClienteProfile'
import Login from './Components/Login'

const Authenticated = () => {
    return localStorage.getItem('authenticated') || false;
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        Authenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}}></Redirect>
        )
    )} />
)

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <PrivateRoute exact path="/clientes" component={Clientes} />
            <PrivateRoute exact path="/clientes/:id" component={ClienteProfile} />
        </Switch>
    </BrowserRouter>
)