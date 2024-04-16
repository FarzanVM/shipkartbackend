const User = require("../../models/user.model")
const jwt = require('jsonwebtoken')

const addUser = async (req, res) => {
    try {
        if(req.body.email===undefined || req.body.password===undefined){
            return res.status(500).json({message:"Authorization failed"})
        }
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(500).json({ message: "User already Exist with this username" })
        }
        const newuser = User.create(req.body)
        res.status(200).json({ message: "user created successfully", newuser })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkUser = async (req, res) => {
    try {
        const user = await User.find(req.body)
        if (!user.length) {
            return res.status(404).json({ message: "User does not exist" })
        }
        return res.status(200).json({ message: "User does exist" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
const login = async (req, res) => {
    try {
        const user = await User.find(req.body)
        if (!user.length) {
            return res.status(404).json({ message: "User does not exist" })
        }
        console.log(user)
        const resp = {
            userId: user[0]._id,
            username: user[0].email
        }
        const token = jwt.sign(resp, 'secret', {
            expiresIn: '1h'
        })
        return res.status(200).json({
            message: "Authentication Successful",
            username: user[0].email,
            token: token
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { checkUser, addUser, login }