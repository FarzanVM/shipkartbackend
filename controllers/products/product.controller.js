const Product = require('../../models/product.model');

//user
const searchProducts = async(req,res) =>{
    try{
        const keyword = req.params.keyword
        const products =await Product.find({$text:{$search:keyword}})
        if(!products.length){
            return res.status(204).json({message:"No Results Found"})
        }
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({ message: error.message})
    }
}
const getProductsBy =  async(req,res) =>{
    try{
        const item = req.query.item
        const sortBy=req.query.sortby
        const orderBy=req.query.orderby
        const username = req.body.username
        const startRange = req.body.startrange
        const endRange = req.body.endrange
        
        let order=1
        if(orderBy!=='asc'){
            order=-1
        }
        if(username!==null){
            const products = await Product.aggregate([
                {
                    $match:{$text:{$search:item},productnewprice:{$gte:startRange,$lt:endRange}}
                },
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
            ]).sort({productprice:order})
            res.status(200).json(products)
        }
        else{
            const products = await Product.find({$text:{$search:item},productnewprice:{$gte:startRange,$lt:endRange}}).sort({productprice:order})
            res.status(200).json(products)
        }
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}

const getProducts_By_PriceRange =  async(req,res)=>{
    try{

        const item = req.query.item
        const username = req.body.username
        const startRange = req.body.startrange
        const endRange = req.body.endrange

        if(username!==null){
            const products = await Product.aggregate([
                {
                    $match:{$text:{$search:item},productnewprice:{$gte:startRange,$lt:endRange}}
                },
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
            const products = await Product.find({$text:{$search:item},productnewprice:{$gte:startRange,$lt:endRange}})
            res.status(200).json(products)
        }


    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}

const getProducts = async(req,res)=>{
    try{
        const username=req.body.username
        const keyword = req.params.keyword
      
        if(username!==null){

            const products = await Product.aggregate([
                {
                    $match:{$text:{$search:keyword}}
                },
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
            const products=await Product.find({$text:{$search:keyword}})
            res.status(200).json(products)
        } 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
const getSingleProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        const product = await Product.findOne({_id:productId})
        if(!product){
            return res.status(204).json("Product Doesn't Exist")
        }
        return res.status(200).json(product)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
const getProductsByCategory = async(req,res)=>{
    try{
        const category = req.params.category
        const products = await Product.find({productcategory:category})

        if(!products.length){
            return res.status(204).json({message:"Products of this type Doesn't Exist"})
        }

        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}
const getBestDeals =  async(req,res)=>{
    try{
        const products = await Product.find({productdiscount:{$gt:10}})
        res.status(200).json(products)

    }
    catch(error){
        res.status(500).json({messge:error.message})
    }
}

//admin
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

const updateStock = async(req,res) =>{
    try{
        const quantity = req.body.quantity;
        const product =  await Product.find({_id:req.body._id})
        if(!product.length){
            return res.status(500).json({message:"Product doesnt exist"})
        }
        const updateQuantity = await Product.updateOne({_id:req.body._id},{$inc:{productquantity:-quantity}})
        res.status(200).json({message:"Product Quantity Updated"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports = {addProduct,getProducts,getStoreProducts,deleteProduct,updateProduct,getSingleProduct,
    getProductsByCategory,getProductsBy,searchProducts,getBestDeals,getProducts_By_PriceRange,updateStock};