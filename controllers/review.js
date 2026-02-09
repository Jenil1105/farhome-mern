const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.rating = Number(review.rating);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review created!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};