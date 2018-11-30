import React from 'react'
import Grid from './Grid'
import MaskedInput from 'react-maskedinput'
import Utils from './Helper/Utils'

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
                            <input name="nome" value={props.data.nome.value} onChange={props.handleChange} type="text" className={`form-control ${Utils.getClassValidation(props.data.nome.valid)}`}/>
                            {
                                !props.data.nome.valid ? <div className="alert-error">{props.data.nome.error}</div> : ''
                            }
                        </Grid>
                        <Grid classes="form-group" cols="6 6 12">
                        <label>Endereço Email</label>
                            <input name="email" value={props.data.email.value} onChange={props.handleChange} type="email" className={`form-control ${Utils.getClassValidation(props.data.email.valid)}`}/>
                            {
                                !props.data.email.valid ? <div className="alert-error">{props.data.email.error}</div> : ''
                            }
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>CPF</label>
                            <MaskedInput mask="111.111.111-11" value={props.data.cpf.value} className={`form-control ${Utils.getClassValidation(props.data.cpf.valid)}`}  name="cpf" onChange={props.handleChange}/>
                            {
                                !props.data.cpf.valid ? <div className="alert-error">{props.data.cpf.error}</div> : ''
                            }
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Telefone</label>
                            <MaskedInput mask="(11) 11111-1111" value={props.data.telefone.value} className={`form-control ${Utils.getClassValidation(props.data.telefone.valid)}`} name="telefone" onChange={props.handleChange}/>
                            {
                                !props.data.telefone.valid ? <div className="alert-error">{props.data.telefone.error}</div> : ''
                            }
                        </Grid>
                        <Grid classes="form-group" cols="4 6 12">
                        <label>Nascimento</label>
                            <input name="nascimento" value={props.data.nascimento.value} onChange={props.handleChange} type="date" className={`form-control ${Utils.getClassValidation(props.data.nascimento.valid)}`}/>
                            {
                               !props.data.nascimento.valid ? <div className="alert-error">{props.data.nascimento.error}</div> : ''
                            }

                        </Grid>
                        </div>
                        {
                            props.data.formErrors.form ? <div className="alert-error">Preencha todos os dados corretamente.</div> : ''
                        }
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" disabled={props.data.submitIsDisabled} className="btn btn-primary">Save changes</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
)