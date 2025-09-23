import User from "../models/users.model.js";
import Message from "../models/message.controller.js"

export const getUsersSidebarRoute=async(req,res )=>{
    try {
        const loggedInUserId=req.user._id
        const filteredUsers=await User.find({_id: {$ne:loggedInUserId}}).select("-password")
        res.status(200).json({filteredUsers})
    } catch (error) {
        res.status(401).json("Internal server error : ",error.message)
    }
}

export const getmessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.param
        const myId=req.user._id
        const messages =await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(201).json(messages)
    } catch (error) {
        res.status(401).json({"Internal server error : ":error.message})
    }
}