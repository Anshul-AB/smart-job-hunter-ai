import React, { useEffect, useState } from "react";
import { makeUnauthenticatedGETRequest } from "../utils/serviceHelper";

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);

     const data = await makeUnauthenticatedGETRequest("/api/jobs/external-jobs?query=react");
      setJobs(data);
      console.log("FRONTEND DATA:", data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        External Jobs 🌍
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.map((job, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow mb-4">

            <h2 className="font-bold">{job.title}</h2>
            <p>{job.company} • {job.location}</p>

            <div className="flex gap-3 mt-3">
              <a
                href={job.applyLink}
                target="_blank"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Apply
              </a>
            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default ExternalJobs;