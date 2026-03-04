import express from "express";
import {
    createPost,
    showAllPosts,
    showMyPosts,
    editPost,
    deletePost,
} from "../controllers/post.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// API Routes 
router.post("/create", protectRoute, upload.single("imageFile"), createPost);
router.get("/all-posts", protectRoute, showAllPosts);
router.get("/my-posts", protectRoute, showMyPosts);
router.put("/edit/:id", protectRoute,upload.single("imageFile"), editPost);
router.delete("/delete/:id", protectRoute, deletePost);

export default router;