import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getUserFromLocalStorage } from "../../pages/util/SessionStorage";
>>>>>>> c80d62e792f96b9b63adf36e4a7d08ced3e42e7c

import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";

import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";

import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";

const latestList = [
  {
    imageUrl: "course.png",
    title: "Vector Algebra",
    price: "6",
    tag: "Maths",
    lesson: "32 ",
    status: "alert-warning text-warning",
  },
  {
    imageUrl: "course.png",
    title: "Three-Dimensional Geometry",
    price: "4",
    tag: "Maths",
    lesson: "14 ",
    status: "alert-primary text-primary",
  },
  {
    imageUrl: "course.png",
    title: "Object-Oriented Programming",
    price: "3",
    tag: "CS",
    lesson: "23 ",
    status: "alert-danger text-danger",
  },
  {
    imageUrl: "course.png",
    title: "Web Application Development",
    price: "4",
    tag: "CS",
    lesson: "2 ",
    status: "alert-warning text-warning",
  },
  {
    imageUrl: "course.png",
    title: "Data Structures",
    price: "1",
    tag: "CS",
    lesson: "24 ",
    status: "alert-danger text-danger",
  },
];

const memberList = [
  {
    imageUrl: "english.png",
    name: "English ",
    email: "Doubt Clearing Session",
    bgimage: "subject/english.jpg",
  },
  {
    imageUrl: "Maths.png",
    name: "Mathermatics ",
    email: "Doubt Clearing Session",

    bgimage: "subject/Maths.png",
  },
];

function Home() {
  const categorysettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };
  const popularSlider = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };
  const latestSlider = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };
  const memberSlider = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext);
  // const userString = localStorage.getItem("rexkod_user");
  // const user = JSON.parse(userString);

  useEffect(() => {
    const getSubjects = () => {
      if (user) {
        fetch(
          baseUrl + "api/get_student_subjects/" + user.student.class_id
        ).then(function (result) {
          result.json().then(function (res) {
            // console.warn("get_subjects", res);
            setSubjects(res);
          });
        });
      }
    };

    if (user) {
      getSubjects();
      getStudentRanks();
    } else {
      return;
    }
  }, [user]);

  const [subjects, setSubjects] = useState([]);
<<<<<<< HEAD
  function getSubjects() {
    let result = fetch(
      baseUrl + "api/get_student_subjects/" + user.student.class_id
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        console.warn("get_subjects", jsonbody);
        setSubjects(jsonbody);
      });
    });
=======
  
  const [studentClassRank, setStudentClassRank] = useState([]);

  async function getStudentRanks() {
    try {
      const response = await fetch(baseUrl + "api/student/" + user.student.auth_id);
      const student = await response.json();
      // console.warn(student.data.class_rank);
      setStudentClassRank(student.data.class_rank);
    } catch (error) {
      console.error("There was a problem fetching student details:", error);
    }
>>>>>>> c80d62e792f96b9b63adf36e4a7d08ced3e42e7c
  }

  if (!user) {
    console.log("No user found. User might be logged out.");
    // Handle the redirect to login or return placeholder content here
    return <div>User is not logged in</div>;
  }
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              
              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 bg-lightblue p-lg-5 p-4 border-0 rounded-lg d-block float-left">
                    <h1 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                      <span
                        className="font-xssss fw-600 text-grey-500 d-block mb-2 ml-1"
                        style={{ fontSize: "20px" }}
                      >
                        Welcome back!
                      </span>
                      Hi, {user.user.name} have got 123 points!
                    </h1>
                    {/* <img src="https://via.placeholder.com/250x150.png" alt="icon" className="w250 right-15 top-0 position-absolute d-none d-xl-block" /> */}
                    <img
                      src="/avatar.png"
                      alt="icon"
                      className="w125 right-15 top-0 position-absolute d-none d-xl-block mt-3"
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 ">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col">
                          {/* <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4> */}
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
<<<<<<< HEAD
                            455{" "}
=======
                            {studentClassRank ? studentClassRank : '-'}
>>>>>>> c80d62e792f96b9b63adf36e4a7d08ced3e42e7c
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Class Rank
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 ">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col">
                          {/* <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+25 %</h4> */}
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            105{" "}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Section Rank
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 ">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col">
                          {/* <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4> */}
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            455{" "}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            {" "}
                            Average Assessment
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-12 mb-3">
                    <div
                      className="card rounded-xxl p-lg--5 border-0 bg-no-repeat bg-image-contain banner-wrap"
                      style={{
                        backgroundImage: `url("https://via.placeholder.com/1100x720.png")`,
                      }}
                    >
                      <div className="card-body p-4">
                        <h2 className="display3-size fw-400 display2-md-size sm-mt-7 sm-pt-10">
                          Find a perfect{' '}
                          <b className="d-lg-block">Online Course</b>
                        </h2>
                        <h4 className="text-grey-500 font-xssss fw-500 ml-1 lh-24">
                          For only course you need to learn web development
                        </h4>
                        <div className="form-group mt-lg-4 p-3 border-light border p-2 bg-white rounded-lg ">
                          <div className="row">
                            <div className="col-md-5">
                              <div className="form-group icon-input mb-0">
                                <i className="ti-search font-xs text-grey-400"></i>
                                <input
                                  type="text"
                                  className="style1-input bg-transparent border-0 pl-5 font-xsss mb-0 text-grey-500 fw-500"
                                  placeholder="Search online courses.."
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group icon-input mb-0">
                                <i className="ti-package font-xs text-grey-400"></i>
                                <select className="style1-select bg-transparent border-0 pl-5">
                                  <option value="Bootstrap">Bootstrap</option>
                                  <option value="HTML">HTML</option>
                                  <option value="Jquery">Jquery</option>
                                  <option value="Sass">Sass</option>
                                  <option value="React">React</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <Link
                                to="/default-search"
                                className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase "
                              >
                                Search
                              </Link>
                            </div>
                          </div>
                        </div>
                        <h4 className="text-grey-500 font-xssss fw-500 ml-1 lh-24">
                          <b className="text-grey-800 text-dark">
                            Popular Search :
                          </b>
                          Designer, Developer, PHP, HTML, CSS, SCSS
                        </h4>
                      </div>
                    </div>
                  </div> */}
                <div className="col-lg-12 pt-2">
                  <h2 className="fw-400 font-lg">
                    My <b>Subjects</b>
                  </h2>
                </div>
                <div className="col-lg-12 mt-3">
                  <Slider {...categorysettings}>
                    {subjects.map((value, index) => (
                      <div
                        key={index}
                        className="card cat-card-hover mr-3 w140 border-0 p-0 text-center"
                      >
                        <div
                          className="card-body p-4 ml-0 rounded-lg"
                          style={{ background: `${value.bg}` }}
                        >
                          <span className="btn-round-xl bg-white">
                            <img
                              src={baseUrl + value.subject_image}
                              alt="icon"
                              className="p-2 w-100"
                            />
                          </span>
                          <h4 className="fw-600 font-xsss mt-3 mb-0">
                            {value.subject_name}
                            <span className="d-block font-xsssss fw-500 text-grey-500 mt-2">
                              {value.subject_name}
                            </span>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="col-lg-12 pt-0 mb-1 mt-3 ">
                  <h2 className="fw-400 font-lg d-block">
                    Live <b> Classes</b>
                  </h2>
                </div>
                <div className="col-lg-12 mt-3">
                  <Slider {...memberSlider}>
                    {memberList.map((value, index) => (
                      <div
                        className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4 mr-2"
                        key={index}
                      >
                        <div
                          className="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center"
                          style={{
                            backgroundImage: `url(assets/images/${value.bgimage})`,
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
                          <span className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">
                            COMING SOON
                          </span>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <StudentSidebar />
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default Home;
