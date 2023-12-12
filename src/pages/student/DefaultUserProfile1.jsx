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
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div class="row">
                {/* <div class="col-lg-12">
                  <div class="card w-100 bg-lightblue p-lg-5 p-4 border-0 rounded-lg d-block float-left">
                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                      <span className="font-xssss fw-600 text-grey-500 d-block mb-2 ml-1">
                        Welcome back
                      </span>
                      Hi, {userDetails.user.name}
                    </h2>
                  </div>
                </div> */}
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
                            LEARNING
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
                            PROGRESS
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

                <div className="col-xl-4 col-lg-12 ">
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
                </div>
              </div>

              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                <Tab eventKey="profile" title="ABOUT">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        <b>About Me</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        <div className="col-xl-12">
                          <p className="font-xssss fw-600 lh-28 text-grey-500 pl-0">
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.f_name,
                                "First Name"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.l_name,
                                "Last Name"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.mother_name,
                                "Mother Name"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.father_name,
                                "Father Name"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.dob,
                                "Date of Birth"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.email,
                                "Email"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.whatsapp_no,
                                "WhatsApp No"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.gender,
                                "Gender"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.religion,
                                "Religion"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.category,
                                "Category"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.physically_challenged,
                                "Physically Challenged"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.aadhar,
                                "Aadhar"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.address_proof,
                                "Address Proof"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.identity_proof,
                                "Identity Proof"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.siblings,
                                "Siblings"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.annual_income,
                                "Annual Income"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.f_phone,
                                "Father Phone"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.f_email_id,
                                "Father Email"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.m_phone,
                                "Mother Phone"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.comm_address,
                                "Communication Address"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.comm_pin_code,
                                "Communication Pin Code"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.comm_village,
                                "Communication Village"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.comm_block,
                                "Communication Block"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.comm_state,
                                "Communication State"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.phone_no,
                                "Phone No"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.perm_address,
                                "Permanent Address"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.perm_village,
                                "Permanent Village"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.perm_block,
                                "Permanent Block"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.perm_state,
                                "Permanent State"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.description,
                                "Description"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.hobby,
                                "Hobby"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.motherTongue,
                                "Mother Tongue"
                              )}
                            </p>
                            <p>
                              {displayValueOrDefault(
                                studentDetails?.created_at,
                                "Created At"
                              )}
                            </p>
                          </p>

                          <ul className="d-flex align-items-center mt-2 mb-3 float-left">
                            <li className="mr-2">
                              <a
                                href="/default-user-profile"
                                className="btn-round-md bg-facebook"
                              >
                                <i className="font-xs ti-facebook text-white"></i>
                              </a>
                            </li>
                            <li className="mr-2">
                              <a
                                href="/default-user-profile"
                                className="btn-round-md bg-twiiter"
                              >
                                <i className="font-xs ti-twitter-alt text-white"></i>
                              </a>
                            </li>
                            <li className="mr-2">
                              <a
                                href="/default-user-profile"
                                className="btn-round-md bg-linkedin"
                              >
                                <i className="font-xs ti-linkedin text-white"></i>
                              </a>
                            </li>
                            <li className="mr-2">
                              <a
                                href="/default-user-profile"
                                className="btn-round-md bg-instagram"
                              >
                                <i className="font-xs ti-instagram text-white"></i>
                              </a>
                            </li>
                            <li className="mr-2">
                              <a
                                href="/default-user-profile"
                                className="btn-round-md bg-pinterest"
                              >
                                <i className="font-xs ti-pinterest text-white"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="video" title="SUBJECT">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        My <b>Courses</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        {courseList.map((value, index) => (
                          // Strat Single Demo
                          <div
                            className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4"
                            key={index}
                          >
                            <div className="card w-100 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-1 course-card">
                              <div className="card-image w-100 mb-3">
                                <Link
                                  to="/coursedetails"
                                  className="video-bttn position-relative d-block"
                                >
                                  <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="course"
                                    className="w-100"
                                  />
                                </Link>
                              </div>
                              <div className="card-body pt-0">
                                <span
                                  className={`font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 ${value.status}`}
                                >
                                  {value.tag}
                                </span>
                                <span className="font-xss fw-700 pl-3 pr-3 ls-2 lh-32 d-inline-block text-success float-right">
                                  <span className="font-xsssss">$</span>
                                  {value.price}
                                </span>
                                <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                                  <Link
                                    to="/coursedetails"
                                    className="text-dark text-grey-900"
                                  >
                                    {value.title}
                                  </Link>
                                </h4>
                                <h6 className="font-xssss text-grey-500 fw-600 ml-0 mt-2">
                                  {value.lesson} Lesson
                                </h6>
                                <ul className="memberlist mt-3 mb-2 ml-0 d-block">
                                  <li>
                                    <a href="/">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                        className="w30 d-inline-block rounded-circle"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                        className="w30 d-inline-block rounded-circle"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                        className="w30 d-inline-block rounded-circle"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                        className="w30 d-inline-block rounded-circle"
                                      />
                                    </a>
                                  </li>
                                  <li className="last-member">
                                    <a
                                      href="/"
                                      className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center"
                                    >
                                      +2
                                    </a>
                                  </li>
                                  <li className="pl-4 w-auto">
                                    <a
                                      href="/"
                                      className="fw-500 text-grey-500 font-xssss"
                                    >
                                      Student apply
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          // End Single Demo
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>
                {userDetails.user.type == "school_student" && (
                  <Tab eventKey="bdage" title="RANKS">
                    <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                      <div className="card-body mb-lg-3 pb-0">
                        <h2 className="fw-400 font-lg d-block">
                          My <b>Badge</b>
                          <a
                            href="/default-user-profile"
                            className="float-right"
                          >
                            <i className="feather-edit text-grey-500 font-xs"></i>
                          </a>
                        </h2>
                      </div>
                      <div className="card-body pb-0">
                        <div className="row">
                          {badgeList.map((value, index) => (
                            // Strat Single Demo
                            <div
                              className="col-xl-4 col-lg-6 col-md-6"
                              key={index}
                            >
                              <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                <a
                                  href="/default-user-profile"
                                  className="position-absolute right-0 mr-4 top-0 mt-3"
                                >
                                  <i className="ti-more text-grey-500 font-xs"></i>
                                </a>
                                <a
                                  href="/default-user-profile"
                                  className="btn-round-xxxl rounded-lg ml-auto mr-auto"
                                >
                                  <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="badge"
                                    className="w-100"
                                  />
                                </a>
                                <h4 className="fw-700 font-xsss mt-4">
                                  {value.title}
                                </h4>
                                <p className="fw-500 font-xssss text-grey-500 mt-3">
                                  {value.des}
                                </p>
                                <div className="clearfix"></div>
                                <div className="progress mt-3 h10">
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuemin="0"
                                    style={{ width: `${value.per}%` }}
                                  ></div>
                                </div>
                                <a
                                  href="/default-user-profile"
                                  className="mt-3 d-inline-block text-grey-900 fw-700 rounded-lg text-center font-xssss ls-3"
                                >
                                  {value.tag}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab>
                )}
                <Tab eventKey="group" title="QNA">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        <b>Group</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        {channelList.map((value, index) => (
                          <div
                            className="col-xl-4 col-lg-6 col-md-6"
                            key={index}
                          >
                            <div className="card mb-4 d-block w-100 shadow-xss rounded-lg px-4 py-5 border-0 text-center">
                              <a
                                href="/default-channel"
                                className="position-absolute right-0 mr-4 top-0 mt-3"
                              >
                                <i className="ti-more text-grey-500 font-xs"></i>
                              </a>
                              <a
                                href="/default-channel"
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                              >
                                <img
                                  src={`assets/images/${value.imageUrl}`}
                                  alt="icon"
                                  className="p-1 w-100"
                                />
                              </a>
                              <h4 className="fw-700 font-xs mt-4">
                                {value.title}
                              </h4>
                              <p className="fw-500 font-xssss text-grey-500 mt-3">
                                {value.des}
                              </p>
                              <div className="clearfix"></div>
                              {value.tag1 ? (
                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                  {value.tag1}
                                </span>
                              ) : (
                                ""
                              )}
                              {value.tag2 ? (
                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                  {value.tag2}
                                </span>
                              ) : (
                                ""
                              )}
                              {value.tag3 ? (
                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                                  {value.tag3}
                                </span>
                              ) : (
                                ""
                              )}
                              <div className="clearfix"></div>
                              <ul className="memberlist mt-4 mb-2">
                                <li>
                                  <a href="/default-channel">
                                    <img
                                      src="assets/images/user.png"
                                      alt="user"
                                      className="w30 d-inline-block rounded-circle"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="/default-channel">
                                    <img
                                      src="assets/images/user.png"
                                      alt="user"
                                      className="w30 d-inline-block rounded-circle"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="/default-channel">
                                    <img
                                      src="assets/images/user.png"
                                      alt="user"
                                      className="w30 d-inline-block rounded-circle"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="/default-channel">
                                    <img
                                      src="assets/images/user.png"
                                      alt="user"
                                      className="w30 d-inline-block rounded-circle"
                                    />
                                  </a>
                                </li>
                                <li className="last-member">
                                  <a
                                    href="/default-channel"
                                    className="bg-greylight fw-600 text-grey-500 font-xssss ls-3"
                                  >
                                    +2
                                  </a>
                                </li>
                                <li className="pl-4 w-auto">
                                  <a
                                    href="/default-channel"
                                    className="fw-500 text-grey-500 font-xssss"
                                  >
                                    Student apply
                                  </a>
                                </li>
                              </ul>

                              <a
                                href="/default-channel"
                                className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current"
                              >
                                APPLY NOW
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>
     
                  <Tab eventKey="friends" title="FORUM">
                    <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                      <div className="card-body mb-lg-3 pb-0">
                        <h2 className="fw-400 font-lg d-block">
                          My <b>Friend</b>
                          <a
                            href="/default-user-profile"
                            className="float-right"
                          >
                            <i className="feather-edit text-grey-500 font-xs"></i>
                          </a>
                        </h2>
                      </div>
                      <div className="card-body pb-0">
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
                                        className="btn-round-md bg-twiiter"
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
                      </div>
                    </div>
                  </Tab>
             
            
                <Tab eventKey="live" title="REPORT CARD">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                      <Link
                        to="/default-settings"
                        className="d-inline-block mt-2"
                      >
                        <i className="ti-arrow-left font-sm text-white"></i>
                      </Link>
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                       REPORT CARD
                      </h4>
                    <button className="btn btn-primary float-right">Download</button>
                  
                    </div>
                    <div className="card-body p-lg-5 p-4 w-100 border-0">
                      <div className="row">
                        <div className="col-lg-5">

                        <div
                   
                      className="col-xl-4 col-lg-6 col-md-6 col-sm-6"
                    >
                      <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-4 border-0 text-center">
                        <a
                          href="/default-follower"
                          className="position-absolute right-0 mr-4 top-0 mt-3"
                        >
                          <i className="ti-more text-grey-500 font-xs"></i>
                        </a>
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
                         222
                          <i className="ti-check font-xssss btn-round-xs bg-success text-white ml-1"></i>
                        </h4>
                        <p className="fw-600 font-xssss text-grey-500 mt-0 mb-2">
                         222
                        </p>
                        <div className="clearfix"></div>
                        <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                          Desinger
                        </span>
                        <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                        <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                          PHP
                        </span>
                        <span className="dot ml-2 mr-2 d-inline-block btn-round-xss bg-grey"></span>
                        <span className="font-xssss fw-600 text-grey-500 d-inline-block ml-1">
                          HTML5
                        </span>

                        <ul className="list-inline border-0 mt-4">
                          <li className="list-inline-item text-center mr-4">
                            <h4 className="fw-700 font-md">
                             22
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Connections
                              </span>
                            </h4>
                          </li>
                          <li className="list-inline-item text-center mr-4">
                            <h4 className="fw-700 font-md">
                             22
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Follower
                              </span>
                            </h4>
                          </li>
                          <li className="list-inline-item text-center">
                            <h4 className="fw-700 font-md">
                             2
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Followings
                              </span>
                            </h4>
                          </li>
                        </ul>
                        <a
                          href="/default-follower"
                          className="mt-3 p-0 btn p-2 lh-24 w100 ml-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                          <div className="col-lg-12 pl-0">
                            <h4 className="mb-4 font-lg fw-700 mont-font mb-5">
                              Saved Card
                            </h4>
                          </div>
                          <div className="cleafrfix"></div>
                          <div className="card border-0 shadow-none mb-4 mt-3">
                            <div className="card-body d-block text-left p-0">
                              <div className="item w-100 h150 bg-white rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                <div className="card border-0 shadow-none p-0 bg-transparent-card text-left w-100">
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
                                        className="w30 float-right d-inline-block mt-2 mr-2 rounded-lg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="card border-0 shadow-none p-0 bg-transparent-card text-left w-100 mt-auto">
                                  <h4 className="text-grey-900 font-sm fw-700 mont-font mb-3 text-dark-color">
                                    $ 5960.00
                                    <span className="d-block fw-500 text-grey-500 font-xssss mt-1 text-dark-color">
                                      Debit Card
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card border-0 shadow-none mb-4">
                            <div className="card-bod6 d-block text-left 2 fw-600-0">
                              <div className="item w-100 h150 bg-gold-gradiant rounded-xxl overflow-hidden text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
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
                                </div>
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white font-sm fw-700 mont-font mb-3">
                                    $ 5960.00
                                    <span className="d-block fw-500 text-white font-xssss mt-1">
                                      Debit Card
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card border-0 mb-4 shadow-none">
                            <div className="card-body d-block text-left p-0">
                              <div className="item w-100 h150 bg-primary rounded-xxl text-left shadow-md pl-3 pt-2 align-items-end flex-column d-flex">
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100">
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
                                        className="w30 float-right d-inline-block mt-2 mr-2 rounded-lg rounded-lg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="card bg-transparent border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-white mb-3 font-sm fw-700 mont-font">
                                    $ 2260.00
                                    <span className="d-block fw-500 text-grey-300 font-xssss mt-1">
                                      Debit Card
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
                            Add Card
                          </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                          <div className="rounded-xxl bg-greylight h-100 p-3">
                            <div className="col-lg-12 pl-0"></div>
                            <div className="col-lg-12">
                              <div className="item ms-auto mr-auto mt-3 w-100 h150 bg-white rounded-xxl text-left shadow-lg pl-3 pt-2 align-items-end flex-column d-flex">
                                <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                                  <div className="row">
                                    <div className="col-6 pl-2">
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
                                        className="w30 float-right d-inline-block mt-2 mr-2 rounded-lg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                                  <h4 className="text-grey-900 font-sm fw-700 mont-font text-dark-color">
                                    **** **** **** 2234
                                    <span className="d-block fw-500 text-grey-500 font-xssss mt-0 mb-3 text-dark-color">
                                      Credit Card
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 mt-5">
                              <form>
                                <div className="form-group mb-1">
                                  <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">
                                    Card Number
                                  </label>
                                  <div className="form-group icon-tab">
                                    <input
                                      type="text"
                                      className="bg-white font-xsss border-0 rounded-lg form-control pl-4 bg-color-none border-bottom text-grey-900"
                                      placeholder="1234 1234 1234 1234"
                                    />
                                  </div>
                                </div>
                                <div className="form-group mb-1">
                                  <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">
                                    Card Holder Name
                                  </label>
                                  <div className="form-group icon-tab">
                                    <input
                                      type="text"
                                      className="bg-white border-0 rounded-lg form-control pl-4 bg-color-none border-bottom text-grey-900"
                                      placeholder="Name"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-group mb-1">
                                      <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">
                                        Month
                                      </label>
                                      <div className="form-group icon-tab">
                                        <input
                                          type="text"
                                          className="bg-white border-0 rounded-lg form-control pl-4 bg-color-none border-bottom text-grey-900"
                                          placeholder="03"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group mb-1">
                                      <label className="text-dark-color text-grey-600 font-xssss mb-2 fw-600">
                                        Year
                                      </label>
                                      <div className="form-group icon-tab">
                                        <input
                                          type="text"
                                          className="bg-white border-0 rounded-lg form-control pl-4 bg-color-none border-bottom text-grey-900"
                                          placeholder="2021"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <Link
                                      to="/payment"
                                      className="rounded-lg bg-current mb-2 mt-4 p-3 w-100 fw-600 fw-700 text-center font-xssss mont-font text-uppercase ls-3 text-white d-block"
                                    >
                                      Add Card
                                    </Link>
                                  </div>
                                </div>
                              </form>
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
        </div>

        <AppFooter />
      </div>
    </Fragment>
  );
}

export default StudentProfile1;
