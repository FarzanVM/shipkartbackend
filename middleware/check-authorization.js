const jwt  = require('jsonwebtoken');

const checkAuth = async(req,res,next)=>{
    try{
        // console.log("header",req.headers.authorization)
        //for req from postman
        // const token = req.headers.authorization.split(" ")[1];
        // console.log("token",token)
        //for req from backend
        const token = req.headers.authorization.substr(3)
        const decoded = jwt.verify(token,'secret');
        req.userData = decoded;
        next();
    }
    catch(error){
        console.log('got error');
        return res.status(500).json({
            message:"Authorization failed"
        });
    }
    
}
module.exports ={ checkAuth};