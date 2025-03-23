const Task = require("../model/taskModel"); 
const User = require("../model/userModel"); 

const getTaskDetailsUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id getTaskDetailsUser: " + id);

        const task = await Task.find({userId:id});
        console.log("Tasl " + task)
        if (task.length === 0) {
            return res.status(404).json({ message: "No Tasks assigned" });
        }
        console.log("task " + task)
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const addTaskToUser = async (req, res) => {
    try {
        const { userId, taskName, taskDescription, priority, status, dueDate, serviceName } = req.body;
        console.log("user ID , taskName + taskDescription + priority" +  userId, taskName, taskDescription, priority, status, dueDate)
        const userExists = await User.findOne({userId});
        console.log("User exists check addTaskToUser" + userExists);
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
                // attachments
            },
        });
        console.log("New Task check " + newTask);
        await newTask.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addTaskToUser, getTaskDetailsUser };
