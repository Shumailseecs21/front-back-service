const mongoose=require("mongoose");

const imageSchema=new mongoose.Schema({
    image:Buffer,
    size:Number,
    imageId:String,
});

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    token:String,
    allocatedStorage:Number,
    usedStorage:Number,
    bandwidthUsed:Number,
    bandwidthAllocated:Number,
    images:[{imageSchema}]
});

module.exports=mongoose.model("User",userSchema);