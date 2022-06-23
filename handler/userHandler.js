const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const user=require('../Schema/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/signup',async(req,res)=>{
    try{
        console.log(req.body)
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        const newUser= new user({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        await newUser.save();
        res.status(200).json({
            message:'signup successful'
        })
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
})


module.exports=router;