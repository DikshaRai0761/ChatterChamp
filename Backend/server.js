import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Allow CORS for frontend
const allowedOrigins = [
    "http://localhost:5173",
    "https://chatter-champ.vercel.app"
];

// CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

// Manual CORS headers (extra safety)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Middleware
app.use(express.json());

// Routes
app.use("/api", chatRoutes);

// Start server and connect DB
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    connectDB();
});

// MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected with MongoDB");
    } catch (err) {
        console.error("❌ Failed to connect DB", err);
    }
};
