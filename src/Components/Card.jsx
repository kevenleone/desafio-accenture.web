import React from 'react'

export default props => (
    <div className="card border-primary mb-3" style={{ maxWidth: props.length }}>
    <div className="card-header">{props.header}</div>
    <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text">
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
</div>
  
)   