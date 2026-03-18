const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.post(
  "/update-password",
  authMiddleware,
  authController.updatePasswordController,
);
router.post(
  "/reset-password",
  authMiddleware,
  authController.resetPasswordController,
);
module.exports = router;
