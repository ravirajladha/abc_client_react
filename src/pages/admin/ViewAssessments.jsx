import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function ViewAssessments() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [assessments, setAssessments] = useState([]);
  const { subject_id } = useParams();
  const [subjectName, setSubjectName] = useState([]);
  const getSubjectName = () => {
    fetch(baseUrl + "api/subject/" + subject_id).then(
      function (result) {
        result.json().then(function (jsonBody) {
          setSubjectName(jsonBody.subject_name);
        });
      }
    );
  };
  const getAssessments = (e) => {
    fetch(baseUrl + "api/get_assessments/" + subject_id).then(
      function (result) {
        result.json().then(function (jsonbody) {
          console.log(jsonbody);
          setAssessments(jsonbody);
        });
      }
    );
  };

  useEffect(() => {
    getAssessments();
    getSubjectName();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="custom-middle-sidebar-left">
              <div className="row">
              <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                    {subjectName} <b> Assessments</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <div className="table-responsive">
                      <table className="table table-admin mb-0">
                        <thead className="bg-greylight rounded-10 ovh">
                          <tr>
                            <th className="border-0">Sl no.</th>
                            <th className="border-0" scope="col">
                              Chapter Name
                            </th>
                            <th className="border-0" scope="col">
                              Video Name
                            </th>
                            <th className="border-0" scope="col">
                              Question
                            </th>
                            <th className="border-0" scope="col">
                              Code
                            </th>
                            <th className="border-0" scope="col">
                              Option 1
                            </th>
                            <th className="border-0" scope="col">
                              Option 2
                            </th>
                            <th className="border-0" scope="col">
                              Option 3
                            </th>
                            <th className="border-0" scope="col">
                              Option 4
                            </th>
                            <th className="border-0 text-success" scope="col">
                              Answer
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessments ? (
                            assessments.map((assessment, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <b>{assessment.chapter.chapter_name}</b>
                                </td>
                                <td>{assessment.video.video_name}</td>
                                <td>{assessment.question}</td>
                                <td>{assessment.question_code}</td>
                                <td>{assessment.option1}</td>
                                <td>{assessment.option2}</td>
                                <td>{assessment.option3}</td>
                                <td>{assessment.option4}</td>
                                <td className="text-success fw-bold">{assessment.answer}</td>
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
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default ViewAssessments;
