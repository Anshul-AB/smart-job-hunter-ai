// create job 

import mongoose from "mongoose";
import Job from "../models/Job.js";

const createJob = async(req, res)=>{
    try {
        const{title, company , location, description, requiredSkills, applyLink} = req.body;
       if(!title || !company || !location || !description || !requiredSkills || !applyLink){
    return res.status(400).json({message: "Please provide all required fields"})
}

        const newJob = await Job.create({
            title,
            company,
            location,
            description,
            requiredSkills,
            applyLink,
            createdBy: req.userId
        })
    return res.status(201).json({message: "Job created successfully", job:newJob})
    } catch (error) {
        console.error("Error creating job:", error);
    return res.status(500).json({ message: "Internal server error" });
    }
}

const getJobs = async (req, res) => {
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

export { createJob, getJobs, getJobById, deleteJob };