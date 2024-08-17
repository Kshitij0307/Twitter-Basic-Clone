const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const router = express.Router();

router.get('/getUser/:id',async (req,res)=> {
    const user = await userModel.findOne({_id:req.params.id});
    return res.status(200).json(user);
});

router.get('/getUsers' , async (req,res)=>{
    const allUsers = await userModel.find({});
    return res.status(200).json(allUsers);
})

router.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;

    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({error:"User already exists"});
    } 
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            
            const newUser = await userModel.create({
                name,
                email,
                password:hash,
            });

            let token = jwt.sign({email:email,userid:newUser._id},process.env.key);
            res.cookie("token",token);
            // console.log(token);
            return res.status(201).json({success:"User registered succesfully"});
        });
    });
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    if(!user) return res.status(401).json({error: "Wrong Email or Password"});

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email:email,userid:user._id},process.env.key);
            res.cookie("token",token);
            return res.status(200).json({success:"Login Successful"});
        }
            
        else
            return res.status(401).json({error: "Wrong Email or Password"});
    });
})

router.get('/logout',(req,res) => {
    res.cookie("token","");
    return res.status(200).json({success:"Logged out Successfully"});
});


module.exports = router;