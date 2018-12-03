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
			addressError: false,
			emailError: false,
			passwordError: false
		}
	}

	componentDidMount(){
		// this.props.loader.del('/users/')
		// .then((data) => {
		// 	console.log(data)
		// })
		// get('/users/h')
		// .then((data) => {
		// 	console.log(data)
		// })
	}
	onSubmit(form){
		if (form.password !== form.confirmPassword){
			this.setState({passwordError: true})
		} else if (!form.email) {
			this.setState({emailError: true})
		} else {
			this.props.loader.post('/users', form)
			.then((data) => {
				window.localStorage.packagejwt = data.token
				this.props.setUser(data.user)
				this.props.push(this.props.authRoute)
			})
			.catch((err) => {
				if (err.responseText === 'Email already in use' ||err.responseText === 'A user with the given username is already registered'){
					this.setState({emailError: 'Email already in use'})
				} else {
					this.setState({emailError: 'Invalid email address'})
				}
				
			})
			this.setState({passwordError: false, emailError: false})
		}
	}
	render(){
		return(
			<div>
				<Form 
					submitText="Register"
					formId="register"
					onSubmit={this.onSubmit.bind(this)}
				>
					<FindAddress name="email" type="email" label={this.state.emailError ? this.state.emailError : null} fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="email" type="email" label={this.state.emailError ? this.state.emailError : null} fieldError={this.state.emailError} placeholder="email"/>
					<TextInput name="password" type="password" label={this.state.passwordError ? 'please enter matching passwords' : null}fieldError={this.state.passwordError} placeholder="password"/>
					<TextInput name="confirmPassword" type="password" fieldError={this.state.passwordError} placeholder="password"/>
				</Form>

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