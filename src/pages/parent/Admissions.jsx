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
  const tableRef2 = useRef(null);
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
          initializeDataTable2();
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
        rightColumns: 2,
      },
    });
  };
  const initializeDataTable2 = () => {
    $(tableRef2.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 2,
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
                  All <b> Applications</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                {admissions && admissions.length > 0 ? (
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <h4 className="mont-font fw-400 font-lg fw-500 mb-4">
                      New Applications
                    </h4>
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
                    <th scope="col">Mother Qualification</th>
                    <th scope="col">Mother Salary</th>
                    <th scope="col">Mother Telephone</th>
                    <th scope="col">Relative Name</th>
                    <th scope="col">Relative Phone</th>
                    <th scope="col">Relationship with Child</th>
                    <th scope="col">Residential Address</th>
                    <th scope="col">Residential Phone</th>
                    <th scope="col">Student Aadhaar</th>
                    <th scope="col">Student Blood Group</th>
                    <th scope="col">Student Caste</th>
                    <th scope="col">Student Gender</th>
                    <th scope="col">Student Mother Tongue</th>
                    <th scope="col">Student Nationality</th>
                    <th scope="col">Student Nick Name</th>
                    <th scope="col">Student Religion</th>
                    <th scope="col">Last School Name</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Distance Between School And Residence</th>
                    <th scope="col">Issues</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admissions.map((application, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {application?.student_fname ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.classname ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.fname ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_name ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_dob ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_bld ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_comp ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_desig ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_email ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_mob ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_qual ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_sal ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.f_tel ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_bld ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_comp ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_desig ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_email ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_mob ?? "-"}
                      </td>

                      <td className="text-center">
                        {application?.m_qual ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_sal ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.m_tel ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.rel_name ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.rel_phone ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.relation_ch ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.res_add ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.res_phone ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_aadhaar ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_blood_group ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_caste ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_gender ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_mt ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_nationality ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_pname ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.student_religion ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.last_school_name ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.branch ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.des ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.issues ?? "-"}
                      </td>
                      <td className="text-center">
                        {application?.updated_at
                          ? new Date(application.updated_at).toLocaleString()
                          : "-"}
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
                            <td>-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}

                {oldAdmissions && oldAdmissions.length > 0 ? (
                  <div className="card-body p-lg-5 p-4 w-100 border-0 shadow-xss">
                    <h4 className="mont-font fw-400 font-lg fw-500 mb-4">
                      Old Applications
                    </h4>
                    <table ref={tableRef2} id="myTable" className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No.</th>
                          <th scope="col">Month</th>
                          <th scope="col">Year</th>
                          <th scope="col">Enquiry Date</th>
                          <th scope="col">Student Name</th>
                          <th scope="col">Enquiry Class</th>
                          <th scope="col">2024-25 Yr. Class Expected</th>
                          <th scope="col">DOB</th>
                          <th scope="col">Father Name</th>
                          <th scope="col">Mother Name</th>
                          <th scope="col">F-Contact No</th>
                          <th scope="col">M-Contact No</th>
                          <th scope="col">Address</th>
                          <th scope="col">Status</th>
                          <th scope="col">Heard About Us ?</th>
                          <th scope="col">Previous Schooling Details</th>
                          <th scope="col">Application Date</th>
                          <th scope="col">Admission Date</th>
                          <th scope="col">Admission Enquiry for </th>
                          <th scope="col">Data</th>
                          <th scope="col">Age as on 01/06/2023</th>
                          <th scope="col">Entrance Test date</th>
                          <th scope="col">Entrance Test result</th>
                          <th scope="col">Remarks</th>
                          <th scope="col">Data</th>
                          <th scope="col">Already Enrolled</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oldAdmissions.map((application, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{application.month}</td>
                            <td>{application.year}</td>
                            <td>{application.enquiry_date}</td>
                            <td>{application.student_name}</td>
                            <td>{application.enquiry_class}</td>
                            <td>{application.class_expected_in_2024_25}</td>
                            <td>{application.dob}</td>
                            <td>{application.f_name}</td>
                            <td>{application.m_name}</td>
                            <td>{application.f_contact}</td>
                            <td>{application.m_contact}</td>
                            <td>{application.address}</td>
                            <td>{application.status}</td>
                            <td>{application.heard_about_us}</td>
                            <td>{application.prev_school}</td>
                            <td>{application.application_date}</td>
                            <td>{application.admission_date}</td>
                            <td>{application.admission_enquiry_for}</td>
                            <td>{application.data}</td>
                            <td>{application.age_as_01_06_2023}</td>
                            <td>{application.entrance_test_date}</td>
                            <td>{application.entrance_test_result}</td>
                            <td>{application.remarks}</td>
                            <td>{application.data_2}</td>
                            <td>{application.already_enrolled}</td>

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
                            <td>-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}

                {admissions &&
                admissions.length === 0 &&
                oldAdmissions &&
                oldAdmissions.length === 0 ? (
                  // <NoContent contentName="Applications" />
                  <h2 className="fw-500 font-xs text-center">No Applications Available</h2>
                  
                ) : null}
              </>
            )}
          </div>

          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="card mb-4 shadow-xss rounded-lg border-0 p-4">
                <h2 className="fw-700 font-md d-block mb-3">
                  Important Information
                </h2>
                <ul style={{ listStyleType: 'circle!important', marginLeft: '20px' }} >
                  <li>&#9642; Original Copy of the Birth Certificate.</li>
                  <li>&#9642;
                    Xerox Copy of the Immunization (vaccine) record (Original
                    must be brought along for verification).
                  </li>
                  <li>&#9642;
                    Xerox Copy of the Caste & Income Certificate of both Child &
                    Parents.
                  </li>
                  <li>&#9642;
                    Xerox Copy of Student's individual Bank Account Pass Book.
                  </li>
                  <li>&#9642; Xerox Copy of Aadhar Card of both Child & Parents.</li>
                  <li>&#9642; 4 Passport Size Photos of the Child.</li>
                  <li>&#9642; 2 Stamp Size Photos of the Child.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admissions;
