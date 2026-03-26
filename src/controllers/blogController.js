const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentModel");
const replyModel = require("../models/replyModel");
const createBlogController = async (req, res) => {
  try {
    const { title, text } = req.body;
    const userId = req.user._id;
    const imageName = req.file ? req.file.filename : "";
    if (!title || !text) {
      return res.status(400).json({
        message: "each  feild is required",
        success: false,
      });
    }
    const createBlog = await blogModel.create({
      user: userId,
      image: imageName,
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
    const { search, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const allBlogs = await blogModel
      .find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    //finding total blogs
    const totalBlogs = await blogModel.countDocuments(query);
    return res.status(200).json({
      message: "data fetched successfully",
      success: true,
      allBlogs,
      totalBlogs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBlogs / limit),
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
    const { search, page = 1, limit = 10 } = req.query;
    const userId = req.user._id;
    const query = { userId };
    if (search) {
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { text: { $regex: search, $options: "i" } },
        ];
      }
    }
    const skip = (page - 1) * limit;
    const allBlogs = await blogModel
      .find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    //finding total blogs
    const totalBlogs = await blogModel.countDocuments(query);
    return res.status(200).json({
      message: "data fetched successfully",
      success: true,
      allBlogs,
      totalBlogs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBlogs / limit),
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
    //replay data
    const allComments = await commentModel
      .find({ blog: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    //replay data
    const allReplies = await replyModel
      .find({ blog: id })
      .populate("user", "name")
      .sort({ createdAt: 1 });

    //mapping all comments with their replies
    const allCommentswithReplies = allComments.map((comment) => {
      const replieswithcomments = allReplies.filter(
        (reply) =>reply.comment && reply.comment.toString() === comment._id.toString(),
      );
      return {
        ...comment._doc,
        replies: replieswithcomments,
      };
    });

    return res.status(200).json({
      message: "data fetched successfully",
      success: true,
      getUserDataById,
      allComments: allCommentswithReplies,
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
