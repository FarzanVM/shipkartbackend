const express = require("express");
const {addToCart,getCartItems, removeCartItem} = require('../controllers/cart/cart.controller')

const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

//for User

router.post('/addtocart',checkAuth,addToCart)
router.post('/getcartitems',checkAuth,getCartItems)
router.delete('/removecartitem/:id',checkAuth,removeCartItem)

module.exports=router;