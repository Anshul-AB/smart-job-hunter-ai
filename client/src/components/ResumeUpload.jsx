import { useState } from "react";
import { makeAuthenticatedFileRequest } from "../utils/serviceHelper";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await makeAuthenticatedFileRequest(
        "/api/resume/upload",
        formData
      );

      setMessage("✅ Resume uploaded successfully!");
      console.log(res);
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl text-center">

      <h2 className="text-xl font-semibold mb-4">
        Upload Your Resume
      </h2>

      {/* DROP ZONE */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
        
        <p className="text-gray-400">
          Drag & drop your resume here or{" "}
          <span className="text-blue-400">browse</span>
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* FILE NAME */}
      {file && (
        <p className="mt-4 text-sm text-gray-300">
          📄 {file.name}
        </p>
      )}

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {/* MESSAGE */}
      {message && (
        <p className="mt-4 text-sm text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;