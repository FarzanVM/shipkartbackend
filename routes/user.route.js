const express = require("express");
const {addUser,checkUser,login}= require("../controllers/user/user.controller");

const router = express.Router();

router.post('/signup',addUser);

router.get('/checkUser',checkUser)

router.post('/login',login)

module.exports = router
