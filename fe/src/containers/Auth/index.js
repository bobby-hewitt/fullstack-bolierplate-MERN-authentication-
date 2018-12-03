import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Register from 'containers/Auth/Register'
import Login from 'containers/Auth/Login'
import PasswordResetRequest from 'containers/Auth/PasswordResetRequest'
import PasswordReset from 'containers/Auth/PasswordReset'
import { Route } from 'react-router'

import './style.scss'

class Auth extends Component {
	render(){
		return(
			<div className="auth">
				<Route exact path="/auth/register" component={Register} />
				<Route exact path="/auth/login" component={Login} />
				<Route exact path="/auth/password-reset-request" component={PasswordResetRequest} />
				<Route exact path="/auth/password-reset" component={PasswordReset} />
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)