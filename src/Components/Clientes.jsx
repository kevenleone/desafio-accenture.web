import React, { Component } from 'react'
import Grid from './Grid';
import ModalClient from './ModalClient'
import ModalBTN from './ModalBtn'
import API from './Helper/API'
import Alert from './Alert'
import Utils from './Helper/Utils';
import Loading from './Loading'
export default class Clientes extends Component {

    constructor() {
        super();
        this.state = {
            nome: {value: '', valid: true},
            nascimento: {value: '', valid: true},
            cpf: {value: '', valid: true},
            telefone: {value: '', valid: true},
            email: {value: '', valid: true},
            clientSearch : {value: ''},
            searchMessageError: 'Não possuem clientes cadastrados na base de dados.',
            formError: false,
            clientes : [],
            loaded: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.handleSearch();
    }
    
    handleChange(e) {
        let target = e.target.name
        let state = this.state;
        state[target].value = e.target.value; 
        this.setState(state)
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
        if(window.confirm(`Tem certeza que deseja remover ${cliente.nome}?`)){
            API.delete(`/cliente/${cliente.id}`).then(data => {
                window.location.reload();
            }).catch(err => {
                window.location.reload();
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.nome, this.state.email, this.state.nascimento, this.state.cpf, this.state.telefone);

        if(Utils.validateForm(this.state)){
            API.post(`/cliente`, Utils.ClientData(this.state)).then(data => {
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

    Goto(cliente){
        window.location.href = `clientes/${cliente.id}`
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
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                    <button onClick={() => this.Goto(cliente)} className="btn btn-info" title="Visualizar Cliente"><i className="fa fa-user"></i></button> &ensp;
                                    <button onClick={() => this.handleRemove(cliente)} className="btn btn-danger" title="Remover"><i className="fa fa-trash"></i></button>
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