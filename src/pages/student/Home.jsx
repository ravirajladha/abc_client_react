import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getUserFromLocalStorage } from '../../pages/util/SessionStorage';

import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';

import AppFooter from '../../components/includes/AppFooter';
import AppHeader from '../../components/includes/AppHeader';
import StudentSidebar from '../../components/includes/StudentSidebar';

import { AuthContext } from "../../lib/AuthContext.js"
import { useContext } from 'react';

const latestList = [
  {
    imageUrl: 'course.png',
    title: 'Vector Algebra',
    price: '6',
    tag: 'Maths',
    lesson: '32 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Three-Dimensional Geometry',
    price: '4',
    tag: 'Maths',
    lesson: '14 ',
    status: 'alert-primary text-primary',
  },
  {
    imageUrl: 'course.png',
    title: 'Object-Oriented Programming',
    price: '3',
    tag: 'CS',
    lesson: '23 ',
    status: 'alert-danger text-danger',
  },
  {
    imageUrl: 'course.png',
    title: 'Web Application Development',
    price: '4',
    tag: 'CS',
    lesson: '2 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Data Structures',
    price: '1',
    tag: 'CS',
    lesson: '24 ',
    status: 'alert-danger text-danger',
  },
];


const classesList = [
  {
    imageUrl: 'user.png',
    title: 'Cyber Security',
    num: '32 Class',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Emerging Trends in IT',
    num: '54 Class',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Maths',
    num: '76 Class',
    bg: '#e5f4fb',
  },
  {
    imageUrl: 'user.png',
    title: 'C++',
    num: '76 Class',
    bg: '#dcf4f8',
  },
  {
    imageUrl: 'user.png',
    title: 'CS',
    num: '23 Class',
    bg: '#fcf1eb',
  },

  {
    imageUrl: 'user.png',
    title: 'DS',
    num: '78 Class',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Probability',
    num: '65 Class',
    bg: '#e5f4fb',
  },
  {
    imageUrl: 'user.png',
    title: 'MongoDB',
    num: '11 Class',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Bootstrap',
    num: '32 Class',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Bootstrap',
    num: '32 Class',
    bg: '#fff9eb',
  },
];

const memberList = [
  {
    imageUrl: 'user.png',
    name: 'Member1 ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member2 ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member3 ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member4',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member5 ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member6',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Member7',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
];

function Home() {
  const categorysettings = {
    arrows: false,
    dots: false,
    infinite: true,
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
    infinite: true,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };
  const memberSlider = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext);
  // const userString = localStorage.getItem("rexkod_user");
  // const user = JSON.parse(userString);

  useEffect(() => {
    if (user) {
      getSubjects();
    } else {
      return;
    }
  }, [user])

  const [subjects, setSubjects] = useState([]);
  function getSubjects() {
    let result = fetch(baseUrl + 'api/get_subjects/' + user.student.class_id).then(function (result) {
      result.json().then(function (jsonbody) {
        console.warn(jsonbody);
        setSubjects(jsonbody);
      })
    });
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
              {/* <div className="row mb-2">
                <h1>Welcome, {user.user.name}!</h1>  <br />
              </div> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 bg-lightblue p-lg-5 p-4 border-0 rounded-lg d-block float-left">
                    <img src="https://via.placeholder.com/70x70.png" alt="icon" className="sm-mt-2 w75 position-relative top--10 float-left mr-2 mt--1 " />
                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700"><span className="font-xssss fw-600 text-grey-500 d-block mb-2 ml-1">Welcome back!</span>
                      Hi, {user.user.name} have got 123 points!</h2>
                    <img src="https://via.placeholder.com/250x150.png" alt="icon" className="w250 right-15 top-0 position-absolute d-none d-xl-block" />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 ">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col">
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">455 </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                          Average Test Marks
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
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+25 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">105 </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0"> Average Assessment Marks</h4>
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
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">455 </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0"> Class Rank</h4>
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
                    Explore <b>Classes</b>
                  </h2>
                </div>
                <div className="col-lg-12 mt-3">
                  <Slider {...categorysettings}>
                    {classesList.map((value, index) => (
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
                              src={`assets/images/${value.imageUrl}`}
                              alt="icon"
                              className="p-2 w-100"
                            />
                          </span>
                          <h4 className="fw-600 font-xsss mt-3 mb-0">
                            {value.title}
                            <span className="d-block font-xsssss fw-500 text-grey-500 mt-2">
                              {value.num}
                            </span>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="col-lg-12 pt-4 mb-3">
                  <h2 className="fw-400 font-lg d-block">
                    My <b> Subjects</b>
                  </h2>
                </div>
                <div className="col-lg-12 mt-3">
                  <Slider {...popularSlider}>
                    {subjects.map((value, index) => (
                      <div
                        className="card course-card w300 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-3 mb-4"
                        key={index}
                      >
                        <div className="card-image w-100 mb-3">
                          <Link
                            to="/course-details"
                            className="video-bttn position-relative d-block"
                          >
                            <img
                              src={baseUrl + value.subject_image}
                              alt="course"
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="card-body pt-0">
                          <span
                            className={`font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 d-inline-block mr-1 ${index}`}
                          >
                            {value.tag}
                          </span>
                          <h4 className="fw-700 font-xss lh-28 mt-0">
                            <Link
                              to="/course-details"
                              className="text-dark text-grey-900"
                            >
                              {value.subject_name}
                            </Link>
                          </h4>
                          <h6 className="font-xssss text-grey-500 fw-600 ml-0 mt-2">
                            Lesson
                          </h6>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="col-lg-12 pt-0 mb-3">
                  <h2 className="fw-400 font-lg d-block">
                    Latest <b> Classes</b>
                  </h2>
                </div>
                <div className="col-lg-12 mt-3">
                  <Slider {...latestSlider}>
                    {latestList.map((value, index) => (
                      <div
                        className="card course-card w300 p-0 shadow-xss border-0 rounded-lg overflow-hidden mr-3 mb-4"
                        key={index}
                      >
                        <div className="card-image w-100 mb-3">
                          <Link
                            to="/course-details"
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
                            {value.price}
                            <span className="font-xsssss">Hrs</span>
                          </span>
                          <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                            <Link
                              to="/course-details"
                              className="text-dark text-grey-900"
                            >
                              {value.title}
                            </Link>
                          </h4>
                          <h6 className="font-xssss text-grey-500 fw-600 ml-0 mt-2">
                            {value.lesson} Lesson
                          </h6>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="col-lg-12 pt-0 mb-3">
                  <h2 className="fw-400 font-lg d-block">
                    Live <b> Teachers</b>
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
                          <span className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">
                            LIVE
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
