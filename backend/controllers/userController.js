const User = require('../model/userModel')

const addUser = async (req, res) => {
  try {
    const { email, name, password, role, designation} = req.body
    console.log("email + firstname + lastname + role + password " + email + " " + name + " " + role + " " + password)
    let user = await User.findOne({ email })
    if (user) return res.status(409).json({ message: 'User already exists' })

    user = new User({
      name: `${name}`,
      email,
      password,
      role,
      designation
    })

    console.log("user " + user)

    await user.save()
    res.status(201).json({ message: 'User stored successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}


const getAllUsers = async (req, res) => {
    try {
        let users = await User.find()
        console.log(users);
        if (users.length === 0) return res.status(200).json({"message": "No users found" })
        res.status(200).json({ users });  
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        let user = await User.findOne({userId: id})
        if (!user) return res.status(404).json({message: "User not found"});

        return res.status(200).json({user})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
} 


const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        console.log("id " + id)
        const user = await User.findOneAndDelete({ userId: id });
        console.log("user delete" + user)
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


module.exports = {addUser, getAllUsers, deleteUser, getUserById}
