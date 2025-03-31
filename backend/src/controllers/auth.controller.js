import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"

export const signup =  async (req, res)=>{
    const {fullName, email, password    } = req.body
    try {
        if(password.length <6){
            return res.status(400).json({message: "password must be at least 6 characters long"});
        }
        const user= await User.findOne({email})

        if(user) return res.status(400).json({message: "email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser= new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        }
        else{
            res.status(400).json({message: "invalid user data"});
        }



    }
    catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
    
};

export const login = async (req, res)=>{
    const{email,password}= req.body
    try{
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
            
            generateToken(user._id,res)

            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            });
        }
    
    catch(error){
        console.log("Error in Login  controller: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const logout =  (req, res)=>{
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message: "Logges out successfully"});
    }
    catch(error){
        console.log("error in logout controller", error.message);
        res.status(500).json({message:"Internal server Error"});
    }
};

export const updateProfile= async(req,res)=>{
    try {
        const{profilePic}= req.body.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("error in update Profile:", error);
        res.status(500).json({message: "Internal server error"});
    }
    
};


export const checkAuth= (req, res) =>{
    try {
        res.status(200).json(res.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        // res.status(500).json({message: "Internal Server Error"});
    }
};