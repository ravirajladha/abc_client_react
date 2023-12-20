import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useParams } from "react-router-dom";

function Teachers({ creatorId  }) {
  // ...


  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [teachers, setTeachers] = useState([]);
  const tableRef = useRef(null);

  console.log("createori111d",creatorId);
  const fetchTeachers = () => {
    // Destroy the existing DataTable before fetching new data
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/admin/api_get_all_teachers_school_wise?school_id=${creatorId}`)
        .then((result) => result.json())
        .then((jsonbody) => {
        console.log("all teahcher", jsonbody);

          setTeachers(jsonbody);
          resolve(jsonbody);

          // Reinitialize DataTables after data is fetched
          $(tableRef.current).DataTable({
            paging: true,
            searching: true,
            ordering: true,
            columns: [
              { title: "Sl. No." },
              { title: "Name" },
              { title: "Email" },
              { title: "Classes and Subjects" },
              { title: "Action" },
            ],
          });
        })
        .catch((error) => {
          console.error("Error fetching teacher details:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // This effect runs once after initial render

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      <table ref={tableRef} className="table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Teacher Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Classes and Subjects</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{teacher.auth_id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                {teacher.class_and_subject.map((item, idx) => (
                  <div key={idx}>
                    {item.class_name}, {item.subject_name}
                  </div>
                ))}
              </td>
              {/* <td>
                <Link
                  to={`/edit-teacher/${teacher.id}`}
                  className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                >
                  Edit
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
