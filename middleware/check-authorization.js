const jwt  = require('jsonwebtoken');

const checkAuth = async(req,res,next)=>{
    try{
        console.log("header",req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1];
        console.log("token",token)
        const decoded = jwt.verify(token,'secret');
        console.log("decoded",decoded)
        req.userData = decoded;
        console.log(req.userData)
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