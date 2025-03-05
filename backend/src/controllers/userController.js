import User from "../models/User_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role:"user"
        });

        await newUser.save();
 
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }  
        );
 
        res.cookie("token", token, {
            httpOnly: true,   
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",  
            maxAge:  24 * 60 * 60 * 1000,  
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


export const getUser = async (req, res) => {
    try {

        const {id} = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.user;
        const userId = req.params.id;

        let updatedData = { username, email };

      
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const {id} = req.user;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

