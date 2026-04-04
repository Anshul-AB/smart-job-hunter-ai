import express from "express";
import { createJob, getJobs, getJobById, deleteJob, analyzeJobs, getExternalJobs } from "../controllers/jobControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/external", getExternalJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);
router.post("/analyze", authMiddleware, analyzeJobs)

export default router;