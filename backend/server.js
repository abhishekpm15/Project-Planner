const express = require('express')
const app = express()
const connectDB = require("./config/connection")
const cors = require('cors')

require("dotenv").config();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

connectDB();

const userRoutes  = require("./routes/userRoutes");
const taskRoutes  = require("./routes/taskRoutes");

app.use("/api/users", userRoutes)
app.use("/api/task", taskRoutes)

app.get("/", (req,res) => {
    console.log("You have hit / API")
    res.send("You have hit / API")
})

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})