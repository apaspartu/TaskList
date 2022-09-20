const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    passwordHash: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;