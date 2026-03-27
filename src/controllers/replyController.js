const replyModel = require("../models/replyModel");

const createReplyController = async (req, res) => {
  try {
    const { blog, comment, reply } = req.body;
    if (!blog || !comment || !reply) {
      return res.status(404).json({
        message: "each feild is required",
        success: false,
      });
    }
    const userId = req.user._id;
    const createReply = await replyModel.create({
      user: userId,
      blog,
      comment,
      reply,
    });
    return res.status(200).json({
      message: "reply is created successfully",
      success: true,
      createReply,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//update reply
const updateReplyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const updateReply = await replyModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { reply: req.body.reply },
      { returnDocument: 'after' },
    );
    return res.status(200).json({
      message: "reply updated successfully",
      success: true,
      updateReply,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  createReplyController,
  updateReplyController,
};
