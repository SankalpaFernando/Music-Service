const jwt = require('jsonwebtoken')
const decodeToken=async(req,res,next)=>{
    const {token} = req.query;
    const decoded = jwt.decode(token);
    if(decoded.verified){
      if(decoded.token==="Aws1452@1234"){
        next();
        return
      }
      res.boom.unauthorized();
    }
    res.boom.unauthorized();
}
const userLogIn=async(req,res,next)=>{
    if(req.session.logIn){
        next()
        return
    }
    res.boom.unauthorized();
}


module.exports ={decodeToken,userLogIn}