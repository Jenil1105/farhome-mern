const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressErrors');
const listingSchema = require('../schema').listingSchema;
const { isLogedIn } = require('../middleware');



// Validation middleware 

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }   
};






// Route to display all listings
router.get('/', wrapAsync(async (req, res) => {

    let allListings = await Listing.find({})

    res.render('listings/index.ejs', { allListings });
})) ;

// create new listing
router.get('/new', isLogedIn, (req,res)=>{
    res.render('listings/new.ejs');
});


// show listing by id
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('reviews');
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect('/listings');
    };
    res.render('listings/show.ejs', { listing });
}));

//create route
router.post('/',validateListing, isLogedIn, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect('/listings');
}));

//edit route
router.get('/:id/update', isLogedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect('/listings');
    };
    res.render('listings/update.ejs', { listing });
}));

//update route
router.put('/:id',validateListing, isLogedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect('/listings');
});

module.exports = router;