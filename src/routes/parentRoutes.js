import MainLayout from "../MainLayout.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../pages/util/ProtectedRoute.jsx";
import React from "react";

import withLayoutAndProtection from "../withLayoutAndProtection.jsx";

import ParentHome from "../pages/parent/ParentHome.jsx";

// import Ebooks from "../pages/admin/ebook/Ebooks.jsx";
import StudentDetails from "../pages/parent/StudentDetails.jsx";
import StudentTestResults from "../pages/parent/StudentTestResults.jsx";
import StudentAssessmentResults from "../pages/parent/StudentAssessmentResults.jsx";

import ParentSettings from "../pages/parent/ParentSettings.jsx";
import ParentAddStudent from "../pages/parent/ParentAddStudent.jsx";

import TestResultDetails from "../pages/admin/TestResultDetails.jsx";

export const parentRoutes = (
  <>
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/parent`}
      element={React.createElement(
        withLayoutAndProtection(ParentHome, { allowedTypes: ["parent"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId`}
      element={React.createElement(
        withLayoutAndProtection(StudentDetails, { allowedTypes: ["parent"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId/tests/:subjectId`}
      element={React.createElement(
        withLayoutAndProtection(StudentTestResults, {
          allowedTypes: ["parent"],
        })
      )}
    />
    {/* <Route
      exact
      path={`${process.env.PUBLIC_URL}/parent/settings`}
      element={React.createElement(
        withLayoutAndProtection(StudentAssessmentResults, {
          allowedTypes: ["parent"],
        })
      )}
    /> */}
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/parent/add_student`}
      element={React.createElement(
        withLayoutAndProtection(ParentSettings, { allowedTypes: ["parent"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
      element={React.createElement(
        withLayoutAndProtection(TestResultDetails, { allowedTypes: ["parent"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
      element={React.createElement(
        withLayoutAndProtection(ParentSettings, { allowedTypes: ["parent"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/parent/settings`}
      element={React.createElement(
        withLayoutAndProtection(ParentSettings, {
          allowedTypes: ["parent"],
        })
      )}
    />



<Route
  exact
  path={`${process.env.PUBLIC_URL}/student/:studentId/tests/:subjectId`}
  element={React.createElement(withLayoutAndProtection(StudentTestResults, { allowedTypes: ['parent'] }))}
/>



<Route
  exact
  path={`${process.env.PUBLIC_URL}/student/:studentId/assessments/:subjectId`}
  element={React.createElement(withLayoutAndProtection(StudentAssessmentResults, { allowedTypes: ['parent'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/parent/add_student`}
  element={React.createElement(withLayoutAndProtection(ParentSettings, { allowedTypes: ['parent'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
  element={React.createElement(withLayoutAndProtection(TestResultDetails, { allowedTypes: ['parent'] }))}
/>
 
            

   </>
)
