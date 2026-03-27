const dislikeModel = require("../models/likeModel");
const likeModel = require("../models/dislikeModel");
const createDisLikeController = async (req, res) => {
  try {
    const { blog, comment } = req.body;
    const userId = req.user._id;
    if (!blog || !comment) {
      return res.status(404).json({
        message: "blog or comment is missing",
        success: false,
      });
    }
    //deleting like at first
    await likeModel.findOneAndDelete({user:userId,comment:comment});
    //now handling dislike logic
    const isDisLikeExists = await dislikeModel.findOne({
      user: userId,
      comment: comment,
    });
    if (isDisLikeExists) {
      const deleteDisLike = await dislikeModel.findByIdAndDelete(
        isDisLikeExists._id,
      );
      return res.status(200).json({
        message: "Dislike is deleted",
        success: true,
        deleteDisLike,
      });
    } else {
      const createDisLike = await dislikeModel.create({
        user: userId,
        blog,
        comment,
      });
      return res.status(200).json({
        message: "Dislike is created",
        success: true,
        createDisLike,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
const getAllDisLikeController = async (req, res) => {
  try {
    const { id } = req.params;
    const allDisLikes = await dislikeModel
      .find({ comment: id })
      .populate("user", "name");
    return res.status(200).json({
      message: "Dislike is found",
      allDisLikes,
      dislikeCount: allDisLikes?.length || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  createDisLikeController,
  getAllDisLikeController,
};
