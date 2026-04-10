import React, { useEffect, useState } from "react";
import {
  makeAuthenticatedPOSTRequest,
  makeUnauthenticatedGETRequest,
} from "../utils/serviceHelper";
import LoadingState from "../components/LoadingState";
import { Bookmark, BookmarkCheck } from "lucide-react";

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  // 🔹 Fetch Jobs
  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const data = await makeUnauthenticatedGETRequest(
        `/api/jobs/external?query=react&page=${page}`
      );

      const newJobs = data.jobs || data;

      setJobs((prev) => [...prev, ...newJobs]);

      if (newJobs.length === 0) setHasMore(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Analyze Job
  const analyzeJob = async (job) => {
    try {
      setAnalyzing(true);
      setResult(null);

      const data = await makeAuthenticatedPOSTRequest(
        `/api/jobs/analyze`,
        job
      );

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  // 🔹 Save Job
  const saveJob = async (job) => {
    try {
      await makeAuthenticatedPOSTRequest("/api/jobs/save", job);

      setSavedJobs((prev) =>
        prev.includes(job.id) ? prev : [...prev, job.id]
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Toggle Save
  const toggleSaveJob = async (job) => {
    if (savedJobs.includes(job.id)) {
      setSavedJobs((prev) => prev.filter((id) => id !== job.id));
    } else {
      await saveJob(job);
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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Jobs 🌍</h1>
        <p className="text-gray-400 mt-2">
          Discover jobs and analyze your match instantly
        </p>
      </div>

      {/* JOB GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job, i) => (
          <div
            key={job.id || i}
            className="relative bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl hover:scale-[1.02] transition"
          >
            {/* BOOKMARK */}
            <button
              onClick={() => toggleSaveJob(job)}
              className="absolute top-4 right-4 text-gray-300 hover:text-blue-500 transition"
            >
              {savedJobs.includes(job.id) ? (
                <BookmarkCheck className="w-5 h-5 text-blue-500" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold">{job.title}</h2>

            {/* META */}
            <p className="text-gray-400 mt-1 text-sm">
              {job.company} • {job.location}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <a
                href={job.applyLink}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Apply
              </a>

              <button
                onClick={() => {
                  setSelectedJobIndex(i);
                  analyzeJob(job);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
              >
                Analyze
              </button>
            </div>

            {/* RESULT */}
            {selectedJobIndex === i && (
              <div className="mt-5">
                {analyzing && <LoadingState text="Analyzing match..." />}

                {result && !analyzing && (
                  <div className="mt-4 bg-black/30 p-4 rounded-xl border border-white/10">
                    <h3 className="font-semibold mb-2">Match Result</h3>

                    {/* MATCH % */}
                    <p className="text-sm font-bold text-blue-400">
                      {result.matchPercentage}% Match
                    </p>

                    {/* PROGRESS BAR */}
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${result.matchPercentage}%`,
                        }}
                      />
                    </div>

                    {/* MATCHED SKILLS */}
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-green-400">
                        Matched Skills
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.matchedSkills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* MISSING SKILLS */}
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-red-400">
                        Missing Skills
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {result.missingSkills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10 text-gray-400">
        {loading && <p>Loading more jobs...</p>}
        {!hasMore && <p>No more jobs</p>}
      </div>
    </div>
  );
};

export default ExternalJobs;