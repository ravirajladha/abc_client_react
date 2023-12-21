import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../../lib/AuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-fixedcolumns";
import "datatables.net-fixedcolumns-bs4/css/fixedColumns.bootstrap4.min.css"; // Adjust based on your styling package
import Loader from "../../../components/common/Loader.jsx";
import NoContent from "../../../components/common/NoContent.jsx";

function Application() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplications = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/api_get_all_applications`)
        .then((result) => result.json())
        .then((jsonbody) => {
          setApplications(jsonbody);
          setLoading(false);
          resolve(jsonbody);
          initializeDataTable();
        })
        .catch((error) => {
          console.error("Error fetching student applications:", error);
          setLoading(false);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getApplications().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
  }, []);

  // useEffect(() => {
  //   if (applications.length > 0 && tableRef.current) {
  //     const dataTable = $(tableRef.current).DataTable({
  //       scrollX: true,
  //       scrollCollapse: true,
  //       fixedColumns: {
  //         leftColumns: 0, // No left fixed columns
  //         rightColumns: 2, // Freeze the last two columns
  //       },
  //     });
  //     return () => {
  //       // Destroy the DataTable when the component unmounts or before re-initializing
  //       dataTable.destroy();
  //     };
  //   }
  // }, [applications]);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0, // No left fixed columns
        rightColumns: 2, // Freeze the last two columns
      },
    });
  };

  const changeApplicationStatus = (applicationIndex, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].application_status = newStatus;
    setLoading(true);
    setApplications(updatedApplications);
    // Send a request to update the status on the backend
    fetch(`${baseUrl}api/school/update_application_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statusUpdatedBy: localStorage.getItem("rexkod_user_id"),
        applicationId: updatedApplications[applicationIndex].id,
        newStatus: newStatus,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedApplications = [...applications];
          updatedApplications[applicationIndex].application_status = newStatus;
          setApplications(updatedApplications);
          setLoading(false);
        } else {
          console.error("Status update failed:", data.message);
          const updatedApplications = [...applications];
          updatedApplications[applicationIndex].status = "Pending";
          setApplications(updatedApplications);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
        // Handle the error and reset the local state if needed
        const updatedApplications = [...applications];
        updatedApplications[applicationIndex].status = "Pending";
        setApplications(updatedApplications);
        setLoading(false);
      });
  };

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      {loading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <table ref={tableRef} id="myTable" className="table">
            <thead>
              <tr>
                <th scope="col">Sl. No.</th>
                <th scope="col">Student First Name</th>
                <th scope="col">Father Name</th>
                <th scope="col">Mother Name</th>
                <th scope="col">Student DOB</th>
                <th scope="col">Father Blood Group</th>
                <th scope="col">Father Company</th>
                <th scope="col">Father Designation</th>
                <th scope="col">Father Email</th>
                <th scope="col">Father Mobile</th>
                <th scope="col">Father Qualification</th>
                <th scope="col">Father Salary</th>
                <th scope="col">Father Telephone</th>
                <th scope="col">Mother Blood Group</th>
                <th scope="col">Mother Company</th>
                <th scope="col">Mother Designation</th>
                <th scope="col">Mother Email</th>
                <th scope="col">Mother Mobile</th>
                <th scope="col">Mother Name</th>
                <th scope="col">Mother Qualification</th>
                <th scope="col">Mother Salary</th>
                <th scope="col">Mother Telephone</th>
                <th scope="col">Religion Name</th>
                <th scope="col">Relative Phone</th>
                <th scope="col">Relationship with Child</th>
                <th scope="col">Residential Address</th>
                <th scope="col">Residential Phone</th>
                <th scope="col">Student Aadhaar</th>
                <th scope="col">Student Blood Group</th>
                <th scope="col">Student Caste</th>
                <th scope="col">Student DOB</th>
                <th scope="col">Student Father Name</th>
                <th scope="col">Student Gender</th>
                <th scope="col">Student Mother Tongue</th>
                <th scope="col">Student Nationality</th>
                <th scope="col">Student Parent Name</th>
                <th scope="col">Student Religion</th>
                <th scope="col">Updated at</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={index}>
                  <td className = "text-center">{index + 1}</td>
                  <td className = "text-center">{application?.student_fname ?? "-"}</td>
                  <td className = "text-center">{application?.fname ?? "-"}</td>
                  <td className = "text-center">{application?.m_name ?? "-"}</td>
                  <td className = "text-center">{application?.student_dob ?? "-"}</td>
                  <td className = "text-center">{application?.f_bld ?? "-"}</td>
                  <td className = "text-center">{application?.f_comp ?? "-"}</td>
                  <td className = "text-center">{application?.f_desig ?? "-"}</td>
                  <td className = "text-center">{application?.f_email ?? "-"}</td>
                  <td className = "text-center">{application?.f_mob ?? "-"}</td>
                  <td className = "text-center">{application?.f_qual ?? "-"}</td>
                  <td className = "text-center">{application?.f_sal ?? "-"}</td>
                  <td className = "text-center">{application?.f_tel ?? "-"}</td>
                  <td className = "text-center">{application?.m_bld ?? "-"}</td>
                  <td className = "text-center">{application?.m_comp ?? "-"}</td>
                  <td className = "text-center">{application?.m_desig ?? "-"}</td>
                  <td className = "text-center">{application?.m_email ?? "-"}</td>
                  <td className = "text-center">{application?.m_mob ?? "-"}</td>
                  <td className = "text-center">{application?.m_name ?? "-"}</td>
                  <td className = "text-center">{application?.m_qual ?? "-"}</td>
                  <td className = "text-center">{application?.m_sal ?? "-"}</td>
                  <td className = "text-center">{application?.m_tel ?? "-"}</td>
                  <td className = "text-center">{application?.rel_name ?? "-"}</td>
                  <td className = "text-center">{application?.rel_phone ?? "-"}</td>
                  <td className = "text-center">{application?.relation_ch ?? "-"}</td>
                  <td className = "text-center">{application?.res_add ?? "-"}</td>
                  <td className = "text-center">{application?.res_phone ?? "-"}</td>
                  <td className = "text-center">{application?.student_aadhaar ?? "-"}</td>
                  <td className = "text-center">{application?.student_blood_group ?? "-"}</td>
                  <td className = "text-center">{application?.student_caste ?? "-"}</td>
                  <td className = "text-center">{application?.student_dob ?? "-"}</td>
                  <td className = "text-center">{application?.student_fname ?? "-"}</td>
                  <td className = "text-center">{application?.student_gender ?? "-"}</td>
                  <td className = "text-center">{application?.student_mt ?? "-"}</td>
                  <td className = "text-center">{application?.student_nationality ?? "-"}</td>
                  <td className = "text-center">{application?.student_pname ?? "-"}</td>
                  <td className = "text-center">{application?.student_religion ?? "-"}</td>
                  <td className = "text-center">{application?.updated_at ?? "-"}</td>
                  <td>
                    <button
                      className={`p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 ${
                        application?.application_status === 1
                          ? "bg-success"
                          : application?.application_status === 2
                          ? "bg-danger"
                          : "bg-primary"
                      }`}
                    >
                      {application?.application_status === 1
                        ? "Approved"
                        : application?.application_status === 2
                        ? "Rejected"
                        : "Pending"}
                    </button>
                  </td>
                  <td>
                    <select
                      className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                      value={application.application_status}
                      onChange={(e) =>
                        changeApplicationStatus(index, +e.target.value)
                      }
                      aria-label="Select status"
                    >
                      <option className="bg-light text-dark" value="0">
                        Pending&nbsp;
                      </option>
                      <option className="bg-light text-dark" value="1">
                        Approve&nbsp;{" "}
                      </option>
                      <option className="bg-light text-dark" value="2">
                        Reject&nbsp;{" "}
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Application;
