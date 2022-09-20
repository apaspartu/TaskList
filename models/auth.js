const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    userId: String,
    ipAddress: String,
    active: Boolean,
    activatedTime: Date,
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;