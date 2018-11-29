import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Clientes from './Components/Clientes'
import ClienteProfile from './Components/ClienteProfile'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/clientes" component={Clientes} />
            <Route exact path="/clientes/:id" component={ClienteProfile} />
        </Switch>
    </BrowserRouter>
)