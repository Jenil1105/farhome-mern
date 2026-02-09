const User = require('../models/user');


module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup');
};

module.exports.signup = async (req, res) => {
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
};

module.exports.renderLoginForm = async (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectUrl || '/listings');
};

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged you out!');
        res.redirect('/listings');
    });
};