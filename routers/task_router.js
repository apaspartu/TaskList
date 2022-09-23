const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/auth_controllers.js')


const {
    showAllTasks,
    createTask,
    editTask,
    deleteTask,
    changeDone,
} = require('../controllers/task_controllers.js');

router.get('/', authMiddleware, showAllTasks);
router.post('/create', authMiddleware, createTask);
router.post('/edit', authMiddleware, editTask);
router.post('/delete', authMiddleware, deleteTask);
router.post('/change-done', authMiddleware, changeDone);

module.exports = router;
