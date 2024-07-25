const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    
    quantity:{
        type:Number,
      
    },
    images:{
        type:String,
    },
    price:{
        type:Number,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
    },
    dataOrdered:{
        type:Date,
        default:Date.now,
       },
})
module.exports=mongoose.model('Order-item',Schema);