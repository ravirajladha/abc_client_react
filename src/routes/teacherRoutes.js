import MainLayout from "../MainLayout.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../pages/util/ProtectedRoute.jsx";

import React from 'react';

import Defaultuserprofile from "../pages/common/DefaultUserProfile.jsx";

import withLayoutAndProtection from "../withLayoutAndProtection.jsx";




import AllClasses from "../pages/admin/AllClasses.jsx";
import AllSubjects from "../pages/admin/AllSubjects.jsx";
import AllChaptersAssessment from "../pages/admin/AllChaptersAssessment.jsx";
import TeacherHome from "../pages/teacher/TeacherHome.jsx";
import Chats from "../pages/teacher/Chats.jsx";
import Qnas from "../pages/teacher/Qnas.jsx";
import ClassSubjectResults from "../pages/school/ClassSubjectResults.jsx";

import AnswerQna from "../pages/teacher/AnswerQna.jsx";
import AssessmentListVideoWise from "../pages/admin/AssessmentListVideoWise.jsx";
import StudentResultAssessment from "../pages/admin/StudentResultAssessment.jsx";

import SubjectAssessmentResults from "../pages/admin/SubjectAssessmentResults.jsx";

import ClassSubjects from "../pages/school/ClassSubjects.jsx";
import ClassResults from "../pages/school/ClassResults.jsx";
import ClassSubjectWiseResults from "../pages/school/ClassSubjectWiseResults.jsx";

import TestResultDetails from "../pages/admin/TestResultDetails.jsx";

export const teacherRoutes = (
    <>
      <Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/all_classes/:classId/subjects`}
  element={React.createElement(withLayoutAndProtection(ClassSubjects, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
  element={React.createElement(withLayoutAndProtection(TestResultDetails, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
  element={React.createElement(withLayoutAndProtection(ClassResults, { allowedTypes: ['teacher'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/results/class/:classId/subject/:subjectId/results`}
  element={React.createElement(withLayoutAndProtection(ClassSubjectResults, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/class/:classId/results1`}
  element={React.createElement(withLayoutAndProtection(ClassSubjectWiseResults, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/all_classes`}
  element={React.createElement(withLayoutAndProtection(AllClasses, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/:class_id`}
  element={React.createElement(withLayoutAndProtection(AllSubjects, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/all_classes/results/all_chapters_assessment/:subject_id`}
  element={React.createElement(withLayoutAndProtection(AllChaptersAssessment, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/all_classes/all_assessment_result_video_wise/:assessment_id`}
  element={React.createElement(withLayoutAndProtection(AssessmentListVideoWise, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/all_classes/results/student_wise_assessment_result/:assessment_id`}
  element={React.createElement(withLayoutAndProtection(StudentResultAssessment, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teachers/results/assessments/:subjectId/results`}
  element={React.createElement(withLayoutAndProtection(SubjectAssessmentResults, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/teacher`}
  element={React.createElement(withLayoutAndProtection(TeacherHome, { allowedTypes: ['teacher'] }))}
/>
 
<Route
  exact
  path={`${process.env.PUBLIC_URL}/qnas`}
  element={React.createElement(withLayoutAndProtection(Qnas, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/qnas/answer_qna/:qna_id`}
  element={React.createElement(withLayoutAndProtection(AnswerQna, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/chats`}
  element={React.createElement(withLayoutAndProtection(Chats, { allowedTypes: ['teacher'] }))}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/default-user-profile`}
  element={React.createElement(withLayoutAndProtection(Defaultuserprofile, { allowedTypes: ['teacher'] }))}
/>
        
   </>
)