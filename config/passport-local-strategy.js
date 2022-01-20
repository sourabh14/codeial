const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport.js
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        // Find the user and establish the identity
        User.findOne({email: email}, function(err, user) {
            if (err) { 
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            
            if (!user) {
                return done(null, false, { messages: 'Email doesnt exists!' });
            }
            if (user.password != password) {
                return done(null, false, { messages: 'Wrong password!' });
            } else {
                return done(null, user);
            }
        });
    }
));

// Serializing the user to decide which key is to be kept in cookies 
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

// Deserializing the user from the key in the cookie - extract user id and fint it in database User
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) { 
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    })
})

// Check if the user is authenticated - used as middleware
passport.checkAuthentication = function(req, res, next) {
    // if the user is signed-in, then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("User not signed in");
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie 
        // and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;