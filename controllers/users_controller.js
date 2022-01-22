const User = require('../models/user');

// Render profile page
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user) {
        return res.render('users_profile', {
            title: "Users",
            profile_user: user
        });
    })
    
}

// Render sign up page
module.exports.signup = function(req, res){
    if (req.isAuthenticated()) {
        console.log('[ALERT] User is already signed in. Returning back to home page');
        return res.redirect('/');
    }

    return res.render('user_sign_up', {
        title: "Codial | Sign Up",
        layout: 'user_sign_up' 
    });
}

// Render sign in page
module.exports.signin = function(req, res){
    if (req.isAuthenticated()) {
        console.log('[ALERT] User is already signed in. Returning back to home page');
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: "Codial | Sign In",
        layout: 'user_sign_in'
    });
}


// Get sign up data
module.exports.createAccount = function(req, res){
    if (req.body.password != req.body.confirm_password) {
        // req.flash('error', 'Password doesnt match confirm password!');
        return res.redirect('back'); 
    }

    User.findOne({email: req.body.email}, (err, user) => {
        if (err) { 
            console.log("Error in finding user in signing up"); 
            return; 
        }

         if (!user) {   // If user is not found - create a user
            User.create(req.body, (err, user) => {
                if (err) { 
                    console.log("Error in creating user in signing up");
                    return;
                }

                return res.redirect('/users/sign-in');
            })
         } else {       // If user is found - return back
            return res.redirect('back'); 
         }
    })
}

// Sign in and create a session for user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Welcome to Codeial!');
    return res.redirect('/');
}

// Destroy session
module.exports.destroySession = function(req, res) {
    req.logout();
    req.flash('success', 'Logged out!');
    return res.redirect('/users/sign-in');
}

// Update Profile
module.exports.updateAccount = function(req, res){
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, function(err, user) {
            return res.redirect('back');
        })
    } else {
        return res.status(401).send('Unauthorized');
    }

    
}