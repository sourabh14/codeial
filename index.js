const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

// Parser
app.use(express.urlencoded());

// Cookie parser
app.use(cookieParser());

// Use express layout
app.use(expressLayouts);

// Path for static files
app.use(express.static('./assets'));

// Extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// 
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