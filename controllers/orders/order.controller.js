const Order=require('../../models/order.model')
const Product = require('../../models/product.model')

const getOrders=async(req,res)=>{
    try{
        const order = await Order.find({username:req.body.username})
        if(!order.length){
            return res.status(204).json({message:"No running Orders"})
        }

        const orderedProducts =await Order.aggregate([   
            {
                $match:{username:req.body.username}
              },
            {
            $lookup:{
                from:'products',
                localField:'product_id',
                foreignField:'_id',
                as:'products'
            }},
            {
                $unwind:'$products'
            },
            {
                $project:{
                    orderstatus:1,
                    quantity:1,
                   'products.productname':1,
                   'products.productnewprice':1,
                   'products.storename':1,
                   'products.productimg':1,
    
                }
            }
        ])
        
        res.status(200).json(orderedProducts)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getCurrentOrders=async(req,res) =>{
    try{
        console.log(req.body.username)
        const order = await Order.find({$and:[{username:req.body.username},{'orderstatus.inprogress.status':'true'}]})
        console.log("oor",order)
        if(!order.length){
            return res.status(204).json({message:"No running Orders"})
        }

        const orderedProducts =await Order.aggregate([   
            {
                $match:{$and:[{username:req.body.username},{'orderstatus.inprogress.status':true,'orderstatus.confirmed.status':false}]}
              },
            {
            $lookup:{
                from:'products',
                localField:'product_id',
                foreignField:'_id',
                as:'products'
            }},
            {
                $unwind:'$products'
            },
            {
                $project:{
                    orderstatus:1,
                    quantity:1,
                   'products.productname':1,
                   'products.productnewprice':1,
                   'products.storename':1,
                   'products.productimg':1,
                    'products.productdiscount':1
    
                }
            }
        ])
        
        res.status(200).json(orderedProducts)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const addOrder = async(req,res) =>{
    try{
        const neworder = await Order.insertMany(req.body)
        console.log("order",req.body)
        res.status(200).json({message:"Item Successfully Ordered"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const updateOrder = async(req,res) =>{
    try{
        const order = await Order.findOne({_id:req.body._id})
        if(!order){
            return res.status(500).json({message:"Order Doesn't Exist"})
        }
        
        const key = req.body.orderstatus
        const date = req.body.date
        
        const statuspath = `orderstatus.${key}.status`
        const datepath = `orderstatus.${key}.date`
        const updatedorder =await  Order.updateOne({_id:req.body._id}, {$set :{[statuspath]:true,[datepath]:date}})
        res.status(200).json({message:"Order Updated Successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const updateBulkOrder =  async(req,res) =>{
    try{
        const bulkorder = req.body.map(obj =>{
            return {
                updateOne:{
                    filter:{
                        _id:obj._id
                    },
                    update:{
                       'orderstatus.confirmed.status':true,
                       'orderstatus.confirmed.date':obj.date
                    }
                }
            }

        })
        Order.bulkWrite(bulkorder).then((response)=>{
            res.status(200).json({message:"Order Successfully Placed"})
        })

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}

const deleteBulkOrder = async(req,res)=>{
    try{
        const bulkorder = req.body.map(obj =>{
            return {
                deleteOne:{
                    filter:{
                        _id:obj._id
                    },
                    delete:{
                       'orderstatus.inprogress.status':true,
                    }
                }
            }

        })
        Order.bulkWrite(bulkorder).then((response)=>{
            res.status(200).json({message:"Order Deleted Successfully"})
        })
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getStoreOrders = async(req,res)=>{
    try{
        const order = await Order.find({storename:req.body.storename})
        if(!order.length){
           return res.status(204).json({message:"No Orders as of yet"})
        }
        
        const storeOrders = await Order.aggregate([
            {
                $match:{storename:req.body.storename}
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
                    orderstatus:1,
                    username:1,
                    'products.productimg':1,
                    'products.productname':1
                }
            }
        ])
        res.status(200).json(storeOrders)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {getStoreOrders,getOrders,updateOrder,addOrder,getCurrentOrders,updateBulkOrder,deleteBulkOrder}
