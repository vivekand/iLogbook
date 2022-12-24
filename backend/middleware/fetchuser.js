const jwt = require("jsonwebtoken");
const JWT_SECRET = "Whereareyou$going";
const fetchuser=(req,res,next)=>{
    // get user from the jwt token and id to req object
    const token= req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"}) // please use a token-(this status will only run when token will empty)
    } 

    try {
        const data =jwt.verify(token,JWT_SECRET);
        // console.log(data);
    req.user=data.user;
    // req.user=data.user;
    next();
        
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }

    
}
module.exports=fetchuser;