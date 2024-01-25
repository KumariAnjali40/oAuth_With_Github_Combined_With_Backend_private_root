const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    pass:{type:String},
    image:{type:String},
    role:{ type: String,
        enum: ["SuperAdmin", "Admin", "User"],
        default: "User",
        required: true}

}, {
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel,
}