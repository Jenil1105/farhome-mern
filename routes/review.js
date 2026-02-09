const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressErrors');
const reviewSchema = require('../schema').reviewSchema;
const { validateReview, isLogedIn, isReviewAuthor } = require('../middleware');
const reviewController = require('../controllers/review');

//post review
router.post(
    '/', 
    validateReview, 
    isLogedIn, 
    wrapAsync(reviewController.createReview)
);

//delete review
router.delete(
    '/:reviewId', 
    isLogedIn, 
    isReviewAuthor, 
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;
