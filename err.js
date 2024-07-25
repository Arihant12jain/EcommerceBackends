const erro=((err,req,res,next)=>{
    if(err){
        res.status(500).send({msg:err});
    }
})
module.exports=erro;