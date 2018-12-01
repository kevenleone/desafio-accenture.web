import React from 'react'

export default props => (
    <div className={`alert ${props.dismiss ? 'alert-dismissible' : ''} alert-${props.color}`}>
        <strong><i className={`fa fa-${props.icon}`}></i> {props.title}</strong>
        {props.dismiss ? <button type="button" className="close" data-dismiss="alert">&times;</button> : ''}
        {props.children}
    </div>
)