const jwt=require("jsonwebtoken")

const admin=(req,res,next)=>{
const token=req.headers.adminorization?.split(" ")[1]
if(token){
    jwt.verify(token, 'masai', (err, decoded)=> {
       if(decoded){
        // console.log(decoded)
        req.body.username=decoded.username
        next()
       }
  
       else{
        res.send({"msg":"You are not Authorised"})
       }
      })
}else{
    res.send({"msg":"You are not Authorised"})
}
}
module.exports={admin}