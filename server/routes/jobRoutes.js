import express from "express";
import { createJob, getJobs, getJobById, deleteJob } from "../controllers/jobControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);

export default router;