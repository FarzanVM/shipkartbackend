const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
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
const WishList = mongoose.model('WishList',wishListSchema)
module.exports =WishList