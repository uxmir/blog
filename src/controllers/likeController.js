const likeModel = require("../models/likeModel");
const createLikeController = async (req, res) => {
  try {
    const { blog, comment } = req.body;
    const userId = req.user._id;
    if (!blog || !comment) {
      return res.status(404).json({
        message: "blog or comment is missing",
        success: false,
      });
    }
    const isLikeExists = await likeModel.findOne({ user: userId, comment:comment });
    if (isLikeExists) {
      const deleteLike = await likeModel.findByIdAndDelete(isLikeExists._id);
      return res.status(200).json({
        message: "like is deleted",
        success: true,
        deleteLike,
      });
    } else {
      const createLike = await likeModel.create({
        user:userId,
        blog,
        comment
      });
      return res.status(200).json({
        message: "like is created",
        success: true,
        createLike,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
const getAllLikeController = async (req, res) => {
  try {
    const {id}=req.params;
    const allLikes = await likeModel.find({comment:id}).populate("user", "name");
    return res.status(200).json({
      message: "like is found",
      allLikes,
      likeCount: allLikes?.length || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  createLikeController,
  getAllLikeController,
};
