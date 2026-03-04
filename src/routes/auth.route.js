import express from 'express';
import { signup, login, logout, updateProfile, profile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../config/multer.js'

const router = express.Router();

router.post("/signup",upload.single("profilePic"), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",protectRoute, profile);
router.put("/update-profile",protectRoute,upload.single("profilePic"), updateProfile);

export default router;