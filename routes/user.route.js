const express = require("express");
const {addUser,checkUser,login, getUser, updateUser}= require("../controllers/user/user.controller");
const{ checkAuth} = require('../middleware/check-authorization')

const router = express.Router();

// for User

router.post('/signup',addUser);

router.get('/checkUser',checkUser)

router.get('/getuser/:username',checkAuth,getUser)

router.put('/updateuser',checkAuth,updateUser)

router.post('/login',login)

module.exports = router
