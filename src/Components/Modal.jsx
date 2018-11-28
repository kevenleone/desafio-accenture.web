import React from 'react'

export default props => (
    <div className="modal fade" id={`${props.id}`} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <form onSubmit={props.handleSubmit} encType="multipart/form-data">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{props.title}</h4>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button onClick={props.handleSubmit} className="btn btn-primary">Save changes</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
)