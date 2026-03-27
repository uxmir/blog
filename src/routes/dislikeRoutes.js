const express=require("express")
const router=express.Router()
const authMiddleware=require('../middlewares/authMiddleware')
const dislikeController=require("../controllers/dislikeController")
router.post('/create',authMiddleware,dislikeController.createDisLikeController)
router.get('/dislikeall/:id',dislikeController.getAllDisLikeController)
module.exports=router