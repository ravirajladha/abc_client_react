import MainLayout from "../MainLayout.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../pages/util/ProtectedRoute.jsx";
import withLayoutAndProtection from "../withLayoutAndProtection.jsx";
import React from 'react';

import StudentProfile from "../pages/student/DefaultUserProfile.jsx";
import StudentProfile1 from "../pages/student/DefaultUserProfile1.jsx";
import Home from "../pages/student/Home.jsx";
import Subjects from "../pages/student/Subjects.jsx";
import Qna from "../pages/student/Qna.jsx";
import Forums from "../pages/student/Forums.jsx";
import ViewForum from "../pages/student/ViewForum.jsx";
import ViewQna from "../pages/student/ViewQna.jsx";
import AnswerForum from "../pages/student/AnswerForum.jsx";
import Settings from "../pages/student/Settings.jsx";
import SubjectStream from "../pages/student/SubjectStream.jsx";
import Defaultuserprofile from "../pages/common/DefaultUserProfile.jsx";

import TakeAssessments from "../pages/student/TakeAssessments.jsx";
import Elab from "../pages/student/Elab.jsx";
import ViewAssessmentScore from "../pages/student/ViewAssessmentScore.jsx";
import TakeTest from "../pages/student/TakeTest.jsx";
import ViewProject from "../pages/student/ViewProject.jsx";
import StartProject from "../pages/student/StartProject.jsx";
import ViewTestScore from "../pages/student/ViewTestScore.jsx";
import VideoFeatures from "../pages/student/VideoFeatures.jsx";
import Markers from "../pages/student/Markers.jsx";
import MarkerSingle from "../pages/student/MarkerSingle.jsx";
import VideoWithWaterMark from "../pages/student/VideoWithWaterMark.jsx";
import Editor1 from "../pages/e_lab/components/Editor1.jsx";
import PreviewEbook from "../pages/admin/ebook/PreviewEbook.jsx";

import SubjectResults from "../pages/student/SubjectResults.jsx";
import TestDetails from "../pages/student/TestDetails.jsx";
import Internship from "../pages/student/Internship.jsx";

export const studentRoutes = (
    <>
   
   <Route
  exact
  path={`${process.env.PUBLIC_URL}/home`}
  element={React.createElement(withLayoutAndProtection(Home, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subjects`}
  element={React.createElement(withLayoutAndProtection(Subjects, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject/:subjectId/results`}
  element={React.createElement(withLayoutAndProtection(SubjectResults, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/school_qna`}
  element={React.createElement(withLayoutAndProtection(Qna, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/school_forums`}
  element={React.createElement(withLayoutAndProtection(Forums, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/school_qna/view_qna/:qnaId`}
  element={React.createElement(withLayoutAndProtection(ViewQna, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/school_forums/view_forum/:forumId`}
  element={React.createElement(withLayoutAndProtection(ViewForum, { allowedTypes: ['school_student'] }))}
/>



<Route
  exact
  path={`${process.env.PUBLIC_URL}/school_forums/answer_forum/:forumId`}
  element={React.createElement(withLayoutAndProtection(AnswerForum, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/:subjectId`}
  element={React.createElement(withLayoutAndProtection(SubjectStream, { allowedTypes: ['school_student'] }))}
/>


<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:assessment_id`}
  element={React.createElement(withLayoutAndProtection(TakeAssessments, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score`}
  element={React.createElement(withLayoutAndProtection(ViewAssessmentScore, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/take_test/:subject_id/:test_id`}
  element={React.createElement(withLayoutAndProtection(TakeTest, { allowedTypes: ['school_student'] }))}
/>

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/view_test_score/:subject_id/:test_id`}
  element={React.createElement(withLayoutAndProtection(ViewTestScore, { allowedTypes: ['school_student'] }))}
/>

            

<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/view_project/:project_id`}
  element={React.createElement(withLayoutAndProtection(ViewProject, { allowedTypes: ['school_student'] }))}
/>
      
<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/start_project/:project_id/:task_id/:lab_code`}
  element={React.createElement(withLayoutAndProtection(StartProject, { allowedTypes: ['school_student'] }))}
/>
     
      
   
<Route
  exact
  path={`${process.env.PUBLIC_URL}/subject_stream/elab/:video_id`}
  element={React.createElement(withLayoutAndProtection(Elab, { allowedTypes: ['school_student'] }))}
/>     

<Route
  exact
  path={`${process.env.PUBLIC_URL}/video_features`}
  element={React.createElement(withLayoutAndProtection(VideoFeatures, { allowedTypes: ['school_student'] }))}
/> 
            

<Route
  exact
  path={`${process.env.PUBLIC_URL}/video_features/markers`}
  element={React.createElement(withLayoutAndProtection(Markers, { allowedTypes: ['school_student'] }))}
/>



 <Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features/marker_single`}
   element={React.createElement(withLayoutAndProtection(MarkerSingle, { allowedTypes: ['school_student'] }))}
 />


<Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features/video_with_watermark`}
   element={React.createElement(withLayoutAndProtection(VideoWithWaterMark, { allowedTypes: ['school_student'] }))}
 />


<Route
   exact
   path={`${process.env.PUBLIC_URL}/home`}
   element={React.createElement(withLayoutAndProtection(Home, { allowedTypes: ['school_student'] }))}
 />

  

<Route
   exact
   path={`${process.env.PUBLIC_URL}/subjects/test_details/:testId`}
   element={React.createElement(withLayoutAndProtection(TestDetails, { allowedTypes: ['school_student'] }))}
 />          
       
<Route
   exact
   path={`${process.env.PUBLIC_URL}/default-user-profile`}
   element={React.createElement(withLayoutAndProtection(Defaultuserprofile, { allowedTypes: ['school_student'] }))}
 />        
      
      
<Route
   exact
   path={`${process.env.PUBLIC_URL}/subjects`}
   element={React.createElement(withLayoutAndProtection(Subjects, { allowedTypes: ['school_student'] }))}
 />             
      

         
 <Route
   exact
   path={`${process.env.PUBLIC_URL}/subjects/:subjectId/results`}
   element={React.createElement(withLayoutAndProtection(SubjectResults, { allowedTypes: ['school_student'] }))}
 />
         
         <Route
   exact
   path={`${process.env.PUBLIC_URL}/subjects/test_details/:testId`}
   element={React.createElement(withLayoutAndProtection(TestDetails, { allowedTypes: ['school_student'] }))}
 />

<Route
   exact
   path={`${process.env.PUBLIC_URL}/school_qna`}
   element={React.createElement(withLayoutAndProtection(Qna, { allowedTypes: ['school_student'] }))}
 />
            
            <Route
   exact
   path={`${process.env.PUBLIC_URL}/school_forums`}
   element={React.createElement(withLayoutAndProtection(Forums, { allowedTypes: ['school_student'] }))}
 />
          
       
          <Route
   exact
   path={`${process.env.PUBLIC_URL}/school_qna/view_qna/:qnaId`}
   element={React.createElement(withLayoutAndProtection(ViewQna, { allowedTypes: ['school_student'] }))}
 />
          
    
          <Route
   exact
   path={`${process.env.PUBLIC_URL}/school_forums/view_forum/:forumId`}
   element={React.createElement(withLayoutAndProtection(ViewQna, { allowedTypes: ['school_student'] }))}
 />        
 
     
 <Route
   exact
   path={`${process.env.PUBLIC_URL}/settings`}
   element={React.createElement(withLayoutAndProtection(Settings, { allowedTypes: ['school_student'] }))}
 />        
          

   
          <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/:subjectId`}
   element={React.createElement(withLayoutAndProtection(SubjectStream, { allowedTypes: ['school_student'] }))}
 />        
          
          <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/take_assessments/:assessment_id`}
   element={React.createElement(withLayoutAndProtection(TakeAssessments, { allowedTypes: ['school_student'] }))}
 />        
          
          <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/view_assessment_score`}
   element={React.createElement(withLayoutAndProtection(ViewAssessmentScore, { allowedTypes: ['school_student'] }))}
 />               
 <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/take_test/:subject_id/:test_id`}
   element={React.createElement(withLayoutAndProtection(TakeTest, { allowedTypes: ['school_student'] }))}
 />      
 <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/view_test_score/:subject_id/:test_id`}
   element={React.createElement(withLayoutAndProtection(ViewTestScore, { allowedTypes: ['school_student'] }))}
 />
   <Route
   exact
   path={`${process.env.PUBLIC_URL}/ssubject_stream/view_project/:project_id`}
   element={React.createElement(withLayoutAndProtection(ViewProject, { allowedTypes: ['school_student'] }))}
 />         

     
     <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/start_project/:project_id/:task_id/:lab_code`}
   element={React.createElement(withLayoutAndProtection(StartProject, { allowedTypes: ['school_student'] }))}
 />  
     
     

    
    <Route
   exact
   path={`${process.env.PUBLIC_URL}/subject_stream/elab/:video_id`}
   element={React.createElement(withLayoutAndProtection(Elab, { allowedTypes: ['school_student'] }))}
 /> 

<Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features`}
   element={React.createElement(withLayoutAndProtection(VideoFeatures, { allowedTypes: ['school_student'] }))}
 />


   <Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features/markers`}
   element={React.createElement(withLayoutAndProtection(Markers, { allowedTypes: ['school_student'] }))}
 />
 

<Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features/marker_single`}
   element={React.createElement(withLayoutAndProtection(MarkerSingle, { allowedTypes: ['school_student'] }))}
 />

     
     <Route
   exact
   path={`${process.env.PUBLIC_URL}/video_features/video_with_watermark`}
   element={React.createElement(withLayoutAndProtection(VideoWithWaterMark, { allowedTypes: ['school_student'] }))}
 />
  
            
  {/* <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-user-profile`}
              element={
                <ProtectedRoute
                  element={<Defaultuserprofile />}
                  allowedTypes={[
                    "school_student",
                   
                    "sub_admin",
                    "parent",
                    "teacher",
                  ]}
                />
              }
            /> */}

<Route
   exact
   path={`${process.env.PUBLIC_URL}/student/default-user-profile`}
   element={React.createElement(withLayoutAndProtection(StudentProfile, { allowedTypes: ['school_student'] }))}
 />

 
<Route
   exact
   path={`${process.env.PUBLIC_URL}/student/default-user-profile1`}
   element={React.createElement(withLayoutAndProtection(StudentProfile1, { allowedTypes: ['school_student'] }))}
 />

      
            {/* ebook start */}
          
           
            <Route
   exact
   path={`${process.env.PUBLIC_URL}/ebooks/preview_ebook/:ebook_id`}
   element={React.createElement(withLayoutAndProtection(PreviewEbook, { allowedTypes: ['school_student'] }))}
 />
       
           
          
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ebooks/preview_ebook/:ebook_id`}
              element={
                <ProtectedRoute
                  element={<PreviewEbook />}
                  allowedTypes={[ "school_student"]}
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
   path={`${process.env.PUBLIC_URL}/editor_practicse/:type/:redirecting_id/:type_id/:labId`}
   element={React.createElement(withLayoutAndProtection(Editor1, { allowedTypes: ['school_student'] }))}
 />
      
<Route
   exact
   path={`${process.env.PUBLIC_URL}/internship`}
   element={React.createElement(withLayoutAndProtection(Internship, { allowedTypes: ['school_student'] }))}
 />
        
              
</>
      )