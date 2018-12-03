createEmail = require('./createEmail')
sendEmail = require('./sendEmail')


module.exports = function(action, data){
	switch(action){
		case 'password-reset':
			return constructPasswordReset(data, 'Reset your password')
		default:
		console.log('returned default in switch')
			return
	}
}

function constructPasswordReset(data, subject){
	let elements = [
		{
			type: 'body',
			content: {
				copy: [
					'You are receiving this because you (or someone else) have requested the reset of the password for your account',
			        'Please click on the following link to complete your password reset. This link will expire in 15 minutes.',
			        'If you did not request this, please ignore this email and your password will remain unchanged.'
				]
			}
		},
		{
			type: 'button',
			content: {
				copy: 'Reset Password',
				url: 'http://localhost:3000/password-reset/' + data.token 
			}
		}, 
		{
			type: 'footer',
			content: null
		}
	]
	createEmail(elements)
	.then((html) => {
		console.log(data.email)
		sendEmail(html, data.email, subject)
	}).catch((err) => {
		return res.status(500).send('error sending email', err)
	})
}

