import React from 'react'

export default props => (
    <div className={`alert alert-${props.color}`}>
        <strong><i className={`fa fa-${props.icon}`}></i> {props.title}</strong>
        {props.children}
    </div>
)