const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressErrors');
const session = require('express-session');
const app = express();
const flash = require('connect-flash');
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

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionConfig));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//listings routes
app.use('/listings', require('./routes/listing.js'));

//reviews routes
app.use('/listings/:id/reviews', require('./routes/review.js'));


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