import React, { Component } from 'react'
import './Styles/login.css'
import Grid from './Grid'
import Utils from './Helper/Utils'
import API from './Helper/API'
export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            usuario: { value: '', valid: null, alert: '' },
            senha: { value: '', valid: null, alert: '' },
            isLogin: true,
            alertMsg: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.changePageType = this.changePageType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target.name
        let state = this.state;
        state[target].value = e.target.value;
        this.setState(state)
    }

    changePageType(e) {
        e.preventDefault()
        this.setState({ isLogin: !this.state.isLogin })
    }

    handleSubmit() {
        let data = { usuario: this.state.usuario.value, senha: this.state.senha.value }
        if (this.state.isLogin) {
            API.post('/auth/login', data).then(data => {
                let total = data.data.count
                if (total === 1) {
                    localStorage.setItem('user', data.data.rows[0].usuario)
                    localStorage.setItem('authenticated', true);
                    window.location.href = "/home"
                } else {
                    this.setState({alertMsg: "Usuário ou senha inválida"})
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            API.post('/auth/register', data).then(data => {
                console.log(data)
                localStorage.setItem('authenticated', true);
                // window.location.href = "/home"
            }).catch(err => {
                console.log(err);
            })
        }

    }


    render() {
        return (
            <Grid cols="12" classes="loginPanel">

                <div className="text-center">
                    <img alt="Accenture Logo" src="imgs/accenture.png" />
                </div>
                {
                    this.state.alertMsg !== '' ? <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <strong>Oops!</strong> {this.state.alertMsg} </div> : ''
                }
               
                <div className="form-group">
                    <input name="usuario" value={this.state.usuario.value} type="text" className={"form-control"} onChange={(e) => this.handleChange(e)} placeholder="Usuário" />
                    {
                        this.state.usuario.alert !== '' ? <div className="alert-error">{this.state.usuario.alert}</div> : ''
                    }

                </div>
                <div className="form-group valid">
                    <input name="senha" value={this.state.senha.value} type="password" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Senha" />
                    {
                        this.state.senha.alert !== '' ? <div className="alert-error">{this.state.senha.alert}</div> : ''
                    }
                </div>

                {
                    !this.state.isLogin ? <div className="form-group valid">
                        <input name="senha" value={this.state.senha.value} type="password" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Repita a Senha" />
                        {
                            this.state.senha.alert !== '' ? <div className="alert-error">{this.state.senha.alert}</div> : ''
                        }
                    </div> : ''
                }

                <button onClick={this.handleSubmit} className="btn btn-primary btn-block btn-lg"> {Utils.resolveNameLogin(this.state.isLogin)} </button> <br />
                {
                    this.state.isLogin ? <div className="text-center">Ainda não é cadastrado? <a href="/register" onClick={this.changePageType}>Cadastre-se</a></div>
                        : <div className="text-center">Já é cadastrado? <a href="/" onClick={this.changePageType}>Login</a></div>
                }

            </Grid>

        )
    }
}