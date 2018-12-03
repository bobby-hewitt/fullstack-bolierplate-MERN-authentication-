import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, {TextInput, FindAddress} from 'components/Form'
import { post, get, del,  } from 'helpers/request'
import { setUser } from 'actions/user'
import Button from 'components/Button'

class Register extends Component {

	constructor(props){
		super(props)
		this.state = {
			addressError: false,
			passwordError: false
		}
	}

	onSubmit(form){
		if (form.password !== form.confirmPassword){
			this.setState({passwordError: true})
		} else {
			this.props.loader.post('/users/reset', form)
			.then((data) => {
				window.localStorage.packagejwt = data.token
				this.props.setUser(data.user)
				this.props.push(this.props.authRoute)
			})
			.catch((err) => {
				if (err.responseJSON && err.responseJSON.incorrectEmail){
					this.setState({errorMessage: 'Incorrect email provided'})
				} else {
					this.setState({errorMessage: 'This link is not valid. Please try again', invalidLink:true})
				}
				
			})
		}
	}

	onTryAgain(){
		this.props.push('/auth/password-reset-request')
	}

	render(){
		return(
			<div>
				{this.state.errorMessage &&
					<p>{this.state.errorMessage}</p>
				}
				{!this.state.invalidLink && 
				<Form 
					submitText="Reset password"
					formId="reset"
					onSubmit={this.onSubmit.bind(this)}
				>
					<TextInput name="email" type="email" label={this.state.emailError ? this.state.emailError : null} fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="password" type="password" label={this.state.passwordError ? 'please enter matching passwords' : null}fieldError={this.state.passwordError} placeholder="password"/>
					<TextInput name="confirmPassword" type="password" fieldError={this.state.passwordError} placeholder="password"/>
					<TextInput name="token" type="hidden" value={window.location.pathname.split('/')[2]}/>
				</Form>
				}
				{this.state.invalidLink && 
					<div>
						
						<Button text="Try again" onClick={this.onTryAgain.bind(this)}/> 
					</div>
				}

			</div>
		)
	}
}

const mapStateToProps = state => ({
	authRoute: state.setup.authRoute,
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