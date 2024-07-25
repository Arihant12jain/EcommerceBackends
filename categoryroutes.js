const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2;


router.get('/users', async (req, res) => {
    const category = await Category.find({});
    if (!category) {
        res.send({ result: 'Wrong Password' });
    } else {
        res.send(category);
    }
});

router.post('/users', async (req, res) => {
   
       const imgurl=req.body.images.map((image)=>{
return image
       })
        const data = {
            images: imgurl,
            name: req.body.name,
            color: req.body.color,
        };

        await Category.insertMany([data]).then((category)=>{
        if(!category){
            res.status(404).send({result:'Category cant be created'})
        }
        else{
            res.send(category);
        }
        });
       
    })

    router.delete('/:id',async (req,res)=>{
        const id=req.params.id;
    const category=await Category.findByIdAndDelete(id).then((category)=>{
        if(!category){
            res.status(404).send({result:'Category cant be Deleted'})
        }
        else{
            res.send(category);
        }
        }).catch((err)=>{
            res.status(404).send({result:err})
        });
    res.send(category);
})
router.put(':/id',async (req,res)=>{
    const imgurl=req.body.images.map((image)=>{
        return image
               })
    const category=await Category.findByIdAndUpdate(req.params.id,
      
        {
            name:req.body.name,
            images:imgurl,
            color:req.body.color,

        },
        {new:true}
    )
    if(!category){
        res.status(404).send({result:'Category cant be updated'})
    }
    res.send(category);
})
router.delete('/delete',async (req,res)=>{
    try {
        // Find all category IDs
        const categories = await Category.find({}, '_id').exec();
        const categoryIds = categories.map(category => category._id);
    
        // Validate each category ID
        const validCategoryIds = categoryIds.filter(id => mongoose.Types.ObjectId.isValid(id));
    
        if (validCategoryIds.length === 0) {
          throw new Error('No valid ObjectIds found for deletion');
        }
    
        // Delete all valid categories
        await Category.deleteMany({
          _id: {
            $in: validCategoryIds
          }
        });
    
        console.log('All valid categories deleted successfully');
      } catch (error) {
        console.error('Error deleting categories:', error.message);
   
      }
  })
module.exports = router;
