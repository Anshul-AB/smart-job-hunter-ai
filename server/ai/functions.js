import { extractor } from "./huggingFace.js";
import { model } from "./gemini.js";


export const getEmbedding = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error("Text is empty");
  }

  const cleanedText = text.trim().slice(0, 1000);

  const output = await extractor(cleanedText);

  const flat = Array.from(output.data);

  const dimension = 384; // model dimension
  const tokenCount = flat.length / dimension;

  let avgEmbedding = new Array(dimension).fill(0);

  // 🔥 rebuild tokens and average
  for (let i = 0; i < tokenCount; i++) {
    for (let j = 0; j < dimension; j++) {
      avgEmbedding[j] += flat[i * dimension + j];
    }
  }

  avgEmbedding = avgEmbedding.map(val => val / tokenCount);

  return avgEmbedding;
};

export const cosineSimilarity = (a, b) => {
  if (!a || !b || a.length !== b.length) {
    throw new Error("Invalid embeddings");
  }

  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
};


export const generateAIInsight = async (userSkills, jobSkills, matchPercentage) => {
  try {
    const prompt = `
      You are a career assistant AI. 
      User skills: ${userSkills.join(", ")}
      Job requires: ${jobSkills.join(", ")}
      Match score: ${matchPercentage}%

      Provide a 3-bullet point summary:
      - Bullet 1: A brief "Verdict" on the match.
      - Bullet 2: Specific "Missing Skills" based on the job requirements.
      - Bullet 3: One "Action Step" to improve the odds.

      Keep each bullet under 15 words. Use the format:
      • [Point 1]
      • [Point 2]
      • [Point 3]
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini Insight Error:", err);
    return "• Error generating insight. Please try again.";
  }
};