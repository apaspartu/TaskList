const task = require('../repositories/task.js');
const auth = require('../repositories/auth.js');

const showAllTasks = async (req, res) => {
    // Check whether this user is logged in, else redirect to sign-in
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        return res.redirect(303, 'sign-in');
    }

    res.type('text/plain');
    res.send('All tasks' + ' ' + req.cookies.userId);
};

module.exports = {
    showAllTasks,
};