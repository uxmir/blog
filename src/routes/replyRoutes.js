const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const replyController = require("../controllers/replyController");
router.post("/create", authMiddleware, replyController.createReplyController);
router.put("/data/:id", authMiddleware, replyController.updateReplyController);
module.exports = router;
