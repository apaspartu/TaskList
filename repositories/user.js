// This module allows CRUD operations with User model

const User = require("../models/user");

module.exports = {
    createProfile: async (email, passwordHash) => {
        // Creates new profile, if successfully returns true, else - false

        // Check if profile already taken -->
        let profiles;
        try {
            profiles = await User.find({email: email});
        } catch(e) {
            throw new Error(e.message);  // something wrong with database
        }

        if (profiles.length !== 0) throw new Error('This email is already taken.');
        // -->

        const profile = await new User({email: email, passwordHash: passwordHash}).save();

        if (profile) {
            return true;
        }
        return false;
    },
    getProfile: async (email) => {
        // Gets profile object from database, on success returns profile object
        let profile;
        try {
            profile = await User.findOne({email: email});
        } catch(e) {
            throw new Error(e.message); // something wrong with database
        }

        if (!profile) {
            throw new Error('Not found!')
        }

        return profile;
    },
    deleteProfile: async (email) => {
        // Deletes profile, on success returns true, else false;
        let profile;
        try {
            profile = await User.findOne({email: email});
        } catch(e) {
            throw new Error(e.message); // something wrong with database
        }

        if (!profile) {
            throw new Error('Not found!')
        }

        let result;
        try {
            result = await User.deleteOne({email: email});
        } catch(e) {
            throw new Error('Something went wrong!')
        }

        return result.deletedCount === 1;
    },
}