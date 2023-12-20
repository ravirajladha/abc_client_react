import AdminHome from "../pages/admin/AdminHome";
// routes/adminRoutes.js
import React from "react";
import Defaultuserprofile from "../pages/common/DefaultUserProfile.jsx";
import withLayoutAndProtection from "../withLayoutAndProtection.jsx";

// import other admin specific components
import { Route } from "react-router-dom";
import AddInternship from "../pages/admin/AddInternship.jsx";
import AddQuestionsToAssessment from "../pages/admin/AddQuestionsToAssessment.jsx";
import AddQuestionsToTest from "../pages/admin/AddQuestionsToTest.jsx";
import AllChapters from "../pages/admin/AllChapters.jsx";
import AllChaptersAssessment from "../pages/admin/AllChaptersAssessment.jsx";
import AllClasses from "../pages/admin/AllClasses.jsx";
import AllLabs from "../pages/admin/AllLabs.jsx";
import AllQuestions from "../pages/admin/AllQuestions.jsx";
import AllSubjects from "../pages/admin/AllSubjects.jsx";
import AllTasks from "../pages/admin/AllTasks.jsx";
import AllVideos from "../pages/admin/AllVideos.jsx";
import AssessmentListVideoWise from "../pages/admin/AssessmentListVideoWise.jsx";
import Assessments from "../pages/admin/Assessments.jsx";
import ClassesResult from "../pages/admin/ClassesResult.jsx";
import CreateAssessments from "../pages/admin/CreateAssessments.jsx";
import CreateChapters from "../pages/admin/CreateChapters.jsx";
import CreateClass from "../pages/admin/CreateClass.jsx";
import CreateInternshipTask from "../pages/admin/CreateInternshipTask.jsx";
import CreateLabNew from "../pages/admin/CreateLabNew.jsx";
import CreateProject from "../pages/admin/CreateProject.jsx";
import CreateProjectTask from "../pages/admin/CreateProjectTask.jsx";
import CreateQuestion from "../pages/admin/CreateQuestion.jsx";
import CreateSubject from "../pages/admin/CreateSubject.jsx";
import CreateTest from "../pages/admin/CreateTest.jsx";
import CreateVideos from "../pages/admin/CreateVideos.jsx";
import EditLab from "../pages/admin/EditLab.jsx";
import EditSchoolProfile from "../pages/admin/EditSchoolProfile.jsx";
import InternshipTasks from "../pages/admin/InternshipTasks.jsx";
import MiniProjects from "../pages/admin/MiniProjects.jsx";
import Payments from "../pages/admin/Payments.jsx";
import Schools from "../pages/admin/Schools.jsx";
import SingleAssessmentDetails from "../pages/admin/SingleAssessmentDetails.jsx";
import SingleTestDetails from "../pages/admin/SingleTestDetails.jsx";
import StudentResultAssessment from "../pages/admin/StudentResultAssessment.jsx";
import SubjectAssessmentResults from "../pages/admin/SubjectAssessmentResults.jsx";
import SubjectsResult from "../pages/admin/SubjectsResult.jsx";
import TestResult from "../pages/admin/TestResult.jsx";
import TestResultDetails from "../pages/admin/TestResultDetails.jsx";
import Tests from "../pages/admin/Tests.jsx";
import ViewAssessments from "../pages/admin/ViewAssessments.jsx";
import ViewInternship from "../pages/admin/ViewInternship.jsx";
import AddElements from "../pages/admin/ebook/AddElements.jsx";
import AddModule from "../pages/admin/ebook/AddModule.jsx";
import AddSections from "../pages/admin/ebook/AddSections.jsx";
import CreateEbook from "../pages/admin/ebook/CreateEbook.jsx";
import EbookModules from "../pages/admin/ebook/EbookModules.jsx";
import Ebooks from "../pages/admin/ebook/Ebooks.jsx";
import PreviewEbook from "../pages/admin/ebook/PreviewEbook.jsx";
import Editor1 from "../pages/e_lab/components/Editor1.jsx";
import ClassResults from "../pages/school/ClassResults.jsx";
import ClassSubjectWiseResults from "../pages/school/ClassSubjectWiseResults.jsx";
import EditStudentProfile from "../pages/school/EditProfile.jsx";
import EditClass from "../pages/admin/edit-pages/EditClass.jsx";
import EditSubject from "../pages/admin/edit-pages/EditSubject.jsx";
import EditChapter from "../pages/admin/edit-pages/EditChapter.jsx";
import EditVideo from "../pages/admin/edit-pages/EditVideo.jsx";
// const AdminHomeWithLayoutAndProtection = withLayoutAndProtection(AdminHome, { allowedTypes: ['admin'] });
import Settings from "../pages/common/Settings.jsx";
export const adminRoutes = (
  <>
    {/* <Route
      exact
      path={`${process.env.PUBLIC_URL}/admin`}
      element={
        <ProtectedRoute
          element={

              <AdminHome />
        
          }
          allowedTypes={["admin"]}
        />
      }
    /> */}

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/admin`}
      element={React.createElement(
        withLayoutAndProtection(AdminHome, { allowedTypes: ["admin"] })
      )}
    />

    {/* <Route
  exact
  path={`${process.env.PUBLIC_URL}/admin`}
  element={<AdminHomeWithLayoutAndProtection />}
/> */}

    {/* <Route
  exact
  path={`${process.env.PUBLIC_URL}/admin`}
  element={React.createElement(withLayoutAndProtection(AdminHome, { allowedTypes: ['admin'] }))}
/> */}
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks`}
      element={React.createElement(
        withLayoutAndProtection(Ebooks, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/default-user-profile`}
      element={React.createElement(
        withLayoutAndProtection(Defaultuserprofile, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/create_ebook`}
      element={React.createElement(
        withLayoutAndProtection(CreateEbook, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/:ebookId/create-module`}
      element={React.createElement(
        withLayoutAndProtection(AddModule, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/ebook_modules/:ebook_id`}
      element={React.createElement(
        withLayoutAndProtection(EbookModules, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/add_sections/:module_id`}
      element={React.createElement(
        withLayoutAndProtection(AddSections, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/add_elements/:section_id`}
      element={React.createElement(
        withLayoutAndProtection(AddElements, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks`}
      element={React.createElement(
        withLayoutAndProtection(Ebooks, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/create_ebook`}
      element={React.createElement(
        withLayoutAndProtection(CreateEbook, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/ebook_modules/:ebook_i`}
      element={React.createElement(
        withLayoutAndProtection(EbookModules, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/add_sections/:module_id`}
      element={React.createElement(
        withLayoutAndProtection(AddSections, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/add_elements/:section_id`}
      element={React.createElement(
        withLayoutAndProtection(AddElements, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/schools`}
      element={React.createElement(
        withLayoutAndProtection(Schools, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_labs/create-lab`}
      element={React.createElement(
        withLayoutAndProtection(CreateLabNew, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes`}
      element={React.createElement(
        withLayoutAndProtection(AllClasses, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/:classId/results`}
      element={React.createElement(
        withLayoutAndProtection(ClassesResult, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/all_chapters/all_videos/:chapter_id`}
      element={React.createElement(
        withLayoutAndProtection(AllVideos, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_subjects/create_class`}
      element={React.createElement(
        withLayoutAndProtection(CreateClass, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_subjects/create_subject/:class_id`}
      element={React.createElement(
        withLayoutAndProtection(CreateSubject, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_subjects/create_subject`}
      element={React.createElement(
        withLayoutAndProtection(CreateSubject, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_subjects/create_chapters/:class_id/:subject_id`}
      element={React.createElement(
        withLayoutAndProtection(CreateChapters, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/:class_id/:subject_id/:chapter_id/create_videos`}
      element={React.createElement(
        withLayoutAndProtection(CreateVideos, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments`}
      element={React.createElement(
        withLayoutAndProtection(Assessments, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/all_questions`}
      element={React.createElement(
        withLayoutAndProtection(AllQuestions, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/create_question`}
      element={React.createElement(
        withLayoutAndProtection(CreateQuestion, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/create_assessments`}
      element={React.createElement(
        withLayoutAndProtection(CreateAssessments, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/add-question-to-assessment`}
      element={React.createElement(
        withLayoutAndProtection(AddQuestionsToAssessment, {
          allowedTypes: ["admin"],
        })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/:subject_id/list`}
      element={React.createElement(
        withLayoutAndProtection(ViewAssessments, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/results/student_wise_assessment_result/:assessment_id`}
      element={React.createElement(
        withLayoutAndProtection(StudentResultAssessment, {
          allowedTypes: ["admin"],
        })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/:subjectId/results`}
      element={React.createElement(
        withLayoutAndProtection(SubjectAssessmentResults, {
          allowedTypes: ["admin"],
        })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/assessment_details/:assessmentId`}
      element={React.createElement(
        withLayoutAndProtection(SingleAssessmentDetails, {
          allowedTypes: ["admin"],
        })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/create_question`}
      element={React.createElement(
        withLayoutAndProtection(CreateQuestion, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/all_questions`}
      element={React.createElement(
        withLayoutAndProtection(AllQuestions, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/create_test`}
      element={React.createElement(
        withLayoutAndProtection(CreateTest, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/add_question_to_test`}
      element={React.createElement(
        withLayoutAndProtection(AddQuestionsToTest, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_labs`}
      element={React.createElement(
        withLayoutAndProtection(AllLabs, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all-tasks/:projectId`}
      element={React.createElement(
        withLayoutAndProtection(AllTasks, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/test_details/:testId`}
      element={React.createElement(
        withLayoutAndProtection(SingleTestDetails, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/test_results/:testId`}
      element={React.createElement(
        withLayoutAndProtection(TestResult, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/mini_projects`}
      element={React.createElement(
        withLayoutAndProtection(MiniProjects, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/mini_projects/create_project`}
      element={React.createElement(
        withLayoutAndProtection(CreateProject, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/mini_projects/create_project_task/:projectId`}
      element={React.createElement(
        withLayoutAndProtection(CreateProjectTask, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_labs/edit-e-labs/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditLab, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/payments`}
      element={React.createElement(
        withLayoutAndProtection(Payments, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/schools/edit-school-profile/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditSchoolProfile, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/edit-school-profile/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditSchoolProfile, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
      element={React.createElement(
        withLayoutAndProtection(ClassResults, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/admin/class/:classId/results1`}
      element={React.createElement(
        withLayoutAndProtection(ClassSubjectWiseResults, {
          allowedTypes: ["admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests/:classId/results1`}
      element={React.createElement(
        withLayoutAndProtection(ClassSubjectWiseResults, {
          allowedTypes: ["admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/addInternship`}
      element={React.createElement(
        withLayoutAndProtection(AddInternship, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/viewInternship`}
      element={React.createElement(
        withLayoutAndProtection(ViewInternship, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/internshipTasks/:internshipId`}
      element={React.createElement(
        withLayoutAndProtection(InternshipTasks, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/create_internship_task/:internshipId`}
      element={React.createElement(
        withLayoutAndProtection(CreateInternshipTask, {
          allowedTypes: ["admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/viewInternship`}
      element={React.createElement(
        withLayoutAndProtection(ViewInternship, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/default-user-profile`}
      element={React.createElement(
        withLayoutAndProtection(Defaultuserprofile, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/ebooks/preview_ebook/:ebook_id`}
      element={React.createElement(
        withLayoutAndProtection(PreviewEbook, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/editor/:type/:redirecting_id/:type_id/:labId`}
      element={React.createElement(
        withLayoutAndProtection(Editor1, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/:class_id`}
      element={React.createElement(
        withLayoutAndProtection(AllSubjects, { allowedTypes: ["admin"] })
      )}
    />

    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes/results/:subjectId`}
      element={React.createElement(
        withLayoutAndProtection(SubjectsResult, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/all_classes/all_subjects/all_chapters/:subject_id`}
      element={React.createElement(
        withLayoutAndProtection(AllChapters, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/all_chapters_assessment/:subject_id`}
      element={React.createElement(
        withLayoutAndProtection(AllChaptersAssessment, {
          allowedTypes: ["admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/assessments/results/all_assessment_result_video_wise/:assessment_id`}
      element={React.createElement(
        withLayoutAndProtection(AssessmentListVideoWise, {
          allowedTypes: ["admin"],
        })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/tests`}
      element={React.createElement(
        withLayoutAndProtection(Tests, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/students/edit-student-profile/:id`}
      element={React.createElement(
        withLayoutAndProtection(EditStudentProfile, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/school/class/:classId/results`}
      element={React.createElement(
        withLayoutAndProtection(ClassResults, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/student/:studentId/results/:testId`}
      element={React.createElement(
        withLayoutAndProtection(TestResultDetails, { allowedTypes: ["admin"] })
      )}
    />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/admin/settings`}
      element={React.createElement(
        withLayoutAndProtection(Settings, { allowedTypes: ["admin"] })
      )}
    />
  </>
);

// Similarly, create configurations for school_studentRoutes, teacherRoutes, sub_adminRoutes, parentRoutes...
