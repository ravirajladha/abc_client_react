import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";

import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function Students() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStudents = () => {
    const schoolId = userDetails.user.id;
    setLoading(true);
    fetch(`${baseUrl}api/school/api_get_school_students?school_id=${schoolId}`)
      .then((result) => result.json())
      .then((json) => {
        setStudents(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (students.length > 0) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      $(tableRef.current).DataTable();
    }
  }, [students]);

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="custom-middle-sidebar-bottom p-3">
      <div className="middle-sidebar-left">
        <div className="row">
          <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
            <div>
              <h2 className="fw-400 font-lg d-block">
                All <b> Students</b>
              </h2>
            </div>
            <div className="float-right">
              <Link
                to="/school/students/add_student_view"
                className="py-2 px-3 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current uppercase"
              >
                Add student
              </Link>
              <BackButton />
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : students.length > 0 ? (
            <div className="card border-0  shadow-sm mx-2">
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <table ref={tableRef} id="myTable" className="table">
                  <thead>
                    <tr>
                      <th scope="col">Roll No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Class</th>
                      <th scope="col">Section</th>
                      <th scope="col" className="text-dark">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td className="align-middle">{student.auth_id}</td>
                        <td className="align-middle">{student.name}</td>
                        <td className="align-middle">{student.class?.class}</td>
                        <td className="align-middle">
                          {student.section_id === 1 ? "A" : "B"}
                        </td>
                        <td className="align-middle text-dark">
                          <Link
                            to={`/school/student/${student.auth_id}/edit`}
                            className="px-3 py-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current uppercase"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoContent contentName="students" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
