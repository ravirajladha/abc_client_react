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

import ProfileCard from "../school/student-edit-profile-components/default-user-profile-components/ProfileCard.jsx";

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

function StudentProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userDetails = useContext(AuthContext).user;

  return (
    <Fragment>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card w-100 bg-lightblue p-lg-5 p-4 border-0 rounded-lg d-block float-left">
                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                      <span className="font-xssss fw-600 text-grey-500 d-block mb-2 ml-1">
                        Welcome back
                      </span>
                      Hi, {userDetails.user.name}
                    </h2>
                  </div>
                </div>
              </div>

              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3 nav nav-tabs profile xs-p-4 d-flex align-items-center justify-content-between product-info-tab border-bottom-0 bg-white shadow-xss rounded-lg"
              >
                <Tab eventKey="profile" title="ABOUT"></Tab>

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

                {userDetails.user.type == "school_student" && (
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
                                      src={`assets/images/${value.imageUrl}`}
                                      alt="avater"
                                      className="float-right p-1 bg-white rounded-circle w-100"
                                    />
                                  </figure>
                                  <div className="clearfix"></div>
                                  <h4 className="fw-700 font-xsss mt-3 mb-1">
                                    {value.name}
                                  </h4>
                                  <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                    {value.email}
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
                )}

                {/* 
                <Tab eventKey="live" title="LIVE">
                  <div className="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden p-lg-4 p-2">
                    <div className="card-body mb-lg-3 pb-0">
                      <h2 className="fw-400 font-lg d-block">
                        My <b>Friend</b>
                        <a href="/default-user-profile" className="float-right">
                          <i className="feather-edit text-grey-500 font-xs"></i>
                        </a>
                      </h2>
                    </div>
                    <div className="card-body pb-0">
                      <div className="row">
                        {liveList.map((value, index) => (
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
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="avater"
                                    className="float-right p-1 bg-white rounded-circle w-100"
                                  />
                                </figure>
                                <div className="clearfix"></div>
                                <h4 className="fw-700 font-xsss mt-3 mb-1">
                                  {value.name}
                                </h4>
                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                  {value.email}
                                </p>
                                <span
                                  className={`live-tag mt-2 p-2 z-index-1  rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3 mb-3 ${value.statusColor}`}
                                >
                                  {value.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab> */}
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
