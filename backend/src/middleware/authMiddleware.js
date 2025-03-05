import jwt from "jsonwebtoken";
import User from "../models/User_model.js";
import Admin from "../models/Admin_model.js";  

export const authMiddleware = async (req, res, next) => {
    try {
      
        const token = req.cookies["token"];

     
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        let user = null;

        if (decoded.role === "admin"){
            user = await Admin.findById(decoded.id);


        }else{
            user = await User.findById(decoded.id);
        }
        
        

      
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
 

        req.user = user;

        next();  
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

export const adminMiddleware = (req, res, next) => {
    try {
      
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }

     
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        next();  
    } catch (error) {
        res.status(500).json({ message: "Error in adminMiddleware", error: error.message });
    }
};
