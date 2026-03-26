import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ExternalJobs from "./pages/ExternalJobs";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/external-jobs" element={<ExternalJobs />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
