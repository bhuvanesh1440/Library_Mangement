const userModel=require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const generateToken=require('../utilities/generateToken');
const { Model } = require("mongoose");
const { use } = require("../routes/user.router");
require('dotenv');


exports.signup = async(req,res) =>{
    const  { name, email, password,phone }  =req.body;
    const isEmailExist =await userModel.findOne({email});
    const isPhoneExist = await userModel.findOne({phone});
    if (isEmailExist || isPhoneExist){
        if(isEmailExist && isPhoneExist){
        return res.status(400).json({success: false,message:"Email and phone Number alredy exist"});
        }
        else if(isEmailExist){
            return   res.status(400).json({success :false , message :"Email already exists"}) ;
        }
        else{
            return   res.status(400).json({success :false , message :"Phone Number already exists"}) ;

        }
    }

        //below codoe will execute if the above logic is not satisfied
        // it means we have a new user
    // password must be encrypt
    const hashedPassword = await bcrypt.hashSync(password,12)
    

    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword,
        phone
        });

        const token =generateToken({email},process.env.secretkey,'1h')

        return res.status(200).json({success :true , message :"User created Successful",user:newUser}) ;

   
}


exports.signin = async (req,res)=> {
    const {email,password}=req.body;
    const user = await userModel.findOne({email});

    if(!user || !(await bcrypt.compare(password,user.password))|| user.isVerified == false){
        return    res.status(400).json({success :false , message :" Invalid password or username"});
    }

    let token =generateToken({
        userId: user._id,
        userEmail: user.email,
        isDeleted: user.isDeleted,
        isVerified:  user.isVerified,
    },process.env.secretkey,'6h');

    await userModel.updateOne({email},{isVerified:true});

    res.status(200).json({success:true,message:"user logged in successfully"})
}

exports.verifyUser= async (req,res)=>{
    const { token } = req.params;
    const decoded = verifyToken(token,process.env.secretkey);

    let isCreateduser = await userModel.findOneAndUpdate(
        {email:decoded.userEmail},
        {isVerified:true},
        {new:true}
    );

    if(isCreateduser){
        return res.send(200).json({success:true,message:"User verified Successfully"});
    }

    next(new Error('User not Verified'));

}


