import React, { Component } from 'react'
import Grid from './Grid';
import ModalClient from './ModalClient'
import ModalBTN from './ModalBtn'
import API from './Helper/API'
import Alert from './Alert'
import Utils from './Helper/Utils';
import Loading from './Loading'
import moment from 'moment'
export default class Clientes extends Component {

    constructor() {
        super();
        this.state = {
            nome: {value: '', valid: ''},
            nascimento: {value: '', valid: ''},
            cpf: {value: '', valid: ''},
            telefone: {value: '', valid: ''},
            email: {value: '', valid: '', error: ''},
            clientSearch : {value: ''},
            searchMessageError: 'Não possuem clientes cadastrados na base de dados.',
            formErrors: {nome: '', nascimento: '', telefone: '', email: '', cpf: '', form: ''},
            clientes : [],
            submitIsDisabled: false,
            loaded: false,
            alert: {show: false, message: '', color: ''}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.handleSearch();
    }

    validateField(fieldName, value) {
        var fieldValidationErrors = this.state.formErrors;
        let rule, valid, rule_error
        
        switch(fieldName) {
          case 'email':
            rule = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            rule_error = rule ? '' : `O Email ${value} está inválido`
            break;
          case 'nome':
            rule = value.length >= 10;
            rule_error = rule ? '' : "Insira o nome completo, mínimo 10 caractéres"
            break;
        case 'telefone':
            let telArr = String(value).split('')
            rule = telArr[14] !== '_';
            rule_error = rule ? '' : 'Insira o telefone corretamente'
            break;
        case 'nascimento':
            rule = moment(value).isBetween('01/01/1920', moment());
            rule_error = rule ? '' : 'Insira uma data válida' 
            break;
        case 'cpf':
            rule = value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
            rule_error = rule ? '' : 'CPF Inválido'
            break;
          default:
            break;
        }

        valid = rule ? true: false
        fieldValidationErrors[fieldName] = rule_error
        let state = this.state;
        state[fieldName].valid = valid; 
        state[fieldName].error = rule_error; 
        this.setState({formErrors: fieldValidationErrors, ...state}, this.validateForm);
      }

      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }

    handleChange(e) {
        let target = e.target.name
        let value = e.target.value
        let state = this.state;
        state[target].value = value; 
        this.setState(state, () => {this.validateField(target, value)})
    }

   async handleSearch(e = null, criteria = ''){
       let search = ''
       if(e){ e.preventDefault()}
       if(criteria !== ''){
           search = `search/${criteria}`
       }
        try {
            const clientes = await API.get(`/cliente/${search}`);
            this.setState({clientes: clientes.data, loaded: true, searchMessageError: `Não foi possível encontrar ${criteria} na base de dados`});
        } catch {
            console.log('Nao foi possível se conectar a API')
        }
    }

    handleRemove(cliente){
        let cpf = window.prompt(`Para confirmar a remoção insira o CPF de ${cliente.nome}`)
        if(cpf === cliente.cpf){
            API.delete(`/cliente/${cliente.id}`).then(data => {
                window.location.reload();
            }).catch(err => {
                window.location.reload();
            })
        } else {
            alert("CPF Inválido !");
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if(Utils.validateForm(this.state)){
            this.setState({submitIsDisabled: true});
            API.post(`/cliente`, Utils.ClientData(this.state)).then(data => {
                alert("Cliente Cadastrado!");
                window.location.reload();
            }).catch(err => {
                alert("Erro ao cadastrar Cliente... Tente novamente");
                this.setState({submitIsDisabled: false});
            })
        } else {
            this.setState({submitIsDisabled: false, formErrors: {form: "Preencha o formulário corretamente"}})
        }
    }

    render() {
        return (
            <div>
                <Grid cols="12">
                    <div className="jumbotron">
                        <h3 className="display-5">Bem vindo, {Utils.getUser()}</h3>
                        <p className="lead">A partir dessa página você poderá gerenciar o perfil dos clientes, cadastrar, remover e altera-los.</p>
                    </div>
                </Grid>
                <Grid cols="12 12 6">
                    <div className="row">
                    <Grid cols="10">
                        <ModalBTN color="primary" icon="user" text="Novo Cliente" id="client" /> <br /> <br />
                    </Grid>
                    <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" value={this.state.clientSearch.value} name="clientSearch" onChange={this.handleChange} className="form-control col-md-12" placeholder="ex: Cirilo"/>
                    </div>
                    <button onClick={(e) => this.handleSearch(e, this.state.clientSearch.value)}  className="btn btn-primary mb-2">Buscar</button>
                    </form>
                    
                    </div>
                    {
                        this.state.loaded ? <div>
                        {
                            this.state.clientes.length > 0 ? 
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Primeiro Nome</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{Utils.getFirstName(cliente.nome)}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                    <button onClick={() => Utils.Redirect(`clientes/${cliente.id}`)} className="btn btn-info" title="Visualizar Cliente"><i className="fa fa-user"></i></button> &ensp;
                                    <button data-toggle="tooltip" data-placement="top" onClick={() => this.handleRemove(cliente)} className="btn btn-danger" title="Remover"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        :
                        <Alert color="info" title="Oops..." icon="exclamation-triangle" text="Não possuem usuários cadastrados...">
                            <p>{this.state.searchMessageError}</p>
                        </Alert>
                        }
                    </div> : <Loading/>
                    }
                    
                </Grid>
                <ModalClient data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} id="client" title="Novo Cliente" />
            </div>
        )
    }
} 