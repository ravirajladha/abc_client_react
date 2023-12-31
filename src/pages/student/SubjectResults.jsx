import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import StudentSidebar from "../../components/includes/StudentSidebar";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

function SubjectResults() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const tableRef = useRef(null);
  const userString = localStorage.getItem("rexkod_user");
  const user = JSON.parse(userString);
  const studentId = user.student.auth_id;


  const [results, setResults] = useState([]);
  const { subjectId } = useParams();
  const getTestResults = (e) => {
    console.log(subjectId);
    fetch(baseUrl + "api/" + studentId + "/subject-results/" + subjectId ).then(function (
      result
    ) {
      result.json().then(function (jsonBody) {
        setResults(jsonBody);
        // $(tableRef.current).DataTable();
      });
    });
  };
  useEffect(() => {

    getTestResults();
    // Cleanup function for DataTables
    // return () => {
    //   const table = $(tableRef.current).DataTable();
    //   table.destroy();
    // };
  }, []);
  return (
    <>
   
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
              <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      <b> Results</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>

                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <div className="table-responsive">
                      {/* <table ref={tableRef} className="table mb-0"> */}
                      <table className="table mb-0">
                        <thead className="bg-greylight rounded-10 ovh">
                          <tr>
                            <th scope="col">Term</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results ? (
                            results.map((result, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  <b>{result.test_title}</b>
                                </td>
                                <td>{result.test_score}</td>
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
            <StudentSidebar />
          </div>
       
    </>
  );
}

export default SubjectResults;
