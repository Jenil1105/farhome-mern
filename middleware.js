module.exports.isLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to create a listing!');
        return res.redirect('/login');
    }   
    next();
};  


module.exports.saveLocalsRedirect = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};