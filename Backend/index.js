import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js';
dotenv.config();
const app =express();

app.use(express.json());

const PORT  = process.env.PORT ;

dbConnect()


import userroutes from './routes/User.routes.js'
import itemroutes from './routes/item.routes.js';
app.use('/api/v1' , userroutes);
app.use('/api/v1' , itemroutes);

app.listen(PORT ,()=>{
   console.log( `Sample app is Listening on Port ${PORT}`);
})

