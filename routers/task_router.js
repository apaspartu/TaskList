const express = require('express');
const router = express.Router();

const {
    showAllTasks,
    createTask,
    editTask,
    deleteTask,
    changeDone,
} = require('../controllers/task_controllers.js');

router.get('/', showAllTasks);
router.post('/create', createTask);
router.post('/edit', editTask);
router.post('/delete', deleteTask);
router.post('/change-done', changeDone);

module.exports = router;
