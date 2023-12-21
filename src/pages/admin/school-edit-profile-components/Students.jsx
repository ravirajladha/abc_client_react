import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../lib/AuthContext";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import Loader from "../../../components/common/Loader";
import NoContent from "../../../components/common/NoContent";

function Students() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: schoolId } = useParams();

  const getStudents = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch(
        `${baseUrl}api/school/api_get_school_students?school_id=${schoolId}`
      )
        .then((result) => result.json())
        .then((jsonbody) => {
          console.log("JSON Response:", jsonbody);
          setStudents(jsonbody);
          setLoading(false);
          resolve(jsonbody);
          initializeDataTable();
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
          setLoading(false);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getStudents().catch((error) => {
      console.error("Error fetching student details:", error);
    });
  }, []);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable();
  };

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      {loading ? (
        <Loader />
      ) : (
        <table ref={tableRef} id="myTable" className="table">
          <thead>
            <tr>
              <th scope="col">Sl. No.</th>
              <th scope="col">Student Id </th>
              <th scope="col">Student Name</th>
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
                <td>{student?.auth_id}</td>
                <td>{student?.name}</td>
                <td>{student?.class?.class}</td>
                <td>{student?.section_id}</td>
                <td className="text-dark">
                  <Link
                    to={`/school/students/edit-student-profile-detail/${student?.id}`}
                    className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Students;
