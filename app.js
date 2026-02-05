const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Listing = require('./models/listing');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/expressErrors');
const listingSchema = require('./schema');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);


MONGO_URI = 'mongodb://localhost:27017/farhome';

main().then(() => console.log("MongoDB connected,,, yayyy"))
  .catch(err => console.error(err));

async function main() {
    await mongoose.connect(MONGO_URI);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


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
app.get('/listings', wrapAsync(async (req, res) => {

    let allListings = await Listing.find({})

    res.render('listings/index.ejs', { allListings });
})) ;

// create new listing
app.get('/listings/new', (req,res)=>{
    res.render('listings/new.ejs');
});


// show listing by id
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
}));
//create route
app.post('/listings',validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));
//edit route
app.get('/listings/:id/update', wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/update.ejs', { listing });
}));
//update route
app.put('/listings/:id',validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});


app.use((req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render('listings/err.ejs', { err });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
}); 