const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    designation: { type: String, required: true }
    // teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
