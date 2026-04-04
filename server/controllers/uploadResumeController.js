import fs from "fs";
import { createRequire } from "module";
import { extractSkills } from "../utils/extractSkills.js";
import User from "../models/User.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId; // make sure auth middleware sets this

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);
    const text = data.text;

    // 🔥 Extract skills
    const skills = extractSkills(text);

    // 🔥 SAVE TO DB
    const user = await User.findById(userId);

    user.resume = {
      url: filePath,
      extractedText: text,
      extractedSkills: skills,
    };

    await user.save();

    res.json({
      message: "Resume uploaded & saved",
      resume: user.resume,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};