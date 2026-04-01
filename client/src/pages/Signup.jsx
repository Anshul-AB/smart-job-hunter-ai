import React, { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serviceHelper";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    skills: [],
  });

const handleInput = (e) => {
  const { name, value } = e.target;

  if (name === "skills") {
    setUser({
      ...user,
      skills: value.split(",").map(s => s.trim().toLowerCase())
    });
  } else {
    setUser({
      ...user,
      [name]: value
    });
  }
};

const submit = async (e) => {
  e.preventDefault();

  try {
    const data = await makeUnauthenticatedPOSTRequest('/api/auth/signup', user);
    console.log(data)

    if (!data.ok) {
      alert(data.message || "Signup failed");
      return;
    }

      document.cookie = `token=${data.token}; path=/; max-age=86400`;

    alert("Signup successful 🎉");
    navigate("/dashboard");

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
        <p className="text-center text-gray-500 mb-6">Create your account</p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="your name"
              value={user.name}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={user.email}
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
              value={user.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              placeholder="your skills"
              value={user.skills.join(", ")}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
