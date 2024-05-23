const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({

    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    orderstatus:{

        inprogress:{
            status:{
                type:Boolean,
            },
            date:{
                type:Date
            }
        },
        confirmed:{
            status:{
                type:Boolean,
            },
            date:{
                type:Date
            }
        },
        shipped:{
            status:{
                type:Boolean,
            },
            date:{
                type:Date
            }
        },
        outfordelivery:{
            status:{
                type:Boolean,
            },
            date:{
                type:Date
            }
        },
        delivered:{
            status:{
                type:Boolean,
            },
            date:{
                type:Date
            }
        }

    }
     ,
    quantity:{
        type:Number,
        required:true
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