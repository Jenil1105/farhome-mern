const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressErrors');
const listingSchema = require('../schema').listingSchema;
const { validateListing, isLogedIn, isAuthor } = require('../middleware');
const listingController = require('../controllers/listing');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });



// Route to display all listings
router.route('/')
    .get(
        wrapAsync(listingController.index)
    )
    .post(
        
        isLogedIn, 
        validateListing, 
        upload.single('listing[image]'),
        wrapAsync(listingController.createListing)
    );

// create new listing
router.get(
    '/new', 
    isLogedIn, listingController.renderNewForm);

//show listing, update listing, delete listing

router.route('/:id')
    .get(
        wrapAsync(listingController.showListing)
    )
    .put(
        validateListing, 
        isLogedIn, 
        isAuthor, 
        upload.single('listing[image]'),
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLogedIn, 
        isAuthor, 
        wrapAsync(listingController.deleteListing)
    );

//edit route
router.get(
    '/:id/update', 
    isLogedIn, 
    isAuthor, 
    wrapAsync(listingController.renderUpdateForm)
);

module.exports = router;