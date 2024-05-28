const express = require("express");
const {getStoreOrders,getOrders,updateOrder, addOrder, getCurrentOrders, updateBulkOrder, deleteBulkOrder} = require('../controllers/orders/order.controller')
const {checkAuth} = require('../middleware/check-authorization')

const router = express.Router()

//for user
router.post('/addorder',checkAuth,addOrder)

router.post('/updatebulkorders',checkAuth,updateBulkOrder)

router.post('/getorders',checkAuth,getOrders)

router.post('/getcurrentorders',checkAuth,getCurrentOrders)

router.post('/deletebulkorders',checkAuth,deleteBulkOrder)

//for Admin

router.post('/getstoreorders',checkAuth,getStoreOrders)

router.patch('/updateorder',checkAuth,updateOrder)



module.exports = router