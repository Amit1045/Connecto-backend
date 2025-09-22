import jwt from "jsonwebtoken"
import User from "../models/users.model.js"

export default protectRoute=async(req,res)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
           return res.status(401).json({message:"Unautherised - No token Provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Unautherised - Invalid token"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({message:"User Not Found"})
        }

        req.user=user
        next()
    } catch (error) {
     res.send(404).json({"Internal server Error ":error.message})   
    }
}