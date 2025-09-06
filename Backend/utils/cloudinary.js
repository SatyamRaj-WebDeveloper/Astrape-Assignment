import {v2 as cloudinary} from 'cloudinary';
import { FILE } from 'dns';
import fs from 'fs';


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY  ,
    api_secret : process.env.API_SECRET,
})

const uploadOnCloudinary = async(FilePath)=>{
    try {
        if(!FilePath){
            console.log("Cloudinary :: File Not recieved");
        }
       const url = await cloudinary.uploader.upload(FilePath);
       fs.unlinkSync(FilePath)
       return url;
    } catch (error) {
        if((fs.existsSync(FilePath)))
            fs.unlinkSync(FilePath)
        console.log("Cloudinary :: Upload did not work")
    }
}

export { uploadOnCloudinary}