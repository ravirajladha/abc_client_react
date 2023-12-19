import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "./App.css";
import "./main.scss";
import withLayoutAndProtection from './withLayoutAndProtection.jsx';
import { adminRoutes } from './routes/adminRoutes.js';
// Common Layout
import Login from "./pages/common/Login.jsx";
import Register from "./pages/common/Register.jsx";
import Notfound from "./pages/common/Notfound.jsx";
import Defaultuserprofile from "./pages/common/DefaultUserProfile.jsx";
import MainLayout from "./MainLayout.jsx";

import StudentProfile from "./pages/student/DefaultUserProfile.jsx";
import StudentProfile1 from "./pages/student/DefaultUserProfile1.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import * as serviceWorker from "./serviceWorker.js";
import Home from "./pages/student/Home.jsx";
import Subjects from "./pages/student/Subjects.jsx";
import Qna from "./pages/student/Qna.jsx";
import Forums from "./pages/student/Forums.jsx";
import ViewForum from "./pages/student/ViewForum.jsx";
import ViewQna from "./pages/student/ViewQna.jsx";
import AnswerForum from "./pages/student/AnswerForum.jsx";
import Settings from "./pages/student/Settings.jsx";
import ProtectedRoute from "./pages/util/ProtectedRoute.jsx";
import SubjectStream from "./pages/student/SubjectStream.jsx";
import CreateLabNew from "./pages/admin/CreateLabNew.jsx";
import Schools from "./pages/admin/Schools.jsx";
import AllClasses from "./pages/admin/AllClasses.jsx";
import AllSubjects from "./pages/admin/AllSubjects.jsx";
import AllChapters from "./pages/admin/AllChapters.jsx";
import AllChaptersAssessment from "./pages/admin/AllChaptersAssessment.jsx";
import AllVideos from "./pages/admin/AllVideos.jsx";
import Assessments from "./pages/admin/Assessments.jsx";
import Tests from "./pages/admin/Tests.jsx";
import MiniProjects from "./pages/admin/MiniProjects.jsx";
import CreateProject from "./pages/admin/CreateProject.jsx";
import CreateProjectTask from "./pages/admin/CreateProjectTask.jsx";
import CreateAssessments from "./pages/admin/CreateAssessments.jsx";
import CreateQuestion from "./pages/admin/CreateQuestion.jsx";
import AllQuestions from "./pages/admin/AllQuestions.jsx";
import CreateTest from "./pages/admin/CreateTest.jsx";
import AddQuestionsToTest from "./pages/admin/AddQuestionsToTest.jsx";
import SingleTestDetails from "./pages/admin/SingleTestDetails.jsx";
import TestResult from "./pages/admin/TestResult.jsx";
import CreateClass from "./pages/admin/CreateClass.jsx";
import CreateSubject from "./pages/admin/CreateSubject.jsx";
import CreateChapters from "./pages/admin/CreateChapters.jsx";
import CreateVideos from "./pages/admin/CreateVideos.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AllLabs from "./pages/admin/AllLabs.jsx";
import AllTasks from "./pages/admin/AllTasks.jsx";
import TakeAssessments from "./pages/student/TakeAssessments.jsx";
import Elab from "./pages/student/Elab.jsx";
import TeacherHome from "./pages/teacher/TeacherHome.jsx";
import Chats from "./pages/teacher/Chats.jsx";
import Qnas from "./pages/teacher/Qnas.jsx";
import SchoolHome from "./pages/school/SchoolHome.jsx";
import ParentHome from "./pages/parent/ParentHome.jsx";
import AnswerQna from "./pages/teacher/AnswerQna.jsx";
import ViewAssessmentScore from "./pages/student/ViewAssessmentScore.jsx";
import TakeTest from "./pages/student/TakeTest.jsx";
import ViewProject from "./pages/student/ViewProject.jsx";
import StartProject from "./pages/student/StartProject.jsx";
import ViewTestScore from "./pages/student/ViewTestScore.jsx";
import VideoFeatures from "./pages/student/VideoFeatures.jsx";
import Markers from "./pages/student/Markers.jsx";
import MarkerSingle from "./pages/student/MarkerSingle.jsx";
import VideoWithWaterMark from "./pages/student/VideoWithWaterMark.jsx";
import ViewAssessments from "./pages/admin/ViewAssessments.jsx";
import AssessmentListVideoWise from "./pages/admin/AssessmentListVideoWise.jsx";
import StudentResultAssessment from "./pages/admin/StudentResultAssessment.jsx";
import Students from "./pages/school/Students.jsx";
import AddStudent from "./pages/school/AddStudent.jsx";
import ViewStudent from "./pages/school/ViewStudent.jsx";
import EditStudentProfile from "./pages/school/EditProfile.jsx";
import EditSchoolProfile from "./pages/admin/EditSchoolProfile.jsx";
import Teachers from "./pages/school/Teachers.jsx";
import AddTeacher from "./pages/school/AddTeacher.jsx";
import Editor1 from "./pages/e_lab/components/Editor1.jsx";
import AuthProvider from "./lib/AuthContext.js";
import Ebooks from "./pages/admin/ebook/Ebooks.jsx";
import CreateEbook from "./pages/admin/ebook/CreateEbook.jsx";
import EbookModules from "./pages/admin/ebook/EbookModules.jsx";
import AddSections from "./pages/admin/ebook/AddSections.jsx";
import AddElements from "./pages/admin/ebook/AddElements.jsx";
import PreviewEbook from "./pages/admin/ebook/PreviewEbook.jsx";
import ClassesResult from "./pages/admin/ClassesResult.jsx";
import SubjectsResult from "./pages/admin/SubjectsResult.jsx";
import EditLab from "./pages/admin/EditLab.jsx";
import SubjectResults from "./pages/student/SubjectResults.jsx";
import StudentDetails from "./pages/parent/StudentDetails.jsx";
import StudentTestResults from "./pages/parent/StudentTestResults.jsx";
import StudentAssessmentResults from "./pages/parent/StudentAssessmentResults.jsx";
import SubjectAssessmentResults from "./pages/admin/SubjectAssessmentResults.jsx";
import Results from "./pages/school/Results.jsx";
import ClassSubjectResults from "./pages/school/ClassSubjectResults.jsx";
import ClassSubjects from "./pages/school/ClassSubjects.jsx";
import ClassResults from "./pages/school/ClassResults.jsx";
import ClassSubjectWiseResults from "./pages/school/ClassSubjectWiseResults.jsx";
import AddQuestionsToAssessment from "./pages/admin/AddQuestionsToAssessment.jsx";
import TestDetails from "./pages/student/TestDetails.jsx";
import Payments from "./pages/admin/Payments.jsx";
import ParentSettings from "./pages/parent/ParentSettings.jsx";
import ParentAddStudent from "./pages/parent/ParentAddStudent.jsx";
import AddModule from "./pages/admin/ebook/AddModule.jsx";
import SingleAssessmentDetails from "./pages/admin/SingleAssessmentDetails.jsx";
import Internship from "./pages/student/Internship.jsx";
import Applications from "./pages/school/Applications.jsx";
import TestResultDetails from "./pages/admin/TestResultDetails.jsx";
import AddInternship from "./pages/admin/AddInternship.jsx";
import ViewInternship from "./pages/admin/ViewInternship.jsx";
import InternshipTasks from "./pages/admin/InternshipTasks.jsx";
import CreateInternshipTask from "./pages/admin/CreateInternshipTask.jsx";
class Root extends Component {
  render() {
    return (
      <HashRouter basename={"/"}>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              element={<Register />}
            />
            <Route path="*" element={<Notfound />} />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              element={<Login />}
            />

          <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin`}
              element={
                <ProtectedRoute
                  element={
                    <MainLayout>
                      <AdminHome />
                    </MainLayout>
                  }
                  allowedTypes={["admin"]}
                />
              }
            />


            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home`}
              element={
                <ProtectedRoute
                  element={<Home />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            {/* <Route
  exact
  path={`${process.env.PUBLIC_URL}/home`}
  element={
    <ProtectedRoute
      element={
        <MainLayout>
          <Home />
        </MainLayout>
      }
      allowedTypes={["school_student"]}
    />
  }
/> */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subjects`}
              element={
                <ProtectedRoute
                  element={<Subjects />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<SubjectResults />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_qna`}
              element={
                <ProtectedRoute
                  element={<Qna />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums`}
              element={
                <ProtectedRoute
                  element={<Forums />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_qna/view_qna/:qnaId`}
              element={
                <ProtectedRoute
                  element={<ViewQna />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums/view_forum/:forumId`}
              element={
                <ProtectedRoute
                  element={<ViewForum />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums/answer_forum/:forumId`}
              element={
                <ProtectedRoute
                  element={<AnswerForum />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/settings`}
              element={
                <ProtectedRoute
                  element={<Settings />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/:subjectId`}
              element={
                <ProtectedRoute
                  element={<SubjectStream />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<TakeAssessments />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score`}
              element={
                <ProtectedRoute
                  element={<ViewAssessmentScore />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/take_test/:subject_id/:test_id`}
              element={
                <ProtectedRoute
                  element={<TakeTest />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_test_score/:subject_id/:test_id`}
              element={
                <ProtectedRoute
                  element={<ViewTestScore />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_project/:project_id`}
              element={
                <ProtectedRoute
                  element={<ViewProject />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/start_project/:project_id/:task_id/:lab_code`}
              element={
                <ProtectedRoute
                  element={<StartProject />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/elab/:video_id`}
              element={
                <ProtectedRoute
                  element={<Elab />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features`}
              element={
                <ProtectedRoute
                  element={<VideoFeatures />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/markers`}
              element={
                <ProtectedRoute
                  element={<Markers />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/marker_single`}
              element={
                <ProtectedRoute
                  element={<MarkerSingle />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/video_with_watermark`}
              element={
                <ProtectedRoute
                  element={<VideoWithWaterMark />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home`}
              element={
                <ProtectedRoute
                  element={<Home />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subjects/test_details/:testId`}
              element={
                <ProtectedRoute
                  element={<TestDetails />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            {/* admin */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-user-profile`}
              element={
                <ProtectedRoute
                  element={<Defaultuserprofile />}
                  allowedTypes={[
                    "school_student",
                    "admin",
                    "sub_admin",
                    "parent",
                    "teacher",
                  ]}
                />
              }
            />
            {/* ebook start */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks`}
              element={
                <ProtectedRoute element={<Ebooks />} allowedTypes={["admin"]} />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/create_ebook`}
              element={
                <ProtectedRoute
                  element={<CreateEbook />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subjects`}
              element={
                <ProtectedRoute
                  element={<Subjects />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/:ebookId/create-module`}
              element={
                <ProtectedRoute
                  element={<AddModule />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subjects/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<SubjectResults />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/ebook_modules/:ebook_id`}
              element={
                <ProtectedRoute
                  element={<EbookModules />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subjects/test_details/:testId`}
              element={
                <ProtectedRoute
                  element={<TestDetails />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/add_sections/:module_id`}
              element={
                <ProtectedRoute
                  element={<AddSections />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_qna`}
              element={
                <ProtectedRoute
                  element={<Qna />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/add_elements/:section_id`}
              element={
                <ProtectedRoute
                  element={<AddElements />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums`}
              element={
                <ProtectedRoute
                  element={<Forums />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_qna/view_qna/:qnaId`}
              element={
                <ProtectedRoute
                  element={<ViewQna />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums/view_forum/:forumId`}
              element={
                <ProtectedRoute
                  element={<ViewForum />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school_forums/answer_forum/:forumId`}
              element={
                <ProtectedRoute
                  element={<AnswerForum />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/settings`}
              element={
                <ProtectedRoute
                  element={<Settings />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/:subjectId`}
              element={
                <ProtectedRoute
                  element={<SubjectStream />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<TakeAssessments />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score`}
              element={
                <ProtectedRoute
                  element={<ViewAssessmentScore />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/take_test/:subject_id/:test_id`}
              element={
                <ProtectedRoute
                  element={<TakeTest />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_test_score/:subject_id/:test_id`}
              element={
                <ProtectedRoute
                  element={<ViewTestScore />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/view_project/:project_id`}
              element={
                <ProtectedRoute
                  element={<ViewProject />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/start_project/:project_id/:task_id/:lab_code`}
              element={
                <ProtectedRoute
                  element={<StartProject />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/subject_stream/elab/:video_id`}
              element={
                <ProtectedRoute
                  element={<Elab />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features`}
              element={
                <ProtectedRoute
                  element={<VideoFeatures />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/markers`}
              element={
                <ProtectedRoute
                  element={<Markers />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/marker_single`}
              element={
                <ProtectedRoute
                  element={<MarkerSingle />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/video_features/video_with_watermark`}
              element={
                <ProtectedRoute
                  element={<VideoWithWaterMark />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            {/* admin */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-user-profile`}
              element={
                <ProtectedRoute
                  element={<Defaultuserprofile />}
                  allowedTypes={[
                    "school_student",
                    "admin",
                    "sub_admin",
                    "parent",
                    "teacher",
                  ]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/default-user-profile`}
              element={
                <ProtectedRoute
                  element={<StudentProfile />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/default-user-profile1`}
              element={
                <ProtectedRoute
                  element={<StudentProfile1 />}
                  allowedTypes={["school_student"]}
                />
              }
            />
            {/* ebook start */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks`}
              element={
                <ProtectedRoute element={<Ebooks />} allowedTypes={["admin"]} />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/create_ebook`}
              element={
                <ProtectedRoute
                  element={<CreateEbook />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/ebook_modules/:ebook_id`}
              element={
                <ProtectedRoute
                  element={<EbookModules />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/add_sections/:module_id`}
              element={
                <ProtectedRoute
                  element={<AddSections />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/add_elements/:section_id`}
              element={
                <ProtectedRoute
                  element={<AddElements />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/preview_ebook/:ebook_id`}
              element={
                <ProtectedRoute
                  element={<PreviewEbook />}
                  allowedTypes={["admin", "school_student"]}
                />
              }
            />
            {/* ebook end */}
            {/* <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin`}
              element={
                <ProtectedRoute
                  element={<AdminHome />}
                  allowedTypes={["admin"]}
                />
              }
            /> */}

         
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/editor/:type/:redirecting_id/:type_id/:labId`}
              element={
                <ProtectedRoute
                  element={<Editor1 />}
                  allowedTypes={["school_student", "admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_labs/create-lab`}
              element={
                <ProtectedRoute
                  element={<CreateLabNew />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/schools`}
              element={
                <ProtectedRoute
                  element={<Schools />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes`}
              element={
                <ProtectedRoute
                  element={<AllClasses />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/all_classes`}
              element={
                <ProtectedRoute
                  element={<AllClasses />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/:classId/results`}
              element={
                <ProtectedRoute
                  element={<ClassesResult />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/:class_id`}
              element={
                <ProtectedRoute
                  element={<AllSubjects />}
                  allowedTypes={["admin", "teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes/results/:subjectId`}
              element={
                <ProtectedRoute
                  element={<SubjectsResult />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/all_chapters/:subject_id`}
              element={
                <ProtectedRoute
                  element={<AllChapters />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/all_chapters_assessment/:subject_id`}
              element={
                <ProtectedRoute
                  element={<AllChaptersAssessment />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/all_chapters_assessment/:subject_id`}
              element={
                <ProtectedRoute
                  element={<AllChaptersAssessment />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/all_classes/results/all_chapters_assessment/:subject_id`}
              element={
                <ProtectedRoute
                  element={<AllChaptersAssessment />}
                  allowedTypes={["teacher"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/all_chapters/all_videos/:chapter_id`}
              element={
                <ProtectedRoute
                  element={<AllVideos />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_subjects/create_class`}
              element={
                <ProtectedRoute
                  element={<CreateClass />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_subjects/create_subject/:class_id`}
              element={
                <ProtectedRoute
                  element={<CreateSubject />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_subjects/create_subject`}
              element={
                <ProtectedRoute
                  element={<CreateSubject />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_subjects/create_chapters/:class_id/:subject_id`}
              element={
                <ProtectedRoute
                  element={<CreateChapters />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/:class_id/:subject_id/:chapter_id/create_videos`}
              element={
                <ProtectedRoute
                  element={<CreateVideos />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments`}
              element={
                <ProtectedRoute
                  element={<Assessments />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/create_question`}
              element={
                <ProtectedRoute
                  element={<CreateQuestion />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/all_questions`}
              element={
                <ProtectedRoute
                  element={<AllQuestions />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/create_assessments`}
              element={
                <ProtectedRoute
                  element={<CreateAssessments />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/add-question-to-assessment`}
              element={
                <ProtectedRoute
                  element={<AddQuestionsToAssessment />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/:subject_id/list`}
              element={
                <ProtectedRoute
                  element={<ViewAssessments />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/all_assessment_result_video_wise/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<AssessmentListVideoWise />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/results/all_assessment_result_video_wise/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<AssessmentListVideoWise />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/all_classes/all_assessment_result_video_wise/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<AssessmentListVideoWise />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/student_wise_assessment_result/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<StudentResultAssessment />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/results/student_wise_assessment_result/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<StudentResultAssessment />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/all_classes/results/student_wise_assessment_result/:assessment_id`}
              element={
                <ProtectedRoute
                  element={<StudentResultAssessment />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/assessments/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<SubjectAssessmentResults />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<SubjectAssessmentResults />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/results/assessments/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<SubjectAssessmentResults />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/assessments/assessment_details/:assessmentId`}
              element={
                <ProtectedRoute
                  element={<SingleAssessmentDetails />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests`}
              element={
                <ProtectedRoute element={<Tests />} allowedTypes={["admin"]} />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/create_question`}
              element={
                <ProtectedRoute
                  element={<CreateQuestion />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/all_questions`}
              element={
                <ProtectedRoute
                  element={<AllQuestions />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/create_test`}
              element={
                <ProtectedRoute
                  element={<CreateTest />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/add_question_to_test`}
              element={
                <ProtectedRoute
                  element={<AddQuestionsToTest />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_labs`}
              element={
                <ProtectedRoute
                  element={<AllLabs />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all-tasks/:projectId`}
              element={
                <ProtectedRoute
                  element={<AllTasks />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/test_details/:testId`}
              element={
                <ProtectedRoute
                  element={<SingleTestDetails />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/test_results/:testId`}
              element={
                <ProtectedRoute
                  element={<TestResult />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/mini_projects`}
              element={
                <ProtectedRoute
                  element={<MiniProjects />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/mini_projects/create_project`}
              element={
                <ProtectedRoute
                  element={<CreateProject />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/mini_projects/create_project_task/:projectId`}
              element={
                <ProtectedRoute
                  element={<CreateProjectTask />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all_labs/edit-e-labs/:id`}
              element={
                <ProtectedRoute
                  element={<EditLab />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/payments`}
              element={
                <ProtectedRoute
                  element={<Payments />}
                  allowedTypes={["admin"]}
                />
              }
            />

            {/* teacher */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teacher`}
              element={
                <ProtectedRoute
                  element={<TeacherHome />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/qnas`}
              element={
                <ProtectedRoute element={<Qnas />} allowedTypes={["teacher"]} />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/qnas/answer_qna/:qna_id`}
              element={
                <ProtectedRoute
                  element={<AnswerQna />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/chats`}
              element={
                <ProtectedRoute
                  element={<Chats />}
                  allowedTypes={["teacher"]}
                />
              }
            />

            {/* parent */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/parent`}
              element={
                <ProtectedRoute
                  element={<ParentHome />}
                  allowedTypes={["parent"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/:studentId`}
              element={
                <ProtectedRoute
                  element={<StudentDetails />}
                  allowedTypes={["parent"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/:studentId/tests/:subjectId`}
              element={
                <ProtectedRoute
                  element={<StudentTestResults />}
                  allowedTypes={["parent"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/:studentId/assessments/:subjectId`}
              element={
                <ProtectedRoute
                  element={<StudentAssessmentResults />}
                  allowedTypes={["parent"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/parent/settings`}
              element={
                <ProtectedRoute
                  element={<ParentSettings />}
                  allowedTypes={["parent"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/parent/add_student`}
              element={
                <ProtectedRoute
                  element={<ParentAddStudent />}
                  allowedTypes={["parent"]}
                />
              }
            />

            {/* school */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school`}
              element={
                <ProtectedRoute
                  element={<SchoolHome />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            {/* Rakshith */}
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/students`}
              element={
                <ProtectedRoute
                  element={<Students />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/students/add_student_view`}
              element={
                <ProtectedRoute
                  element={<AddStudent />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/view_student`}
              element={
                <ProtectedRoute
                  element={<ViewStudent />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/edit-student-profile/:id`}
              element={
                <ProtectedRoute
                  element={<EditStudentProfile />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/view_student`}
              element={
                <ProtectedRoute
                  element={<ViewStudent />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/students/edit-student-profile/:id`}
              element={
                <ProtectedRoute
                  element={<EditStudentProfile />}
                  allowedTypes={["sub_admin", "admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/schools/edit-school-profile/:id`}
              element={
                <ProtectedRoute
                  element={<EditSchoolProfile />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/edit-school-profile/:id`}
              element={
                <ProtectedRoute
                  element={<EditSchoolProfile />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/teachers`}
              element={
                <ProtectedRoute
                  element={<Teachers />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/teachers/add_teacher`}
              element={
                <ProtectedRoute
                  element={<AddTeacher />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results`}
              element={
                <ProtectedRoute
                  element={<Results />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
              element={
                <ProtectedRoute
                  element={<ClassResults />}
                  allowedTypes={["sub_admin", "admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
              element={
                <ProtectedRoute
                  element={<ClassResults />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
              element={
                <ProtectedRoute
                  element={<ClassResults />}
                  allowedTypes={["admin"]}
                />
              }
            />
            {/* <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/:classId/results`}
              element={
                <ProtectedRoute
                  element={<ClassResults />}
                  allowedTypes={[ "admin"]}

                />
              }
            /> */}

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/class/:classId/results1`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectWiseResults />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/class/:classId/results1`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectWiseResults />}
                  allowedTypes={["teacher"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin/class/:classId/results1`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectWiseResults />}
                  allowedTypes={["admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/tests/:classId/results1`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectWiseResults />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
              element={
                <ProtectedRoute
                  element={<TestResultDetails />}
                  allowedTypes={["sub_admin", "admin", "teacher", "parent"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/class/:classId/subjects`}
              element={
                <ProtectedRoute
                  element={<ClassSubjects />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/all_classes/:classId/subjects`}
              element={
                <ProtectedRoute
                  element={<ClassSubjects />}
                  allowedTypes={["teacher"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/results/class/:classId/subject/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectResults />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/teachers/results/class/:classId/subject/:subjectId/results`}
              element={
                <ProtectedRoute
                  element={<ClassSubjectResults />}
                  allowedTypes={["teacher"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/school/applications`}
              element={
                <ProtectedRoute
                  element={<Applications />}
                  allowedTypes={["sub_admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/internship`}
              element={
                <ProtectedRoute
                  element={<Internship />}
                  allowedTypes={["school_student"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/addInternship`}
              element={
                <ProtectedRoute
                  element={<AddInternship />}
                  allowedTypes={["admin"]}
                />
              }
            />

            {/* <Route
              exact
              path={`${process.env.PUBLIC_URL}/viewInternship`}
              element={
                <ProtectedRoute
                  element={<ViewInternship />}
                  allowedTypes={["admin"]}
                />
              }
            /> */}

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/viewInternship`}
              element={
                <ProtectedRoute
                  element={
                    <MainLayout>
                      <ViewInternship />
                    </MainLayout>
                  }
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/internshipTasks/:internshipId`}
              element={
                <ProtectedRoute
                  element={<InternshipTasks />}
                  allowedTypes={["admin"]}
                />
              }
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/create_internship_task/:internshipId`}
              element={
                <ProtectedRoute
                  element={<CreateInternshipTask />}
                  allowedTypes={["admin"]}
                />
              }
            />
          </Routes>
        </AuthProvider>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
