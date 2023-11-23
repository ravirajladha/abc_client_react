import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./main.scss";

// Common Layout
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Defaultuserprofile from "./pages/Defaultuserprofile";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Home from "./pages/student/Home";
import Subjects from "./pages/student/Subjects";
import Qna from "./pages/student/Qna";
import Forums from "./pages/student/Forums";
import ViewForum from "./pages/student/ViewForum";
import ViewQna from "./pages/student/ViewQna";
import AnswerForum from "./pages/student/AnswerForum";
import Settings from "./pages/student/Settings";
import StudentRoute from "./pages/util/StudentRoute";
import SubjectStream from "./pages/student/SubjectStream";
import CreateLab from "./pages/admin/CreateLab";
import Schools from "./pages/admin/Schools";
import AllSubjects from "./pages/admin/AllSubjects";
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
import CreateSubject from "./pages/admin/CreateSubject";
import CreateChapters from "./pages/admin/CreateChapters";
import CreateVideos from "./pages/admin/CreateVideos";
import AdminHome from "./pages/admin/AdminHome";
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
import Teachers from "./pages/school/Teachers";
import AddTeacher from "./pages/school/AddTeacher";
class Root extends Component {
  render() {
    return (
      <HashRouter basename={"/"}>
        <Routes>
         

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            element={<Login />}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/register`}
            element={<Register />}
          />
        
        
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/notfound`}
            element={<Notfound />}
          />
       
         
     

        

          {/* user */}
       
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            element={<Login />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/home`}
            element={<StudentRoute element={<Home />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subjects`}
            element={<StudentRoute element={<Subjects />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school_qna`}
            element={<StudentRoute element={<Qna />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school_forums`}
            element={<StudentRoute element={<Forums />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school_qna/view_qna/:qnaId`}
            element={<StudentRoute element={<ViewQna />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school_forums/view_forum/:forumId`}
            element={<StudentRoute element={<ViewForum />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school_forums/answer_forum/:forumId`}
            element={<StudentRoute element={<AnswerForum />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/settings`}
            element={<StudentRoute element={<Settings />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/:subjectId`}
            element={<StudentRoute element={<SubjectStream />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:video_id`}
            element={<StudentRoute element={<TakeAssessments />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score/:video_id`}
            element={<StudentRoute element={<ViewAssessmentScore />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/take_test/:subject_id/:test_id`}
            element={<StudentRoute element={<TakeTest />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/view_test_score/:subject_id/:test_id`}
            element={<StudentRoute element={<ViewTestScore />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/view_project/:project_id`}
            element={<StudentRoute element={<ViewProject />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/start_project/:project_id/:task_id/:lab_code`}
            element={<StudentRoute element={<StartProject />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/subject_stream/elab/:video_id`}
            element={<StudentRoute element={<Elab />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/video_features`}
            element={<StudentRoute element={<VideoFeatures />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/video_features/markers`}
            element={<StudentRoute element={<Markers />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/video_features/marker_single`}
            element={<StudentRoute element={<MarkerSingle />} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/video_features/video_with_watermark`}
            element={<StudentRoute element={<VideoWithWaterMark />} />}
          />

          {/* admin */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/default-user-profile`}
            element={<Defaultuserprofile />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/admin`}
            element={<AdminHome />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/create_lab`}
            element={<CreateLab />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/schools`}
            element={<Schools />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_subjects`}
            element={<AllSubjects />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_subjects/create_subject`}
            element={<CreateSubject />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_subjects/create_chapters`}
            element={<CreateChapters />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/all_subjects/create_videos`}
            element={<CreateVideos />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/assessments`}
            element={<Assessments />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/assessments/create_assessments`}
            element={<CreateAssessments />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/assessments/view_assessments/:subject_id`}
            element={<ViewAssessments />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests`}
            element={<Tests />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/create_question`}
            element={<CreateQuestion />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/all_questions`}
            element={<AllQuestions />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/create_test`}
            element={<CreateTest />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/add_question_to_test`}
            element={<AddQuestionsToTest />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/test_details/:testId`}
            element={<SingleTestDetails />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/tests/test_results/:testId`}
            element={<TestResult />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/mini_projects`}
            element={<MiniProjects />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/mini_projects/create_project`}
            element={<CreateProject />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/mini_projects/create_project_task`}
            element={<CreateProjectTask />}
          />

          {/* teacher */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/teacher`}
            element={<TeacherHome />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/qnas`}
            element={<Qnas />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/qnas/answer_qna/:qna_id`}
            element={<AnswerQna />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/chats`}
            element={<Chats />}
          />

          {/* parent */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent`}
            element={<ParentHome />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent_subjects/:user_id`}
            element={<ParentSubjects />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent_assessments/:user_id`}
            element={<ParentAssessments />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/parent_tests/:user_id`}
            element={<ParentTests />}
          />

          {/* school */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school`}
            element={<SchoolHome />}
          />

          {/* Rakshith */}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/students`}
            element={<Students />}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/add_student_view`}
            element={<AddStudent />}
          />
        </Routes>
        <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/view_student`}
            element={<ViewStudent />}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/teachers`}
            element={<Teachers />}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/school/add_teacher`}
            element={<AddTeacher />}
          />
          
      </HashRouter>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
