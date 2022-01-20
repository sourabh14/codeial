const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');

// SASS 
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

// Parser
app.use(express.urlencoded());

// Cookie parser
app.use(cookieParser());

// Use express layout
app.use(expressLayouts);
// Dont apply layouts to sign-in and sign-up pages
app.set("layout user_sign_in", false);
app.set("layout user_sign_up", false);

// Flash
app.use(flash());

// Path for static files
app.use(express.static('./assets'));

// Extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO - change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)   
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require("./routes"));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})