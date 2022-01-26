const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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
    req.flash('success', 'Logged out!');
    req.logout();
    
    return res.redirect('/users/sign-in');
}

// Edit profile page
module.exports.editProfile = function(req, res){
    User.findById(req.params.id, function(err, user) {
        return res.render('users_profile_edit', {
            title: "Users",
            profile_user: user
        });
    })
}

// Update Profile
module.exports.updateAccount = async function(req, res){
    if (req.user.id == req.params.id) {
        try {
            // let user = User.findByIdAndUpdate(req.params.id, req.body  )
            // function(err, user) {
            //     return res.redirect('back');
            // })
            let user = await User.findById(req.params.id);

            console.log("Updating user: ", user.name);

            User.uploadedAvatar(req, res, function(err) {
                if (err) {console.log("****** Multer error: ", err)}

                user.name = req.body.name;
                user.description = req.body.description;
                user.email = req.body.email; 
                user.mobile = req.body.mobile;
                user.address = req.body.address;

                if (req.file) {
                    // Delete the previous avatar
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' +  req.file.filename;
                }

                user.save();
                return res.redirect('/users/profile/' + user.id);
            })

        } catch(err) {
            console.log("Error: ", err);
        }
        
    } else {
        return res.status(401).send('Unauthorized');
    }

    
}