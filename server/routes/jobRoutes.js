import express from "express";
import { createJob, getJobs, getJobById, deleteJob, analyzeJob, getExternalJobs, saveJob, getSavedJobs, unsaveJob } from "../controllers/jobControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);

router.get("/external", getExternalJobs);

router.post("/analyze", authMiddleware, analyzeJob);
router.post("/save", authMiddleware, saveJob);
router.get("/saved", authMiddleware, getSavedJobs);

router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);
router.delete("/unsave/:jobId", authMiddleware, unsaveJob);

export default router;