const express=require("express")
const router=express.Router()
const authMiddleware=require('../middlewares/authMiddleware')
const likecontroller=require('../controllers/likeController')
router.post('/create',authMiddleware,likecontroller.createLikeController)
router.get('/likeall/:id',likecontroller.getAllLikeController)
module.exports=router
