import { useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedDELETERequest,
} from "../../utils/serviceHelper.js";

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const data = await makeAuthenticatedGETRequest("/api/jobs/saved");

      // store only IDs
      setSavedJobs(data.map((job) => job.jobId));
    } catch (err) {
      console.error("Fetch saved jobs error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save job
  const saveJob = async (job) => {
    try {
      await makeAuthenticatedPOSTRequest("/api/jobs/save", job);

      setSavedJobs((prev) =>
        prev.includes(job.id) ? prev : [...prev, job.id]
      );
    } catch (err) {
      console.error("Save job error:", err);
    }
  };

  // 🔹 Unsave job
  const unsaveJob = async (jobId) => {
    try {
      await makeAuthenticatedDELETERequest(`/api/jobs/unsave/${jobId}`);

      setSavedJobs((prev) => prev.filter((id) => id !== jobId));
    } catch (err) {
      console.error("Unsave job error:", err);
    }
  };

  // 🔹 Toggle save (🔥 main logic)
  const toggleSaveJob = async (job) => {
    if (savedJobs.includes(job.id)) {
      // optimistic UI
      setSavedJobs((prev) => prev.filter((id) => id !== job.id));

      try {
        await makeAuthenticatedDELETERequest(
          `/api/jobs/unsave/${job.id}`
        );
      } catch (err) {
        console.error(err);
        // rollback
        setSavedJobs((prev) => [...prev, job.id]);
      }
    } else {
      await saveJob(job);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return {
    savedJobs,
    loading,
    saveJob,
    unsaveJob,
    toggleSaveJob,
  };
};