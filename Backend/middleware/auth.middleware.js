import jwt from 'jsonwebtoken';
import User from  '../models/User.model.js'

const verifyjwt =async(req,res,next)=>{
   try {
     const token = req.header("Authorization")?.replace("Bearer " , "").trim()
     if(!token){
        res.status(401).json({message :"No Token Found"});
     }
     const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
     console.log(decodedToken);
      const user = await User.findById(decodedToken?.id).select('-Password')
      console.log(user);
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