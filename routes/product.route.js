const express = require("express");
const {addProduct,getProducts,getStoreProducts} = require('../controllers/products/product.controller')
// const checkAuth = require('../middleware/check-authorization')
const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

router.get('/getproducts',checkAuth,getProducts);

router.get('/getstoreproducts',checkAuth,getStoreProducts);

router.post('/addproduct',checkAuth,addProduct);

module.exports = router
