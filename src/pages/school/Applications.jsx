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

function Applications() {
  const tableRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = () => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}api/school/api_get_all_applications`)
        .then((result) => result.json())
        .then((jsonbody) => {
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
  //         leftColumns: 0,
  //         rightColumns: 2,
  //       },
  //     });
  //     return () => {
  //       dataTable.destroy();
  //     };
  //   }
  // }, [applications]);

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
    fetch(`${baseUrl}api/school/update-application-wp-status`, {
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

  const whatsappMessage2 = encodeURIComponent("*Dear Parents*\nGreetings from Agasthya Vidyanikethan!\n\nWe are glad to announce the launch of our new website www.av.school with the updated and much awaited academic and non academic details of our institution. We hereby look forward to a productive collaboration with you to ensure our children's goals to the highest potential. Together, let us share the responsibility of building a strong citizen for our country.\n\nFor general queries please fill in the below mentioned google form.\n\nhttps://forms.gle/iKK7Av8agTBZQ7LW6\n\nFor admission related queries visit the below link.\n\nhttps://www.av.school/application\n\nPlease visit the website for more information\n\nThanking You,\n\nAgasthya Vidyanikethan");

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
    fetch(`${baseUrl}api/school/update-application-wp-status-2`, {
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
                    <th scope="col">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
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
                        {application.f_mob ? (
                          <>
                          <img
                              src={application.whatsapp_status === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                              alt="icon"
                              width={30}
                              className="d-inline-block"
                            onClick={() => handleWhatsappClick1(index,application.f_mob)}
                            />
                            <img
                              src={application.whatsapp_status_2 === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                              alt="icon"
                              width={30}
                              className="d-inline-block"
                            onClick={() => handleWhatsappClick2(index,application.f_mob)}
                            />
                          </>
                            
                        ) : (
                          application.m_mob && (
                           <>
                              <img
                                src={application.whatsapp_status === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                                alt="icon"
                                width={30}
                                className="d-inline-block"
                                onClick={() => handleWhatsappClick1(index,application.m_mob)}
                              />
                              <img
                              src={application.whatsapp_status_2 === 0 ? "/assets/images/whatsapp.png" : "/assets/images/whatsapp_gray.png"}
                              alt="icon"
                              width={30}
                              className="d-inline-block"
                            onClick={() => handleWhatsappClick2(index,application.f_mob)}
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

export default Applications;
