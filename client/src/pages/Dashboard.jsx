import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">
        Dashboard 🚀
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* My Jobs */}
        <div
          onClick={() => navigate("/jobs")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📄 My Jobs</h2>
          <p className="text-gray-600">
            View and manage your saved jobs
          </p>
        </div>

        {/* Explore Jobs */}
        <div
          onClick={() => navigate("/external-jobs")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🌍 Explore Jobs</h2>
          <p className="text-gray-600">
            Search real-time jobs from API
          </p>
        </div>

        {/* Analyze */}
        <div
          onClick={() => navigate("/external-jobs")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">🧠 Analyze Skills</h2>
          <p className="text-gray-600">
            Check your match with job roles
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;