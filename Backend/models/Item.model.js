import mongoose,{Schema} from 'mongoose' ;


const itemSchema = new Schema({
   title : {
    type:String,
    required : true,
   },
   description :{
    type : String,
   },
   price :{
    type : Number,
    required :true,
    min :0
   },
   stock :{
      type: Number,
       default: 0
   },
   category :{
      type: String,
       required: true 
   },
   imageurl :{type : String }
},{timestamps:true})


export default mongoose.model('Item' , itemSchema);