import React from 'react'

export default props => <button className={`btn btn-${props.color}`} data-toggle="modal" data-target={`#${props.id}`} ><i className={`fa fa-${props.icon}`}></i> {props.text} </button>

