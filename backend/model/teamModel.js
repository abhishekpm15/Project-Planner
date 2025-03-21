const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
