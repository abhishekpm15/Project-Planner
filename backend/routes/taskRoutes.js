const express = require('express')
const router  = express.Router()

const {addTaskToUser, getTaskDetailsUser, updateTaskStatus} = require("../controllers/taskController")

router.get("/:id", getTaskDetailsUser);
router.post("/addTasks", addTaskToUser);
router.post("/updateTaskStatus", updateTaskStatus);


module.exports = router