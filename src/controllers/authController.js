const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;
    if (!name || !email || !password || !answer) {
      return res.status(400).json({
        message: "each feild is required",
        success: false,
      });
    }
    const isExist = await authModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        message: "this email is already taken",
        success: false,
      });
    }
    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating user
    const user = await authModel.create({
      name,
      email,
      password: hashedPassword,
      answer,
    });
    //creating token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true });
    user.password = undefined;
    return res.status(200).json({
      message: "user has been created successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

//login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "each feild is required",
        success: false,
      });
    }
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "this email is not exists",
        success: false,
      });
    }
    //comapring password
    const comparedPassword = await bcrypt.compare(password, user?.password);
    if (!comparedPassword) {
      return res.status(400).json({
        message: "this password is not exists",
        success: false,
      });
    }
    //creating token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true });
    user.password = undefined;
    return res.status(200).json({
      message: "user has been logged successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error in logincontroller ${error.message}`,
      success: false,
    });
  }
};

//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, password, answer } = req.body;
    if (!email || !password || !answer) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    const user = await authModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      }); 
    }
    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      message: "password has been reset successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
    });
  }
};

//update password
const updatePasswordController = async (req, res) => {
  try {
    const userId = req.body._id;
    const user = await authModel.findOne(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    const { oldPassword, newPassword } = req.body;
    const ismatch = await bcrypt.compare(oldPassword, user.password);
    if (!ismatch) {
      return res.status(400).json({
        message: "oldpassword not found",
        success: false,
      });
    }
    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      message: "password has been updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};
module.exports = {
  registerController,
  loginController,
  updatePasswordController,
  resetPasswordController
};
