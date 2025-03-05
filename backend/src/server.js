import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongoDb/connect.js';
import userRouter from './routes/User.js';
import login_user_admin from "./routes/Auth_login.js"
import cookieParser from "cookie-parser";
import docRoutes from "./routes/documentRoutes.js"
import creditRoutes from "./routes/creditRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());



 

app.use("/auth", userRouter); 
app.use("/auth",login_user_admin)
app.use("/doc",docRoutes)
app.use("/credits", creditRoutes)
app.use("/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "build")));

// Serve React app for all unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
