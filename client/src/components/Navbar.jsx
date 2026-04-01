import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // 🔥 force re-render
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
            <Link to="/jobs">My Jobs</Link>
            <Link to="/external-jobs">Explore</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;