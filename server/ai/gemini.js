import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // 🔥 force correct path

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("KEY:", process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-001", // ✅ THIS ONE WORKS
});

console.log("CWD:", process.cwd());