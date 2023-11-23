import React, { useState, useEffect, useRef } from "react";
import Appheader from "../../components/schoolComponents/Appheader";
import Appfooter from "../../components/schoolComponents/Appfooter";

import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import { Link } from "react-router-dom";

function Students() {
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
  },[]);

  const getStudents = () => {
    fetch(baseUrl + "api/school/api_all_students")
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
          <Appheader />
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b> Students</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to="/school/add_student_view"
                      className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                    >
                      Add student
                    </Link>
                  </div>
                </div>

                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <table ref={tableRef} id="myTable" className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">School</th>
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
                          <td>{student.school?.school_name}</td>
                          <td>{student.class?.class}</td>
                          <td>{student.section_id === 1 ? "A" : "B"}</td>
                          <td className="text-dark">
                            <Link
                              to="/school/view_student"
                              className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                            >
                              View
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
        <Appfooter />
      </div>
    </div>
  );
}

export default Students;
