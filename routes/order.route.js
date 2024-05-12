const express = require("express");
const {getStoreOrders,getOrders,updateOrder, addOrder, getCurrentOrders, updateBulkOrder} = require('../controllers/orders/order.controller')
const {checkAuth} = require('../middleware/check-authorization')

const router = express.Router()

router.post('/addorder',checkAuth,addOrder)

router.patch('/updateorder',checkAuth,updateOrder)

router.post('/getorders',checkAuth,getOrders)

router.post('/getstoreorders',checkAuth,getStoreOrders)

router.post('/getcurrentorders',checkAuth,getCurrentOrders)

router.post('/updatebulkorders',checkAuth,updateBulkOrder)

module.exports = router