// create job 

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

export default createJob;