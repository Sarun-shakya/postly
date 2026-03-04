import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});