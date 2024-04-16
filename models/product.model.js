const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    productcategory:{
        type:String,
        required:true
    },
    productdesc:{
        type:String,
        required:true
    },
    productprice:{
        type:Number,
        required:true
    },
    productdiscount:{
        type:Number,
        required:true
    },
    productnewprice:{
        type:Number,
        required:true
    },
    productquantity:{
        type:Number,
        required:true
    },
    productimg:{
        type:String,
        required:true
    },
    storename:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product