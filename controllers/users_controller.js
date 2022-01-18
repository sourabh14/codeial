const User = require('../models/user');

// render profile page
module.exports.profile = function(req, res){
    return res.render('users', {
        title: "Users"
    });
}

// render sign up page
module.exports.signup = function(req, res){
    return res.render('user_sign_up', {
        title: "Codial | Sign Up"
    });
}

// render sign in page
module.exports.signin = function(req, res){
    return res.render('user_sign_in', {
        title: "Codial | Sign In"
    });
}


// get sign up data
module.exports.createAccount = function(req, res){
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back'); 
    }
    User.findOne({email: req.body.email}, (err, user) => {
         if (err) { console.log("Error in finding user in signing up"); }

         if (!user) {   // If user is not found - create a user
            User.create(req.body, (err, user) => {
                if (err) { console.log("Error in creating user in signing up"); }

                return res.redirect('/users/sign-in');
            });
         } else {       // If user is found - return back
            return res.redirect('back'); 
         }
    })
}

// sign in and create a session for user
module.exports.createSession = function(req, res){
    // TODO
}