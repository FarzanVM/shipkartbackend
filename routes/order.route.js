const express = require("express");
const {getStoreOrders,getOrders,updateOrder, addOrder} = require('../controllers/orders/order.controller')
const {checkAuth} = require('../middleware/check-authorization')

const router = express.Router()

router.post('/addorder',checkAuth,addOrder)

router.patch('/updateorder',checkAuth,updateOrder)

router.post('/getorders',checkAuth,getOrders)

router.post('/getstoreorders',checkAuth,getStoreOrders)

module.exports = router