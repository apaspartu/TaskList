const task = require('../repositories/task.js');
const auth = require('../repositories/auth.js');

const showAllTasks = async (req, res) => {
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

    res.type('text/plain');
    res.send('All tasks' + ' ' + req.cookies.userId);
};

module.exports = {
    showAllTasks,
};