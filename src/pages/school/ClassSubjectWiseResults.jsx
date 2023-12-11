import React, { useState, useEffect, useRef,useMemo } from "react";
import AppFooter from '../../components/includes/AppFooter'
import BackButton from '../../components/navigation/BackButton'
import AppHeader from '../../components/includes/AppHeader'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [term, setTerm] = useState('1'); // default to term 1
  const [section, setSection] = useState('1'); // default to section a

    // Extract subjects for table header. This will create a list of unique subjects
  // across all students, assuming 'results' is the array shown in your screenshot.
  const subjects = useMemo(() => {
    const allSubjects = new Set();
    results.forEach(result => {
      Object.keys(result.results).forEach(subject => {
        allSubjects.add(subject);
      });
    });
    return Array.from(allSubjects);
  }, [results]);

  const getTestResults = () => {
    // Modify the endpoint to include term and section
    const url = `${baseUrl}api/get_class_subject_wise_result/${classId}/${term}/${section}`;
    fetch(url).then(function (res) {
      res.json().then(function (jsonBody) {
        console.log(jsonBody);
        setResults(jsonBody);
        $(tableRef.current).DataTable();
      });
    }).catch(function (error) {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    getTestResults();
    // Cleanup function for DataTables
    return () => {
      const table = $(tableRef.current).DataTable();
      table.destroy();
    };
  }, [classId, term, section]);
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
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
                <select value={term} onChange={e => setTerm(e.target.value)}>
        <option value="1">Term 1</option>
        <option value="2">Term 2</option>
        <option value="3">Term 3</option>
      </select>

      {/* Dropdown for selecting section */}
      <select value={section} onChange={e => setSection(e.target.value)}>
        <option value="1">Section A</option>
        <option value="2">Section B</option>
        <option value="3">Section C</option>
      </select>
                <div className="table-responsive">
                      <table ref={tableRef} className="table mb-0">
                        <thead className="bg-greylight rounded-10 ovh">
                          <tr>
            <th className="border-0">Sl no.</th>
            <th className="border-0">Student</th>
            {/* Dynamically create a header for each subject */}
            {subjects.map((subject, index) => (
              <th className="border-0" key={index}>{subject}</th>
            ))}
            <th className="border-0">Total</th>
            <th className="border-0">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="capitalize">{result.student_name}</td>
                {/* Dynamically display scores for each subject */}
                {subjects.map((subject, index) => (
                  <td key={index}>{result.results[subject] || '-'}</td>
                ))}
                {/* Calculate the total score */}
                <td>{Object.values(result.results).reduce((total, score) => total + score, 0)}</td>
                <td>
                  <Link to={"/student/"+result.student_id} className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg uppercase text-center font-xsssss ls-3 bg-current mx-1">Profile</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={subjects.length + 4}>No data found</td>
            </tr>
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
  )
}

export default ClassResults