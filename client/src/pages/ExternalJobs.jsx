import React, { useEffect, useState } from "react";
import {
  makeAuthenticatedPOSTRequest,
  makeUnauthenticatedGETRequest,
} from "../utils/serviceHelper";
import LoadingState from "../components/LoadingState";

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const data = await makeUnauthenticatedGETRequest(
        `/api/jobs/external?query=react&page=${page}`,
      );

      const newJobs = data.jobs || data;

      // append instead of replace
      setJobs((prev) => [...prev, ...newJobs]);

      // stop if no more jobs
      if (newJobs.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // analyze job
  const analyzeJob = async (job) => {
    try {
      setAnalyzing(true);

      const data = await makeAuthenticatedPOSTRequest(
        `/api/jobs/analyze`,
        job, // 🔥 send whole job
      );

      setResult(data);
    } catch (error) {
      console.error("Error analyzing job:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(result);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">External Jobs 🌍</h1>

      {jobs.map((job, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-bold">{job.title}</h2>
          <p>
            {job.company} • {job.location}
          </p>

          <a
            href={job.applyLink}
            target="_blank"
            className="bg-green-600 text-white px-3 py-1 rounded mt-2 inline-block"
          >
            Apply
          </a>

          <button
            onClick={() => {
              console.log("Clicked job:", job);
              setSelectedJobIndex(i);
              analyzeJob(job);
            }}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Analyze Match
          </button>

          {/* Result */}

          {selectedJobIndex === i && analyzing && (
            <LoadingState text="Analyzing match..." />
          )}
          {selectedJobIndex === i && result && (
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
              <h3 className="text-lg font-bold mb-2">Match Result</h3>

              <p>Match: {result.matchPercentage}%</p>
              <p>Matched: {result.matchedSkills?.join(", ") || "None"}</p>
              <p>Missing: {result.missingSkills?.join(", ") || "None"}</p>
            </div>
          )}
        </div>
      ))}

      {loading && <p className="text-center">Loading more jobs...</p>}
      {!hasMore && <p className="text-center">No more jobs</p>}
    </div>
  );
};

export default ExternalJobs;
