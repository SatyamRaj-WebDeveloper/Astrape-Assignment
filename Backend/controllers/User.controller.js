import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
// import verifyjwt from  '../middleware/auth.middleware.js'



const signUp = async(req , res)=>{
    const {email,password,username, role} = req.body;

   try {
     if(!email || !password || !username || !role){
        return res.status(400).json({message:"Invalid Data Entered"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"user already exists" , data : existingUser});
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        username : username,
        email : email,
        Password : hashedPassword,
        role : role
    })
    await user.save();
    if(!user){
        console.log("Register User :: User Not Created");
    }
    return res.status(201).json({message:"User Created Successfully"});
   } catch (error) {
      return res.status(400).json({message :" Error in RegisterUser function", error})
   }
}

const loginUser = async(req,res)=>{
    const {email ,password} = req.body;
    try {
        if(!email || !password){
            return res.status(401).json({message:"Invalid Constraintss"});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials : No User Found"});
        }
        const matchedPassword = await bcrypt.compare(password , user.Password);
        if(!matchedPassword){
           return res.status(400).json({message:"Invalid Password"});
        }
        const token = jwt.sign(
            {id : user._id , email : user.email},
            process.env.JWT_SECRET,
            {expiresIn : "3d"}
        )
        return res.status(200).json({message:"User Logged In Successfully" , data:{user , token}})
    } catch (error) {
          console.error(error);
          res.status(500).json({ message: "User Login Failed", error: error.message });
    }
}


export {
    signUp,
    loginUser,
}