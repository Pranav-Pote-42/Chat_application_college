import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute= async (req,res,next)=>{
    const token=req.cookies.jwt;

    try {

        if(!token){
        return res.status(401).json({message:"Unauthorized - No token Provided"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)


    if(!decoded){
        return res.status(401).json({message:"unauthorized Invalid token"})
    }

    const user=await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    req.user=user

    next();
        
    } catch (error) {
        console.log("error in protect route");
        res.status(500).json({message:"internal srver error from protect Route"});
    }


}