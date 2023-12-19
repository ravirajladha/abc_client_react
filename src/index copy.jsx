import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "./App.css";
import "./main.scss";
import Notfound from "./pages/common/Notfound.jsx";
import withLayoutAndProtection from './withLayoutAndProtection.jsx';
import { adminRoutes } from './routes/adminRoutes';
// Common Layout
import Login from "./pages/common/Login.jsx";
import Register from "./pages/common/Register.jsx";
import Defaultuserprofile from "./pages/common/DefaultUserProfile.jsx";
import MainLayout from "./MainLayout.jsx";

import StudentProfile from "./pages/student/DefaultUserProfile.jsx";
import StudentProfile1 from "./pages/student/DefaultUserProfile1.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
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
import CreateLabNew from "./pages/admin/CreateLabNew";
import Schools from "./pages/admin/Schools";
import AllClasses from "./pages/admin/AllClasses";
import AllSubjects from "./pages/admin/AllSubjects";
import AllChapters from "./pages/admin/AllChapters";
import AllChaptersAssessment from "./pages/admin/AllChaptersAssessment";
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
import AssessmentListVideoWise from "./pages/admin/AssessmentListVideoWise";
import StudentResultAssessment from "./pages/admin/StudentResultAssessment";
import Students from "./pages/school/Students";
import AddStudent from "./pages/school/AddStudent";
import ViewStudent from "./pages/school/ViewStudent";
import EditStudentProfile from "./pages/school/EditProfile";
import EditSchoolProfile from "./pages/admin/EditSchoolProfile";
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
  renderRoleRoutes(roleRoutes) {
    return roleRoutes.map(({ path, component: Component, allowedTypes }) => (
// Ensure that `Component` is a valid React component
<Route key={path} exact path={`${path}`} element={React.createElement(withLayoutAndProtection(Component, { allowedTypes }))} />

    ));
  }

  render() {
    return (
      <HashRouter basename={"/"}>
        <AuthProvider>
          <Routes>
            {/* <Route exact path={`${process.env.PUBLIC_URL}/register`} element={withLayoutAndProtection(Register, { needsAuth: false })} />
            <Route path="*" element={withLayoutAndProtection(Notfound, { needsAuth: false })} />
            <Route exact path={`${process.env.PUBLIC_URL}/`} element={withLayoutAndProtection(Login, { needsAuth: false })} /> */}
            
            {this.renderRoleRoutes(adminRoutes)}
            {/* Render other role routes here, like:
                this.renderRoleRoutes(school_studentRoutes)
                this.renderRoleRoutes(teacherRoutes)
                this.renderRoleRoutes(sub_adminRoutes)
                this.renderRoleRoutes(parentRoutes)
            */}
          </Routes>
        </AuthProvider>
      </HashRouter>
    );
  }
}

export default Root;
ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
