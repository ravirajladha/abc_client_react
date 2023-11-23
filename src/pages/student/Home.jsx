import React, { useState, useEffect } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Subscribe from '../../components/Subscribe';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Myclass from '../../components/Myclass';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const latestList = [
  {
    imageUrl: 'course.png',
    title: 'Fundamentals for Scrum Master and Agile Projects ',
    price: '670',
    tag: 'Python',
    lesson: '32 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Automate the Boring Stuff with Python Programming',
    price: '760',
    tag: 'Bootstrap',
    lesson: '14 ',
    status: 'alert-primary text-primary',
  },
  {
    imageUrl: 'course.png',
    title: 'The Data Science Course Complete Data Science ',
    price: '370',
    tag: 'Develop',
    lesson: '23 ',
    status: 'alert-danger text-danger',
  },
  {
    imageUrl: 'course.png',
    title: 'Complete Python Bootcamp From Zero to Hero in Python ',
    price: '2400',
    tag: 'Python',
    lesson: '32 ',
    status: 'alert-warning text-warning',
  },
  {
    imageUrl: 'course.png',
    title: 'Complete Python Bootcamp From Zero to Hero in Python ',
    price: '40',
    tag: 'Desinger',
    lesson: '24 ',
    status: 'alert-danger text-danger',
  },
];


const classesList = [
  {
    imageUrl: 'user.png',
    title: 'Bootstrap',
    num: '32 Course',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'HTML',
    num: '54 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Jquery',
    num: '76 Course',
    bg: '#e5f4fb',
  },
  {
    imageUrl: 'user.png',
    title: 'SASS',
    num: '76 Course',
    bg: '#dcf4f8',
  },
  {
    imageUrl: 'user.png',
    title: 'React',
    num: '23 Course',
    bg: '#fcf1eb',
  },

  {
    imageUrl: 'user.png',
    title: 'JAVA',
    num: '78 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Python',
    num: '65 Course',
    bg: '#e5f4fb',
  },
  {
    imageUrl: 'user.png',
    title: 'MongoDB',
    num: '11 Course',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Bootstrap',
    num: '32 Course',
    bg: '#fcf1eb',
  },
  {
    imageUrl: 'user.png',
    title: 'Bootstrap',
    num: '32 Course',
    bg: '#fff9eb',
  },
];

const memberList = [
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Hendrix Stamp ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'Mohannad Zitoun ',
    email: 'support@gmail.com',
    bgimage: 'course.png',
  },
  {
    imageUrl: 'user.png',
    name: 'John Steere ',
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
  
  const userString = sessionStorage.getItem("rexkod_user");
  const user = JSON.parse(userString);
  const classId = user.student.class_id;

    useEffect(() => {
      getSubjects();
    },[])

    const [subjects, setSubjects] = useState([]);
    function getSubjects() {
      let result = fetch(baseUrl+'api/get_subjects/'+ classId).then(function (result) {
          result.json().then(function (jsonbody) {
              console.warn(jsonbody);
              setSubjects(jsonbody);
          })
      });
  }
    return (
      <>
        <div className="main-wrapper">

          <div className="main-content menu-active">
            <Appheader />

            <div className="middle-sidebar-bottom theme-dark-bg">
              <div className="middle-sidebar-left">
                <div className="row">
                  <div className="col-lg-12 mb-3">
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
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h2 className="fw-400 font-lg">
                      Explore <b>Categories</b>
                      <a href="/" className="float-right">
                        <i className="feather-edit text-grey-500 font-xs"></i>
                      </a>
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
                            <a href="/" className="btn-round-xl bg-white">
                              <img
                                src={`assets/images/${value.imageUrl}`}
                                alt="icon"
                                className="p-2 w-100"
                              />
                            </a>
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
                      <a href="/" className="float-right">
                        <i className="feather-edit text-grey-500 font-xs"></i>
                      </a>
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
                                src={baseUrl+value.subject_image}
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
                            {/* <span className="font-xss fw-700 pl-3 pr-3 ls-2 lh-32 d-inline-block text-success float-right">
                              <span className="font-xsssss">$</span>
                              {value.price}
                            </span> */}
                            <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
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
                                    className="w30 d-inline-block"
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
                      ))}
                    </Slider>
                  </div>
                  <div className="col-lg-12 pt-0 mb-3">
                    <h2 className="fw-400 font-lg d-block">
                      Latest <b> Classes</b>
                      <a href="/" className="float-right">
                        <i className="feather-edit text-grey-500 font-xs"></i>
                      </a>
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
                              <span className="font-xsssss">$</span>
                              {value.price}
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
                            <ul className="memberlist mt-3 mb-2 ml-0 d-block">
                              <li>
                                <a href="/">
                                  <img
                                    src="assets/images/user.png"
                                    alt="avater"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/">
                                  <img
                                    src="assets/images/user.png"
                                    alt="avater"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/">
                                  <img
                                    src="assets/images/user.png"
                                    alt="avater"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/">
                                  <img
                                    src="assets/images/user.png"
                                    alt="avater"
                                    className="w30 d-inline-block"
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
                      ))}
                    </Slider>
                  </div>
                  <div className="col-lg-12 pt-0 mb-3">
                    <h2 className="fw-400 font-lg d-block">
                      Live <b> Classes</b>
                      <a href="/" className="float-right">
                        <i className="feather-edit text-grey-500 font-xs"></i>
                      </a>
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
              <div className="middle-sidebar-right scroll-bar">
                <div className="middle-sidebar-right-content">
                  <Profile />
                  <Myclass />
                  <Subscribe />
                </div>
              </div>
            </div>
          </div>

          <Appfooter />
        </div>
      </>
    );
  }


export default Home;
