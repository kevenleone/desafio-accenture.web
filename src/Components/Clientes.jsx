import React, { Component } from 'react'
import Grid from './Grid';
import Modal from './Modal'
import ModalBTN from './ModalBtn'
import API from './Helper/API'
import Alert from './Alert'

export default class Clientes extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            nascimento: '',
            cpf: '',
            telefone: '',
            email: '',
            formError: false,
            clientes : []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.handleSearch();
    }

    handleChange(e) {
        var target = e.target.name
        var value = e.target.value

        this.setState({
            [target]: value
        })
    }

    ClientData(){
        return {
            nome: this.state.nome,
            nascimento: this.state.nascimento,
            email: this.state.email,
            telefone: this.state.telefone,
            cpf: this.state.cpf
        }
    }

   async handleSearch(criteria = ''){
        try {
            const clientes = await API.get(`/cliente/${criteria}`);
            this.setState({clientes: clientes.data});
        } catch {
            console.log('Nao foi possível se conectar a API')
        }
    }

    handleRemove(cliente){
        if(window.confirm(`Tem certeza que deseja remover ${cliente.nome}?`)){
            API.delete(`/cliente/${cliente.id}`).then(data => {
                window.location.reload();
            }).catch(err => {
                alert("Erro ao remover cliente...");
            })
        }
        
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.nome, this.state.email, this.state.nascimento, this.state.cpf, this.state.telefone);

        if(this.validateForm()){
            API.post(`/cliente`, this.ClientData()).then(data => {
                alert("Cliente Cadastrado!");
                window.location.reload();
            }).catch(err => {
                alert("Erro ao cadastrar Cliente...");
                window.location.reload();
            })
        } else {
            console.log('Error validate...')
        }
    }

    isValid(data){
        if(data === "" || data === null || data === undefined){
            return false;
        } 

        return true;
    }

    validateForm(){
        if(this.isValid(this.state.nome) && this.isValid(this.state.email) && this.isValid(this.state.cpf) && this.isValid(this.state.nascimento) && this.isValid(this.state.email)){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div>
                <Grid cols="12">
                    <div className="jumbotron">
                        <h1 className="display-4">Bem vindo, Usuário...</h1>
                        <p className="lead">A partir dessa página você poderá gerenciar o perfil dos clientes, cadastrar, remover e altera-los.</p>
                    </div>
                </Grid>
                <Grid cols="12 12 6">
                    <ModalBTN text="Novo Cliente" id="client" /> <br /> <br />
                    {
                        this.state.clientes.length > 0 ? 
                        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome Completo</th>
                                <th>Idade</th>
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
                                <td>{cliente.nome}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>
                                <button className="btn btn-primary" title="Editar"><i className="fa fa-pencil"></i></button> &ensp;
                                <button onClick={() => this.handleRemove(cliente)} className="btn btn-danger" title="Remover"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    :
                    <Alert color="info" title="Oops..." icon="exclamation-triangle" text="Não possuem usuários cadastrados...">
                        <p>Não possuem clientes cadastrados na base de dados.</p>
                    </Alert>
                    }
                    
                </Grid>
                <Modal handleSubmit={this.handleSubmit} id="client" title="Novo Cliente">
                    <div className="col-md-12">
                        <div className="row">
                        <Grid classes="form-group" cols="6 6 12">
                        <label>Nome</label>
                            <input name="nome" value={this.state.nome} onChange={this.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="6 6 12">
                        <label>Endereço Email</label>
                            <input name="email" value={this.state.email} onChange={this.handleChange} type="email" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>CPF</label>
                            <input name="cpf" value={this.state.cpf} onChange={this.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Telefone</label>
                            <input name="telefone" value={this.state.telefone} onChange={this.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Nascimento</label>
                            <input name="nascimento" value={this.state.nascimento} onChange={this.handleChange} type="date" className="form-control"/>
                        </Grid>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}