const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload=require('../middlewares/fileMiddleware')
const blogController = require("../controllers/blogController");
router.post("/create", authMiddleware,upload.single('image'), blogController.createBlogController);
router.get("/getdataall", blogController.getAllBlogController);
router.get("/getdata/:id", authMiddleware, blogController.getAllBlogUserController);
router.get("/data/:id", authMiddleware, blogController.getBlogUserDataById);
router.put("/update/:id", authMiddleware, blogController.updateBlogById);
router.delete("/delete/:id", authMiddleware, blogController.deleteBlogById);
module.exports = router;
