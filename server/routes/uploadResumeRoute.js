import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadResume } from "../controllers/uploadResumeController.js";
import multer from "multer";

const router = express.Router();
// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer config
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed"), false);
    }
  },
});

router.post("/upload", authMiddleware,  upload.single("resume"), uploadResume);

export default router;