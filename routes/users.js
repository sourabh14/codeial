const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');

const router = express.Router();
const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create-account', usersController.createAccount);
router.post('/update/:id', passport.checkAuthentication, usersController.updateAccount);

// Use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
        'local',
        { 
            failureRedirect: '/users/sign-in',
            failureFlash: true
        }
    ), usersController.createSession);

// Sign out
router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;