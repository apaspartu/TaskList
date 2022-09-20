// This module allows CRUD operations with Task model

const Task = require("../models/task");
const mongoose = require("mongoose");

module.exports = {
    createTask: async (text, userId) => {
        const task = await Task.create({text: text, done: false, userId: userId});
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

        let updated;
        try {
            updated = await Task.updateOne({_id: id}, {text: newText});
        } catch(e) {
            throw new Error('Something went wrong!')
        }
        return updated.acknowledged === true;
    },
    markAsDone: async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            id = mongoose.Types.ObjectId(id);
        }
        let updated;
        try {
            updated = await Task.updateOne({_id: id}, {done: true});
        } catch(e) {
            throw new Error('Something went wrong!')
        }
        return updated.acknowledged === true;
    },
    markAsUnDone: async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            id = mongoose.Types.ObjectId(id);
        }
        let updated;
        try {
            updated = await Task.updateOne({_id: id}, {done: false});
        } catch(e) {
            throw new Error('Something went wrong!')
        }
        return updated.acknowledged === true;
    },
    getAllTasks: async (userId) => {
        let tasks;
        try {
            tasks = await Task.find({userId: userId}).lean();
        } catch (e) {
            throw new Error('Something went wrong!')
        }
        return tasks;
    },
}