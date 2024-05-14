const express = require("express");
const {addProduct,getProducts,getStoreProducts, deleteProduct, updateProduct, getSingleProduct} = require('../controllers/products/product.controller')
// const checkAuth = require('../middleware/check-authorization')
const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

router.get('/getproducts/:username',getProducts);

router.post('/getstoreproducts',checkAuth,getStoreProducts);

router.post('/addproduct',checkAuth,addProduct);

router.delete('/deleteproduct/:id',checkAuth,deleteProduct);

router.put('/updateproduct',checkAuth,updateProduct);

router.get('/getsingleproduct/:id',getSingleProduct);

module.exports = router
