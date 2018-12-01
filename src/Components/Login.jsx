import React, { Component } from 'react'
import './Styles/login.css'
import Grid from './Grid'
import Utils from './Helper/Utils'
import API from './Helper/API'
import Alert from './Alert'
export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            nome: { value: '', valid: null, alert: '' },
            usuario: { value: '', valid: null, alert: '' },
            senha: { value: '', valid: null, alert: '' },
            senha2: { value: ''},
            isLogin: true,
            alertMsg: '',
            alertMsgColor: 'danger',
            doubleCheckPass: true,
            submitIsDisabled: false
            
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
        var data = { usuario: this.state.usuario.value, senha: this.state.senha.value, nome: this.state.nome.value }
        let validateInputs = Utils.isValid(data.usuario) && Utils.isValid(data.senha)
        if (this.state.isLogin) {
            if(validateInputs){
                this.setState({submitIsDisabled: true});
                API.post('/auth/login', data).then(data => {
                    if (data.data.count === 1) {
                        Utils.setUserSession(data.data.rows[0])
                        Utils.Redirect('/inicio')
                    } else {
                        this.setState({alertMsg: "Usuário ou senha inválida", alertMsgColor: 'danger', submitIsDisabled: false})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({submitIsDisabled: true});
                })
            } else {
                this.setState({alertMsg: "Preencha Usuário e Senha!", alertMsgColor: 'danger'})                
            }
        } else { //register
            if(validateInputs){
                if(Utils.isValid(data.senha) && Utils.isValid(this.state.nome.value) && data.senha === this.state.senha2.value){
                    this.setState({submitIsDisabled: true});
                    API.post('/auth/register', data).then(data => {
                        this.setState({alertMsg: `Cadastro realizado com sucesso!`, alertMsgColor: 'success', isLogin: true, submitIsDisabled: false})                
                    }).catch(err => {
                        this.setState({alertMsg: "Usuário já existe, escolha outro!", alertMsgColor: 'danger', submitIsDisabled: false})                
                    })
                } else {
                     this.setState({doubleCheckPass:false, submitIsDisabled: false});
                }
            } else {
                this.setState({alertMsg: "Preencha os campos abaixo!", alertMsgColor: 'danger', doubleCheckPass: true})    
            }
        }
    }

    render() {
        return (
            <Grid cols="12" classes="loginPanel">
                <div className="text-center">
                    <img alt="Accenture Logo" src="imgs/accenture.png" />
                </div>
                {
                    this.state.alertMsg !== '' ? <Alert color={this.state.alertMsgColor}> {this.state.alertMsg} </Alert> : ''
                }
                 {
                    !this.state.isLogin ? <div className="form-group valid">
                        <input name="nome" value={this.state.nome.value} type="text" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Nome Completo" /> </div> : ''
                }
                <div className="form-group">
                    <input name="usuario" value={this.state.usuario.value} type="text" className={"form-control"} onChange={(e) => this.handleChange(e)} placeholder="Usuário" />
                </div>
                <div className="form-group">
                    <input name="senha" value={this.state.senha.value} type="password" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Senha" />
                </div>
                {
                    !this.state.isLogin ? <div className="form-group valid">
                        <input name="senha2" value={this.state.senha2.value} type="password" className="form-control" onChange={(e) => this.handleChange(e)} placeholder="Repita a Senha" />
                        {
                            !this.state.doubleCheckPass ? <div className="alert-error">As senhas informadas não são iguais</div> : ''
                        }
                    </div> : ''
                }
                <button onClick={this.handleSubmit} disabled={this.state.submitIsDisabled} className="btn btn-primary btn-block btn-lg"> {Utils.resolveNameLogin(this.state.isLogin)} </button> <br />
                {
                    this.state.isLogin ? <div className="text-center">Ainda não é cadastrado? <a href="/register" onClick={this.changePageType}>Cadastre-se</a></div>
                        : <div className="text-center">Já é cadastrado? <a href="/" onClick={this.changePageType}>Login</a></div>
                }
            </Grid>
        )
    }
}