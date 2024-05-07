const Cart = require('../../models/cart.model');
const Product  = require('../../models/product.model')

const addToCart = async(req,res)=>{
    try{

        const cartitem =await Cart.findOne({product_id:req.body.product_id})

        if(cartitem){
            return res.status(500).json({message:"Item already added to Cart"})
        }
        const newCartItem = Cart.create(req.body)
        return res.status(200).json({message:"Item Added Successfully to Cart"})
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}

const getCartItems = async(req,res)=>{
    try{
        const cartitem =await  Cart.find({username:req.body.username})
        if(!cartitem.length){
            return res.status(204).json({message:"No Cart Items"})
        }
        const cartItemList=await Cart.aggregate([
            {
                $match:{username:req.body.username}
            },
            {
                $lookup:{
                    from:'products',
                    localField:'product_id',
                    foreignField:'_id',
                    as:'products'
                }
            },
            {
                $unwind:'$products'
            },
            {
                $project:{
                    'products':1
                }
            }
        ])
        res.status(200).json(cartItemList)
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}

const removeCartItem =  async(req,res)=>{
    try{
        console.log("hurrrr")
        const cartitem = await Cart.find({product_id:req.params.id})
        if(!cartitem.length){
            return res.status(500).json({message:"Cart item doesn't exist"})
        }
        const deletedcartitem = await Cart.deleteOne({product_id:req.params.id})
        res.status(200).json({message:"cartitem removed successfully",deletedcartitem})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports = {addToCart,getCartItems,removeCartItem}