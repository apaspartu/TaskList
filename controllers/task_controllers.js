const task = require('../repositories/task.js');

const showAllTasks = async (req, res) => {
    const userid = req.cookies.userId;
    const tasks = await task.getAllTasks(userid)

    res.render('tasks', {tasks: tasks})
};

const createTask = async (req, res) => {
    const userid = req.cookies.userId;
    const text = req.body.text;

    await task.createTask(text, userid);

    res.redirect(303, '/tasks');
};

const editTask = async (req, res) => {
    const newText = req.body.newText;
    const id = req.body.id;

    await task.editTask(id, newText);

    res.redirect(303, '/tasks');

};

const deleteTask = async (req, res) => {
    const id = req.body.id;

    await task.deleteTask(id);

    res.redirect(303, '/tasks');
};
const changeDone = async (req, res) => {
    const id = req.body.id;
    const done = req.body.done;

    if (done === 'false') {
        await task.markAsDone(id);
    } else {
        await task.markAsUnDone(id)
    }

    res.redirect(303, '/tasks');
}

module.exports = {
    showAllTasks,
    createTask,
    editTask,
    deleteTask,
    changeDone
};