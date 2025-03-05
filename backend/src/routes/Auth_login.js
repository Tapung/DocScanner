import express from "express";
import login from "../controllers/login.js"
import logoutUser from "../controllers/logout.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
const login_user_admin = express.Router();

login_user_admin.post("/login/:role", login);
login_user_admin.get("/login/validate", authMiddleware, (req,res)=>{

    res.status(200).send({user:req.user})  
});
login_user_admin.post("/logout", authMiddleware, logoutUser);

export default login_user_admin;