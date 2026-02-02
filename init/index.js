const mongoose = require('mongoose');
const { Schema } = mongoose;    
const initdata = require('./data.js');
const Listing = require('../models/listing');

MONGO_URI = 'mongodb://localhost:27017/farhome';

main().then(() => console.log("MongoDB connected,,, yayyy"))
  .catch(err => console.error(err));

async function main() {
    await mongoose.connect(MONGO_URI);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log("Existing listings cleared.");
        await Listing.insertMany(initdata.data);
        console.log("Database initialized with sample listings.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }   
}

initDB();