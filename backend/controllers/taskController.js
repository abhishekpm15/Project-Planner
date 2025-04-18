const Task = require("../model/taskModel"); 
const User = require("../model/userModel"); 

const getTaskDetailsUser = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.find({userId:id});
        if (task.length === 0) {
            return res.status(404).json({ message: "No Tasks assigned" });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const addTaskToUser = async (req, res) => {
    try {
        const { userId, taskName, taskDescription, priority, status, dueDate, serviceName } = req.body;
        const userExists = await User.findOne({userId});
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const newTask = new Task({
            userId,
            task: {
                taskName,
                taskDescription,
                serviceName,
                priority: priority || "Medium",
                status: status || "To Do",
                dueDate,
            },
        });
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateTaskStatus = async (req,res) => {
    const {taskId, status} = req.body;
    const task = await Task.findById(taskId);
    if(!task){
        return res.status(404).json({message: "Task not found"});
    }
    task.task.status = status;
    await task.save();
    res.status(200).json({message: "Task updated successfully", task});
}

module.exports = { addTaskToUser, getTaskDetailsUser, updateTaskStatus };
