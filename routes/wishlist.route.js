const express = require("express");
const {getWishListItems,addToWishlist,removeFromWishList} = require('../controllers/wishlist/wishlist.controller')

const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

router.get('getwishlistitems',checkAuth,getWishListItems)
router.post('addtowishlist',checkAuth,addToWishlist)
router.delete('removefromwishlist',checkAuth,removeFromWishList)

module.exports = router