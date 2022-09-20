// This module connects to database

const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
    console.error('MongoDB connection string missing!')
    process.exit(1)
}

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', err => {
    console.error('MongoDB error: ' + err.message);
    process.exit(1);
});
db.once('open', () => console.log('MongoDB connection established'));
