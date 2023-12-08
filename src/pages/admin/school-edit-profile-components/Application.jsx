import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import { AuthContext } from "../../../lib/AuthContext";
import BackButton from "../../../components/navigation/BackButton";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

function Application() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = () => {
    fetch(`${baseUrl}api/school/api_get_all_applications`)
      .then((result) => result.json())
      .then((jsonbody) => {
        console.warn(jsonbody);
        setApplications(jsonbody);
        console.log(applications);

        // Initialize DataTable after data is available
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      })
      .catch((error) => {
        console.error("Error fetching student applications:", error);
      });
  };

  useEffect(() => {
    if (tableRef.current) {
      const dataTable = $(tableRef.current).DataTable();
      return () => {
        // Destroy the DataTable when the component unmounts
        dataTable.destroy();
      };
    }
  }, []);

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      <table ref={tableRef} id="myTable" className="table">
        <thead>
          <tr>
            <th scope="col">Sl. No.</th>
            <th scope="col">Student First Name</th>
            <th scope="col">Father Name</th>
            <th scope="col">Mother Name</th>
            <th scope="col">Student DOB</th>
            <th scope="col" className="text-dark">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{application.student_fname}</td>
              <td>{application.fname}</td>
              <td>{application.m_name}</td>
              <td>{application.student_dob}</td>
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
  );
}

export default Application;
