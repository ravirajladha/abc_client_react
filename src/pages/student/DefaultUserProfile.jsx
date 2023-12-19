import React, { useState, useEffect, useContext, Fragment } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import Slider from "react-slick";

import StudentSidebar from "../../components/includes/StudentSidebar.jsx";

const blueChart = {
  series: [
    {
      name: "",
      data: [18, 34, 44, 58, 38],
    },
  ],

  options: {
    colors: "#0d66ff",
    chart: {
      height: "50%",
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
  },
};

const pinkChart = {
  series: [
    {
      name: "",
      data: [16, 19, 23, 58, 38],
    },
  ],

  options: {
    colors: "#FFB7F5",
    chart: {
      height: "50%",
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
  },
};

const liveClassSlider = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 300,
  centerMode: false,
  variableWidth: true,
};
const liveClassesList = [
  {
    imageUrl: "english.png",
    name: "English ",
    email: "Teacher 1",
    bgImage: "subject/english.jpg",
  },
  {
    imageUrl: "Maths.png",
    name: "Mathermatics ",
    email: "Teacher 2",

    bgImage: "subject/Maths.png",
  },
];

function StudentProfile() {
  const userDetails = useContext(AuthContext).user;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [studentDetails, setStudentDetails] = useState(null);
  const [studentReportDetails, setStudentReportDetails] = useState(null);
  const [subjectReport, setSubjectReportDetails] = useState(null);

  useEffect(() => {
    const fetchStudentMeta = async () => {
      try {
        const response = await fetch(
          `${baseUrl}api/get_student_meta/${userDetails.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const studentMeta = await response.json();
        setStudentDetails(studentMeta);
      } catch (error) {
        console.error("Failed to fetch student meta:", error);
      }
    };
    const fetchStudentReport = async () => {
      try {
        const response = await fetch(
          `${baseUrl}api/get-student-report-card/${userDetails.user.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const report = await response.json();
        console.log("studentReportDetails", report);
        setStudentReportDetails(report);
        setSubjectReportDetails(report.subject_ranks);
      } catch (error) {
        console.error("Failed to fetch student meta:", error);
      }
    };

    if (userDetails) {
      fetchStudentMeta();
      fetchStudentReport();
    }
  }, [userDetails]);

  function displayValueOrDefault(value, label, defaultValue = "Not provided") {
    return `${label}: ${value || defaultValue}`;
  }

  useEffect(() => {
    const fetchStudentMeta = async () => {
      try {
        const response = await fetch(
          `${baseUrl}api/get_student_meta/${userDetails.user.id}`, // Corrected string interpolation
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add your auth token if required
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok"); // Corrected error handling
        }

        const studentMeta = await response.json();
        console.log("student_detail", studentMeta); // Corrected log statement
        setStudentDetails(studentMeta);
      } catch (error) {
        console.error("Failed to fetch student meta:", error);
      }
    };

    if (userDetails) {
      fetchStudentMeta();
    }
  }, [userDetails, baseUrl]); // baseUrl added to dependency array

  function displayValueOrDefault(value, label, defaultValue = "Not Provided") {
    return (
      <p>
        <span className="font-xss fw-600">{label}:</span>
        {value || defaultValue}
      </p>
    );
  }

  return (
    <Fragment>
     
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <Tabs
                defaultActiveKey="report"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                <Tab eventKey="report" title="REPORT CARD">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg justify-content-between">
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                        REPORT CARD
                      </h4>
                      <button className="btn btn-light text-white d-inline-block rounded-xl bg-current font-xssss uppercase fw-700 ls-lg border-2">
                        Download
                      </button>
                    </div>

                    <div className="card-body p-lg-5 p-4 w-100 border-0">
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-center">
                              <a
                                href="/default-follower"
                                className="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block"
                              >
                                <img
                                  src={`avatar.png`}
                                  alt="avatar"
                                  className="p-0 w100 shadow-xss"
                                />
                              </a>
                              <h4 className="fw-700 font-xs mt-3 mb-1">
                                {studentReportDetails &&
                                  studentReportDetails.name}
                              </h4>

                              <div className="clearfix"></div>

                              <ul className="list-inline border-0 mt-4">
                                <li className="list-inline-item text-center mr-4">
                                  <h4 className="fw-700 font-md">
                                    {studentReportDetails &&
                                      studentReportDetails.class}
                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                      Class
                                    </span>
                                  </h4>
                                </li>
                                <li className="list-inline-item text-center mr-4">
                                  <h4 className="fw-700 font-md">
                                    {studentReportDetails &&
                                      studentReportDetails.section}
                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                      Section
                                    </span>
                                  </h4>
                                </li>
                                <li className="list-inline-item text-center">
                                  <h4 className="fw-700 font-md">
                                    2023
                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                      Year
                                    </span>
                                  </h4>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          <div className="card border-0 shadow-none mb-4">
                            <div className="card-bod6 d-block text-left 2 fw-600-0">
                              <div className="item w-100 h50 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-3 align-items-end flex-column d-flex">
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white font-sm fw-700 mont-font mb-3">
                                    Rank{" "}
                                    {studentReportDetails &&
                                      studentReportDetails.class_rank}
                                    <span className="d-block fw-500 text-white font-xssss mt-1">
                                      Class Rank
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card border-0 mb-4 shadow-none">
                            <div className="card-body d-block text-left p-0">
                              <div className="item w-100 h50 bg-primary rounded-xxl text-left shadow-md pl-3 pt-3 align-items-end flex-column d-flex">
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white mb-3 font-sm fw-700 mont-font">
                                    Rank{" "}
                                    {studentReportDetails &&
                                      studentReportDetails.section_rank}
                                    <span className="d-block fw-500 text-grey-300 font-xssss mt-1">
                                      Section Rank
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="#"
                            className="rounded-xxl border-dashed my-2 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-grey-900 d-block  text-dark"
                          >
                            TERM WISE SCORE
                          </Link>

                          <div className="row mb-3">
                            <div className="col-lg-4 col-md-4">
                              <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                                <span className="btn-round-xxxl m-0 alert-success">
                                  Term 1
                                </span>
                                <span className="font-xsss fw-bold">
                                  Score:
                                  {studentReportDetails &&
                                    studentReportDetails.first_term_marks}
                                  /{studentReportDetails &&
                                    studentReportDetails.first_term_total_marks}
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-4">
                              <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                                <span className="btn-round-xxxl alert-success">
                                  Term 2
                                </span>
                                <span className="font-xsss fw-bold">
                                  Score:
                                  {studentReportDetails &&
                                    studentReportDetails.second_term_marks}
                                  /{studentReportDetails &&
                                    studentReportDetails.second_term_total_marks}
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-4">
                              <div className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center gap-2 h-100">
                                <span className="btn-round-xxxl alert-success">
                                  Term 3
                                </span>
                                <span className="font-xsss fw-bold">
                                  Score:
                                  {studentReportDetails &&
                                    studentReportDetails.third_term_marks}
                                  /{studentReportDetails &&
                                    studentReportDetails.third_term_total_marks}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="card border-0 mb-4 shadow-none">
                              <div className="card-body d-block text-left p-0">
                                <div className="item w-100 h50 bg-dark rounded-xxl text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                  <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-center w-100 mt-auto d-flex flex-column justify-content-center align-items-center gap-2">
                                    <h4 className="text-white my-2 font-sm fw-700 mont-font">
                                      Total Score
                                      <span className="d-block fw-500 text-grey-300 font-xss mt-1">
                                        {studentReportDetails &&
                                          studentReportDetails.total_term_marks}
                                        /{studentReportDetails &&
                                          studentReportDetails.overall_total_marks}
                                      </span>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-7">
                          <div className="rounded-xxl bg-greylight h-100 p-3">
                            <table className="table rounded-10 table-admin mb-0">
                              <thead className="bg-greylight ovh">
                                <tr>
                                  <th className="border-0" scope="col">
                                    Subject
                                  </th>

                                  <th
                                    className="border-0 text-center"
                                    scope="col"
                                  >
                                    Term 1
                                  </th>
                                  <th
                                    className="border-0 text-center"
                                    scope="col"
                                  >
                                    Term 2
                                  </th>
                                  <th
                                    className="border-0 text-center"
                                    scope="col"
                                  >
                                    Term 3
                                  </th>

                                  <th
                                    scope="col"
                                    className="text-center border-0"
                                  >
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {subjectReport &&
                                  subjectReport.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <b>{item.subject_name}</b>
                                      </td>

                                      {item.scores
                                        .map((score, scoreIndex) => (
                                          <td
                                            className="text-center"
                                            key={scoreIndex}
                                          >
                                            {score.score}/{score.total_marks}
                                          </td>
                                        ))
                                        .concat(
                                          Array.from({
                                            length: Math.max(
                                              3 - item.scores.length,
                                              0
                                            ),
                                          }).map((_, index) => (
                                            <td
                                              className="text-center"
                                              key={`empty_${index}`}
                                            >
                                              {"-"}
                                            </td>
                                          ))
                                        )}

                                      <td className="text-center">
                                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 alert-success text-success">
                                          {item.total_score}/{item.total_test_marks}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            <div className="col-lg-12 mt-5">
                              <div className="row">
                                {subjectReport &&
                                  subjectReport.map((subject, index) => (
                                    <div className="col-lg-4" key={index}>
                                      <div className="card border-0 shadow-none mb-4">
                                        <div className="card-body d-block text-left fw-600">
                                          <div className="item w-100 h-50 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                            <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                              <h6 className="text-black font-sm fw-700 mont-font mb-3 mt-1">
                                                {subject.subject_name}
                                                <span className="d-block fw-500 text-white font-xss mt-1">
                                                  Rank
                                                  {" " + subject.subject_rank}
                                                </span>
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="ABOUT">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-12">
                          <div className="row g-3">
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.f_name,
                                "First Name"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.l_name,
                                "Last Name"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.dob,
                                "Date of Birth"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.gender,
                                "Gender"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.religion,
                                "Religion"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.category,
                                "Category"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.mother_name,
                                "Mother's Name"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.father_name,
                                "Father's Name"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.siblings,
                                "Siblings"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.aadhar,
                                "Aadhar"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.identity_proof,
                                "Identity Proof"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.address_proof,
                                "Address Proof"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.physically_challenged,
                                "Physically Challenged"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.annual_income,
                                "Annual Income"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.email,
                                "Email ID"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.whatsapp_no,
                                "WhatsApp No"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.f_phone,
                                "Fathers' Phone"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.f_email_id,
                                "Fathers' Email"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.m_phone,
                                "Mothers' Phone"
                              )}
                            </div>
                          </div>
                          <div className="row g-2 my-2">
                            <div className="col-12">
                              <h3 className="font-md fw-600">
                                Communication Address
                              </h3>
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.comm_address,
                                "Address"
                              )}
                            </div>

                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.comm_pin_code,
                                "Pin Code"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.comm_village,
                                "Village"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.comm_block,
                                "Block"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.comm_state,
                                "State"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.phone_no,
                                "Phone No"
                              )}
                            </div>
                          </div>
                          <div className="row g-2 my-2">
                            <div className="col-12">
                              <h3 className="font-md fw-600">
                                Permanent Address
                              </h3>
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.perm_address,
                                "Address"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.perm_village,
                                "Village"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.perm_block,
                                "Block"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.perm_state,
                                "State"
                              )}
                            </div>
                          </div>
                          <div className="row g-2 mt-2">
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.description,
                                "Description"
                              )}
                            </div>
                            <div className="col-3">
                              {displayValueOrDefault(
                                studentDetails?.hobby,
                                "Hobbies"
                              )}
                            </div>
                            <div className="col-6">
                              {displayValueOrDefault(
                                studentDetails?.created_at,
                                "Added on"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                            
                </Tab>

                <Tab eventKey="video" title="SUBJECT">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        My <b>Subjects</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <Slider {...liveClassSlider}>
                        {liveClassesList.map((value, index) => (
                          <div
                            className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4 mr-2"
                            key={index}
                          >
                            <div
                              className="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center"
                              style={{
                                backgroundImage: `url(assets/images/${value.bgImage})`,
                              }}
                            ></div>
                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                              <div className="clearfix"></div>
                              <h4 className="fw-700 font-xss mt-3 mb-1">
                                {value.name}
                              </h4>
                              <p className="fw-500 font-xssss text-grey-500 mt-0 mb-2">
                                {value.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="ranks" title="RANKS">
                  {userDetails.user.type === "school_student" && (
                    <div className="row">
                      <div className="col-xl-4 col-lg-12 ">
                        <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                          <div className="card-body p-4">
                            <div className="row">
                              <div className="col-7">
                                <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">
                                  +45%
                                </h4>
                                <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentReportDetails &&
                                      studentReportDetails.class_rank}
                                </h2>
                                <h4 className="fw-700 text-grey-500 font-xsssss ls-3 text-uppercase mb-0 mt-0">
                                  Class Wise Rank
                                </h4>
                              </div>
                              <div className="col-5 text-left">
                                <Chart
                                  options={blueChart.options}
                                  series={blueChart.series}
                                  type="bar"
                                  width="100%"
                                  height="50%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-12 ">
                        <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                          <div className="card-body p-4">
                            <div className="row">
                              <div className="col-7">
                                <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">
                                  -27%
                                </h4>
                                <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentReportDetails &&
                                      studentReportDetails.section_rank}
                                </h2>
                                <h4 className="fw-700 text-grey-500 font-xsssss ls-3 text-uppercase mb-0 mt-0">
                                  Section Wise Rank
                                </h4>
                              </div>
                              <div className="col-5 text-left">
                                <Chart
                                  options={pinkChart.options}
                                  series={pinkChart.series}
                                  type="bar"
                                  width="100%"
                                  height="50%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab>

                <Tab eventKey="friends" title="FORUM">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        <b></b>
                      </h2>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
            <StudentSidebar />
          </div>
      
    </Fragment>
  );
}

export default StudentProfile;
