const express = require("express")
const app=express()
const mongoose = require("mongoose")
const cors = require('cors')
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const productRoute = require('./routes/product.route');

app.use(cors())

//to allow json data 
app.use(express.json({limit:'10mb'}));
//to allow from data
app.use(express.urlencoded({extended:false}));


app.listen(3000,()=>{
    console.log("App is listening on port 3000")
})

app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/product',productRoute)

mongoose.connect("mongodb+srv://farzanmohan:Vm5wPVmYgvfpaGuz@shipkartdb.usxzsgl.mongodb.net/shipKartAPI?retryWrites=true&w=majority&appName=shipkartDB")
.then(()=>{
    console.log("connected to mongodb successfully")
})
.catch(()=>{
    console.log("connection failed")
})