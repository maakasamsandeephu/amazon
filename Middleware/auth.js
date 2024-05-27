const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{

    try{
        const token = req.header('x-auth-token');
        if(!token){
            return res.Status(401).json({msg:"no auth token, access denied!"})
        }

        const jwtVerify = jwt.verify(token,"passwordKey");

        if(!jwtVerify){
            return res.Status(401).json({msg:"Token verification failed, Autherization denied"})
        }

        req.user = jwtVerify.id;
        req.token = token;
        next();


    }catch(e){
        res.Status(500).json({error : e.message});
    }
}

module.exports = auth;