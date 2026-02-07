const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressErrors');
const reviewSchema = require('../schema').reviewSchema;

// Validation middleware

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }   
};

//post review
router.post('/', validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review created!");
    res.redirect(`/listings/${id}`);
}));

//delete review
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
