const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');
const Schema=mongoose.Schema({
    name:{
        type:String,
    },
    images:[
        {
            type:String,
        }
    ],
    color:{
        type:String,
    }
})
const user=mongoose.model('Category',Schema);
module.exports=user;