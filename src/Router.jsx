import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import Clientes from './Components/Clientes'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/clientes" component={Clientes} />
        </Switch>
    </BrowserRouter>
)