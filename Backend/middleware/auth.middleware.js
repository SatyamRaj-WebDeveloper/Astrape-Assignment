import jwt from 'jsonwebtoken';
import User from  './models/User.model.js'
const verifyjwt =async(req,res,next)=>{
   try {
     const token = req.header("Authorization")?.replace("Bearer " , "").trim()
     if(!token){
        res.status(401).json({message :"No Token Found"});
     }
     const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
      const user = await User.findById(decodedToken?._id).select('-Password')
        if(!user){
            return res.status(401).json({message:"Token Not Verified"})
        }
        req.user = user;
        next();
   } catch (error) {
       return res.status(400).json({message:"Error in Verify JWT Function "})
   }
}

export default verifyjwt;