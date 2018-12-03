import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, {TextInput, FindAddress} from 'components/Form'
import { post, get, del,  } from 'helpers/request'
import { setUser } from 'actions/user'
import Button  from 'components/Button'

class Login extends Component {

	constructor(props){
		super(props)
		this.state = {
			addressError: false,
			emailError: false,
			passwordError: false
		}
	}
	
	onSubmit(form){
		console.log(this.props.loader)
		this.props.loader.post('/users/login', form)
		.then((data) => {
			console.log('data out', data)
			window.localStorage.packagejwt = data.token
			this.props.setUser(data.user)
			this.props.push(this.props.authRoute)
		})
		.catch((err) => {
			console.log('adta out error')
			this.setState({errorMessage: 'Invalid login details'})
		})
		this.setState({passwordError: false, emailError: false})
	}

	onResetPassword(){
		this.props.push('/auth/password-reset-request')
	}

	render(){
		return(
			<div>
				{this.state.errorMessage &&
					<p>{this.state.errorMessage}</p>
				}
				<Form 
					secondaryAction={this.onResetPassword.bind(this)}
					secondaryText="Reset password"
					formId="Login"
					onSubmit={this.onSubmit.bind(this)}
					submitText="Submit"
				>
					<TextInput name="username" type="email" fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="password" type="password" label={this.state.passwordError ? 'please enter matching passwords' : null}fieldError={this.state.passwordError} placeholder="password"/>
				</Form>
				
				
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	authRoute: state.setup.authRoute
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setUser
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)