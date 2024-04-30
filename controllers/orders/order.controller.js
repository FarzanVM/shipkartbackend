const Order=require('../../models/order.model')
const Product = require('../../models/product.model')

const getOrders=async(req,res)=>{
    try{
        const order = await Order.find({username:req.body.username})
        if(!order.length){
            return res.status(500).json({message:"No running Orders"})
        }
        orderitems=[]
        for(var i=0;i<order.length;i++){
            orderitems = orderitems.concat(await Product.findOne({_id:order[i].product_id}))
        }
        res.status(200).json(orderitems)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const addOrder = async(req,res) =>{
    try{
        const order = await Order.findOne({product_id:req.body.product_id,username:req.body.username})
        if(order){
            return res.status(500).json({message:"Item already Ordered"})
        }
        const neworder = Order.create(req.body)
        res.status(200).json({message:"Item Successfully Ordered"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const updateOrder = async(req,res) =>{
    try{
        const order = await order.find({_id:req.body._id,storename:req.body.storename})
        if(!order.length){
            return res.status(500).json({message:"Order Doesn't Exist"})
        }
        const updatedorder = Order.update({_id:req.body._id}, {$set :{orderstatus:req.body.orderstatus}})
        res.status(200).json({message:"Order Updated Successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getStoreOrders = async(req,res)=>{
    try{
        const order = await order.find({storename:req.body.storename})
        if(!order.length){
           return res.status(500).json({message:"No Order as of yet"})
        }
        storeOrders=[]
        for(var i=0;i<order.length;i++){
            storeOrders=storeOrders.concat(await Product.findOne({_id:order[i].product_id}))
        }
        res.status(200).json(storeOrders)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {getStoreOrders,getOrders,updateOrder,addOrder}
