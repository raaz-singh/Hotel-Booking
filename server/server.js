import express from "express"
import "dotenv/config";
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routers/userRouter.js";
import hotelRouter from "./routers/hotelRouters.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routers/roomRoutes.js";
import bookingRouter from "./routers/bookingRoute.js";

connectDB()
connectCloudinary();

const app = express()
app.use(cors()) //Enable Cross-Origin Resource Sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/',(req,res)=>res.send("API is Working"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));