import express from "express";
import { uploadDocument, scanDocument, getUserDocuments } from "../controllers/documentController.js";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware.js"; 
import path from "path";

const router = express.Router();
 
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) === ".txt") {
            cb(null, true);
        } else {
            cb(new Error("Only .txt files are allowed"));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }, 
});

 
router.post("/upload", authMiddleware,  upload.single("uploadFile"), uploadDocument);
 
router.post("/scan", authMiddleware,upload.single("scanFile"), scanDocument);
 
router.get("/user/documents", authMiddleware, getUserDocuments);

export default router;
