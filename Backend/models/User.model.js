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
    password :{
        type : String ,
        required : true,
    },
    cart : [cartItemSchema],
},{timestamps:true})


export default mongoose.model('User', userSchema);