const Review = require('../../models/review.model')

const addReview = async(req,res) =>{
    try{
        const productId = req.body.product_id;
        const review = await Review.findOne({product_id:productId})
        if(!review){
            const productReview = {
                product_id:productId,
                comments:[
                    req.body.review
                ]

            }
            const newreview = await Review.create(productReview)
            return res.status(200).json({message:"hurray you are the first one to review"})
        }
        const newComment = req.body.review
        const newreview = await Review.updateOne({product_id:productId},{
            $push:{comments:newComment}
        })
        return res.status(200).json({message:"Review Added Successfully"})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getReview = async(req,res) =>{
    try{
        const productId = req.params.id;
        const reviews = await Review.findOne({product_id:productId},{comments:1})
        if(!reviews){
            return res.status(204).json({message:"No reviews for this product"})
        }

        return res.status(200).json(reviews)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {addReview,getReview}