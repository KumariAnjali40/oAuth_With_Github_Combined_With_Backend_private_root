const access=(role)=>{
    return (req,res,next)=>{
        if(role.includes(req.role)){
            next();
        }else{
            res.json({msg:"You are not authorized"});
        }
    }
}


module.exports={
    access,
}