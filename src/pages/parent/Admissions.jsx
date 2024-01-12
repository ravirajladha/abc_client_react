import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function Admissions() {
    const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [admissions, setAdmissions] = useState([]);
  const [oldAdmissions, setOldAdmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(AuthContext).user;
    const userPhone = user.user.phone;
  const getAdmissions = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/parent/get-admissions/${userPhone}`)
        .then((result) => result.json())
        .then((jsonbody) => {
            console.log(jsonbody);
          setAdmissions(jsonbody.admissions);
          setOldAdmissions(jsonbody.oldAdmissions);
          setIsLoading(false);
          resolve(jsonbody);
          initializeDataTable();
        })
        .catch((error) => {
          console.error("Error fetching student Admissions:", error);
          setIsLoading(false);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getAdmissions().catch((error) => {
      console.error("Error fetching student Admissions:", error);
    });
  }, []);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 3,
      },
    });
  };

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
    return (
        <>
<div className="middle-sidebar-bottom">
      <div className="middle-sidebar-left">
        <div className="row">
          <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
            <div>
              <h2 className="fw-400 font-lg d-block">
                All <b> Admissions</b>
              </h2>
            </div>
            <div className="float-right">
              <BackButton />
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : admissions && admissions.length > 0 ? (
            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
              <table ref={tableRef} id="myTable" className="table">
                <thead>
                  <tr>
                    <th scope="col">Sl. No.</th>
                    <th scope="col">Student Full Name</th>
                    <th scope="col">Class Name</th>
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
                  {admissions.map((application, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{application.student_fname}</td>
                      <td>{application.classname}</td>
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
                      <td>
                        {new Date(application.updated_at).toLocaleString()}
                      </td>

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
                       -
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoContent contentName="Admissions" />
          )}
        </div>
      </div>
    </div>
        </>
    )
}

export default Admissions
