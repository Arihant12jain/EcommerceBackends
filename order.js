const mongoose=require('mongoose');
const OrderSchema=mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
   ref:'Order-item',
   required:true,
    }],
   
    city:{
        type:String,
    },
   
   status:{
    type:String,
   },
   totalPrice:{
    type:Number,
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
   },
 
})
const Orders=mongoose.model('Order',OrderSchema);
module.exports=Orders;