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
import SubjectScore from "../../components/common/SubjectScore";
import Slider from "react-slick";


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
const purpleChart = {
  series: [
    {
      name: "",
      data: [28, 34, 64, 18, 38],
    },
  ],

  options: {
    colors: "#6C5DD3",
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

const memberList = [
  {
    imageUrl: "user.png",
    name: "Student1 ",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student1 ",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student3 ",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student4",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student5",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student6",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student7",
    email: "support@gmail.com",
    bgimage: "blog.png",
  },
];
const liveList = [
  {
    imageUrl: "user.png",
    name: "Student1 ",
    email: "support@gmail.com",
    status: "LIVE",
    statusColor: "bg-danger",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student2",
    email: "support@gmail.com",
    status: "OFFLINE",
    statusColor: "bg-dark",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student3",
    email: "support@gmail.com",
    status: "LIVE",
    statusColor: "bg-danger",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student4",
    email: "support@gmail.com",
    status: "OFFLINE",
    statusColor: "bg-dark",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student5",
    email: "support@gmail.com",
    status: "LIVE",
    statusColor: "bg-danger",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student6",
    email: "support@gmail.com",
    status: "LIVE",
    statusColor: "bg-danger",
    bgimage: "blog.png",
  },
  {
    imageUrl: "user.png",
    name: "Student7",
    email: "support@gmail.com",
    status: "LIVE",
    statusColor: "bg-danger",
    bgimage: "bb-9.png",
  },
];
const channelList = [
  {
    imageUrl: "user.png",
    title: "Mobile Product Design",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "FULL TIME",
    tag2: "DESINER",
    tag3: "30 MIN",
  },
  {
    imageUrl: "user.png",
    title: "HTML Developer",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "",
    tag2: "DESINER",
    tag3: "30 MIN",
  },
  {
    imageUrl: "user.png",
    title: "Advanced CSS and Sass",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "FULL TIME",
    tag2: "DEVELOPER",
    tag3: "21 HOUR",
  },
  {
    imageUrl: "user.png",
    title: "Modern React with Redux",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "HALF TIME",
    tag2: "DESINER",
    tag3: "5 HOUNRS",
  },
  {
    imageUrl: "user.png",
    title: "Node JS",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "HALF TIME",
    tag2: "CODER",
    tag3: "45 MIN",
  },
  {
    imageUrl: "user.png",
    title: "Mobile Product Design",
    des: "Learn new secrets to creating awesome Microsoft Access databases and VBA coding not covered in any of my other courses!",
    tag1: "FULL TIME",
    tag2: "DESINER",
    tag3: "30 MIN",
  },
];
const badgeList = [
  {
    imageUrl: "user.png",
    title: "Bronze User",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "UNLOCK",
    per: "100",
  },
  {
    imageUrl: "user.png",
    title: "Platinum  User",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "95 / 100",
    per: "95",
  },
  {
    imageUrl: "user.png",
    title: "Ultra Powered",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "90 / 100",
    per: "90",
  },
  {
    imageUrl: "user.png",
    title: "Bronze User",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "85 / 100",
    per: "85",
  },
  {
    imageUrl: "user.png",
    title: "Gold User",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "UNLOCK",
    per: "82",
  },
  {
    imageUrl: "user.png",
    title: "Silver User",
    des: "Learn new secrets to creating awesome Microsoft Access databases",
    tag: "UNLOCK",
    per: "98",
  },
];
const courseList = [
  {
    imageUrl: "course.png",
    title: "Complete Python Bootcamp From Zero to Hero in Python ",
    price: "2400",
    tag: "Python",
    lesson: "32 ",
    status: "alert-warning text-warning",
  },
  {
    imageUrl: "course.png",
    title: "Complete Python Bootcamp From Zero to Hero in Python ",
    price: "40",
    tag: "Desinger",
    lesson: "24 ",
    status: "alert-danger text-danger",
  },
  {
    imageUrl: "course.png",
    title: "Java Programming Masterclass for Developers",
    price: "60",
    tag: "Bootstrap",
    lesson: "14 ",
    status: "alert-success text-success",
  },
  {
    imageUrl: "course.png",
    title: "The Data Science Course Complete Data Science ",
    price: "370",
    tag: "Develop",
    lesson: "23 ",
    status: "alert-danger text-danger",
  },
  {
    imageUrl: "course.png",
    title: "Complete Python Bootcamp From Zero to Hero in Python ",
    price: "450",
    tag: "Desinger",
    lesson: "24 ",
    status: "alert-danger text-danger",
  },
  {
    imageUrl: "course.png",
    title: "Fundamentals for Scrum Master and Agile Projects ",
    price: "670",
    tag: "Python",
    lesson: "32 ",
    status: "alert-warning text-warning",
  },
  {
    imageUrl: "course.png",
    title: "Automate the Boring Stuff with Python Programming",
    price: "760",
    tag: "Bootstrap",
    lesson: "14 ",
    status: "alert-primary text-primary",
  },
  {
    imageUrl: "course.png",
    title: "The Data Science Course Complete Data Science ",
    price: "370",
    tag: "Develop",
    lesson: "23 ",
    status: "alert-danger text-danger",
  },
];
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

function StudentProfile() {
  const userDetails = useContext(AuthContext).user;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [studentDetails, setStudentDetails] = useState(null);

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

  function displayValueOrDefault(value, label, defaultValue = "Not provided") {
    return (
      <span>
        <strong>{label}:</strong> {value || defaultValue}
      </span>
    );
  }
  
  return (
    <Fragment>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                
                <Tab eventKey="live" title="REPORT CARD">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg justify-content-between">
                      {/* <div> */}
                      {/* <Link
                        to="/default-settings"
                        className="d-inline-block mt-2"
                      >
                        <i className="ti-arrow-left font-sm text-white"></i>
                      </Link> */}
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
                                  <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-center w-100 mt-auto d-flex flex-column justify-content-center align-items-center">
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
                <Tab eventKey="profile" title="ABOUT">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="profile-details-grid">
                            <div className="row profile-details-row mb-2">
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.f_name,
                                  "First Name"
                                )}
                              </div>

                              {/* Repeat for other details */}

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.l_name,
                                  "Last Name"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.mother_name,
                                  "Mother Name"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.father_name,
                                  "Father Name"
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
                                  studentDetails?.email,
                                  "Email"
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
                                  studentDetails?.physically_challenged,
                                  "Physically Challenged"
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
                                  studentDetails?.address_proof,
                                  "Address Proof"
                                )}
                              </div>

                              <div className="col-3">Identity Proof:</div>
                              <div className="profile-details-value">
                                {displayValueOrDefault(
                                  studentDetails?.identity_proof,
                                  "Identity Proof"
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
                                  studentDetails?.annual_income,
                                  "Annual Income"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.f_phone,
                                  "Father Phone"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.f_email_id,
                                  "Father Email"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.m_phone,
                                  "Mother Phone"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.comm_address,
                                  "Communication Address"
                                )}
                              </div>

                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.comm_pin_code,
                                  "Communication Pin Code"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.comm_village,
                                  "Communication Village"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.comm_block,
                                  "Communication Block"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.comm_state,
                                  "Communication State"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.phone_no,
                                  "Phone No"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.perm_address,
                                  "Permanent Address"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.perm_village,
                                  "Permanent Village"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.perm_block,
                                  "Permanent Block"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.perm_state,
                                  "Permanent State"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.description,
                                  "Description"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.hobby,
                                  "Hobby"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.motherTongue,
                                  "Mother Tongue"
                                )}
                              </div>
                              <div className="col-3">
                                {displayValueOrDefault(
                                  studentDetails?.created_at,
                                  "Created At"
                                )}
                              </div>
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
                              {/* <figure className="avatar ml-auto mr-auto mb-0 mt--6 position-relative w75 z-index-1">
                            <img
                              src={`assets/images/${value.imageUrl}`}
                              alt="avater"
                              className="float-right p-1 bg-white rounded-circle w-100"
                            />
                          </figure> */}
                              <div className="clearfix"></div>
                              <h4 className="fw-700 font-xsss mt-3 mb-1">
                                {value.name}
                              </h4>
                              <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                {value.email}
                              </p>
                              {/* <span className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">
                            COMING SOON
                          </span> */}
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </Tab>

                {userDetails.user.type == "school_student" && (
                  <Tab eventKey="bdage" title="RANKS">
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
                                  4563
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
                                  3325
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
                      {/* <div className="col-xl-4 col-lg-12 ">
                        <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                          <div className="card-body p-4">
                            <div className="row">
                              <div className="col-7">
                                <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">
                                  -15%
                                </h4>
                                <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                  4455
                                </h2>
                                <h4 className="fw-700 text-grey-500 font-xsssss ls-3 text-uppercase mb-0 mt-0">
                                  PERFORMANCE
                                </h4>
                              </div>
                              <div className="col-5 text-left">
                                <Chart
                                  options={purpleChart.options}
                                  series={purpleChart.series}
                                  type="bar"
                                  width="100%"
                                  height="50%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </Tab>
                )}

                <Tab eventKey="friends" title="FORUM">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        <b>Loading...</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>

                    {/* <div className="card-body pb-0">
                        <div className="row">
                          {memberList.map((value, index) => (
                            <div
                              className="col-xxxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
                              key={index}
                            >
                              <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                                <div
                                  className="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center"
                                  style={{
                                    backgroundImage: `url(assets/images/${value.bgimage})`,
                                  }}
                                ></div>
                                <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                                  <figure className="avatar ml-auto mr-auto mb-0 mt--6 position-relative w75 z-index-1">
                                    <img
                                      src={`/avatar.png`}
                                      alt="avater"
                                      className="float-right p-1 bg-white rounded-circle w-100"
                                    />
                                  </figure>
                                  <div className="clearfix"></div>
                                  <h4 className="fw-700 font-xsss mt-3 mb-1">
                                  3
                                  </h4>
                                  <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                  333@gmail.com
                                  </p>
                                  <ul className="text-center d-block mt-3 list-inline ml-2 mr-2 mb-3">
                                    <li className="mr-1 list-inline-item">
                                      <a
                                        href="/default-user-profile"
                                        className="btn-round-md bg-facebook"
                                      >
                                        <i className="font-xs ti-facebook text-white"></i>
                                      </a>
                                    </li>
                                    <li className="mr-1 list-inline-item">
                                      <a
                                        href="/default-user-profile"
                                        className="btn-round-md bg-twitter"
                                      >
                                        <i className="font-xs ti-twitter-alt text-white"></i>
                                      </a>
                                    </li>
                                    <li className="mr-1 list-inline-item">
                                      <a
                                        href="/default-user-profile"
                                        className="btn-round-md bg-linkedin"
                                      >
                                        <i className="font-xs ti-linkedin text-white"></i>
                                      </a>
                                    </li>
                                    <li className="mr-0 list-inline-item">
                                      <a
                                        href="/default-user-profile"
                                        className="btn-round-md bg-instagram"
                                      >
                                        <i className="font-xs ti-instagram text-white"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div> */}
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
        </div>

        <AppFooter />
      </div>
    </Fragment>
  );
}

export default StudentProfile;
