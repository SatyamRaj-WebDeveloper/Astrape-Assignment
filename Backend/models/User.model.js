import mongoose ,{Schema} from 'mongoose';
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,  // reference to Product model
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const userSchema = new Schema ({
    name  : {
        type :String,
        required : true
    },
    email :{
        type : String ,
        required : true,
    },
    Password :{
        type : String ,
        required : true,
        unique : true
    },
    role:{
      type : String,
      enum : ["customer" , "admin"],
      default :"customer"
    },
    cart : [cartItemSchema],
},{timestamps:true})





export default mongoose.model('User', userSchema);