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
        const product =  await Product.find({});
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getStoreProducts = async(req,res) =>{
    try{
        const products = await Product.find({storename:req.body.storename});
        if(!products.length){
            return res.status(500).json({message:"Products related to this store doesnt exist"})
        }
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {addProduct,getProducts,getStoreProducts};