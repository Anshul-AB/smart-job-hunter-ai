import express from "express"
import createJob from "../controllers/jobControllers.js"

const router = express.Router()

router.post("/create", createJob)

export default router