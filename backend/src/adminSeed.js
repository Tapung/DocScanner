import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin_model.js";
import connectDB from "./mongoDb/connect.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        
        
        await connectDB();

        const existingAdmin = await Admin.findOne({ username: "talenlio@gmail.com" });

        if (existingAdmin) {
            console.log("✅ Admin already exists.");
        } else {
           
            const hashedPassword = await bcrypt.hash("Talenlio@123", 10);

          
            const newAdmin = new Admin({
                username: "Talen Lio",
                email: "talenlio@gmail.com",
                password: hashedPassword,
            });

            await newAdmin.save();
            console.log("🎉 Admin user created successfully!");
        }


        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

 
seedAdmin();
