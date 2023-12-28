import MainLayout from "../MainLayout.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../pages/util/ProtectedRoute.jsx";
import React from "react";
import Defaultuserprofile from "../pages/common/DefaultUserProfile.jsx";
import withLayoutAndProtection from "../withLayoutAndProtection.jsx";

import recruiterHome from "../pages/recruiter/RecruiterHome.jsx";
import AllJobs from "../pages/recruiter/AllJobs.jsx";
import CreateJob from "../pages/recruiter/CreateJob.jsx";
import JobApplications from "../pages/recruiter/JobApplications.jsx";

export const recruiterRoutes = (
  <>
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/recruiter`}
      element={React.createElement(
        withLayoutAndProtection(recruiterHome, { allowedTypes: ["recruiter"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all-jobs`}
      element={React.createElement(
        withLayoutAndProtection(AllJobs, { allowedTypes: ["recruiter"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all-jobs/create-job`}
      element={React.createElement(
        withLayoutAndProtection(CreateJob, { allowedTypes: ["recruiter"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all-jobs/job-applications/:jobId`}
      element={React.createElement(
        withLayoutAndProtection(JobApplications, { allowedTypes: ["recruiter"] })
      )}
    />
   
    
    
    
    
  </>
);
