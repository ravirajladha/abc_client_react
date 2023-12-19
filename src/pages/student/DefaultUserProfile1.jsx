import React, { useState, Fragment, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter.jsx";
import AppHeader from "../../components/includes/AppHeader.jsx";
import Profile from "../../components/common/Profile.jsx";
import Myclass from "../../components/common/MySubjects.jsx";
import Subscribe from "../../components/common/Subscribe.jsx";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import Chart from "react-apexcharts";
import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import SubjectScore from "../../components/common/SubjectScore.jsx";
import { Modal, Button } from "react-bootstrap";
const tableData = [
  {
    subject: "English",
    score1: "750/1000",
    score2: "750/1000",
    score3: "750/1000",
    total: "1500/3000",
  },
  {
    subject: "Maths",
    score1: "800/1000",
    score2: "780/1000",
    score3: "810/1000",
    total: "1600/3000",
  },
  {
    subject: "Science",
    score1: "800/1000",
    score2: "780/1000",
    score3: "810/1000",
    total: "1600/3000",
  },
  {
    subject: "Social Science",
    score1: "800/1000",
    score2: "780/1000",
    score3: "810/1000",
    total: "1600/3000",
  },
  {
    subject: "Computer",
    score1: "800/1000",
    score2: "780/1000",
    score3: "810/1000",
    total: "1600/3000",
  },
];

const subjects = [
  { name: "English", rank: "Rank 1" },
  { name: "Maths", rank: "Rank 1" },
  { name: "Science", rank: "Rank 1" },
  { name: "Social Science", rank: "Rank 1" },
  { name: "Computer", rank: "Rank 1" },
];

function StudentProfile1() {
  const userDetails = useContext(AuthContext).user;
  // Assuming you have an AuthContext that provides user details
  const [studentDetails, setStudentDetails] = useState(null);
  // When rendering or using the data, check if studentDetails is not null

  if (studentDetails) {
    console.log(studentDetails.f_name);
  } else {
    console.log("studentDetails is null or undefined");
  }

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchStudentMeta = async () => {
      try {
        // Replace 'student_meta_endpoint' with the actual endpoint for fetching student meta data
        const response = await fetch(
          `${baseUrl}api/get_student_meta/${userDetails.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add your auth token if required, assuming it's stored in userDetails
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const studentMeta = await response.json();
        // Handle the student meta data as needed
        console.log("stufent_detsil", studentMeta);
        setStudentDetails(studentMeta);
      } catch (error) {
        console.error("Failed to fetch student meta:", error);
      }
    };

    if (userDetails) {
      fetchStudentMeta();
    }
  }, [userDetails]); // Only re-run the effect if userDetails changes
  function displayValueOrDefault(value, label, defaultValue = "Not provided") {
    return `${label}: ${value || defaultValue}`;
  }
  return (
    <Fragment>
   
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div class="row"></div>

              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                <Tab eventKey="live" title="REPORT CARD">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg justify-content-between">
                      {/* <div> */}
                      <Link
                        to="/default-settings"
                        className="d-inline-block mt-2"
                      >
                        <i className="ti-arrow-left font-sm text-white"></i>
                      </Link>
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                        REPORT CARD
                      </h4>
                      {/* </div> */}
                      <button className="btn btn-dark text-white d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">
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
                                  alt="avater"
                                  className="p-0 w100 shadow-xss"
                                />
                              </a>
                              <h4 className="fw-700 font-xs mt-3 mb-1">
                                Student Name
                                <i className="ti-check font-xssss btn-round-xs bg-success text-white ml-1"></i>
                              </h4>

                              <div className="clearfix"></div>

                              <ul className="list-inline border-0 mt-4">
                                <li className="list-inline-item text-center mr-4">
                                  <h4 className="fw-700 font-md">
                                    Class 1
                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                      Class
                                    </span>
                                  </h4>
                                </li>
                                <li className="list-inline-item text-center mr-4">
                                  <h4 className="fw-700 font-md">
                                    A
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
                          <div className="col-lg-12 pl-0">
                            <h4 className="mb-4 font-lg fw-700 mont-font mb-5">
                              RANKING
                            </h4>
                          </div>
                          <div className="cleafrfix"></div>

                          <div className="card border-0 shadow-none mb-4">
                            <div className="card-bod6 d-block text-left 2 fw-600-0">
                              <div className="item w-100 h50 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                {/* <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                  <div className="row">
                                    <div className="col-6">
                                      <img
                                        src="https://via.placeholder.com/50x50.png"
                                        alt="icon"
                                        className="w40 float-left d-inline-block rounded-lg"
                                      />
                                    </div>
                                    <div className="col-6 text-right pr-4">
                                      <img
                                        src="https://via.placeholder.com/50x50.png"
                                        alt="icon"
                                        className="w30 float-right d-inline-block mt-2 mr-2 rounded-xxl rounded-lg"
                                      />
                                    </div>
                                  </div>
                                </div> */}
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white font-sm fw-700 mont-font mb-3">
                                    Rank 1
                                    <span className="d-block fw-500 text-white font-xssss mt-1">
                                      Class Wise Rank
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card border-0 mb-4 shadow-none">
                            <div className="card-body d-block text-left p-0">
                              <div className="item w-100 h50 bg-primary rounded-xxl text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white mb-3 font-sm fw-700 mont-font">
                                    Rank 2
                                    <span className="d-block fw-500 text-grey-300 font-xssss mt-1">
                                      Section Wise Rank
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/payment"
                            className="rounded-xxl border-dashed mb-2 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-grey-900 d-block  text-dark"
                          >
                            TERM WISE SCORE
                          </Link>

                          <div className="row">
                            <div className="col-lg-4 col-md-4 md-mb-1">
                              <div
                                className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center"
                                style={{ height: "100%" }}
                              >
                                <div>
                                  <span className="btn-round-xxxl alert-success">
                                    Term 1
                                  </span>{" "}
                                  <br />
                                  <span style={{ fontSize: "12px" }}>
                                    Score: 500/1000
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-4 md-mb-1">
                              <div
                                className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center"
                                style={{ height: "100%" }}
                              >
                                <div>
                                  <span className="btn-round-xxxl alert-success">
                                    Term 1
                                  </span>{" "}
                                  <br />
                                  <span style={{ fontSize: "12px" }}>
                                    Score: 500/1000
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-4 md-mb-1">
                              <div
                                className="card shadow-xss border-0 p-3 rounded-lg d-flex justify-content-center align-items-center"
                                style={{ height: "100%" }}
                              >
                                <div>
                                  <span className="btn-round-xxxl alert-success">
                                    Term 1
                                  </span>
                                  <br />
                                  <span style={{ fontSize: "12px" }}>
                                    Score: 500/1000
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="card border-0 mb-4 shadow-none">
                              <div className="card-body d-block text-left p-0">
                                <div className="item w-100 h50 bg-dark rounded-xxl text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                  <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                    <h4 className="text-white mb-3 font-sm fw-700 mont-font">
                                      Total Score
                                      <span className="d-block fw-500 text-grey-300 font-xssss mt-1">
                                        2000/3000
                                      </span>
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 offset-lg-1">
                          <div className="rounded-xxl bg-greylight h-100 p-3">
                            <div className="col-lg-12 pl-0"></div>
                            <table className="table table-admin mb-0">
                              <thead className="bg-greylight rounded-10 ovh">
                                <tr>
                                  <th className="border-0" scope="col">
                                    Subject
                                  </th>

                                  <th className="border-0" scope="col">
                                    Term1
                                  </th>
                                  <th className="border-0" scope="col">
                                    Term2
                                  </th>
                                  <th className="border-0" scope="col">
                                    Term3
                                  </th>

                                  <th
                                    scope="col"
                                    className="text-right border-0"
                                  >
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {tableData.map((row, index) => (
                                  <tr key={index}>
                                    <td>
                                      <b>{row.subject}</b>
                                    </td>
                                    <td>
                                      <b>{row.score1}</b>
                                    </td>
                                    <td>
                                      <b>{row.score2}</b>
                                    </td>
                                    <td className="text-right">
                                      <b>{row.score3}</b>
                                    </td>
                                    <td>
                                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 alert-success text-success">
                                        {row.total}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="col-lg-12 mt-5">
                              <div className="row">
                                {subjects.map((subject, index) => (
                                  <div className="col-lg-4" key={index}>
                                    <div className="card border-0 shadow-none mb-4">
                                      <div className="card-body d-block text-left fw-600">
                                        <div className="item w-100 h-50 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                          <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                            <h6 className="text-black font-sm fw-700 mont-font mb-3">
                                              {subject.name}
                                              <span className="d-block fw-500 text-white font-xssss mt-1">
                                                {subject.rank}
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
              </Tabs>
            </div>
            <div className="middle-sidebar-right scroll-bar">
              <div className="middle-sidebar-right-content">
                <Profile />
                <Myclass />

                <SubjectScore />
                <Subscribe />
              </div>
            </div>
          </div>
       
    </Fragment>
  );
}

export default StudentProfile1;
