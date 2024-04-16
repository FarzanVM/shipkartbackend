const express = require('express');
const {addAdmin,adminLogin} = require('../controllers/admin/admin.controller');

const router = express.Router();

router.post('/signup',addAdmin)
router.post('/login',adminLogin)

module.exports = router
