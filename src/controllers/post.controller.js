import Post from '../models/post.model.js';
import fs from "fs";

// Create Post 
export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;

        if (!caption) {
            return res.status(400).json({ message: "Caption is required" });
        }

        let imageFile = "";

        if (req.file) {
            imageFile = {
                url: `/${req.file.filename}`,
                public_id: req.file.filename
            };
        }

        const newPost = await Post.create({
            caption,
            author: req.user._id,
            imageFile: imageFile
        });

        return res.status(201).json({
            success: true,
            data: newPost,
            message: "New post created successfully"
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Show All Posts 
export const showAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find()
            .populate("author", "fullName email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: allPosts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Show My Posts 
export const showMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })
            .populate("author", "fullName email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Edit Post 
export const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        post.caption = caption || post.caption;

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: post
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete Post 
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

