const mongoose=require('mongoose')
const replySchema=new mongoose.Schema({
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
    reply:{
        type:String,
        required:[true,'this feild is required'],
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

const replyModel=mongoose.model("reply",replySchema)
module.exports=replyModel

