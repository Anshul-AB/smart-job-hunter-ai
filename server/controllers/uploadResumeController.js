import fs from "fs";
import * as pdfParse from "pdf-parse";

const pdf = pdfParse.default;

// const data = await pdf(dataBuffer);
export const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    // console.log("PDF VALUE:", pdf);
    // const data = await pdf(dataBuffer); // ✅ works

    res.json({ text: data.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};