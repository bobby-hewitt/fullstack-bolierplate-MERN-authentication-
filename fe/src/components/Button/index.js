import React, { Component } from 'react'
import './style.scss'

export default class Button extends Component {
	render(){
		return(
			<div className="button" onClick={this.props.onClick.bind(this)}>
				{this.props.text}
			</div>
		)
	}
}