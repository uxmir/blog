const mongoose=require('mongoose')
const likeSchema=new mongoose.Schema({
       user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"auth",
           required:[true,"this feild is required"]
       },
       blog:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"blog",
           required:[true,"this feild is required"],
       },
       comment:{
             type:mongoose.Schema.Types.ObjectId,
           ref:"comment",
           required:[true,"this feild is required"],
       },
       like:{
        type:String,
       } 
})

const likeModel=mongoose.model("like",likeSchema)
module.exports=likeModel