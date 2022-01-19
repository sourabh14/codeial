// Import the mongoose module
const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/codeial_development';
mongoose.connect(mongoDB);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error:')
});

// Check connection
db.once('open', () => {
  console.log('MongoDB is up and running');
})

module.exports = db;