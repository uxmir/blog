const commentModel = require("../models/commentModel");

const createCommentController = async (req, res) => {
  try {
    const { blog, comment } = req.body;
    if (!blog || !comment) {
      return res.status(400).json({
        message: "each feild is required",
        success: false,
      });
    }
    const userId = req.user._id;
    //creating comment
    const comments = await commentModel.create({
      user: userId,
      blog: blog,
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
const updateCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const {comment}=req.body;
    const userId = req.user._id;
    if(!comment){
      return res.status(404).json({
        message:'comment is required',
        success:true
      })
    }
    const updateComment = await commentModel.findOneAndUpdate(
      { _id: id, user: userId },
      { comment: req.body.comment },
      { new: true },
    );
    return res.status(200).json({
      message: "comment updated successfully",
      success: true,
      updateComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  createCommentController,
  updateCommentController,
};
