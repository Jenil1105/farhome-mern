const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Listing = require('./models/listing');
const methodOverride = require('method-override');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
MONGO_URI = 'mongodb://localhost:27017/farhome';

main().then(() => console.log("MongoDB connected,,, yayyy"))
  .catch(err => console.error(err));

async function main() {
    await mongoose.connect(MONGO_URI);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Route to display all listings
app.get('/listings', async (req, res) => {

    let allListings = await Listing.find({})

    res.render('listings/index.ejs', { allListings });
});

// create new listing
app.get('/listings/new', (req,res)=>{
    res.render('listings/new.ejs');
});


// show listing by id
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
});

//create route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
});

//edit route
app.get('/listings/:id/update', async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/update.ejs', { listing });
});

//update route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Cozy Cottage",
//         description: "A cozy cottage in the countryside.",  
//         images: "",
//         price: 1500,
//         location: "Countryside",
//         country: "Wonderland",
//     });
//     await sampleListing.save();
//     console.log("Sample listing saved:", sampleListing);
//     res.send('Sample listing created and saved to the database.');
// });
 
app.listen(8080, () => {
    console.log('Server is running on port 8080');
}); 