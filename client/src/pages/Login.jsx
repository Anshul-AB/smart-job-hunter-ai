import React, { useState } from "react";
import {  makeUnauthenticatedPOSTRequest } from "../utils/serviceHelper";
import { useNavigate } from "react-router-dom";
import useLogout from "../components/hooks/useLogout";

const Login = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await makeUnauthenticatedPOSTRequest(
        "/api/auth/login",
        formData,
      );
      console.log(data);

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
      alert("Login successful 🎉");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
