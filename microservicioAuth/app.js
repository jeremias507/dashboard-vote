import express from "express";
import { connectToDB } from "./config/db.js";
import cors from "cors";
import indexRouter from "./routes/index.js"
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
connectToDB()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use("/api",indexRouter)

app.listen(4000,()=>{console.log("server.run 4000")})