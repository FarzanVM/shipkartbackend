const express = require("express");
const {addProduct,getProducts,getStoreProducts, deleteProduct, updateProduct, getSingleProduct, getProductsByCategory, getProductsBy, searchProducts, getBestDeals, getProducts_By_PriceRange, updateStock} = require('../controllers/products/product.controller')
// const checkAuth = require('../middleware/check-authorization')
const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

//userRoutes

router.post('/getproducts/:keyword',getProducts);

router.get('/getsingleproduct/:id',getSingleProduct);

router.get('/getproductsbycategory/:category',getProductsByCategory)

router.post('/getproductsby?',getProductsBy)

router.post('/getproductsbypricerange?',getProducts_By_PriceRange)

router.get('/searchproducts/:keyword',searchProducts)

router.get('/getbestdeals',getBestDeals)

//adminRoutes

router.post('/getstoreproducts',checkAuth,getStoreProducts);

router.post('/addproduct',checkAuth,addProduct);

router.delete('/deleteproduct/:id',checkAuth,deleteProduct);

router.put('/updateproduct',checkAuth,updateProduct);

router.put('/updatestock',updateStock)

module.exports = router
