const commentModel = require("../models/commentModel");

const createCommentController = async (req, res) => {
  try {
    const { user, blog, comment } = req.body;
    if (!user || !blog || !comment) {
      return res.status(400).json({
        message: "each feild is required",
        success: false,
      });
    }
    const userId = req.user._id;
    const blogId = req.blog._id;
    //creating comment
    const comments = await commentModel.create({
      user: userId,
      blog: blogId,
      comment,
    });
    return res.status(200).json({
      message: "data is created successfully",
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//updating commentbyid
const updateCommentController=async(req,res)=>{
    try {
       const {id}=req.params;
       const userId = req.user._id;
       const blogId = req.blog._id;
      const updateComment=await commentModel.findOneAndUpdate(id,userId,blogId,req.body,{new:true})
      return res.status(200).json({
        message:'comment updated successfully',
        success:true,
        updateComment
      })
    } catch (error) {
          return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });  
    }
}
module.exports = {
  createCommentController,
  updateCommentController
};
