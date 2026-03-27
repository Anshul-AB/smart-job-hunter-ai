import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
        JobLens 🚀
      </h1>

      <div className="flex gap-4 items-center">

        {token && (
          <>
            <Link to="/jobs" className="hover:text-blue-600">My Jobs</Link>
            <Link to="/external-jobs" className="hover:text-blue-600">Explore</Link>
          </>
        )}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;