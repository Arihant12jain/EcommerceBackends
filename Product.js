const Category=require('../models/Category');
const Product=require('../models/Product');
const express=require('express');
const mongoose=require('mongoose')
const route=express.Router();
route.get('/product',async (req,res)=>{
    const products=await Product.find({}).populate('category');
    if(!products){
        res.send({msg:"Not Found"});
    }
res.send(products);
})
route.get('/product/:id',async (req,res)=>{


const product=await Product.findById(req.params.id);
if(!product){
    res.send({msg:"Invalid Product"});
}
res.send(product);
})
route.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const product= await Product.findByIdAndDelete(id);
    if(!product){
        res.status(404).send({err:"Wrong Id"});
    }
    res.send(product);
})
route.post('/create',async (req,res)=>{
    const product=await Category.findById(req.body.category);
if(!product){
    console.log(req.body.category);
    res.send("Invalid CAtegory");
}
else{
const im=req.body.images.map((image)=>{
 return image;
})
    const data={
   name:req.body.name,
description:req.body.des,
brand:req.body.brand,
images:im,
price:req.body.price,
category:req.body.category,
countIn:req.body.count,
review:req.body.rev,
isFeatured:req.body.isFeatured,
}
Product.insertMany([data]);
res.send(data);
}

})
route.put('/change/:id',async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.send('Invalid Project ID');
    };
    const prodiuct=await Category.findById(req.body.category);
    if(!prodiuct){
        console.log(req.body.category);
        res.send("Invalid CAtegory");
    }
    const {id}=req.params.id;
    const im=req.body.images.map((image)=>{
        return image;})

    const product=await Product.findByIdAndUpdate(
        id,{
        
            name:req.body.name,
description:req.body.des,
brand:req.body.brand,
images:im,
price:req.body.price,
category:req.body.category,
countIn:req.body.count,
review:req.body.rev,
        },
        {new:true},
)
if(!product){
    res.send("User Not Found");
}})
route.get('/count',async (req,res)=>{
    const count=await Product.countDocuments();
    res.send({count});
})
route.delete('/delete',async (req,res)=>{
    const order=await Product.deleteMany({});
    res.send({msg:"item deleted"});
  })
module.exports=route;