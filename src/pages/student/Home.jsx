import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";

import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";

import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import ApexChart from "../../components/common/ApexChart.jsx";

const dynamicSeries = [30, 40];
const dynamicColors = ["#FEB019", "#FF4560"];

const dynamicOptions = {
  chart: {
    type: "donut",
  },
  labels: ["Started Videos", "Pending Videos"],
};

const liveClassesList = [
  {
    imageUrl: "english.png",
    name: "English ",
    email: "Doubt Clearing Session",
    bgImage: "subject/english.jpg",
  },
  {
    imageUrl: "Maths.png",
    name: "Mathermatics ",
    email: "Doubt Clearing Session",

    bgImage: "subject/Maths.png",
  },
];

function Home() {
  const liveClassSlider = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getStudentRanks();
    } else {
      return;
    }
  }, [user, getStudentRanks]);

  const [studentClassRank, setStudentClassRank] = useState("-");

  async function getStudentRanks() {
    try {
      const response = await fetch(
        baseUrl + "api/student/" + user.student.auth_id
      );
      const student = await response.json();
      setStudentClassRank(student.data.class_rank);
    } catch (error) {
      console.error("There was a problem fetching student details:", error);
    }
  }

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              {/* Intro Message */}
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
                      Hi, {user.user.name}
                    </h1>

                    <img
                      src="/avatar.png"
                      alt="icon"
                      className="w125 right-15 top-0 position-absolute d-none d-xl-block mt-3"
                    />
                  </div>
                </div>
              </div>

              {/* Student Analytics */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Last Login
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Total Watch Time
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Average Assessment Score
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-1">
                <div className="col-lg-12">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 1
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 2
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 3
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-4">
                          <ApexChart
                            seriesData={dynamicSeries}
                            colorsData={["#FEB019", "#FF4560"]}
                          />
                          <h4 className="fw-700 text-end text-grey-600 font-xssss ls-3 mr-4 text-uppercase mb-0 mt-0">
                            English
                          </h4>
                        </div>
                        <div className="col-4">
                          <ApexChart
                            seriesData={dynamicSeries}
                            colorsData={["#FEB019", "#FF4560"]}
                          />
                          <h4 className="fw-700 text-end text-grey-600 font-xssss ls-3 mr-4 text-uppercase mb-0 mt-0">
                            Maths
                          </h4>
                        </div>
                        <div className="col-4">
                          <ApexChart
                            seriesData={dynamicSeries}
                            colorsData={["#FEB019", "#FF4560"]}
                          />
                          <h4 className="fw-700 text-end text-grey-600 font-xssss ls-3 mr-4 text-uppercase mb-0 mt-0">
                            Science
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-xl-4 col-lg-12 ">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col">
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {studentClassRank && studentClassRank}
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
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+25 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4
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
                          <h4 className="fw-700 text-success font-xssss mt-0 mb-0 ">+45 %</h4>
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            2
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Subject Rank
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Live Classess */}
              <div className="row mt-2">
                <h2 className="fw-400 font-lg d-block my-2">
                  Live <b> Classes</b>
                </h2>
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
