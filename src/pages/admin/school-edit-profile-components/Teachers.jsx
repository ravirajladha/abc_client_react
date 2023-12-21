import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import Loader from "../../../components/common/Loader";
import NoContent from "../../../components/common/NoContent";
import { useParams } from "react-router-dom";

function Teachers({ creatorId }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const fetchTeachers = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch(
        `${baseUrl}api/school/get_all_teachers_school_wise?created_by=${creatorId}`
      )
        .then((result) => result.json())
        .then((jsonbody) => {
          console.log("all teacher", jsonbody);

          setTeachers(jsonbody);
          setLoading(false);
          resolve(jsonbody);
          initializeDataTable();
        })
        .catch((error) => {
          console.error("Error fetching teacher details:", error);
          setLoading(false);
          reject(error);
        });
    });
  };

  const initializeDataTable = () => {
    $(tableRef.current).DataTable();
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default Teachers;
