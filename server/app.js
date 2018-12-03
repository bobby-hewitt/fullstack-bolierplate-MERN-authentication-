require('dotenv').config({path: '.env'})
const cors = require('cors');
const express = require('express');
const app = express();
const UserRoutes = require('./routes/user');
const User = require('./models/user')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authenticateRequest = require('./helpers/authenticateRequest')
const LocalStrategy = require('passport-local').Strategy;
const PrivateRoutes = require('./routes/private');
const JwtStrategy = require('passport-jwt').Strategy;
const jwtExtractor = require('./helpers/jwtExtractor');
const bodyParser = require("body-parser")
//set up database
const db = require('./db');
//apply middleware
app.use(bodyParser());
app.use(cors())
app.use(cookieParser());
// Configure passport strategies
const options = {
 jwtFromRequest: jwtExtractor,
 passReqToCallback: true,
 secretOrKey: process.env.JWT_SECRET
}
passport.use('local', new LocalStrategy(User.authenticate()));
passport.use('jwt', new JwtStrategy(options, function(jwt_payload, user, done) {
    User.findOne({email: user.email}, function(err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
    });
}));

//configure private and public routes
//private routes
app.use(
    '/api', 
    function(req,res,next){
        authenticateRequest(req,res,next)
        .then((user) => {
            next()
        })
        .catch((err) => {
            res.status(403).send(err)
        })
    }, 
    PrivateRoutes
)

//public routes
app.use('/users', UserRoutes);

module.exports = app;