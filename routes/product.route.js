const express = require("express");
const {addProduct,getProducts,getStoreProducts, deleteProduct, updateProduct, getSingleProduct, getProductsByCategory, getProductsBy, searchProducts, getBestDeals} = require('../controllers/products/product.controller')
// const checkAuth = require('../middleware/check-authorization')
const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

//userRoutes

router.post('/getproducts/:keyword',getProducts);

router.get('/getsingleproduct/:id',getSingleProduct);

router.get('/getproductsbycategory/:category',getProductsByCategory)

router.post('/getproductsby?',getProductsBy)

router.get('/searchproducts/:keyword',searchProducts)

router.get('/getbestdeals',getBestDeals)

//adminRoutes

router.post('/getstoreproducts',checkAuth,getStoreProducts);

router.post('/addproduct',checkAuth,addProduct);

router.delete('/deleteproduct/:id',checkAuth,deleteProduct);

router.put('/updateproduct',checkAuth,updateProduct);

module.exports = router
