import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/dataTables.buttons";

import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import { Modal } from "react-bootstrap";
import moment from "moment";

function BlacklistedApplications() {
  const tableRef = useRef(null);
  const tableRef2 = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);
  const [oldApplications, setOldApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("1");

  const getApplications = (selectedStatus = "5") => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/api_get_all_applications/${selectedStatus}`)
        .then((result) => result.json())
        .then((jsonbody) => {
          console.warn(jsonbody);
          setApplications(jsonbody);
          setIsLoading(false);
          resolve(jsonbody);
          initializeDataTable();
        })
        .catch((error) => {
          console.error("Error fetching student applications:", error);
          setIsLoading(false);
          reject(error);
        });
    });
  };
  const getOldApplications = (selectedStatus = "5") => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/get-old-applications/${selectedStatus}`)
        .then((result) => result.json())
        .then((jsonbody) => {
          console.warn(jsonbody);
          setOldApplications(jsonbody);
          setIsLoading(false);
          resolve(jsonbody);
          initializeDataTable2();
        })
        .catch((error) => {
          console.error("Error fetching student applications:", error);
          setIsLoading(false);
          reject(error);
        });
    });
  };
  useEffect(() => {
    getApplications().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
    getOldApplications().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
  }, []);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 5,
      },
      dom: "Bfrtip", // Add this line to enable the Buttons extension
      buttons: [
        "excelHtml5", // Excel button
        "csvHtml5", // CSV button
        "pdfHtml5", // PDF button
        // 'print',      // Print button
      ],
    });
  };
  const initializeDataTable2 = () => {
    $(tableRef2.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 5,
      },
      dom: "Bfrtip", // Add this line to enable the Buttons extension
      buttons: [
        "excelHtml5", // Excel button
        "csvHtml5", // CSV button
        "pdfHtml5", // PDF button
        // 'print',      // Print button
      ],
    });
  };

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
  const whatsappMessage1 = encodeURIComponent(
    "*Dear Parents*\nGreetings from Agasthya Vidyanikethan!\n\nI am happy to welcome you to the 2024-25 school year! We are looking forward to a productive partnership with you to ensure our children can achieve their highest potential. We recognize that to be successful in school, our children need support from both home and school. We know a strong partnership with you will make a significant difference in your child’s education. As partners, we share the responsibility for our children’s success and want you to know that we will do our very best to carry out our responsibilities.\nPlease know more about from the Website link given below\nhttps://av.school\n\nTo Watch the Demo Content, please click on the below link\nhttps://player.vimeo.com/video/655228863\n\nRegards,\nTeam Agasthya Vidyanikethan"
  );

  const whatsappMessage2 = encodeURIComponent(
    "Dear Parents,\n\nGreetings from Agasthya Vidyanikethan!\n\nWe are glad to announce the launch of our new website www.av.school with the updated and much awaited academic and non academic details of our institution. We hereby look forward to a productive collaboration with you to ensure our children's goals to the highest potential. Together, let us share the responsibility of building a strong citizen for our country.\n\nFor general queries please fill in the below mentioned google form.\n\nhttps://forms.gle/iKK7Av8agTBZQ7LW6\n\nFor admission related queries visit the below link.\n\nhttps://www.av.school/application\n\nPlease visit the website for more information\n\nThanking You,\n\nAgasthya Vidyanikethan"
  );

  const handleWhatsappClick = (applicationIndex, contact) => {
    // Update the status
    console.log(message);
    updateStatus(applicationIndex, message);
    if (message === "1") {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage1}&phone=${contact}`,
        "_blank",
        "width=800,height=600"
      );
    } else if (message === "2") {
      console.warn(message);
      window.open(
        `https://api.whatsapp.com/send?text=${whatsappMessage2}&phone=${contact}`,
        "_blank",
        "width=800,height=600"
      );
    }
  };
  const updateStatus = (applicationIndex, message) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].whatsapp_status_2 = 1;
    setApplications(updatedApplications);

    let apiUrl;

    // Determine the API URL based on the selected message
    if (message === "1") {
      apiUrl = `${baseUrl}api/school/update-application-wp-status`;
    } else if (message === "2") {
      apiUrl = `${baseUrl}api/school/update-application-wp-status-2`;
    }

    console.warn(message, apiUrl);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId: updatedApplications[applicationIndex].id,
        newStatus: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error updating application status:", error);
      });
  };

  const isValidNumber = (number) => {
    return number && !number.includes("-") && number.length >= 10; // Adjust the conditions as needed
  };

  const [applicationId, setApplicationId] = useState("");
  const [remark, setRemark] = useState("");
  const [modal1Open, setModal1Open] = useState(false);
  const closeModal1 = () => setModal1Open(false);
  const handleAddRemark = (applicationId) => {
    // console.log(applicationId);
    setApplicationId(applicationId);
    setModal1Open(true);
  };
  const storeRemark = async (e) => {
    e.preventDefault();
    try {
      if (!remark.trim()) {
        // Show toaster message for empty note
        return;
      } else {
        const formData = new FormData();
        formData.append("applicationId", applicationId);
        formData.append("remark", remark);

        const response = await fetch(
          baseUrl + "api/school/store-application-remark",
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response) {
          throw new Error("Failed to store reamrk");
        }
        // Update the state with the new remark
        const updatedApplications = applications.map((app) =>
          app.id === applicationId
            ? { ...app, remarks: [...app.remarks, { remark }] }
            : app
        );
        setApplications(updatedApplications);
        setModal1Open(false);
        setRemark("");
      }
    } catch (error) {
      console.error("Error storing notes:", error);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearch = () => {
    // Call the API with the selected status
    setIsLoading(true);
    getApplications(selectedStatus);
  };
  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  BlackListed <b> Applications</b>
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
                {applications && applications.length > 0 ? (
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <h4 className="mont-font fw-400 font-lg fw-500 mb-4">
                      New Applications
                    </h4>
                    <table ref={tableRef} id="myTable" className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No.</th>
                          <th scope="col">Enquired At</th>
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
                          <th scope="col">Father Annual Income</th>
                          <th scope="col">Father Telephone</th>
                          <th scope="col">Father Aadhaar</th>
                          <th scope="col">Mother Blood Group</th>
                          <th scope="col">Mother Company</th>
                          <th scope="col">Mother Designation</th>
                          <th scope="col">Mother Email</th>
                          <th scope="col">Mother Mobile</th>
                          <th scope="col">Mother Qualification</th>
                          <th scope="col">Mother Annual Income</th>
                          <th scope="col">Mother Telephone</th>
                          <th scope="col">Mother Aadhaar</th>
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
                          <th scope="col">
                            Distance Between School And Residence
                          </th>
                          <th scope="col">Issues</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                          <th scope="col">Message</th>
                          <th scope="col" style={{ width: "100px" }}>
                            Remarks
                          </th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((application, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">
                              {application?.enquired_at ?? "-"}
                            </td>
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
                              {application?.f_aadhar ?? "-"}
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
                              {application?.m_adhar ?? "-"}
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

                            <td>
                              <button
                                className={`p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 ${
                                  application.application_status === 1
                                    ? "bg-secondary"
                                    : application.application_status === 2
                                    ? "bg-success"
                                    : application.application_status === 3
                                    ? "bg-info"
                                    : application.application_status === 4
                                    ? "bg-warning"
                                    : application.application_status === 5
                                    ? "bg-danger"
                                    : "bg-primary"
                                }`}
                              >
                                {application.application_status === 1
                                  ? "School visit scheduled"
                                  : application.application_status === 2
                                  ? "Approved"
                                  : application.application_status === 3
                                  ? "Admitted"
                                  : application.application_status === 4
                                  ? "Waiting List"
                                  : application.application_status === 5
                                  ? "Black List"
                                  : "Pending"}
                              </button>
                            </td>
                            <td>
                              <select
                                className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                                value={application.application_status}
                                onChange={(e) =>
                                  changeApplicationStatus(
                                    index,
                                    +e.target.value
                                  )
                                }
                                aria-label="Select status"
                              >
                                <option
                                  className="bg-light text-dark"
                                  value="0"
                                >
                                  Pending
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="1"
                                >
                                  School visit scheduled
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="2"
                                >
                                  Approved
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="3"
                                >
                                  Admitted
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="4"
                                >
                                  Waiting List
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="5"
                                >
                                  Black List
                                </option>
                              </select>
                            </td>

                            <td className="text-center">
                              {isValidNumber(application.f_mob) ? (
                                <>
                                  <select
                                    className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                                    onChange={(e) => setMessage(e.target.value)}
                                    aria-label="Select status"
                                  >
                                    <option
                                      className={`${
                                        application.whatsapp_status === 1
                                          ? "bg-dark text-light"
                                          : "bg-light text-dark"
                                      }`}
                                      value="1"
                                    >
                                      Message 1
                                    </option>
                                    <option
                                      className={`${
                                        application.whatsapp_status_2 === 1
                                          ? "bg-dark text-light"
                                          : "bg-light text-dark"
                                      }`}
                                      value="2"
                                    >
                                      Message 2
                                    </option>
                                  </select>
                                  <img
                                    src="/assets/images/whatsapp.png"
                                    alt="icon"
                                    width={30}
                                    className="d-inline-block"
                                    onClick={() =>
                                      handleWhatsappClick(
                                        index,
                                        application.f_mob
                                      )
                                    }
                                  />
                                </>
                              ) : (
                                isValidNumber(application.m_mob) && (
                                  <>
                                    <select
                                      className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 border-none"
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                      aria-label="Select status"
                                    >
                                      <option
                                        className={`${
                                          application.whatsapp_status === 1
                                            ? "bg-dark text-light"
                                            : "bg-light text-dark"
                                        }`}
                                        value="1"
                                      >
                                        Message 1
                                      </option>
                                      <option
                                        className={`${
                                          application.whatsapp_status_2 === 1
                                            ? "bg-dark text-light"
                                            : "bg-light text-dark"
                                        }`}
                                        value="2"
                                      >
                                        Message 2
                                      </option>
                                    </select>
                                    <img
                                      src="/assets/images/whatsapp.png"
                                      alt="icon"
                                      width={30}
                                      className="d-inline-block"
                                      onClick={() =>
                                        handleWhatsappClick(
                                          index,
                                          application.m_mob
                                        )
                                      }
                                    />
                                  </>
                                )
                              )}
                            </td>
                            <td>
                              <button
                                className="p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 bg-primary"
                                onClick={() => handleAddRemark(application.id)}
                              >
                                Remark
                              </button>
                              <ul>
                                {application.remarks.map((remark, i) => (
                                  <React.Fragment key={i}>
                                    <li>&#9642; {remark.remark}</li>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <Link
                                to={`/school/applications/view-application/${application.id}`}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}

                {oldApplications && oldApplications.length > 0 ? (
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
                          <th scope="col">Message</th>
                          <th scope="col" style={{ width: "100px" }}>
                            Remarks
                          </th>
                    <th scope="col">View</th>

                        </tr>
                      </thead>
                      <tbody>
                        {oldApplications.map((application, index) => (
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
                                    ? "bg-secondary"
                                    : application.application_status === 2
                                    ? "bg-success"
                                    : application.application_status === 3
                                    ? "bg-info"
                                    : application.application_status === 4
                                    ? "bg-warning"
                                    : application.application_status === 5
                                    ? "bg-danger"
                                    : "bg-primary"
                                }`}
                              >
                                {application.application_status === 1
                                  ? "School visit scheduled"
                                  : application.application_status === 2
                                  ? "Approved"
                                  : application.application_status === 3
                                  ? "Admitted"
                                  : application.application_status === 4
                                  ? "Waiting List"
                                  : application.application_status === 5
                                  ? "Black List"
                                  : "Pending"}
                              </button>
                            </td>
                            <td>
                              <select
                                className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                                value={application.application_status}
                                onChange={(e) =>
                                  changeApplicationStatus(
                                    index,
                                    +e.target.value
                                  )
                                }
                                aria-label="Select status"
                              >
                                <option
                                  className="bg-light text-dark"
                                  value="0"
                                >
                                  Pending
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="1"
                                >
                                  School visit scheduled
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="2"
                                >
                                  Approved
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="3"
                                >
                                  Admitted
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="4"
                                >
                                  Waiting List
                                </option>
                                <option
                                  className="bg-light text-dark"
                                  value="5"
                                >
                                  Black List
                                </option>
                              </select>
                            </td>
                            <td className="text-center">
                              {isValidNumber(application.f_contact) ? (
                                <>
                                  <select
                                    className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                                    onChange={(e) => setMessage(e.target.value)}
                                    aria-label="Select status"
                                  >
                                    <option
                                      className={`${
                                        application.whatsapp_status === 1
                                          ? "bg-dark text-light"
                                          : "bg-light text-dark"
                                      }`}
                                      value="1"
                                    >
                                      Message 1
                                    </option>
                                    <option
                                      className={`${
                                        application.whatsapp_status_2 === 1
                                          ? "bg-dark text-light"
                                          : "bg-light text-dark"
                                      }`}
                                      value="2"
                                    >
                                      Message 2
                                    </option>
                                  </select>
                                  <img
                                    src="/assets/images/whatsapp.png"
                                    alt="icon"
                                    width={30}
                                    className="d-inline-block"
                                    onClick={() =>
                                      handleWhatsappClick(
                                        index,
                                        application.f_contact
                                      )
                                    }
                                  />
                                </>
                              ) : (
                                isValidNumber(application.m_contact) && (
                                  <>
                                    <select
                                      className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-grey border-none"
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                      aria-label="Select status"
                                    >
                                      <option
                                        className={`${
                                          application.whatsapp_status === 1
                                            ? "bg-dark text-light"
                                            : "bg-light text-dark"
                                        }`}
                                        value="1"
                                      >
                                        Message 1
                                      </option>
                                      <option
                                        className={`${
                                          application.whatsapp_status_2 === 1
                                            ? "bg-dark text-light"
                                            : "bg-light text-dark"
                                        }`}
                                        value="2"
                                      >
                                        Message 2
                                      </option>
                                    </select>
                                    <img
                                      src="/assets/images/whatsapp.png"
                                      alt="icon"
                                      width={30}
                                      className="d-inline-block"
                                      onClick={() =>
                                        handleWhatsappClick(
                                          index,
                                          application.m_contact
                                        )
                                      }
                                    />
                                  </>
                                )
                              )}
                            </td>
                            <td>
                              <button
                                className="p-2 d-inline-block text-white fw-700 lh-10 rounded-lg text-center font-xsssss ls-3 bg-primary"
                                onClick={() => handleAddRemark(application.id)}
                              >
                                Remark
                              </button>
                              <ul>
                                {application.old_remarks.map((remark, i) => (
                                  <React.Fragment key={i}>
                                    <li>&#9642; {remark.remark}</li>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </td>
                            <td>
                          <Link
                            to={`/school/applications/view-old-application/${application.id}`}
                          >
                            View
                          </Link>
                      </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}

                {applications &&
                applications.length === 0 &&
                oldApplications &&
                oldApplications.length === 0 ? (
                  // <NoContent contentName="Applications" />
                  <h2 className="fw-500 font-xs text-center">
                    No Applications Available
                  </h2>
                ) : null}
              </>
            )}
            <Modal show={modal1Open} onHide={closeModal1}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group icon-input mb-3">
                  <i className="font-sm ti-email text-grey-500 pr-0"></i>
                  <input
                    type="text"
                    name="note"
                    className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder="Enter Remark.."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-1">
                  <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                    onClick={storeRemark}
                  >
                    Save{" "}
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlacklistedApplications;
