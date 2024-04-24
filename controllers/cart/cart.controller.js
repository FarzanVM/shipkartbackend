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
            return res.status(500).json({message:"No Cart Items"})
        }
        let cartItemList=[]
        for(var i=0;i<cartitem.length;i++){
            cartItemList.push(await Product.find({_id:cartitem[i].product_id}))
        }
        res.status(200).json(cartItemList)
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}
module.exports = {addToCart,getCartItems}