const mongoose=require('mongoose')
const commentSchema=new mongoose.Schema({
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
        type:String,
        required:[true,"this feild is required"],
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

const commentModel=mongoose.model("comment",commentSchema)
module.exports=commentModel

