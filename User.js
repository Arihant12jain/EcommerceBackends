const Category=require('../models/Category');
const Product=require('../models/Product');
const express=require('express');
const mongoose=require('mongoose')
const User=require('../models/User')
const bcrypt=require('bcrypt');
const route=express.Router();
const jwt=require('jsonwebtoken');
route.post('/login',async (req,res)=>{
  
    const one=await User.findOne({name:req.body.name});
    if(!one){
        res.status(400).json({message:"User not found"});
    }
    console.log('Incorrect')
  if(one){  
    console.log(req.body.password);
    console.log(one.password);
if(req.body.password===one.password){
    const secret="secret"
   const token=jwt.sign(
    
    {userId:one.id,
      
    }
   ,
   secret,
   {expiresIn:'1h'}
  
   )
   res.json(one);   
} 
res.send({msg:"error"})

}

})
route.delete('/User/:id',async (req,res)=>{
    const result=await User.deleteOne({_id:req.params.id}); 
    return res.send(result);  
   })
route.get('/User',async (req,res)=>{
    const result=await User.find({}).populate('product');
  
    res.send(result);
})
route.post('/signup',async (req,res)=>{
    
    const data=new User({
        name:req.body.name,
        email:req.body.email,

        password:req.body.password,

    })
    console.log(data)
   
const data1=await data.save();

res.send({msg:"login Please"});

})
route.get('/:id',async (req,res)=>{

    const result=await User.findOne({_id:req.params.id}).populate('product');
     console.log(result);
    res.send(result);
})
route.delete('/delete',async (req,res)=>{
    const order=await User.deleteMany({});
    res.send({msg:"item deleted"});
  })
module.exports=route;