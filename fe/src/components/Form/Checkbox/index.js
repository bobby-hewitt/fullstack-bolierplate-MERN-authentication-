import React, { Component } from 'react'
import './style.css'
import '../style.css'



class Checkbox extends Component{
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount(){
		if (this.props.selected && this.props.selected.indexOf(this.props.value) > -1){
			document.getElementById('checkboxContainer' + this.props.name + this.props.value).checked= true
		}
	}

	onClick(e){
		if(this.props.error && !this.state.checked) {
			this.setState({ checked: false })
		} else {
			this.setState({ checked: !this.state.checked })
			this.props.onClick ? this.props.onClick(e) : null
		}
	}

	render(){
		return(
			 <label className="checkbox">
		    	<p className="checkboxContainer" >{this.props.label}</p>
		      	<input checked={this.state.checked} type="checkbox" onClick={this.onClick} name={this.props.name} value={this.props.value} id={'checkboxContainer' + this.props.name + this.props.value}/>
		      	<span></span>
		    </label>
		)
	}
}

export default Checkbox