import mongoose from "mongoose";
import Job from "../models/Job.js";
import User from "../models/User.js";


const createJob = async (req, res) => {
  try {
    const { title, company, location, description, requiredSkills, applyLink } = req.body;

    if (!title || !company || !location || !description || !requiredSkills || !applyLink) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return res.status(400).json({ message: "requiredSkills must be a non-empty array" });
    }

    const cleanedSkills = requiredSkills.map(skill =>
      skill.toLowerCase().trim()
    );

    const newJob = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      description: description.trim(),
      requiredSkills: cleanedSkills,
      applyLink: applyLink.trim(),
      createdBy: req.userId
    });

    return res.status(201).json({
      message: "Job created successfully",
      job: newJob
    });

  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getJobs = async (req, res) => {
  console.log("Jobs route hit");
  try {

    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json({
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getJobById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ job });

  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getExternalJobs = async (req, res) => {
  try {
    const query = req.query.query || "developer";
    const page = parseInt(req.query.page) || 1;

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      query
    )}&page=${page}&num_pages=1&country=in`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.data) {
      console.log("API ERROR:", data);
      return res.status(400).json({ message: "Invalid API response" });
    }

    const jobs = data.data.map((job) => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city,
      description: job.job_description,
      applyLink: job.job_apply_link,
    }));

    return res.status(200).json({
      jobs,
      page,
      hasMore: jobs.length > 0, // 🔥 key for infinite scroll
    });

  } catch (error) {
    console.error("Error fetching external jobs:", error);
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

const analyzeJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const userSkills = user.resume?.extractedSkills || [];

    if (!userSkills.length) {
      return res.status(400).json({ message: "No resume uploaded or no skills found" });
    }

    const userSkillsLower = userSkills.map(skill => skill.toLowerCase());

    const jobs = await Job.find();

    const results = jobs.map((job) => {
      const matchedSkills = job.requiredSkills.filter(skill =>
        userSkillsLower.includes(skill.toLowerCase())
      );

      const missingSkills = job.requiredSkills.filter(skill =>
        !userSkillsLower.includes(skill.toLowerCase())
      );

      const matchPercentage = Math.round(
        (matchedSkills.length / job.requiredSkills.length) * 100
      );

      return {
        jobId: job._id,
        title: job.title,
        company: job.company,
        matchPercentage,
        matchedSkills,
        missingSkills,
      };
    });

    // 🔥 sort best matches first
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return res.status(200).json(results);

  } catch (error) {
    console.error("Error analyzing jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export { createJob, getJobs, getJobById, deleteJob, analyzeJobs, getExternalJobs };