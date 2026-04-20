import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // 🔥 force correct path

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Tip: It's safer to check if the key exists rather than logging the actual key to the console!
console.log("KEY LOADED:", !!process.env.GEMINI_API_KEY); 

export const model = genAI.getGenerativeModel({
    // ✅ Updated to a supported model
    model: "gemini-2.5-flash", 
});

console.log("CWD:", process.cwd());