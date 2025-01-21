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
import { ToastContainer, toast } from "react-toastify";

function Applications() {
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("1");

  // filter with status - selceted value
  const [selectedStatus, setSelectedStatus] = useState("");

  const [classes, setClasses] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalRecordCount, setTotalRecordCount] = useState("");

  const getApplications = (selectedStatus = "", selectedClass = "", page = 1) => {
    return new Promise((resolve, reject) => {
      fetch(
        `${baseUrl}api/school/api_get_all_applications?status=${selectedStatus}&class=${selectedClass}&page=${page}`
      )
        .then((result) => result.json())
        .then((jsonbody) => {
          console.warn(jsonbody);
          setApplications(jsonbody.data);
          setTotalPages(jsonbody.last_page);
          setTotalRecordCount(jsonbody.total);
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

  useEffect(() => {
    getApplications().catch((error) => {
      console.error("Error fetching student applications:", error);
    });
  }, []);

  const initializeDataTable = () => {
    const table = $(tableRef.current).DataTable({
      pageLength: 50,
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
      initComplete: function () {
        const pagination = $(this)
          .closest(".dataTables_wrapper")
          .find(".dataTables_paginate");
        // Remove existing pagination
        pagination.empty();
      },
    });
  };

  const handleChangePage = (event) => {
    setIsLoading(true);
    setCurrentPage(parseInt(event.target.value, 10));
    getApplications(
      selectedStatus,
      selectedClass,
      parseInt(event.target.value, 10)
    );
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

  const handleWhatsappClick = async (applicationIndex, contact) => {
    // Update the status
    // updateStatus(applicationIndex, message);
    let messageType;
    if (message === "1") {
      messageType = "announcement_website";
    } else if (message === "2") {
      messageType = "weclome_message1";
    }
    fetch(
      `${baseUrl}api/school/send-whatsapp-message/${contact}/${messageType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    updateStatus(applicationIndex, message);
  };
  const updateStatus = (applicationIndex, message) => {
    const updatedApplications = [...applications];
    if (message === "1") {
      updatedApplications[applicationIndex].whatsapp_status = 1;
    } else {
      updatedApplications[applicationIndex].whatsapp_status_2 = 1;
    }
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
      .then((data) => {
        toast.success("Meassage Sent successfully!");
      })
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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSearch = () => {
    // Call the API with the selected status
    setIsLoading(true);
    getApplications(selectedStatus, selectedClass);
  };

  // for bulk message sent

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState([]);

  // Function to handle checkbox click events for individual rows
  const handleCheckboxChange = (id, phoneNumber) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // If already selected, remove it from the array
        return prevSelectedIds.filter((item) => item !== id);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedIds, id];
      }
    });

    setSelectedPhoneNumbers((prevSelectedPhoneNumbers) => {
      phoneNumber = parseInt(phoneNumber, 10);
      if (prevSelectedPhoneNumbers.includes(phoneNumber)) {
        // If already selected, don't remove it, just return the array
        return prevSelectedPhoneNumbers.filter((item) => item !== phoneNumber);
      } else {
        // If not selected, add it to the array
        return [...prevSelectedPhoneNumbers, parseInt(phoneNumber, 10)];
      }
    });
  };

  // Function to handle "Select All" checkbox click event
  const handleSelectAllChange = () => {
    const allPhoneNumbers = applications.map((application) =>
      isValidNumber(application.f_mob)
        ? parseInt(application.f_mob, 10)
        : isValidNumber(application.m_mob)
        ? parseInt(application.m_mob, 10)
        : ""
    );
    setSelectedIds((prevSelectedIds) => {
      // If all IDs are already selected, clear the selection
      if (prevSelectedIds.length === applications.length) {
        return [];
      } else {
        // Otherwise, select all IDs
        return applications.map((application) => application.id);
      }
    });

    setSelectedPhoneNumbers((prevSelectedPhoneNumbers) => {
      // If all phone numbers are already selected, clear the selection
      if (prevSelectedPhoneNumbers.length === allPhoneNumbers.length) {
        return [];
      } else {
        // Otherwise, select all phone numbers
        return allPhoneNumbers;
      }
    });
  };

  const [selectedMessageType, setSelectedMessageType] = useState("");
  const handleMessageTypeChange = (event) => {
    setSelectedMessageType(event.target.value);
  };
  const handleWhatsappBulk = (data) => {
    let messageType;
    if (selectedMessageType === "1") {
      messageType = "announcement_website";
    } else if (selectedMessageType === "2") {
      messageType = "weclome_message1";
    } else if (selectedMessageType === "3") {
      messageType = "acids_bases_andsalts_1";
    } else if (selectedMessageType === "4") {
      messageType = "acids_bases_andsalts_2";
    } else if (selectedMessageType === "5") {
      messageType = "av_greeting_1";
    } else if (selectedMessageType === "6") {
      messageType = "av_greeting_2";
    } else if (selectedMessageType === "7") {
      messageType = "av_greeting_3";
    } else if (selectedMessageType === "8") {
      messageType = "avunit2_photo";
    } else if (selectedMessageType === "9") {
      messageType = "cultural_event_av";
    } else if (selectedMessageType === "10") {
      messageType = "acids_bases_salt_session1";
    } else if (selectedMessageType === "11") {
      messageType = "acid_bases_salts_session2";
    } else if (selectedMessageType === "12") {
      messageType = "av_unit2_inauguration_copy";
    }

    const formData = new FormData();
    formData.append(
      "selectedPhoneNumbers",
      JSON.stringify(selectedPhoneNumbers)
    );
    formData.append("selectedIds", JSON.stringify(selectedIds));

    fetch(`${baseUrl}api/school/send-bulk-whatsapp-message/${messageType}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update WhatsApp status to 1 for matching application IDs
        const updatedStatusApplications = applications.map((application) => {
          if (selectedIds.includes(application.id)) {
            return { ...application, whatsappStatus: 1 };
          }
          return application;
        });

        // Call updateStatus function with updated applications
        setApplications(updatedStatusApplications);
        setSelectedPhoneNumbers([]);
        setSelectedIds([]);

        toast.success("Meassage Sent successfully!");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
    // updateStatus(applicationIndex, message);
  };
  return (
    <>
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <ToastContainer />
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Applications</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to="/school/applications/old-applications"
                  className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
                >
                  Old Applications
                </Link>
                <Link
                  to="/school/applications/black-listed-applications"
                  className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
                >
                  Black Listed Applications
                </Link>
                <BackButton />
              </div>
            </div>
            <div className="row px-5 ">
              <div className="col-lg-4">
                <select
                  className="form-control"
                  aria-label="Select status"
                  onChange={handleStatusChange}
                  value={selectedStatus}
                >
                  <option className="bg-light text-dark" value="">
                    -- All --
                  </option>
                  <option className="bg-light text-dark" value="0">
                    Pending
                  </option>
                  <option className="bg-light text-dark" value="1">
                    School visit scheduled
                  </option>
                  <option className="bg-light text-dark" value="2">
                    Approved
                  </option>
                  <option className="bg-light text-dark" value="3">
                    Admitted
                  </option>
                  <option className="bg-light text-dark" value="4">
                    Waiting List
                  </option>
                  <option className="bg-light text-dark" value="5">
                    Black List
                  </option>
                </select>
              </div>
              {/* <div className="col-lg-4">
                <select
                  className="form-control"
                  aria-label="Select status"
                  onChange={handleClassChange}
                  value={selectedClass}
                >
                  <option className="bg-light text-dark" value="">
                    -- All class --
                  </option>
                  {classes &&
                    classes.map((classItem, index) => (
                      <option
                        className="bg-light text-dark"
                        key={index}
                        value={classItem}
                      >
                        {classItem}
                      </option>
                    ))}
                </select>
              </div> */}
              <div className=" col-lg-2">
                <button
                  className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row px-5 mt-2">
              <div className="col-lg-4">
                <select
                  className="form-control"
                  aria-label="Select status"
                  onChange={handleMessageTypeChange}
                  value={selectedMessageType}
                >
                  <option className="bg-light text-dark" value="" disabled>
                    -- Select Message --
                  </option>
                  <option className="bg-light text-dark" value="1">
                    Announcement
                  </option>
                  <option className="bg-light text-dark" value="2">
                    Welcome
                  </option>
                  <option className="bg-light text-dark" value="3">
                    10th-Acids,bases,salts-1
                  </option>
                  <option className="bg-light text-dark" value="4">
                    10th-Acids,bases,salts-2
                  </option>
                  <option className="bg-light text-dark" value="8">
                    AV Unit 2 @ Photo
                  </option>
                  <option className="bg-light text-dark" value="5">
                    AV Greeting 1
                  </option>
                  <option className="bg-light text-dark" value="9">
                    Cultural Events @AV
                  </option>
                  <option className="bg-light text-dark" value="6">
                    AV Greetings 2
                  </option>
                  <option className="bg-light text-dark" value="10">
                    Acids, Bases and Salts Session 1
                  </option>
                  <option className="bg-light text-dark" value="11">
                    Acids, Bases and Salts Session 2
                  </option>
                  <option className="bg-light text-dark" value="7">
                    AV Greetings 3
                  </option>
                  <option className="bg-light text-dark" value="12">
                  AV Unit 2 Inauguration
                  </option>
                </select>
              </div>
              <div className=" col-lg-2">
                <button
                  className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
                  onClick={handleWhatsappBulk}
                >
                  Send
                </button>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : applications && applications.length > 0 ? (
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <table ref={tableRef} id="myTable" className="table">
                  <thead>
                    <tr>
                      <th scope="col">
                        {/* Checkbox for "Select All" */}
                        Select All{" "}
                        <input
                          type="checkbox"
                          checked={selectedIds.length === applications.length}
                          onChange={handleSelectAllChange}
                        />
                      </th>
                      <th scope="col">Sl. No.</th>
                      <th scope="col">Enquired At</th>
                      <th scope="col">Student Full Name</th>
                      <th scope="col">Class Name</th>
                      <th scope="col">Father Name</th>
                      <th scope="col">Mother Name</th>
                      <th scope="col">Student DOB</th>
                      <th scope="col">Father Designation</th>
                      <th scope="col">Father Email</th>
                      <th scope="col">Father Mobile</th>
                      <th scope="col">Father Qualification</th>
                      <th scope="col">Father Telephone</th>
                      <th scope="col">Mother Designation</th>
                      <th scope="col">Mother Email</th>
                      <th scope="col">Mother Mobile</th>
                      <th scope="col">Mother Qualification</th>
                      <th scope="col">Mother Telephone</th>
                      <th scope="col">Residential Address</th>
                      <th scope="col">Residential Phone</th>
                      <th scope="col">Student Blood Group</th>
                      <th scope="col">Student Caste</th>
                      <th scope="col">Student Gender</th>
                      <th scope="col">Student Mother Tongue</th>
                      <th scope="col">Student Nationality</th>
                      <th scope="col">Student Religion</th>
                      <th scope="col">Last School Name</th>
                      <th scope="col">Branch</th>
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
                        <td className="text-center">
                          {/* Checkbox for selecting individual rows */}
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(application.id)}
                            onChange={() =>
                              handleCheckboxChange(
                                application.id,
                                isValidNumber(application.f_mob)
                                  ? application.f_mob
                                  : isValidNumber(application.m_mob)
                                  ? application.m_mob
                                  : ""
                              )
                            }
                          />
                        </td>

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
                          {application?.f_tel ?? "-"}
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
                          {application?.m_tel ?? "-"}
                        </td>
                        <td className="text-center">
                          {application?.res_add ?? "-"}
                        </td>
                        <td className="text-center">
                          {application?.res_phone ?? "-"}
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
                          {application?.student_religion ?? "-"}
                        </td>
                        <td className="text-center">
                          {application?.last_school_name ?? "-"}
                        </td>
                        <td className="text-center">
                          {application?.branch ?? "-"}
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
                              changeApplicationStatus(index, +e.target.value)
                            }
                            aria-label="Select status"
                          >
                            <option className="bg-light text-dark" value="0">
                              Pending
                            </option>
                            <option className="bg-light text-dark" value="1">
                              School visit scheduled
                            </option>
                            <option className="bg-light text-dark" value="2">
                              Approved
                            </option>
                            <option className="bg-light text-dark" value="3">
                              Admitted
                            </option>
                            <option className="bg-light text-dark" value="4">
                              Waiting List
                            </option>
                            <option className="bg-light text-dark" value="5">
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
                                  Annoucement
                                </option>
                                <option
                                  className={`${
                                    application.whatsapp_status_2 === 1
                                      ? "bg-dark text-light"
                                      : "bg-light text-dark"
                                  }`}
                                  value="2"
                                >
                                  Welcome
                                </option>
                              </select>
                              <img
                                src="/assets/images/whatsapp.png"
                                alt="icon"
                                width={30}
                                className="d-inline-block"
                                onClick={() =>
                                  handleWhatsappClick(index, application.f_mob)
                                }
                              />
                            </>
                          ) : (
                            isValidNumber(application.m_mob) && (
                              <>
                                <select
                                  className="p-2 d-inline-block text-dark fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 border-none"
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
                                    Annoucement
                                  </option>
                                  <option
                                    className={`${
                                      application.whatsapp_status_2 === 1
                                        ? "bg-dark text-light"
                                        : "bg-light text-dark"
                                    }`}
                                    value="2"
                                  >
                                    Welcome
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
                <div className="row d-flex justify-content-end">
                  <div className="col-2">
                    <h4 className="font-xss fw-500 mt-2">
                      Total Records: {totalRecordCount}
                    </h4>
                  </div>
                  <div className="col-2 text-right">
                    <select
                      className="p-2 d-inline-block text-dark fw-500 lh-30 rounded-lg text-center font-xsss ls-3 border-3"
                      value={currentPage}
                      onChange={handleChangePage}
                    >
                      {Array.from({ length: totalPages }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          Page {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <NoContent contentName="Applications" />
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

export default Applications;
