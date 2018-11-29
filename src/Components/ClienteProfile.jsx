import React, { Component } from 'react'
import Grid from './Grid';
import API from './Helper/API'
import ModalBtn from './ModalBtn'
import ModalClient from './ModalClient'
import Utils from './Helper/Utils';

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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(e) {
        let target = e.target.name
        let state = this.state;
        state[target].value = e.target.value; 
        this.setState(state)
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
            this.setState({ cliente, nome:{value: cliente.nome}, nascimento: {value: cliente.nascimento}, cpf:{value: cliente.cpf}, email:{value: cliente.email}, telefone: { value: cliente.telefone} })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return (
            <div>
                <Grid cols="12 12 6">
                    <div className="jumbotron">
                        <h1 className="display-5">Cliente: {this.state.cliente.nome}!</h1>
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
                </Grid>
                <ModalClient data={this.state} handleChange={this.handleChange} handleSubmit={this.handleUpdate} id="edtClient" title="Novo Cliente" />
            </div>
        )
    }
}