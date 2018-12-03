import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, {TextInput, FindAddress} from 'components/Form'
import { post, get, del,  } from 'helpers/request'
import { setUser } from 'actions/user'

class Register extends Component {

	constructor(props){
		super(props)
		this.state = {

		}
	}

	onSubmit(form){
		this.props.loader.post('/users/passwordresetrequest', form)
		.then((data) => {
			this.setState({success: true})
			// this.props.setUser(data)
		})
		.catch((err) => {
			this.setState({success: false, errorMessage: 'Could not send reset instructions.  Please try again later'})
		})
		
	}
	render(){
		return(
			<div>
				{!this.state.success && this.state.errorMessage && 
					<p>{this.state.errorMessage}</p>
				}
				{!this.state.success &&
					<Form 
						submitText="Reset password"
						formId="resetPassword"
						onSubmit={this.onSubmit.bind(this)}
					>
						<TextInput name="email" type="email" label={this.state.emailError ? this.state.emailError : null} fieldError={this.state.emailError} placeholder="email"/>	
					</Form>
				}
				{this.state.success &&
					<p>An email has been sent to your email address.  Please follow the instructions to reset your password</p>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setUser
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)