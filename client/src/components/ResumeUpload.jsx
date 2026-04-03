import { useState } from "react";
import { makeAuthenticatedFileRequest } from "../utils/serviceHelper";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

const handleUpload = async () => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const res = await makeAuthenticatedFileRequest(
      "/api/resume/upload",
      formData
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      {file && (
        <p className="text-sm text-gray-600 mb-2">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ResumeUpload;