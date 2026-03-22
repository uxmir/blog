const mongoose=require('mongoose')
const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.Schema.ObjectId,
        ref:"auth",
        required:[true,"this feild is required"]
    },
    blog:{
        type:mongoose.Types.Schema.ObjectId,
        ref:"blog",
        required:[true,"this feild is required"],
    },
    comment:{
        type:mongoose.Types.Schema.ObjectId,
        ref:'comment',
        required:[true,"this feild is required"]
    },
    reply:{
        type:String,
        required:[true,"this feild is required"],
        trim:true,
        lowercase:true
    }
})

const replyModel=mongoose.model("reply",commentSchema)
module.exports=replyModel