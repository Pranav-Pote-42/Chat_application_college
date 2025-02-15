import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute= async (req,res)=>{
    const token=req.cookies.jwt;

    try {

        if(!token){
        res.status(401).json({message:"Unauthorized - No token Provided"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded)

    if(!decoded){
        res.status(401).json({message:"unauthorized Invalid token"})
    }

    const user=await User.findById(decoded.userId).select("-password");

    if(!user){
        res.status(404).json({message:"user not found"})
    }

    req.user=user

    next();
        
    } catch (error) {
        console.log("error in protect route");
        res.status(500).json({message:"internal srver error"});
    }


}