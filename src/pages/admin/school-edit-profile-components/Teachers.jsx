import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

function Teachers() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [teachers, setTeachers] = useState([]);
  const tableRef = useRef(null);

  const fetchTeachers = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/admin/api_get_all_teachers`)
        .then((result) => result.json())
        .then((jsonbody) => {
          setTeachers(jsonbody);
          resolve(jsonbody);
        })
        .catch((error) => {
          console.error("Error fetching teacher details:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    // Initialize DataTable
    $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      columns: [
        { title: "Sl. No." },
        { title: "Auth ID" },
        { title: "Email" },
        { title: "Classes and Subjects" },
        { title: "Action" },
      ],
    });

    // Destroy the DataTable when the component unmounts to prevent memory leaks
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []); // This effect runs once after initial render

  useEffect(() => {
    // Fetch teachers data
    fetchTeachers();
  }, []); // This effect also runs once after initial render

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      <table ref={tableRef} className="table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Auth ID</th>
            <th>Email</th>
            <th>Classes and Subjects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{teacher.auth_id}</td>
              <td>{teacher.email}</td>
              <td>
                {teacher.class_and_subject.map((item, idx) => (
                  <div key={idx}>
                    Class ID: {item.class_id}, Subject ID: {item.subject_id}
                  </div>
                ))}
              </td>
              <td>
                <Link
                  to={`/edit-teacher/${teacher.id}`}
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

export default Teachers;
