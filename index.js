const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const app = express();
const port = 8000;

// Parser
app.use(express.urlencoded());

// Use express layout
app.use(expressLayouts);

// Use express router
app.use('/', require("./routes"));

// Path for static files
app.use(express.static('./assets'));

// Extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})