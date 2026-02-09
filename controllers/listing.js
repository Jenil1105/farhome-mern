const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:'reviews', populate:{path:'author', select:'username'}}).populate('owner');
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect('/listings');
    };
    res.render('listings/show.ejs', { listing });
};

module.exports.renderNewForm = (req,res)=>{
    res.render('listings/new.ejs');
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect('/listings');
};

module.exports.renderUpdateForm = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect('/listings');
    };

    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload","/upload/w_300")

    res.render('listings/update.ejs', { listing, originalImgUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!res.locals.currentUser._id.equals(listing.owner._id)){
        req.flash("error", "You don't have permission to edit this listing!");
        return res.redirect('/listings');
    }
    listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        listing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect('/listings');
};