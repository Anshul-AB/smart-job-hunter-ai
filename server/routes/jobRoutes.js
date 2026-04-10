import express from "express";
import { createJob, getJobs, getJobById, deleteJob, analyzeJob, getExternalJobs, saveJob } from "../controllers/jobControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/external", getExternalJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);
router.post("/analyze", authMiddleware, analyzeJob)
router.post("/save", authMiddleware, saveJob);

export default router;