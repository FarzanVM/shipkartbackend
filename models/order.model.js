const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({

    product_id:{
        type:String,
        required:true
    },
    orderstatus:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    storename:{
        type:String,
        required:true
    }
})

const Order = mongoose.model('Order',OrderSchema)

module.exports = Order