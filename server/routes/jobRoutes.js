import express from "express";
import { createJob, getJobs, getJobById, deleteJob, analyzeJob } from "../controllers/jobControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);
router.post("/:id/analyze", authMiddleware, analyzeJob)

export default router;