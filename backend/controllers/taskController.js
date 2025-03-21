const Task = require("../model/taskModel"); 
const User = require("../model/userModel"); 

const getTaskDetailsUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id getTaskDetailsUser: " + id);

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No Tasks assigned" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const addTaskToUser = async (req, res) => {
    try {
        const { userId, taskName, taskDescription, priority, status, dueDate, attachments, members } = req.body;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const newTask = new Task({
            userId,
            task: {
                taskName,
                taskDescription,
                priority: priority || "Medium",
                status: status || "To Do",
                dueDate,
                attachments
            },
            members
        });
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addTaskToUser, getTaskDetailsUser };
