import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import {
  uploadResume,
  analyzeResume,
  getResumeHistory
} from "../controllers/resumeController.js";

const router = express.Router();

// Upload resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// Analyze + Save resume
router.post(
  "/analyze",
  authMiddleware,
  analyzeResume
);

// 🔥 Get Resume History
router.get(
  "/history",
  authMiddleware,
  getResumeHistory
);

export default router;