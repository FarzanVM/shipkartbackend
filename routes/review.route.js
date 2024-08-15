const express = require('express')

const {addReview, getReview} = require('../controllers/review/review.controller')

const {checkAuth }= require('../middleware/check-authorization')

const router = express.Router();

//userRoutes

router.post('/addreview',checkAuth,addReview);

router.get('/getproductreview/:id',checkAuth,getReview)

module.exports = router