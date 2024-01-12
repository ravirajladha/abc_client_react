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
        rightColumns: 3, // Freeze the last two columns
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
    <div className="card-body w-100 border-0">
      {loading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <table ref={tableRef} id="myTable" className="table">
            <thead>
              <tr>
                <th scope="col">Sl. No.</th>
                <th scope="col">Student Name</th>
                <th scope="col">Branch</th>
                <th scope="col">Class</th>
                <th scope="col">Father Name</th>
                <th scope="col">Mother name</th>
                <th scope="col">Father Ph no</th>
                <th scope="col">Mother Ph no</th>
                <th scope="col">Student DOB</th>
                <th scope="col">Updated at</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={index}>
                  <td className = "text-center">{index + 1}</td>
                  <td className = "text-center">{application?.student_fname ?? "-"}</td>
                  <td className = "text-center">{application?.branch ?? "-"}</td>
                  <td className = "text-center">{application?.classname ?? "-"}</td>
                  <td className = "text-center">{application?.fname ?? "-"}</td>
                  <td className = "text-center">{application?.m_name ?? "-"}</td>
                  <td className = "text-center">{application?.f_mob ?? "-"}</td>
                  <td className = "text-center">{application?.m_mob ?? "-"}</td>
                  <td className = "text-center">{application?.student_dob ?? "-"}</td>
                  <td className = "text-center">{application?.updated_at
    ? new Date(application.updated_at).toLocaleString()
    : "-"}</td>
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
                  <td>
                  <Link
                  to={`/schools/view-application/${application.id}`}
                  className="p-2 px-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
                >
                  <i className="feather-eye ml-2"></i>
                </Link>
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
