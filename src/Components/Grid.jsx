import React, { Component } from 'react'

export default class Grid extends Component {
    getCols(){
        let cols = String(this.props.cols)
        let col_splited = cols.split(" ")
        let grid = ''
        
        if(col_splited.length > 0){
            grid += col_splited[0] ? `col-lg-${col_splited[0]} ` : ''
            grid += col_splited[1] ? `col-md-${col_splited[1]} ` : ''
            grid += col_splited[2] ? `col-sm-${col_splited[2]} ` : ''
        } else {
            grid = 'col-lg-12'
        }
        
        return grid
    }

    render(){
        return (
            <div className={`${this.props.classes} ` + this.getCols()}>{this.props.children}</div>
        )
    }
}