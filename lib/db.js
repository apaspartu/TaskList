const mongoose = require('mongoose');

const Task = require('../models/task.js');
const User = require('../models/user.js');

const connectionString = 'mongodb+srv://vladyslav:cZ5AY8dEp7ylvwXo@cluster0.zeqcqu6.mongodb.net/?retryWrites=true&w=majority';
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

module.exports = {
    createTask: async (text, userId) => {
        const task = await new Task({text: text, done: false, userId: userId}).save();
        if (!task) {
            return false;
        }
        return true;
    },
    deleteTask: async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            id = mongoose.Types.ObjectId(id);
        }

        let deleted;
        try {
            deleted = await Task.deleteOne({_id: id});
        } catch(e) {
            throw new Error('Something went wrong!')
        }
        return deleted.deletedCount === 1;
    }
    ,
    editTask: async (id, newText) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            id = mongoose.Types.ObjectId(id);
        }

        let task = await Task.findById(id);
        task.text = newText;
        task.update()
        return task.text;
    },
    getAllTasks: async (userId) => {

    },
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
};
