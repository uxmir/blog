const likeModel = require("../models/likeModel");
const createLikeController = async (req, res) => {
  try {
    const { blog, comment } = req.body;
    const userId = req.user._id;
    if (!blog || !comment) {
      return res.status(404).sjon({
        message: "blog or comment is missing",
        success: false,
      });
    }
    const isLikeExists = await likeModel.findOne({ id: userId });
    if (isLikeExists) {
      const deleteLike = await likeModel.deleteById({ id: userId });
      return res.status(200).json({
        message: "like is deleted",
        success: true,
        deleteLike,
      });
    } else {
      const createLike = await likeModel.create({
        id: _id,
        like,
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
    const allLike = await likeModel.find().populate("user", "name");
    return res.status(200).json({
      message: "like is found",
      allLike,
      likelength: allLike?.length,
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
