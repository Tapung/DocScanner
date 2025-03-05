import express from "express";
import { registerUser, getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/user", authMiddleware, getUser);   
userRouter.put("/update", authMiddleware, updateUser);   
userRouter.delete("/delete", authMiddleware, deleteUser);   

export default userRouter;