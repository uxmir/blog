const express=require('express')
const router=express.Router()
const blogController=require('../controllers/blogController')
router.post('/create',blogController.createBlogController)
router.get('/getData',blogController.getAllBlogController)
router.get('/getData',blogController.getAllBlogUserController)
module.exports=router