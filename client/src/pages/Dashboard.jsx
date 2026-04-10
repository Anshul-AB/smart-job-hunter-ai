import React from "react";
import { useNavigate } from "react-router-dom";
import ResumeUpload from "../components/ResumeUpload";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your jobs, explore opportunities, and improve your profile
        </p>
      </div>

      {/* STATS (optional but powerful) */}
      {/* <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Applications</p>
          <h2 className="text-2xl font-bold mt-1">12</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Matches</p>
          <h2 className="text-2xl font-bold mt-1">8</h2>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Profile Score</p>
          <h2 className="text-2xl font-bold mt-1">76%</h2>
        </div>

      </div> */}

      {/* MAIN ACTION CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* My Jobs */}
        <div
          onClick={() => navigate("/jobs")}
          className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl cursor-pointer hover:scale-105 hover:border-blue-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400">
            📄 My Jobs
          </h2>
          <p className="text-gray-400">
            View and manage your saved job applications
          </p>
        </div>

        {/* Explore Jobs */}
        <div
          onClick={() => navigate("/external-jobs")}
          className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl cursor-pointer hover:scale-105 hover:border-blue-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400">
            🌍 Explore Jobs
          </h2>
          <p className="text-gray-400">
            Discover real-time job opportunities from APIs
          </p>
        </div>

        {/* Analyze Skills
        <div
          onClick={() => navigate("/external-jobs")}
          className="group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl cursor-pointer hover:scale-105 hover:border-blue-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400">
            🧠 Analyze Skills
          </h2>
          <p className="text-gray-400">
            See how your skills match with job roles
          </p>
        </div> */}

      </div>

      {/* RESUME SECTION */}
      <div className="flex justify-center items-center">

      <div className="mt-12 bg-white/5 border border-white/10 p-6 rounded-2xl">
        <ResumeUpload />
      </div>
      </div>

    </div>
  );
};

export default Dashboard;