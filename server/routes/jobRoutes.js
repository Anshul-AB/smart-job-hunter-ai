import express from "express"
import createJob from "../controllers/jobControllers.js"

const router = express.Router()

router.post("/", createJob)

export default router