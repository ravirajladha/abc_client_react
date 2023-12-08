import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
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

function Students() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);

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
    console.log("school", schoolId); // Assuming 'school_id' is the attribute
    fetch(`${baseUrl}api/school/api_get_school_students?school_id=${schoolId}`) // Pass the school_id as a query parameter
      .then((result) => result.json())
      .then((jsonbody) => {
        console.warn(jsonbody);
        setStudents(jsonbody);

        // Initialize DataTables after data is fetched
        $(tableRef.current).DataTable();
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom">
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
                      to="/school/add_student_view"
                      className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                    >
                      Add student
                    </Link>
                    <BackButton />
                  </div>
                </div>

                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <table ref={tableRef} id="myTable" className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Roll No</th>

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
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.auth_id}</td>

                          <td>{student.class?.class}</td>
                          <td>{student.section_id === 1 ? "A" : "B"}</td>
                          <td className="text-dark">
                            <Link
                              to={`/school/edit-student-profile/${index + 1}`}
                              className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
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
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Students;
