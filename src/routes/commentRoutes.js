const express=require('express')
const router=express.Router()
const commentController=require('../controllers/commentController')
const authMiddleware=require('../middlewares/authMiddleware')
router.post('/create',authMiddleware,commentController.createCommentController)
router.put('/update/:id',authMiddleware,commentController.updateCommentController)
module.exports=router