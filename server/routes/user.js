var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const UserController = require('../controllers/userController')
var User = require('../models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const email = require('../email')


router.post('/', function (req, res) {
	UserController.post(req.body)
	.then((user) => {
		var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	    res.status(200).cookie('jwt', token).send({ token, user });
	})
	.catch((err) => {
		res.status(500).send(err)
	})  
});

// this is a helper function for dev.  Should be deleted
router.delete('/', function (req, res) {
	UserController.delete('ALL')
	.then((user) => {
		res.status(200).send(user)
	})
	.catch((err) => {
		res.status(500).send(err)
	})  
})


router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
	    if (err) return res.status(500).send('err');
	    else if (!user) return res.status(500).send('Invalid credentials')
	    else if (user) {
	     	var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	        res.status(200).cookie('jwt', token).send({ token, user });
	    }
	})(req,res,next);
})

router.post('/passwordresetrequest', (req, res, next) => {	
  	async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) return res.status(401).send('No account with that email address exists.')
        else {
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 900000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        }
      });
    },
    function(token, user, done) {
      let emailData = {
        email: user.email,
        token
      }
      console.log(emailData)
      email('password-reset', emailData)
      res.send('reset password email sent successfully.')
    }
  ]);
})

router.post('/reset', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(403).json({userFound: false, passwordsMatch: false, passwordReset: false})
        } 
        else if (user && user.email === req.body.email && req.body.password === req.body.confirmPassword){
        	user.setPassword(req.body.password, function(err) {
	            user.resetPasswordToken = undefined;
	            user.resetPasswordExpires = undefined;
	            user.save(function(err) {
	               	var token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET);      
	        		res.status(200).cookie('jwt', token).send({ token, user });
	        		done(err, user);
	            });
	        })

        } else if (user.email !== req.body.email){
        	console.log(user.email, req.body.email)
        	return res.status(403).json({userFound: true, passwordsMatch: false, passwordReset: false, incorrectEmail: true})
        }
        else {
            //passwords do not match
            return res.json({userFound: true, passwordsMatch: false, passwordReset: false})
        }
      });
    }], function(err) { 
  });
});


module.exports = router;