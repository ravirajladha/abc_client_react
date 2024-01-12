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

function OldApplications() {
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/get-old-applications`)
        .then((result) => result.json())
        .then((jsonbody) => {
          setApplications(jsonbody.old_applications);
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
    $(tableRef.current).DataTable({
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        leftColumns: 0,
        rightColumns: 3,
      },
    });
  };

  const changeApplicationStatus = (applicationIndex, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].application_status = newStatus;
    setApplications(updatedApplications);
    // Send a request to update the status on the backend
    fetch(`${baseUrl}api/school/update-old-application-status`, {
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
  const whatsappMessage1 = encodeURIComponent('*Dear Parents*\nGreetings from Agasthya Vidyanikethan!\n\nI am happy to welcome you to the 2024-25 school year! We are looking forward to a productive partnership with you to ensure our children can achieve their highest potential. We recognize that to be successful in school, our children need support from both home and school. We know a strong partnership with you will make a significant difference in your child’s education. As partners, we share the responsibility for our children’s success and want you to know that we will do our very best to carry out our responsibilities.\nPlease know more about from the Website link given below\nhttps://av.school\n\nTo Watch the Demo Content, please click on the below link\nhttps://player.vimeo.com/video/655228863\n\nRegards,\nTeam Agasthya Vidyanikethan');

  const handleWhatsappClick1 = (applicationIndex,contact) => {
    // Update the status
    updateStatus1(applicationIndex);

    // Open the new window
    window.open(
      `https://api.whatsapp.com/send?text=${whatsappMessage1}&phone=${contact}`,
      "_blank",
      "width=800,height=600"
    );
  };
  const updateStatus1 = (applicationIndex) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].whatsapp_status = 1;
    setApplications(updatedApplications);
    fetch(`${baseUrl}api/school/update-old-application-wp-status`, {
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
          
        })
        .catch((error) => {
          console.error("Error updating application status:", error);
          
        });
  };

  const whatsappMessage2 = encodeURIComponent("Dear Parents,\n\nGreetings from Agasthya Vidyanikethan!\n\nWe are glad to announce the launch of our new website www.av.school with the updated and much awaited academic and non academic details of our institution. We hereby look forward to a productive collaboration with you to ensure our children's goals to the highest potential. Together, let us share the responsibility of building a strong citizen for our country.\n\nFor general queries please fill in the below mentioned google form.\n\nhttps://forms.gle/iKK7Av8agTBZQ7LW6\n\nFor admission related queries visit the below link.\n\nhttps://www.av.school/application\n\nPlease visit the website for more information\n\nThanking You,\n\nAgasthya Vidyanikethan");

  const handleWhatsappClick2 = (applicationIndex,contact) => {
    // Update the status
    updateStatus2(applicationIndex);

    // Open the new window
    window.open(
      `https://api.whatsapp.com/send?text=${whatsappMessage2}&phone=${contact}`,
      "_blank",
      "width=800,height=600"
    );
  };
  const updateStatus2 = (applicationIndex) => {
    const updatedApplications = [...applications];
    updatedApplications[applicationIndex].whatsapp_status_2 = 1;
    setApplications(updatedApplications);
    fetch(`${baseUrl}api/school/update-old-application-wp-status-2`, {
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
          
        })
        .catch((error) => {
          console.error("Error updating application status:", error);
          
        });
  };
  return (
    <div className="middle-sidebar-bottom">
      <div className="middle-sidebar-left">
        <div className="row">
          <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
            <div>
              <h2 className="fw-400 font-lg d-block">
                Old <b> Applications</b>
              </h2>
            </div>
            <div className="float-right">
              <Link
                to="/school/applications/upload-applications"
                className="p-2 d-inline-block me-2 text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current text-uppercase"
              >
                Upload Applications
              </Link>
              <BackButton />
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : applications && applications.length > 0 ? (
            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
              <table ref={tableRef} id="myTable" className="table">
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
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
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
                            Approve
                          </option>
                          <option className="bg-light text-dark" value="2">
                            Reject
                          </option>
                        </select>
                      </td>
                      <td className="text-center">
                        {application.f_contact ? (
                           <>
                           <img
                               src={application.whatsapp_status === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                               alt="icon"
                               width={30}
                               className="d-inline-block"
                             onClick={() => handleWhatsappClick1(index,application.f_contact)}
                             />
                             <img
                               src={application.whatsapp_status_2 === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                               alt="icon"
                               width={30}
                               className="d-inline-block"
                             onClick={() => handleWhatsappClick2(index,application.f_contact)}
                             />
                           </>
                          
                        ) : (
                          application.m_contact && (
                            <>
                            <img
                                src={application.whatsapp_status === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                                alt="icon"
                                width={30}
                                className="d-inline-block"
                              onClick={() => handleWhatsappClick1(index,application.m_contact)}
                              />
                              <img
                                src={application.whatsapp_status_2 === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                                alt="icon"
                                width={30}
                                className="d-inline-block"
                              onClick={() => handleWhatsappClick2(index,application.m_contact)}
                              />
                            </>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoContent contentName="applications" />
          )}
        </div>
      </div>
    </div>
  );
}

export default OldApplications;
