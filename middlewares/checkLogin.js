const jwt=require('jsonwebtoken');
const checkLogin=(req,res,next)=>{
    try {
        const { authorization }=req.headers
        const token=authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
       next();
      } catch(err) {
        next('Authentication failed')
      }
}
module.exports=checkLogin;