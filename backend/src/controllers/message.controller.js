import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSideBar = async(req,res)=>{
     try {
        const loggedInUsers = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUsers}}).select("-password")

        res.status(200).json(filteredUsers)
     } catch (error) {
        console.error("Error in getUsersforSidebar:",error.message)
        res.status(500).json({error: "Internal server error 1"})  
     }
}


export const getMessages = async(req,res)=>{

    try {

        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({$or: [{senderId: myId, receiverId: userToChatId},{senderId: userToChatId, receiverId: myId}],});

        res.status(200).json(messages)        

        
    } catch (error) {

        console.log("error in getMessages: ",error.message)
        res.status(500).json({message:"Internal error in server"})
        
    }
}

export const sendMessage = async (req,res)=>{

    try {
        const {text,image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
 
        let imageUrl;

        if(image){
            const uploaderResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploaderResponse.secure_url;
        }

        const newMessage = new Message({
            senderId ,
            receiverId,
            text,
            image : imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({message:newMessage})

    } catch (error) {

        console.log("Error in sendMessage: ",error.message);
        res.status(500).json({message:"error in internal server"}); 
        
    }

}