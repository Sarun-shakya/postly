import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/utils.js';

// signup
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: "New user created successfully"
            })
        } else {
            return res.status(400).json({
                message: "Invalid data"
            });
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        generateToken(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message: "User logged in successfully"
        });
    } catch (error) {
        console.error("Error in login controller");
        res.status(500).json({
            message: "Internal Server error"
        });
    }
};

// Logout
export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message: "Logged out successfully"
    });
};

// updateProfile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, email, profilePic } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(
                { message: "User not found" }
            );
        }
        if (fullName) {
            user.fullName = fullName;
        }
        if (email) {
            user.email = email;
        }
        if (profilePic) {
            user.profilePic = profilePic;
        }
        await user.save();

        const { password, ...userData } = user._doc;
        res.status(200).json({
            message: "Profile updated successfully",
            user: userData
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};