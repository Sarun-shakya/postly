import express from 'express';
import { createPost, showAllPosts, showMyPosts, editPost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/create-post", createPost);
router.get("/posts", showAllPosts);
router.get("/my-posts", showMyPosts);
router.put("/edit-post/:id", editPost);
router.delete("/delete-post/:id", deletePost);

export default router;