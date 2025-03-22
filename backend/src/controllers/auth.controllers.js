import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup=async (req,res)=>{
    
    const {email,fullName,password}=req.body;

    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password should be of minimum 6 characters."})
        }

        const user=await User.findOne({email})

        if(user){
            return res.status(400).json({message:"Email already exists."})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        })

        if(newUser){

            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({_id:newUser._id,fullName:newUser.fullName,email:newUser.email,profilePic:newUser.profilePic});

        }else{
            res.status(400).json({message:"Invalid User data"})
        }

    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"internal server error"});
    }

};


export const login=async (req,res)=>{

    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({message:"invalid credentials"})
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user.id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,

        })

    }catch(error){
        console.log("error in login controller ",error.message)
        return res.status(500).json({message:"Internal server error !"})
    }
};


export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully ! "})
        
    } catch (error) {

        console.log("Error in logout ontroller");
        res.status(500).json({message:"Internal server error"})
        
    }
};

export const updateProfile = async (req,res)=>{
    const {profilePic} = req.body;
    const userId=req.user._id;

    try{

        if(!profilePic){
        res.status(400).json({message:"Profile Pic is required . "})}

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser);

    }catch(error){

        console.log("Error in update profile");
        res.status(500).json({message:"Internal server error"})

    }


};

export const checkAuth = (req,res)=>{

    try {
        console.log("you are req recved at checkAuth ",req.user)
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error from checkAuth"});
    }
}
