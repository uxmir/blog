const blogModel = require("../models/blogModel");
const createBlogController = async (req, res) => {
  try {
    const {  title, text } = req.body;
    const userId = req.user._id;
    const imageName=req.file?req.file.filename:""
    if (!title || !text) {
      return res.status(400).json({
        message: "each  feild is required",
        success: false,
      });
    }
    const createBlog = await blogModel.create({
      user: userId,
      image:imageName,
      title,
      text,
    });
    return res.status(200).json({
      message: "blog created successfully",
      success: true,
      createBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//get all data
const getAllBlogController = async (req, res) => {
  try {
    const getAllBlog = await blogModel.find({});
    return res.status(200).json({
      message: "all blog fetched successfully",
      success: true,
      getAllBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//get all data by following userId
const getAllBlogUserController = async (req, res) => {
  try {
    const getBlogUser = await blogModel.find({ user: req.user._id });
    return res.status(200).json({
      message: "data fetched successfully",
      success: true,
      getBlogUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
//get single data by id
const getBlogUserDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserDataById = await blogModel.findById(id);
    return res.status(200).json({
      message: "data fetched successfully",
      success: true,
      getUserDataById,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBlogById = await blogModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: req.body },
      { new: true },
    );
    return res.status(200).json({
      message: "data updated successfully",
      success: true,
      updateBlogById,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//delete data
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlogById = await blogModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deleteBlogById) {
      return res.status(400).json({
        message: "data is not deleted",
        success: false,
      });
    }
    return res.status(200).json({
      message: "data deleted successfully",
      success: true,
      deleteBlogById,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  createBlogController,
  getAllBlogController,
  getAllBlogUserController,
  getBlogUserDataById,
  updateBlogById,
  deleteBlogById,
};
