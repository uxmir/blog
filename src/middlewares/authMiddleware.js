const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "user unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({
      message: `there is an error ${error.message}`,
      success: false,
    });
  }
};

module.exports=authMiddleware