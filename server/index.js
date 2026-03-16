import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import conn from "./connection/connection.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import getProfileRoute from "./routes/getProfileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

conn();

app.use(cors());
app.use(express.json());

// ROUTES MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, getProfileRoute);
app.use("/api/jobs", authMiddleware, jobRoutes)

app.get("/", (req, res) => {
  res.send("Smart Job Hunter API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});