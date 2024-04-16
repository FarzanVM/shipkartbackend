const Admin = require('../../models/admin.model');
const jwt = require('jsonwebtoken');

const addAdmin = async(req,res)=>{
    try{
        if(req.body.email===undefined || req.body.password===undefined || req.body.storename===undefined){
            return res.status(500).json({message:"Authorization failed"})
        }
        const admin = await Admin.findOne({ email: req.body.email })
        if (admin) {
            return res.status(500).json({ message: "admin already Exist with this username" })
        }
        const newuser = Admin.create(req.body)
        res.status(200).json({ message: "Admin created successfully", newuser })
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const admin = await Admin.find(req.body)
        if (!admin.length) {
            return res.status(404).json({ message: "Admin does not exist" })
        }
        console.log(admin)
        const resp = {
            adminId: admin[0]._id,
            username: admin[0].email
        }
        const token = jwt.sign(resp, 'secret', {
            expiresIn: '1h'
        })
        return res.status(200).json({
            message: "Authentication Successful",
            username: admin[0].email,
            storename:admin[0].storename,
            token: token
        })
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {addAdmin,adminLogin}