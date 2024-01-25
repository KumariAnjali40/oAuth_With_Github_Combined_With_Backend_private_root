const jwt=require('jsonwebtoken');
const {UserModel}=require('../models/user.models');

const auth=async(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1];
      console.log(token);
    //   if (await blackListTokenModel.findOne({ token })) {
    //     return res.json({ msg: "You have been logged out again" });
    //   }
    if(token){
        try{
           const decoded=jwt.verify(token,"Anjali");
           console.log(decoded);
           const {userID}=decoded;
           //to get the role back we are storing the user id not any random payload we are using
           const user=await UserModel.findOne({_id:userID});
        //    const required_role=user?.role //
        //    req.role=required_role;  //adding property inside req object;
           next();
        }
        catch(err){
            res.status(400).json({msg:"You Don't have token"});
            console.log(err);
        }
    }else{
        res.json({msg: "Please Login "})
    }
}

module.exports={
    auth,
}