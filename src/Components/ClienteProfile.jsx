import React, { Component } from 'react'
import Grid from './Grid';
import API from './Helper/API'
import ModalBtn from './ModalBtn'
import ModalClient from './ModalClient'
import Utils from './Helper/Utils';
import Loading from './Loading'
import moment from 'moment'

export default class ClienteProfile extends Component {

    constructor() {
        super();
        this.state = {
            cliente : {},
            nome: {value: '', valid: true},
            nascimento: {value: '', valid: true},
            cpf: {value: '', valid: true},
            telefone: {value: '', valid: true},
            email: {value: '', valid: true},
            clientSearch : {value: ''},
            searchMessageError: 'Não possuem clientes cadastrados na base de dados.',
            formErrors: {nome: '', nascimento: '', telefone: '', email: '', cpf: '', form: ''},
            clientes : [],
            submitIsDisabled: false,
            loaded: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(e) {
        let target = e.target.name
        let value = e.target.value
        let state = this.state;
        state[target].value = value; 
        this.setState(state, () => {this.validateField(target, value)})
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

    handleUpdate(e){
        let id = this.props.match.params.id;
        e.preventDefault();

        if(Utils.validateForm(this.state)){
            API.put(`/cliente/${id}`, Utils.ClientData(this.state)).then(data => {
                alert("Cliente Atualizado!");
                window.location.reload();
            }).catch(err => {
                alert("Erro ao cadastrar Cliente...");
                window.location.reload();
            })
        } else {
            console.log('Error validate...')
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        API.get(`/cliente/${id}`).then(data => {
            let cliente = data.data
            this.setState({ cliente, loaded: true, nome:{value: cliente.nome, valid: true}, nascimento: {value: cliente.nascimento, valid: true}, cpf:{value: cliente.cpf, valid: true}, email:{value: cliente.email, valid: true}, telefone: { value: cliente.telefone, valid: true} })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.loaded ? <Grid cols="12 12 6">
                    <div className="jumbotron">
                        <h5>Cliente: {this.state.cliente.nome}!</h5>
                        <p className="lead">
                            <b>E-mail</b>: {this.state.cliente.email} <br />
                            <b>Idade:</b> {Utils.getAnoCliente(this.state.cliente.nascimento)} anos<br />
                            <b>Telefone</b>: {this.state.cliente.telefone} <br />
                            <b>CPF</b>: {this.state.cliente.cpf} <br />
                            <b>Cadastrado em</b>: {Utils.formatDate(this.state.cliente.createdAt, "DD/MM/YYYY - HH:mm")} <br />
                        </p>
                        <hr className="my-4" />
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="../clientes" role="button"><i className="fa fa-arrow-left"></i> Voltar</a> &ensp;&ensp;
                            <ModalBtn icon="pencil" color="info btn-lg" id="edtClient" text="Editar" />
                        </p>
                    </div>
                </Grid> : <Loading />
                }
               
                <ModalClient data={this.state} handleChange={this.handleChange} handleSubmit={this.handleUpdate} id="edtClient" title={`Atualização de dados de ${this.state.cliente.nome}`} />
            </div>
        )
    }
}