import React from 'react'

export default props => <button className="btn btn-primary" data-toggle="modal" data-target={`#${props.id}`} ><i className="fa fa-user"></i> {props.text} </button>
