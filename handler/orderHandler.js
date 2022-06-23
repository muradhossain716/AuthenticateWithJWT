const express=require('express');
const router=express.Router()
const mongoose=require('mongoose');
const checkLogin=require('../middlewares/checkLogin')

router.post('/addToCart',checkLogin,(req,res)=>{
    res.status(200).json({
        'message':'add to cart successful'
    })
})
module.exports=router;