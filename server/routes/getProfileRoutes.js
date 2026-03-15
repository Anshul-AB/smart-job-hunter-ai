import express from "express";
import { getProfile } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/profile", getProfile);

export default router;