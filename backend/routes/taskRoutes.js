const express = require('express')
const router  = express.Router()

const {addTaskToUser, getTaskDetailsUser} = require("../controllers/taskController")

router.get("/:id", getTaskDetailsUser);
router.post("/addTasks", addTaskToUser);

module.exports = router