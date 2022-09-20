const task = require('../repositories/task.js');
const auth = require('../repositories/auth.js');

const showAllTasks = async (req, res) => {
    // Check whether this user is logged in, else redirect to sign-in
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

    const tasks = await task.getAllTasks(userid)

    res.render('tasks', {tasks: tasks})
};

const createTask = async (req, res) => {
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

    const text = req.body.text;

    await task.createTask(text, userid);

    return res.redirect(303, '/tasks');
};

const editTask = async (req, res) => {
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

};

const deleteTask = async (req, res) => {
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

    const id = req.body.id;

    await task.deleteTask(id);

    return res.redirect(303, '/tasks');
};

module.exports = {
    showAllTasks,
    createTask,
    editTask,
    deleteTask,
};