import User from "../models/users.model.js";

export const getUsersSidebarRoute=async(req,res )=>{
    try {
        const loggedInUserId=req.user._id
        const filteredUsers=await User.find({_id: {$ne:loggedInUserId}}).select("-password")
        res.status(200).json({filteredUsers})
    } catch (error) {
        res.status(401).json("Internal server error : ",error.message)
    }
}

export const getmessages=async()=>{

}