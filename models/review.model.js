const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    comments:[{
        title:{
            type:String
        },
        comment:{
            type:String
        },
        rating:{
            type:Number
        },
        customername:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        }
    }]
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review