const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },  
    images: {type: String, set: v=> v==='' ? "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D" : v
        ,default: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D"
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;