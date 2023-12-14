import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { Link } from "react-router-dom";

function ViewAssessments() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [assessments, setAssessments] = useState([]);
  const { subject_id } = useParams();
  const [subjectName, setSubjectName] = useState([]);
  const getSubjectName = () => {
    fetch(baseUrl + "api/subject/" + subject_id).then(function (result) {
      result.json().then(function (jsonBody) {
        setSubjectName(jsonBody.subject_name);
      });
    });
  };
  const getAssessments = (e) => {
    fetch(baseUrl + "api/get_assessments/" + subject_id).then(function (
      result
    ) {
      result.json().then(function (jsonbody) {
        console.log(jsonbody);
        setAssessments(jsonbody);
      });
    });
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
            <div className="middle-sidebar-left">
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
                <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10 ovh">
                        <tr>
                          <th className="border-0">Sl no.</th>
                          <th className="border-0">Class</th>
                          <th className="border-0" scope="col">
                            Subject Name
                          </th>
                          <th className="border-0" scope="col">
                            Assessment Name
                          </th>
                          <th className="border-0" scope="col">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessments ? (
                          assessments.map((assessment, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <b>{assessment.class.class}</b>
                              </td>
                              <td>
                                <b>{assessment.subject.subject_name}</b>
                              </td>
                              <td>
                                <b>{assessment.name}</b>
                              </td>
                              <td>
                                <Link
                                  to={`/assessments/assessment_details/${assessment.id}`}
                                  className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                >
                                  View Details
                                </Link>
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

export default ViewAssessments;
