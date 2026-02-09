const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');
const { isLogedIn, saveLocalsRedirect } = require('../middleware');
const userController = require('../controllers/user');

//signup routes
router.route('/signup')
    .get( 
        saveLocalsRedirect, 
        userController.renderSignupForm
    )
    .post( 
        wrapAsync(userController.signup)
);

//login routes
router.route('/login')
    .get(
        saveLocalsRedirect, 
        userController.renderLoginForm
    )
    .post(
        saveLocalsRedirect, 
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        wrapAsync(userController.login)
    );

//logout route
router.get(
    '/logout', 
    userController.logout
);




module.exports = router;