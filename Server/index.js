import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import cookieParser from "cookie-parser";
import { OwnerRouter } from "./Routes/OwnerRoute.js";
import { VetRouter } from "./Routes/VetRoute.js";



const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use("/auth", adminRouter)
app.use("/owner", OwnerRouter)
app.use("/vet", VetRouter)
app.use(express.static("Public"))
app.use(cookieParser())

app.listen(3000, () => {
    console.log("Server is running")
})