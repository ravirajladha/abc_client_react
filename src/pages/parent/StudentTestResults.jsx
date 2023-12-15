import React, { useState, useEffect } from "react";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function StudentTestResults() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { studentId, subjectId } = useParams();

  const [results, setResults] = useState([]);
  const [subjectName, setSubjectName] = useState([]);

  const getTestResults = (e) => {
    fetch(baseUrl + "api/" + studentId + "/subject-results/" + subjectId).then(
      function (result) {
        result.json().then(function (jsonBody) {
          setResults(jsonBody);
        });
      }
    );
  };

  const getSubjectName = () => {
    fetch(baseUrl + "api/subject/" + subjectId).then(function (result) {
      result.json().then(function (jsonBody) {
        setSubjectName(jsonBody.subject_name);
      });
    });
  };

  useEffect(() => {
    getTestResults();
    getSubjectName();
  },[]);

  return (
    <div className="main-wrapper">
      <div className="main-content  menu-active" id="main-content">
        <AppHeader />
        <div className="p-5 theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
                  <div>
                    <h2 className="fw-400 font-lg d-block ml-2">
                      {subjectName} <b> Test Scores</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-admin mb-0">
                      <thead className="bg-greylight rounded-10 ovh border-0">
                        <tr>
                          <th className="border-0">Term</th>
                          <th className="border-0" scope="col">
                            Test
                          </th>
                          <th className="text-center border-0" scope="col">
                            Score
                          </th>
                          <th className="text-center border-0" scope="col">
                            Rank
                          </th>
                          <th className="text-center border-0" scope="col" width="10%">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results ? (
                          results.map((result, index) => (
                            <tr key={index}>
                              <td className="">Term {result.test_term}</td>
                              <td>
                                <b>{result.test_title}</b>
                              </td>
                              <td className="text-center">{result.test_score}</td>
                              <td className="text-center">{result.test_rank}</td>
                              <td className="text-center" width="10%">
                                <Link
                                  key={index}
                                  to={
                                    "/student/" +
                                    result.student_id +
                                    "/results/" +
                                    result.test_id
                                  }
                                  className="px-3 py-1 d-inline-block text-white fw-700 lh-10 rounded-lg uppercase text-center font-xsssss ls-3 bg-current mx-1"
                                >
                                  Test Response
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
      </div>
      <AppFooter />
    </div>
  );
}

export default StudentTestResults;
