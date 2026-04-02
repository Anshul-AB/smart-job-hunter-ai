import  User  from "../models/User.js";

// Route
const uploadResume =  async (req, res) => {
 try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    user.resume.url = filePath;

    await user.save();

    res.json({
      message: "Resume uploaded & saved",
      resume: user.resume
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {uploadResume}