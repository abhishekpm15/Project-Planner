const express = require("express")
const router = express.Router()

const {addUser, getAllUsers, deleteUser, getUserById} = require("../controllers/userController")

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post("/addUser", addUser);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router