const mongoose = require('mongoose')
require("dotenv").config(); 

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    process.exit(1) 
  }
}

module.exports = connectDB
