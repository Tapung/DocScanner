import express from "express";
import {
    getScanStats,
    getTopUsers,
    getCommonScans,
    getCreditUsage,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/scan-stats", getScanStats);
router.get("/top-users", getTopUsers);
router.get("/common-scans", getCommonScans);
router.get("/credit-usage", getCreditUsage);

export default router;