import express from "express";
import { requestCredit, approveCreditRequest, rejectCreditRequest, getPendingCreditRequests } from "../controllers/creditController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", authMiddleware, requestCredit);
router.post("/approve", authMiddleware, adminMiddleware, approveCreditRequest);
router.post("/reject", authMiddleware, adminMiddleware, rejectCreditRequest);
router.get("/pending", authMiddleware, adminMiddleware, getPendingCreditRequests);


export default router;