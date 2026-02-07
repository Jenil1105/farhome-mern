const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync');
const User = require('../models/user');
const passport = require('passport');
const { isLogedIn, saveLocalsRedirect } = require('../middleware');


router.get('/signup', saveLocalsRedirect, (req, res) => {

    res.render('users/signup');

});

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to FarHome!');
            res.redirect('/listings'); 
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    } 
}));


router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login',saveLocalsRedirect, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), wrapAsync(async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectUrl || '/listings');
}));

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged you out!');
        res.redirect('/listings');
    });
});




module.exports = router;