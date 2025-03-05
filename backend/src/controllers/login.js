import User from "../models/User_model.js";
import Admin from "../models/Admin_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email)
        const role = req.params.role.toLowerCase(); 

        let user = null;

        
        if (role === "admin") {
            user = await Admin.findOne({ email});
        } else if (role === "user") {
            user = await User.findOne({ email});
        } else {
            return res.status(400).json({ message: "Invalid role. Use 'admin' or 'user'." });
        }

        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

      
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: `Login successful ${user.role}`,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role, 
            },
            token, 
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};


export default Login;