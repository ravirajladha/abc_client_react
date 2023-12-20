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

function Application() {
  const userDetails = useContext(AuthContext).user;
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);

  const getApplications = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/api_get_all_applications`)
        .then((result) => result.json())
        .then((jsonbody) => {
          setApplications(jsonbody);
          resolve(jsonbody);
        })
        .catch((error) => {
          console.error("Error fetching student applications:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getApplications().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
  }, []); // This will run only once on component mount.

  useEffect(() => {
    if (applications.length > 0 && tableRef.current) {
      const dataTable = $(tableRef.current).DataTable({
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
          leftColumns: 0, // No left fixed columns
          rightColumns: 2, // Freeze the last two columns
        },
      });
      return () => {
        // Destroy the DataTable when the component unmounts or before re-initializing
        dataTable.destroy();
      };
    }
  }, [applications]);

  const changeApplicationStatus = (applicationIndex, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].application_status = newStatus;
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
        } else {
          console.error("Status update failed:", data.message);
          const updatedApplications = [...applications];
          updatedApplications[applicationIndex].status = "Pending";
          setApplications(updatedApplications);
        }
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
        // Handle the error and reset the local state if needed
        const updatedApplications = [...applications];
        updatedApplications[applicationIndex].status = "Pending";
        setApplications(updatedApplications);
      });
  };

  return (
    <div className="card-body p-lg-5 p-4 w-100 border-0">
      <div className="table-responsive">
        {/* <table ref={tableRef} id="myTable" className="table">
          <thead>
            <tr>
              <th scope="col">Sl. No.</th>
              <th scope="col">Student First Name</th>
              <th scope="col">Father Name</th>
              <th scope="col">Mother Name</th>
              <th scope="col">Student DOB</th>
              <th scope="col">Dummy1</th>
              <th scope="col">Dummy2</th>
              <th scope="col">Dummy3</th>
              <th scope="col">Dummy4</th>
              <th scope="col">Dummy5</th>
              <th scope="col">Dummy6</th>
              <th scope="col">Dummy7</th>
              <th scope="col">Dummy8</th>
              <th scope="col">Dummy9</th>
              <th scope="col">Dummy10</th>
              <th scope="col" className="text-dark sticky-column">
                Status
              </th>
              <th scope="col" className="text-dark sticky-column">
                Actions
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
                <td>Dummyr1</td>
                <td>Dummyr2</td>
                <td>Dummyr3</td>
                <td>Dummyr4</td>
                <td>Dummyr5</td>
                <td>Dummyr6</td>
                <td>Dummyr7</td>
                <td>Dummyr8</td>
                <td>Dummyr9</td>
                <td>Dummyr10</td>
                <td className="text-dark sticky-column">
                  <button
                    className={`p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 ${
                      application.application_status === 1
                        ? "bg-success"
                        : application.application_status === 2
                        ? "bg-danger"
                        : "bg-current"
                    }`}
                  >
                    {application.application_status === 1
                      ? "Approved"
                      : application.application_status === 2
                      ? "Rejected"
                      : "Pending"}
                  </button>
                </td>
                <td className="sticky-column">
                  <select
                    className="form-select p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current border-none"
                    value={application.application_status}
                    onChange={(e) =>
                      changeApplicationStatus(index, +e.target.value)
                    }
                    aria-label="Select status"
                  >
                    <option className="bg-light text-dark" value="0">Pending</option>
                    <option className="bg-light text-dark" value="1">Approve</option>
                    <option className="bg-light text-dark" value="2">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

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
                <td>{index + 1}</td>
                <td>{application.student_fname}</td>
                <td>{application.fname}</td>
                <td>{application.m_name}</td>
                <td>{application.student_dob}</td>
                <td>{application.f_bld}</td>
                <td>{application.f_comp}</td>
                <td>{application.f_desig}</td>
                <td>{application.f_email}</td>
                <td>{application.f_mob}</td>
                <td>{application.f_qual}</td>
                <td>{application.f_sal}</td>
                <td>{application.f_tel}</td>
                <td>{application.m_bld}</td>
                <td>{application.m_comp}</td>
                <td>{application.m_desig}</td>
                <td>{application.m_email}</td>
                <td>{application.m_mob}</td>
                <td>{application.m_name}</td>
                <td>{application.m_qual}</td>
                <td>{application.m_sal}</td>
                <td>{application.m_tel}</td>
                <td>{application.rel_name}</td>
                <td>{application.rel_phone}</td>
                <td>{application.relation_ch}</td>
                <td>{application.res_add}</td>
                <td>{application.res_phone}</td>
                <td>{application.student_aadhaar}</td>
                <td>{application.student_blood_group}</td>
                <td>{application.student_caste}</td>
                <td>{application.student_dob}</td>
                <td>{application.student_fname}</td>
                <td>{application.student_gender}</td>
                <td>{application.student_mt}</td>
                <td>{application.student_nationality}</td>
                <td>{application.student_pname}</td>
                <td>{application.student_religion}</td>
                <td>{application.updated_at}</td>
                <td>
                  <button
                    className={`p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 ${
                      application.application_status === 1
                        ? "bg-success"
                        : application.application_status === 2
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {application.application_status === 1
                      ? "Approved"
                      : application.application_status === 2
                      ? "Rejected"
                      : "Pending"}
                  </button>
                </td>
                <td>
   
<select
  className="form-select p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
  value={application.application_status}
  onChange={(e) => changeApplicationStatus(index, +e.target.value)}
  aria-label="Select status"
  style={{
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right -0.1rem center', // Adjust this value to increase the gap
    backgroundSize: '1.5rem',
    paddingRight: '-1rem', 
    padding: '1rem', // Increase padding to make the button larger
    fontSize: '1rem', // Increase font size if desired /* Ensure padding to prevent text overlap with icon */
  }}
>
  <option className="bg-light text-dark" value="0">Pending&nbsp;</option>
  <option className="bg-light text-dark" value="1">Approve&nbsp; </option>
  <option className="bg-light text-dark" value="2">Reject&nbsp; </option>
</select>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Application;
