import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "./App.css";
import "./main.scss";

// Common Layout
import Login from "./pages/common/Login.jsx";
import Register from "./pages/common/Register.jsx";
import Notfound from "./pages/common/Notfound.jsx";
import Defaultuserprofile from "./pages/common/DefaultUserProfile.jsx";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/student/Home";
import Subjects from "./pages/student/Subjects";
import Qna from "./pages/student/Qna";
import Forums from "./pages/student/Forums.jsx";
import ViewForum from "./pages/student/ViewForum";
import ViewQna from "./pages/student/ViewQna";
import AnswerForum from "./pages/student/AnswerForum";
import Settings from "./pages/student/Settings";
import ProtectedRoute from "./pages/util/ProtectedRoute";
import SubjectStream from "./pages/student/SubjectStream";
import CreateLab from "./pages/admin/CreateLab";
import CreateLabNew from "./pages/admin/CreateLabNew";
import Schools from "./pages/admin/Schools";
import AllClasses from "./pages/admin/AllClasses";
import AllSubjects from "./pages/admin/AllSubjects";
import AllChapters from "./pages/admin/AllChapters";
import AllVideos from "./pages/admin/AllVideos";
import Assessments from "./pages/admin/Assessments";
import Tests from "./pages/admin/Tests";
import MiniProjects from "./pages/admin/MiniProjects";
import CreateProject from "./pages/admin/CreateProject";
import CreateProjectTask from "./pages/admin/CreateProjectTask";
import CreateAssessments from "./pages/admin/CreateAssessments";
import CreateQuestion from "./pages/admin/CreateQuestion";
import AllQuestions from "./pages/admin/AllQuestions";
import CreateTest from "./pages/admin/CreateTest";
import AddQuestionsToTest from "./pages/admin/AddQuestionsToTest";
import SingleTestDetails from "./pages/admin/SingleTestDetails";
import TestResult from "./pages/admin/TestResult";
import CreateClass from "./pages/admin/CreateClass";
import CreateSubject from "./pages/admin/CreateSubject";
import CreateChapters from "./pages/admin/CreateChapters";
import CreateVideos from "./pages/admin/CreateVideos";
import AdminHome from "./pages/admin/AdminHome";
import AllLabs from "./pages/admin/AllLabs";
import AllTasks from "./pages/admin/AllTasks";
import TakeAssessments from "./pages/student/TakeAssessments";
import Elab from "./pages/student/Elab";
import TeacherHome from "./pages/teacher/TeacherHome";
import Chats from "./pages/teacher/Chats";
import Qnas from "./pages/teacher/Qnas";
import SchoolHome from "./pages/school/SchoolHome";
import ParentHome from "./pages/parent/ParentHome";
import AnswerQna from "./pages/teacher/AnswerQna";
import ViewAssessmentScore from "./pages/student/ViewAssessmentScore";
import TakeTest from "./pages/student/TakeTest";
import ViewProject from "./pages/student/ViewProject";
import StartProject from "./pages/student/StartProject";
import ViewTestScore from "./pages/student/ViewTestScore";
import VideoFeatures from "./pages/student/VideoFeatures";
import Markers from "./pages/student/Markers";
import MarkerSingle from "./pages/student/MarkerSingle";
import VideoWithWaterMark from "./pages/student/VideoWithWaterMark";
import ViewAssessments from "./pages/admin/ViewAssessments";
import ParentSubjects from "./pages/parent/ParentSubjects";
import ParentAssessments from "./pages/parent/ParentAssessments";
import ParentTests from "./pages/parent/ParentTests";
import Students from "./pages/school/Students";
import AddStudent from "./pages/school/AddStudent";
import ViewStudent from "./pages/school/ViewStudent";
import EditStudentProfile from "./pages/school/EditProfile";
import EditSchoolProfile from "./pages/admin/AddSchool";
import Teachers from "./pages/school/Teachers";
import AddTeacher from "./pages/school/AddTeacher";
import Editor1 from "./pages/e_lab/components/Editor1";
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
class Root extends Component {
  render() {
    return (
     
      <HashRouter basename={"/"}>
       <AuthProvider>
        <Routes>

        <Route exact path={`${process.env.PUBLIC_URL}/register`} element={<Register />} />
        <Route path="*" element={<Notfound />} />
        <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
      

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
            path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:video_id`}
            element={
              <ProtectedRoute
                element={<TakeAssessments />}
                allowedTypes={["school_student"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score/:video_id`}
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
{/* ebook start */}
<Route
            exact
            path={`${process.env.PUBLIC_URL}/ebooks`}
            element={
              <ProtectedRoute
                element={<Ebooks />}
                allowedTypes={["admin"]}
              />
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
                allowedTypes={["admin"]}
              />
            }
          />
          {/* ebook end */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/admin`}
            element={
              <ProtectedRoute
                element={<AdminHome />}
                allowedTypes={["admin"]}
              />
            }
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/create_lab`}
            element={
              <ProtectedRoute
                element={<CreateLab />}
                allowedTypes={["admin"]}
              />
            }
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/editor/:labId?`}
            element={
              <ProtectedRoute
                element={<Editor1 />}
                allowedTypes={["school_student", "admin"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/create_lab_new`}
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
              <ProtectedRoute element={<Schools />} allowedTypes={["admin"]} />
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
            path={`${process.env.PUBLIC_URL}/all_subjects/:class_id`}
            element={
              <ProtectedRoute
                element={<AllSubjects />}
                allowedTypes={["admin"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/results/:subjectId`}
            element={
              <ProtectedRoute
                element={<SubjectsResult />}
                allowedTypes={["admin"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_chapters/:subject_id`}
            element={
              <ProtectedRoute
                element={<AllChapters />}
                allowedTypes={["admin"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_videos/:chapter_id`}
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
            path={`${process.env.PUBLIC_URL}/all_subjects/create_chapters`}
            element={
              <ProtectedRoute
                element={<CreateChapters />}
                allowedTypes={["admin"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_subjects/create_videos`}
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
            path={`${process.env.PUBLIC_URL}/assessments/view_assessments/:subject_id`}
            element={
              <ProtectedRoute
                element={<ViewAssessments />}
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
              <ProtectedRoute element={<AllLabs />} allowedTypes={["admin"]} />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all-tasks/:projectId`}
            element={
              <ProtectedRoute element={<AllTasks />} allowedTypes={["admin"]} />
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
            path={`${process.env.PUBLIC_URL}/mini_projects/create_project_task`}
            element={
              <ProtectedRoute
                element={<CreateProjectTask />}
                allowedTypes={["admin"]}
              />
            }
          />
<Route
              exact
              path={`${process.env.PUBLIC_URL}/edit-e-labs/:id`}
              element={
                <ProtectedRoute
                  element={<EditLab />}
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
              <ProtectedRoute element={<Chats />} allowedTypes={["teacher"]} />
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
            path={`${process.env.PUBLIC_URL}/parent_subjects/:user_id`}
            element={
              <ProtectedRoute
                element={<ParentSubjects />}
                allowedTypes={["parent"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent_assessments/:user_id`}
            element={
              <ProtectedRoute
                element={<ParentAssessments />}
                allowedTypes={["parent"]}
              />
            }
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent_tests/:user_id`}
            element={
              <ProtectedRoute
                element={<ParentTests />}
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
            path={`${process.env.PUBLIC_URL}/school/add_student_view`}
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
            path={`${process.env.PUBLIC_URL}/edit-school-profile`}
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
              <ProtectedRoute element={<Teachers />} allowedTypes={["sub_admin"]} />
            }
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/add_teacher`}
            element={
              <ProtectedRoute
                element={<AddTeacher />}
                allowedTypes={["sub_admin"]}
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
