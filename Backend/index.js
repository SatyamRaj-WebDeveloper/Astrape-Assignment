import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './DB/dbConnect.js';
import cors from "cors";
dotenv.config();
const app =express();

app.use(express.json());

const PORT  = process.env.PORT ;

dbConnect()

app.use(cors({
  origin: "http://localhost:3000", // Next.js runs on 3000
  credentials: true
}));

import userroutes from './routes/User.routes.js'
import itemroutes from './routes/item.routes.js';
import cartroutes from './routes/cart.routes.js';

app.use('/api/v1' , userroutes);
app.use('/api/v1' , itemroutes);
app.use('/api/v1/cart' , cartroutes);

app.listen(PORT ,()=>{
   console.log( `Sample app is Listening on Port ${PORT}`);
})

