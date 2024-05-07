const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    username:{
        type:String,
        required:true
    }
})
const Cart = mongoose.model('Cart',cartSchema)
module.exports =Cart