const express = require("express");
const {addToCart,getCartItems} = require('../controllers/cart/cart.controller')

const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

router.post('/addtocart',checkAuth,addToCart)
router.post('/getcartitems',checkAuth,getCartItems)

module.exports=router;