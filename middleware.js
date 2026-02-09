const Listing = require('./models/listing');
const Review = require('./models/review');
const listingSchema = require('./schema').listingSchema;
const ExpressError = require('./utils/expressErrors');
const reviewSchema = require('./schema').reviewSchema;

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }   
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }   
};

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

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);   
    if(!res.locals.currentUser._id.equals(listing.owner._id)){
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }   
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => { 
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!res.locals.currentUser._id.equals(review.author._id)){
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};