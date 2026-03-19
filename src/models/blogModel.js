const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.Schema.objectId,
        ref:"auth",
        required:[true,"this feild is required"]
    },
    image:{
        type:String,
    },
    title:{
        type:String,
        required:[true,"title is required"],
        trim:true,
        lowercase:true
    },
    text:{
      type:String,
      required:[true,'text is required'],
      trim:true,
      lowercase:true  
    }
},{
    timestamps:true
})
const blogModel=mongoose.model("blog",blogSchema)
module.exports=blogModel