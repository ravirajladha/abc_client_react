import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function StudentResultAssessment() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [assessments, setAssessments] = useState([]);
  const { assessment_id } = useParams();
  console.log(assessment_id);
  const [subjectName, setSubjectName] = useState([]);
  // const getSubjectName = () => {
  //   fetch(baseUrl + "api/subject/" + chapter_id).then(function (result) {
  //     result.json().then(function (jsonBody) {
  //       setSubjectName(jsonBody.subject_name);
  //     });
  //   });
  // };
   const getAssessments = () => {
    fetch(`${baseUrl}api/getAssessmentResultsWithStudentName/${assessment_id}`)
      .then((result) => result.json())
      .then((jsonBody) => {
        console.log("assessment", jsonBody);
        setAssessments(jsonBody);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Fetch assessments when component mounts or when assessment_id changes
  useEffect(() => {
    getAssessments();
  }, [assessment_id]);

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      <b> Assessment Result</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10 ovh">
                        <tr>
                          <th className="border-0">Sl no.</th>
                          {/* <th className="border-0">Class</th> */}
                          {/* <th className="border-0" scope="col">
                            Subject Name
                          </th> */}
                          <th className="border-0" scope="col">
                           User Name
                          </th>
                          <th className="border-0" scope="col">
                           Score
                          </th>
                          <th className="border-0" scope="col">
                            Percentage
                          </th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {assessments ? (
                          assessments.map((assessment, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <b>{assessment.student_name}</b>
                              </td>
                              <td>
                                <b>{assessment.score}</b>
                              </td>

                              <td>
                                <b>{assessment.percentage}</b>
                              </td>

                             
                            </tr>
                          ))
                        ) : (
                          <h1>No data found</h1>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default StudentResultAssessment;
