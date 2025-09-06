import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js';
dotenv.config();
const app =express();


const PORT  = process.env.PORT ;

dbConnect()



app.listen(PORT ,()=>{
   console.log( `Sample app is Listening on Port ${PORT}`);
})

