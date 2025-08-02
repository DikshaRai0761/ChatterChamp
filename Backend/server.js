import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Allow both local + deployed frontend URLs
const allowedOrigins = [
    'http://localhost:5173',
    'https://chatter-champ.vercel.app' 
];

// ✅ CORS middleware
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api", chatRoutes);

// Server start + DB connect
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    connectDB();
});

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected with MongoDB Database!");
    } catch (err) {
        console.error("❌ Failed to connect with MongoDB:", err);
    }
};
