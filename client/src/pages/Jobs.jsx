import React, { useEffect, useState } from "react";
import { makeAuthenticatedPOSTRequest, makeUnauthenticatedGETRequest } from "../utils/serviceHelper";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [result, setResult] = useState(null);

  // fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await makeUnauthenticatedGETRequest('/api/jobs/');
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // analyze job
  const analyzeJob = async (jobId) => {
    try {
      const data = await makeAuthenticatedPOSTRequest(`/api/jobs/${jobId}/analyze`, )
      // document.cookie = `token=${data.token}; path=/; max-age=86400`;

      setResult(data);

    } catch (error) {
      console.error("Error analyzing job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Job Listings 🚀
      </h1>

      <div className="grid gap-4 max-w-3xl mx-auto">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>

            <p className="mt-2 text-sm text-gray-700">
              Skills: {job.requiredSkills.join(", ")}
            </p>

            <button
              onClick={() => analyzeJob(job._id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Analyze Match
            </button>
          </div>
        ))}

      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-2">Match Result</h3>

          <p>Match: {result.matchPercentage}%</p>
          <p>Matched: {result.matchedSkills.join(", ")}</p>
          <p>Missing: {result.missingSkills.join(", ")}</p>
        </div>
      )}

    </div>
  );
};

export default Jobs;