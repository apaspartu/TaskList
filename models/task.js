const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const taskSchema = new Schema({
    text: String,
    done: Boolean,
    userId: ObjectId,
});

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;