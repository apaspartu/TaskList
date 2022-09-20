const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    userId: String,
    activatedTime: Date,
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;