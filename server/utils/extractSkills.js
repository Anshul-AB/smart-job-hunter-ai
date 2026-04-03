import { skillsList } from "./skillsList.js";

export const extractSkills = (text) => {
  const normalizedText = text.toLowerCase();

  const foundSkills = skillsList.filter((skill) => {
    const regex = new RegExp(`\\b${skill}\\b`, "i");
    return regex.test(normalizedText);
  });

  // Remove duplicates + normalize variations
  const skillMap = {
    "react.js": "react",
    "node.js": "node",
  };

  const cleanedSkills = foundSkills.map(
    (skill) => skillMap[skill] || skill
  );

  return [...new Set(cleanedSkills)];
};