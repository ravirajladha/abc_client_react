import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../lib/AuthContext";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

function Students() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/admin/api_get_all_students`)
        .then((result) => result.json())
        .then((jsonbody) => {
          setStudents(jsonbody);
          resolve(jsonbody);
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getStudents().catch((error) => {
      console.error("Error fetching student details:", error);
    });
  }, []);

  useEffect(() => {
    // This effect runs when students state updates
    if (students.length > 0 && tableRef.current) {
      const dataTable = $(tableRef.current).DataTable();
      return () => {
        // Destroy the DataTable when the component unmounts or before re-initializing
        dataTable.destroy();
      };
    }
  }, [students]);

  useEffect(() => {
    // Initialize or re-initialize the DataTable
    if (students.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [students]); // This will run every time the students state updates

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      <table ref={tableRef} id="myTable" className="table">
        <thead>
          <tr>
            <th scope="col">Sl. No.</th>
            <th scope="col">Roll No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Father Name</th>
            <th scope="col">Mother Name</th>
            <th scope="col">Student DOB</th>
            <th scope="col" className="text-dark">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.auth_id}</td>
              <td>{student.name}</td>
              <td>{student.user.name}</td>
              <td>{student.class2 ? student.class2.class : ""}</td>
              <td>{student.section_id}</td>
              <td className="text-dark">
                <Link
                  to={`/edit-teacher/${student.id}`}
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
  );
}

export default Students;
