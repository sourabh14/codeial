const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');

const router = express.Router();
const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/posts', postsController.posts);
router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create-account', usersController.createAccount);

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

module.exports = router;