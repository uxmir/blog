const blogModel=require('../models/blogModel')

const createBlogController=async(req,res)=>{
    try {
     const {user,image,title,text}=req.body;
     const userId=req.user._id
     if(!userId || !title || !text){
        return res.status(400).json({
            message:'each  feild is required',
            success:false
        })
     }  
     const createBlog=await blogModel.create({
        userId,
        image,
        title,
        text
     }) 
     return res.status(200).json({
        message:'blog created successfully',
        success:true
     })
    } catch (error) {
        return res.status(500).json({
            message:`there is an error ${error.message}`,
            success:false
        })
    }
}

//get all data
const getAllBlogController=async(req,res)=>{
    try {
       const getAllBlog=await blogModel.find({})
       return res.status(200).json({
        message:'all blog fetched successfully',
        success:true
       }) 
    } catch (error) {
        return res.status(500).json({
            message:`there is an error ${error.message}`,
            success:false
        })
    }
}

//get all data by following userId
const getAllBlogUserController=async(req,res)=>{
    try {
        const userId=req.user._id;
        const getBlogUser=await blogModel.find({userId})
        return res.status(200).json({
            message:'data fetched successfully',
            success:true,
            getBlogUser
        })

    } catch (error) {
        return res.status(500).json({
            message:`there is an error ${error.message}`,
            success:false
        })
    }
}
module.exports={
createBlogController,
getAllBlogController,
getAllBlogUserController

}