import React from "react";
import { BookmarkCheck } from "lucide-react";
import { useSavedJobs } from "../components/hooks/useSavedJobs";

const SavedJobs = () => {
  const { savedJobs, unsaveJob, loading } = useSavedJobs();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs ❤️</h1>

      {loading && <p>Loading...</p>}

      {!loading && savedJobs.length === 0 && (
        <p className="text-gray-400">No saved jobs yet</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {savedJobs.map((job) => (
          <div
            key={job.jobId}
            className="relative bg-white/5 border border-white/10 p-6 rounded-2xl"
          >
            {/* 🔖 Unsave Button */}
            <button
              onClick={() => unsaveJob(job.jobId)}
              className="absolute top-4 right-4"
            >
              <BookmarkCheck className="w-5 h-5 text-blue-500" />
            </button>

            <h2 className="text-xl font-semibold">{job.title}</h2>

            <p className="text-gray-400 text-sm mt-1">
              {job.company} • {job.location}
            </p>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;