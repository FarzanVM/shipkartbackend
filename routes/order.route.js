const express = require("express");
const {getStoreOrders,getOrders,updateOrder, addOrder, getCurrentOrders, updateBulkOrder, deleteBulkOrder, getFullFilledOrders, getPastOrders} = require('../controllers/orders/order.controller')
const {checkAuth} = require('../middleware/check-authorization')

const router = express.Router()

//for user
router.post('/addorder',checkAuth,addOrder)

router.post('/updatebulkorders',checkAuth,updateBulkOrder)

router.post('/getorders',checkAuth,getOrders)

router.post('/getpastorders',checkAuth,getPastOrders)

router.post('/getcurrentorders',checkAuth,getCurrentOrders)

router.post('/deletebulkorders',checkAuth,deleteBulkOrder)

//for Admin

router.post('/getstoreorders',checkAuth,getStoreOrders)

router.patch('/updateorder',checkAuth,updateOrder)

router.post('/getfullfilledorders',checkAuth,getFullFilledOrders)



module.exports = router