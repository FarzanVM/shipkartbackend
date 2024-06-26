const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    storename:{
        type:String,
        required:true
    }
});

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin