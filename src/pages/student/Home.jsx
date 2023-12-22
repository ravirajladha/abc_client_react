import React, { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import StudentSidebar from "../../components/includes/StudentSidebar";
import Loader from "../../components/common/Loader.jsx";

import { AuthContext } from "../../lib/AuthContext.js";
import { useContext } from "react";
import ApexChart from "../../components/common/ApexChart.jsx";

const dynamicSeries = [30, 40];

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

const liveClassSlider = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 300,
  centerMode: false,
  variableWidth: true,
};

function Home() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { user } = useContext(AuthContext);

  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [isLoadingStudentAnalytics, setIsLoadingStudentAnalytics] =
    useState(true);
  const [isLoadingVideoStats, setIsLoadingVideoStats] = useState(true);

  const getStudentDashboard = useCallback(async () => {
    try {
      const response = await fetch(
        baseUrl + "api/get-student-dashboard/" + user.student.auth_id
      );
      const student = await response.json();
      setDashboardInfo(student);
      setIsLoadingStudentAnalytics(false);
      setIsLoadingVideoStats(false);
    } catch (error) {
      console.error("There was a problem fetching student details:", error);
      setIsLoadingStudentAnalytics(false);
      setIsLoadingVideoStats(false);
    }
  }, [user.student.auth_id, baseUrl]);

  useEffect(() => {
    if (user) {
      getStudentDashboard();
    } else {
      return;
    }
  }, [user, getStudentDashboard]);

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  return (
    <>
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
                    Welcome
                    {dashboardInfo?.last_login !== null ? (
                      <>{" back!"}</>
                    ) : (
                      <></>
                    )}
                  </span>
                  Hi, {user.user.name}
                </h1>

                <img
                  src="/avatar.png"
                  alt="icon"
                  className="w100 mt-4 right-15 top-0 position-absolute d-none d-xl-block mt-3"
                />
              </div>
            </div>
          </div>

          {/* Student Analytics */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                <div className="card-body p-4">
                  {isLoadingStudentAnalytics ? (
                    <div className="row mb-5">
                      <div className="col-12">
                        <Loader />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="row my-2">
                        <div className="col-4">
                          {dashboardInfo?.last_login !== null ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.last_login}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              -
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Last Login
                          </h4>
                        </div>
                        <div className="col-4">
                          {dashboardInfo?.total_watch_time !== null ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.total_watch_time}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              Watch history unavailable
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Total Watch Time
                          </h4>
                        </div>
                        <div className="col-4">
                          {dashboardInfo?.avg_assessment_score !== null ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.avg_assessment_score + "/100"}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              Score unavailable
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Average Assessment Score
                          </h4>
                        </div>
                      </div>
                      <div className="row my-4">
                        <div className="col-4">
                          {dashboardInfo?.first_term_results !== null ||
                          dashboardInfo?.first_term_total_marks !== 0 ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.first_term_results +
                                "/" +
                                dashboardInfo?.first_term_total_marks}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              Results unavailable
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 1 Score
                          </h4>
                        </div>
                        <div className="col-4">
                          {dashboardInfo?.second_term_results !== null ||
                          dashboardInfo?.second_term_total_marks !== 0 ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.second_term_results +
                                "/" +
                                dashboardInfo?.second_term_total_marks}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              Results unavailable
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 2 Score
                          </h4>
                        </div>
                        <div className="col-4">
                          {dashboardInfo?.third_term_results !== null ||
                          dashboardInfo?.third_term_total_marks !== 0 ? (
                            <h2 className="text-grey-900 fw-700 font-xxl mt-2 mb-2 ls-3 lh-1">
                              {dashboardInfo?.third_term_results +
                                "/" +
                                dashboardInfo?.third_term_total_marks}
                            </h2>
                          ) : (
                            <h2 className="text-grey-900 fw-600 font-xsss mt-4 mb-2 ls-3 lh-1">
                              Results unavailable
                            </h2>
                          )}
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 3 Score
                          </h4>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Video Stats */}
          {dashboardInfo?.video_stats !== null ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                  <div className="card-body p-sm-4">
                    {isLoadingVideoStats ? (
                      <div className="row mb-5">
                        <div className="col-12">
                          <Loader />
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        {dashboardInfo?.video_stats &&
                          dashboardInfo?.video_stats.map((item) => (
                            <div
                              className="col-lg-4 col-sm-6"
                              key="{item.subject_id}"
                            >
                              <ApexChart
                                seriesData={[
                                  item.started_video_count,
                                  item.total_video_count -  item.started_video_count,
                                ]}
                                colorsData={["#fec794", "#25d366"]}
                              />
                              <h4 className="fw-700 text-lg-end text-sm-center text-grey-600 font-xssss ls-5 text-uppercase mb-0 my-2">
                                {item.subject_name}
                              </h4>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* Live Classes */}
          {dashboardInfo?.video_stats !== null ? (
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
          ) : (
            <></>
          )}
        </div>
        <StudentSidebar />
      </div>
    </>
  );
}

export default Home;
