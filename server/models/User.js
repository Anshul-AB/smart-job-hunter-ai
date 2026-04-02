import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    resume: {
      url: {
        type: String,
        default: ""
      },
      extractedText: {
        type: String,
        default: ""
      },
      extractedSkills: {
        type: [String],
        default: []
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);