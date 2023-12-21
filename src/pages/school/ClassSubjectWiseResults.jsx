import React, { useState, useEffect, useRef, useMemo } from "react";
import BackButton from "../../components/navigation/BackButton";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import NoContent from "../../components/common/NoContent";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

const ClassResults = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const tableRef = useRef(null);
  const { classId } = useParams();

  const [results, setResults] = useState([]);
  const [term, setTerm] = useState(""); // default to term 1
  const [section, setSection] = useState(""); // default to section a
  const [loading, setLoading] = useState(true);

  // Extract subjects for table header. This will create a list of unique subjects
  // across all students, assuming 'results' is the array shown in your screenshot.
  const subjects = useMemo(() => {
    const allSubjects = new Set();
    results.forEach((result) => {
      Object.keys(result.results).forEach((subjectKey) => {
        // Extract the subject name from the subjectKey
        const [_, subjectName] = subjectKey.split("_");
        allSubjects.add(subjectName);
      });
    });
    return Array.from(allSubjects);
  }, [results]);

  const getTestResults = () => {
    setLoading(true);
    // Update the URL to use the path parameters
    const url = `${baseUrl}api/get_class_subject_wise_result/${classId}/${term}/${section}`;
    // Return the fetch promise
    return fetch(url)
      .then((res) => res.json())
      .then((jsonBody) => {
        console.log(jsonBody);
        setResults(jsonBody);
        setLoading(false);
        // Initialization of DataTables is moved to initDataTable function called after data is set
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Function to initialize DataTables
    const initDataTable = () => {
      // Ensure that DataTables isn't already initialized
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        // If it is, destroy the existing instance
        $(tableRef.current).DataTable().destroy();
      }
      // Initialize a new DataTable
      $(tableRef.current).DataTable();
    };

    // Call getTestResults, then initialize DataTables
    getTestResults().then(initDataTable);

    // Cleanup function for DataTables
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, [classId, term, section]);

  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  Class <b> Results</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>

            <div className="card-body p-2 w-100 border-0 ">
              <div className="my-2 row">
                <div className="col-lg-2">
                  <select
                    className="form-select "
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  >
                    <option value="">Select Term</option>

                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                    <option value="3">Term 3</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-select "
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    <option value="1">Section A</option>
                    <option value="2">Section B</option>
                    <option value="3">Section C</option>
                  </select>
                </div>
                {/* Dropdown for selecting section */}
              </div>
              {loading ? (
                <Loader />
              ) : results.length > 0 ? (
                <div className="table-responsive">
                  <table ref={tableRef} className="table mb-0">
                    <thead className="bg-greylight rounded-10 ovh">
                      <tr>
                        <th className="border-0">Sl no.</th>
                        <th className="border-0">Student</th>
                        {/* Dynamically create a header for each subject */}
                        {subjects.map((subject, index) => (
                          <th className="border-0" key={index}>
                            {subject}
                          </th>
                        ))}
                        <th className="border-0">Total</th>
                        <th className="border-0">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="capitalize">{result.student_name}</td>
                          {/* Dynamically display scores for each subject */}
                          {/* Map over the subjects and display the scores */}
                          {Object.entries(result.results).map(
                            ([subjectKey, scoreObj], index) => {
                              const [subjectId, subjectName] =
                                subjectKey.split("_");
                              const score = scoreObj ? scoreObj.score : ""; // Access the score property
                              return (
                                <td key={index}>
                                  {score !== "" ? score : "-"}
                                </td>
                              );
                            }
                          )}

                          {/* Calculate the total score */}
                          <td>
                            {Object.values(result.results).reduce(
                              (total, scoreObj) => {
                                // Check if scoreObj exists and has a 'score' property
                                if (scoreObj && scoreObj.score !== null) {
                                  return total + scoreObj.score; // Add the score to the total
                                }
                                return total; // Otherwise, return the current total as is
                              },
                              0 // Initial value for the total
                            )}
                          </td>

                          <td>
                            {Object.entries(result.results).map(
                              ([subjectKey, scoreObj], index) => {
                                const [subjectId, subjectName] =
                                  subjectKey.split("_");
                                const score = scoreObj ? scoreObj.score : null;
                                const testId = scoreObj
                                  ? scoreObj.test_id
                                  : null;
                                return (
                                  <>
                                    {testId !== null && score !== null ? (
                                      <Link
                                        key={index}
                                        to={
                                          "/student/" +
                                          result.student_id +
                                          "/results/" +
                                          testId
                                        }
                                        className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg uppercase text-center font-xsssss ls-3 bg-current mx-1"
                                      >
                                        {subjectName} Response
                                      </Link>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <NoContent contentName="results" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassResults;
