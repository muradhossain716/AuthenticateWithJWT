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
            'error':err
        })
    }
})
router.post('/login',async(req,res)=>{
    try{
        const logUser=await user.find({username:req.body.username})
        if(logUser && logUser.length>0){
            const isPasswordValid=await bcrypt.compare(req.body.password, logUser[0].password);
            
            if(isPasswordValid){
                
                const token = jwt.sign({
                    username:logUser[0].username,
                    userId:logUser[0]._id
                }, process.env.SECRET_KEY, { expiresIn: '1h' })
                res.status(401).json({
                    'message':'login successful',
                    'access_token':token
                })
            }
        }
    }
    catch(err){
        res.status(500).json({
            'error':'authentication failed'
        })
    }
})

module.exports=router;