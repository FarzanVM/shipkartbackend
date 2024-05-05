const Product = require('../../models/product.model');


const addProduct = async(req,res)=>{
    try{
        const product =  await Product.findOne({productname:req.body.productname,
            storename:req.body.storename
        })
        if(product){
            return res.status(500).json({ message: "Product already Exist in the Store" })
        }
        const newProduct = Product.create(req.body)
        res.status(200).json({ message: "Product Added successfully"})
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}
const getProducts = async(req,res)=>{
    try{
        const username=req.params.username
        console.log("username",username)
        if(username!=="null"){
            console.log("herede")
            const products = await Product.aggregate([
                {
                    $lookup:{
                        from:'wishlists',
                       let:{"id":"$_id"},
                       pipeline:[
                        {
                            $match:{
                                $expr:{$and:[{$eq:["$product_id","$$id"]},{username:req.params.username}]}
                            }
                        }
                       ],
                        as:'wishlisted'
                    }
                }
            ])
            res.status(200).json(products)
        }
        else{
            const products=await Product.find({})
            console.log("here")
            res.status(200).json(products)
        } 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getStoreProducts = async(req,res) =>{
    try{
        const products = await Product.find({storename:req.body.storename});
        if(!products.length){
            return res.status(204).json({message:"Products related to this store doesnt exist"})
        }
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
const deleteProduct =  async(req,res) =>{
    try{
        const product =  await Product.find({_id:req.params.id});
        if(!product.length){
            return res.status(500).json({message:"Product doesnt exist"})
        }
        const deletedProduct =  await Product.deleteOne({_id:req.params.id});
        res.status(200).json(deletedProduct)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const updateProduct = async(req,res) =>{
    try{
        const product =  await Product.find({_id:req.body._id});
        if(!product.length){
            return res.status(500).json({message:"Product doesnt exist"})
        }
        const updatedProduct = await Product.updateOne({_id:req.body._id}, {$set : req.body})
        res.status(200).json({message:"Product Updated"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports = {addProduct,getProducts,getStoreProducts,deleteProduct,updateProduct};