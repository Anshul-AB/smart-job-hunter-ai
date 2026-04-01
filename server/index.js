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

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://smart-job-hunter-ai.vercel.app"
    : "http://localhost:5173";

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());


// ROUTES MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, getProfileRoute);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Smart Job Hunter API");
});

conn()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });