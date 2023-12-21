import MainLayout from "../MainLayout.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../pages/util/ProtectedRoute.jsx";
import Defaultuserprofile from "../pages/common/DefaultUserProfile.jsx";
import withLayoutAndProtection from "../withLayoutAndProtection.jsx";
import React from "react";

import AllChaptersAssessment from "../pages/admin/AllChaptersAssessment.jsx";
import SchoolHome from "../pages/school/SchoolHome.jsx";
import AssessmentListVideoWise from "../pages/admin/AssessmentListVideoWise.jsx";
import StudentResultAssessment from "../pages/admin/StudentResultAssessment.jsx";
import Students from "../pages/school/Students.jsx";
import AddStudent from "../pages/school/AddStudent.jsx";
import ViewStudent from "../pages/school/ViewStudent.jsx";
import EditStudentProfile from "../pages/school/EditProfile.jsx";
import Teachers from "../pages/school/Teachers.jsx";
import AddTeacher from "../pages/school/AddTeacher.jsx";
import SubjectAssessmentResults from "../pages/admin/SubjectAssessmentResults.jsx";
import Results from "../pages/school/Results.jsx";
import ClassSubjectResults from "../pages/school/ClassSubjectResults.jsx";
import ClassSubjects from "../pages/school/ClassSubjects.jsx";
import ClassResults from "../pages/school/ClassResults.jsx";
import ClassSubjectWiseResults from "../pages/school/ClassSubjectWiseResults.jsx";
import Applications from "../pages/school/Applications.jsx";
import TestResultDetails from "../pages/admin/TestResultDetails.jsx";
import Settings from "../pages/common/Settings.jsx";
import EditStudent from "../pages/school/EditStudent.jsx";
import EditTeacher from "../pages/school/EditTeacher.jsx";

export const schoolRoutes = (
  <>
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/assessments/:subjectId/results`}
      element={React.createElement(
        withLayoutAndProtection(SubjectAssessmentResults, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school`}
      element={React.createElement(
        withLayoutAndProtection(SchoolHome, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/students`}
      element={React.createElement(
        withLayoutAndProtection(Students, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/students/add_student_view`}
      element={React.createElement(
        withLayoutAndProtection(AddStudent, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/view_student`}
      element={React.createElement(
        withLayoutAndProtection(ViewStudent, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/edit-student-profile/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditStudentProfile, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/view_student`}
      element={React.createElement(
        withLayoutAndProtection(ViewStudent, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/students/edit-student-profile/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditStudentProfile, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/teachers`}
      element={React.createElement(
        withLayoutAndProtection(Teachers, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/teachers/add_teacher`}
      element={React.createElement(
        withLayoutAndProtection(AddTeacher, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results`}
      element={React.createElement(
        withLayoutAndProtection(Results, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
      element={React.createElement(
        withLayoutAndProtection(ClassResults, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/class/:classId/results1`}
      element={React.createElement(
        withLayoutAndProtection(ClassSubjectWiseResults, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/class/:classId/subjects`}
      element={React.createElement(
        withLayoutAndProtection(ClassSubjects, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
      element={React.createElement(
        withLayoutAndProtection(TestResultDetails, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/class/:classId/subject/:subjectId/results`}
      element={React.createElement(
        withLayoutAndProtection(ClassSubjectResults, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/applications`}
      element={React.createElement(
        withLayoutAndProtection(Applications, { allowedTypes: ["sub_admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/student_wise_assessment_result/:assessment_id`}
      element={React.createElement(
        withLayoutAndProtection(StudentResultAssessment, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/all_assessment_result_video_wise/:assessment_id`}
      element={React.createElement(
        withLayoutAndProtection(AssessmentListVideoWise, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/results/all_chapters_assessment/:subject_id`}
      element={React.createElement(
        withLayoutAndProtection(AllChaptersAssessment, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/default-user-profile`}
      element={React.createElement(
        withLayoutAndProtection(Defaultuserprofile, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/settings`}
      element={React.createElement(
        withLayoutAndProtection(Settings, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/student/:studentId/edit`}
      element={React.createElement(
        withLayoutAndProtection(EditStudent, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/teacher/:teacherId/edit`}
      element={React.createElement(
        withLayoutAndProtection(EditTeacher, {
          allowedTypes: ["sub_admin"],
        })
      )}
    />
  </>
);
