import mongoose,{Schema} from 'mongoose' ;


const itemSchema = new Schema({
   title : {
    type:String,
    required : true,
   },
   description :{
    type : String,
   },
   Price :{
    type : Number,
    required :true,
    min :0
   },
   imageurl :{type : String }
},{timestamps:true})


export default mongoose.model('Item' , itemSchema);