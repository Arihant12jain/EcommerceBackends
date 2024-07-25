
const express = require('express');
const Order = require('../models/order');
const OrderItem = require('../models/Order-item');
const route = express.Router();

route.post('/', async (req, res) => {
   const {status,quantity,images, price, user} = req.body;
 
   try 
   
   {
     
    let savedOrderItem ;
    let newOrderItem;
    
     let existingOrder = await Order.findOne({user});
 let preimage=await OrderItem.findOne({images:images.url,user:user});
if(!preimage){
  newOrderItem = new OrderItem({
    quantity: quantity,
    images:images.url,
    price:price,
    user:user,
    dataOrdered:Date.now()
  }) ;
  console.log("hello");
  savedOrderItem = await newOrderItem.save();
}
   
if (existingOrder) {
      if(preimage){
  preimage.quantity+=1;
        existingOrder.totalPrice += price;
       
        await preimage.save();
        
      }
      
      else{
      
       
        existingOrder.orderItems.push(savedOrderItem._id); 
         existingOrder.totalPrice += price;}
         console.log(savedOrderItem);
         const updatedOrder = await existingOrder.save();
         res.status(200).send(updatedOrder);
     
        
       
      
     }
      else {
       // Create a new order

       const newOrder = new Order({
       orderItems: savedOrderItem._id,
   status:status,
         totalPrice: price,
         user:user,
       });
 
       // Save the new order
       const savedOrder = await newOrder.save();
       console.log("orrder palced");
       res.status(201).send(savedOrder);
     }
   } catch (error) {
    console.log(error);
     res.status(500).send({ message: error.message });
   }
 });
route.get('/allorders',async (req,res)=>{
let order=await Order.find({});
res.send(order);
})
route.get('/:id',async (req,res)=>{
   const order=await Order.findById(req.params.id).populate('user').populate({path:'orderItems',populate:{path:'product'}});
   if(!order) return res.status(404).send('The order with the given ID was');

console.log(order.user.name);
console.log(order.orderItems[0]);
   res.send(order.orderItems);
   })
route.get('/user/:id',async (req,res)=>{
  console.log(req.params.id);
   const order=await Order.find({user:req.params.id}).populate({path:'orderItems'});
   if(!order){
res.status(200).send('User Cart is Empty');
   }

   res.status(200).send(order);
})
route.delete('/deleteid',async (req,res)=>{
  console.log("/fe");
  const {image,user}=req.body;
  console.log(image);
  console.log(user);
  const order1=await OrderItem.findOne({user:user,image:image});
const order=Order.find({});
if(!order1){
  res.send("Item not found")
}
if(order1.quantity<=0){
   order1=await OrderItem.findByIdAndDelete(order1._id);
}
else{
order1.quantity-=1;
// const sa=await order1.save();
}
await order1.save();
res.send(order1);
})
   
route.delete('/delete/orders',async (req,res)=>{
   const order=await Order.findByIdAndDelete(req.params.id).then(async (ordrer)=>{
    if(order){
      ordrer.orderItems.map(async (id)=>{
      await OrderItem.findByIdAndDelete(id);
     })}
     res.send(order);

   }).catch(err=>{
      res.status(404).send('The order with the given ID was not found');
   })
   
})
route.delete('/delete',async (req,res)=>{
  const order=await Order.deleteMany({});
  res.send({msg:"item deleted"});
})
module.exports = route;
