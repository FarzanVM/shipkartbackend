const express = require("express");
const {getWishListItems,addToWishlist,removeFromWishList} = require('../controllers/wishlist/wishlist.controller')

const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

//for User

router.post('/getwishlistitems',checkAuth,getWishListItems)
router.post('/addtowishlist',checkAuth,addToWishlist)
router.delete('/removefromwishlist/:id',checkAuth,removeFromWishList)

module.exports = router