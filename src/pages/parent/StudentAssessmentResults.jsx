import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader";
import NoContent from "../../components/common/NoContent";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";

function StudentAssessmentResults() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { studentId, subjectId } = useParams();
  const tableRef = useRef(null);

  const [results, setResults] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAssessmentResults = (e) => {
    fetch(baseUrl + "api/" + studentId + "/subject-results/" + subjectId)
      .then(function (result) {
        return result.json();
      })
      .then(function (jsonBody) {
        setResults(jsonBody);
        setLoading(false);
        $(tableRef.current).DataTable();
      });
  };

  const getSubjectName = () => {
    fetch(baseUrl + "api/subject/" + subjectId)
      .then(function (result) {
        return result.json();
      })
      .then(function (jsonBody) {
        setSubjectName(jsonBody.subject_name);
      });
  };

  useEffect(() => {
    getAssessmentResults();
    getSubjectName();
  }, []);

  return (
    <div className="p-5 theme-dark-bg">
      <div className="middle-sidebar-left">
        {loading ? (
          <Loader />
        ) : results && results.length > 0 ? (
          <div className="row">
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="col-lg-12 pt-0 my-3 d-flex justify-content-between align-items-center ">
                <div>
                  <h2 className="fw-400 font-lg d-block ml-2">
                    {subjectName} <b> Assessment Scores</b>
                  </h2>
                </div>
                <div className="float-right">
                  <BackButton />
                </div>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-admin mb-0" ref={tableRef}>
                    <thead className="bg-greylight rounded-10 ovh border-0">
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0" scope="col">
                          Assessment
                        </th>
                        <th className="border-0" scope="col">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <b>{result.test_title}</b>
                          </td>
                          <td>{result.test_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoContent />
        )}
      </div>
    </div>
  );
}

export default StudentAssessmentResults;
