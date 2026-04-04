import { skillsList } from "./skillsList.js";

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const extractSkills = (text) => {
  const normalizedText = text.toLowerCase();

  const foundSkills = skillsList.filter((skill) => {
    const escapedSkill = escapeRegex(skill);
    const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");
    return regex.test(normalizedText);
  });

  const skillMap = {
    "react.js": "react",
    "node.js": "node",
  };

  const cleanedSkills = foundSkills.map(
    (skill) => skillMap[skill] || skill
  );

  return [...new Set(cleanedSkills)];
};