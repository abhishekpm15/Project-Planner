const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref : "User"},
    task: { 
        taskName: {type: String, required: true},
        taskDescription: {type: String, required: true},
        serviceName: {type: String, required: true},
        priority: { 
            type: String, 
            enum: ["Low", "Medium", "High", "Critical"], 
            default: "Medium" 
        }, 
        status: { 
            type: String, 
            enum: ["To Do", "In Progress", "Completed", "Blocked"], 
            default: "To Do" 
        },
        dueDate: { type: Date, required: true },
        // attachments: [{ type: String }]
    },
    // members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
