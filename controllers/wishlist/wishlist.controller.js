const mongoose = require('mongoose');
const WishList = require('../../models/wishlist.model');
const Product  = require('../../models/product.model')

const getWishListItems =  async(req,res) =>{
    try{

        const wishlistitem = await WishList.find({username:req.body.username})

        console.log("wwsi",wishlistitem)
        if(!wishlistitem.length){
            return res.status(200).json({message:"Wishlist is Empty"})
        }
        let Wishlisteditems=[]
        for(var i=0;i<wishlistitem.length;i++){
            Wishlisteditems = Wishlisteditems.concat(await Product.find({_id:wishlistitem[i].product_id}))
        }
        res.status(200).json(Wishlisteditems)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const addToWishlist = async(req,res) =>{
    try{
        const item = await WishList.find({product_id:req.body.product_id})
        if(item.length){
            return res.status(500).json({message:"Item Already Added to Wishlist"})
        }
        const wishlistitem = await WishList.create(req.body)
        res.status(200).json({message:"Added to WishList",wishlistitem})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const removeFromWishList =  async(req,res) =>{
    try{
        const item = await WishList.find({product_id:req.params.id})

        if(!item.length){
            return res.status(500).json({message:"Item doesnt exist"})
        }

        const deleteItem = await WishList.deleteOne({product_id:req.params.id})
        res.status(200).json({message:"Item Removed From Wishlist",deleteItem})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {getWishListItems,addToWishlist,removeFromWishList}