var User = require('../models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken')



exports.post = function (data) {
	return new Promise((resolve, reject) => {
		data.email = data.email.toLowerCase()
		let user = Object.assign({},data)
		delete user.password
		User.register(new User(user), data.password, function (err, user) {
			if (err) {
			  reject('Email already in use')
			} else {
			 	resolve(user)
			}
		});
	})
}



exports.get = function (data) {
	return new Promise((resolve, reject) => {
	    User.find(data, function (err, users) {
	        if (err) {
	        	reject('Could not find user')
	        } else {
	        	resolve(users)
	        }
	    });
	})
};

exports.put = function (req, res) {
	return new Promise((resolve, reject) => {
	    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
	        if (err) {
	        	reject("There was a problem updating the user.");
	        } else {
	        	resolve(user)
	        }
	    });
   	})
};

exports.delete = function (id) {
	return new Promise((resolve, reject) => {
		if (id === 'ALL'){
			User.deleteMany({}, function (err, user) {
		        if (err) {
		        	reject("There was a problem deleting the users.");
		        } else {
		        	resolve("All users were deleted");
		        }
	    	});
		} else {
			User.deleteOne({id: id}, function (err, user) {
		        if (err) {
		        	reject("There was a problem deleting the user.");
		        } else {
		        	resolve("User "+ user.name +" was deleted.");
		        }
		        
		    });
		}
	})
	
};