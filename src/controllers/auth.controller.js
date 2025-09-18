import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs"
import User from "../models/users.model.js"


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname|| !email || !password ) {
            res.json({message:" All field requires to be filled "})
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 character " })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" });

        //bycripting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save() // save used to store the data in dataBase
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({messgae:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const login = async(req, res) => {
    const {email,password}=req.body

    try {
        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"Invalid credentials "})
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.json({message:"Invalid credentials "})
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("error in login : ",message.error);
        
       res.status(500).json({message:"Internal server error"})
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.log("error in fetching the products:", error.message);

    }
}


export const updateProdfile= async (res,req) => {
const {profilepic}=req.body
try {
    
} catch (error) {
    
}
}