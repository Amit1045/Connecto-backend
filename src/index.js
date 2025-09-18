import express from "express"
import authRoute from "./routes/auth.route.js"
import { connectDB } from "../src/lib/db.js"
import dotenv from "dotenv"
const app = express()
dotenv.config("../.env")
const port = 3000
app.use(express.json())
app.use("/api/auth", authRoute)


app.listen(port, () => {
    connectDB()
    console.log(`Server is running http://localhost:${port}`);
})