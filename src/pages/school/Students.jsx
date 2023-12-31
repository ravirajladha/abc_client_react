import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

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

  useEffect(() => {
    getStudents();

    // Cleanup function for DataTables
    return () => {
      const table = $(tableRef.current).DataTable();
      table.destroy();
    };
  }, []);

  const getStudents = () => {
    const schoolId = userDetails.user.id;
    console.log("school", schoolId);
    setLoading(true);
    fetch(`${baseUrl}api/school/api_get_school_students?school_id=${schoolId}`)
      .then((result) => result.json())
      .then((jsonbody) => {
        setStudents(jsonbody);
        // Initialize DataTables after data is fetched
        $(tableRef.current).DataTable();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };
  const changeStudentStatus = (id, newStatus) => {
    const schoolId = userDetails.user.id;
    // Send a request to update the status on the backend
    setLoading(true);
    fetch(`${baseUrl}api/update_student_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        newStatus,
        schoolId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        // Initialize DataTables after data is fetched
        $(tableRef.current).DataTable();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Updating students:", error);
        setLoading(false);
      });
  };

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
                className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
              >
                Add student
              </Link>
              <BackButton />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : students.length > 0 ? (
            <div className="card w-100 bg-white shadow-sm m-2 p-lg-5 p-4 border-0 rounded-lg d-block float-left">
              <div className="card-body w-100 border-0 ">
                <table ref={tableRef} id="myTable" className="table">
                  <thead>
                    <tr>
                      <th scope="col">Roll No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Class</th>
                      <th scope="col">Section</th>
                      <th>Status</th>
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
                        <td className="align-middle">
                          <button
                            className={`p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 ${
                              student.student?.status === 1
                                ? "bg-success"
                                : student.student?.status === 2
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {student.student?.status === 1
                              ? "Approved"
                              : student.student?.status === 2
                              ? "Rejected"
                              : "Pending"}
                          </button>
                        </td>
                        <td className="align-middle text-dark">
                          <select
                            className=" p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                            value={student.student.status}
                            onChange={(e) =>
                              changeStudentStatus(
                                student.auth_id,
                                +e.target.value
                              )
                            }
                            aria-label="Select status"
                          >
                            <option className="bg-light text-dark" value="1">
                              Enable&nbsp;{" "}
                            </option>
                            <option className="bg-light text-dark" value="0">
                              Disable&nbsp;{" "}
                            </option>
                          </select>

                          <Link
                            to={`/school/student/${student.auth_id}/edit`}
                            className="btn btn-icon me-2 p-2"
                          >
                            <i
                              className="ti-pencil-alt text-dark font-xsss mx-2 fw-500"
                              title="Edit Student"
                            ></i>
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
