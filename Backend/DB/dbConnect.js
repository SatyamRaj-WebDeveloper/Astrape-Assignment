import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default function dbConnect(){
   try {
    return mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB Connected Successfully"))
   } catch (error) {
     console.log(`Error in DB Connection ${error}`);
   }

}