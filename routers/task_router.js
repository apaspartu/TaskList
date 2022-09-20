const express = require('express');
const router = express.Router();

const {
    showAllTasks,
} = require('../controllers/task_controllers.js');

router.get('/', showAllTasks);

module.exports = router;
