import React from 'react'
import Grid from './Grid'

export default props => (
    <div className="modal fade" id={`${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <form className="need-validation" noValidate onSubmit={props.handleSubmit} encType="multipart/form-data">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{props.title}</h4>
                    </div>
                    <div className="modal-body">
                    <div className="col-md-12">
                        <div className="row">
                        <Grid classes="form-group" cols="6 6 12">
                        <label>Nome</label>
                            <input name="nome" value={props.data.nome.value} onChange={props.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="6 6 12">
                        <label>Endereço Email</label>
                            <input name="email" value={props.data.email.value} onChange={props.handleChange} type="email" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>CPF</label>
                            <input name="cpf" value={props.data.cpf.value} onChange={props.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Telefone</label>
                            <input name="telefone" value={props.data.telefone.value} onChange={props.handleChange} type="text" className="form-control"/>
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Nascimento</label>
                            <input name="nascimento" value={props.data.nascimento.value} onChange={props.handleChange} type="date" className="form-control"/>
                        </Grid>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
)