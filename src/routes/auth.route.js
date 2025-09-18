import express from "express"
import {signup,login, logout,updateProdfile} from "../controllers/auth.controller.js"

const route=express.Router()

route.get("/signup",signup)
route.get("/login",login)
route.get("/logout",logout)
route.put("/update_profile",updateProdfile)

export default route