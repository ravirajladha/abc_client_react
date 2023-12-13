import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "../../lib/AuthContext.js";
import Dropdown from "../../components/inputs/Dropdown";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import ApexChart from "../../components/common/ApexChart.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ParentHome() {
  const [loading, setLoading] = useState(false);
  const [parentCode, setParentCode] = useState("-");
  const [childrenDropdown, setChildrenDropdown] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const dynamicSeries = [30, 40];

  const userDetails = useContext(AuthContext).user;

  const getParentCode = useCallback(async () => {
    try {
      const userId = userDetails.user.id;
      const response = await axios.get(
        `${baseUrl}api/get-parent-code?user_id=${userId}`
      );

      if (response.data.success) {
        // console.log("Parent code:", response.data.data.parent_code);
        setParentCode(response.data.data.parent_code);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [userDetails]);

  const getChildren = useCallback(async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-children/${userDetails.user.id}`
      );
      const res = await response.json();
      const children = res.data.map((child) => ({
        id: child.id,
        child: child.name,
      }));
      setChildrenDropdown(children);
    } catch (error) {
      console.error("Error fetching student:", error.message);
    }
  }, [userDetails]);

  const getStudentItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        baseUrl + "api/get-student-dashboard/" + selectedStudent
      );
      const student = await response.data;

      setStudentInfo(student);
    } catch (error) {
      console.error("Error fetching student dashboard:", error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (userDetails) {
      getParentCode();
      getChildren();
      if (selectedStudent) {
        getStudentItems();
      }
    } else {
      return;
    }
  }, [
    userDetails,
    getParentCode,
    getChildren,
    selectedStudent,
    getStudentItems,
  ]);

  const handleDropdownSelect = (e) => {
    setSelectedStudent(e.target.value);
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="custom-middle-sidebar-left">
              {/* Intro Message */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 bg-lightblue p-lg-5 p-4 border-0 rounded-lg d-block float-left">
                    <h1 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                      <span
                        className="font-xssss fw-600 text-grey-500 d-block mb-2"
                        style={{ fontSize: "20px" }}
                      >
                        Welcome back!
                      </span>
                      Hi, {userDetails.user.name}
                      <span
                        className="font-xsss fw-600 text-grey-700 d-block mt-2"
                        style={{ fontSize: "20px" }}
                      >
                        Parent Code: {parentCode}
                      </span>
                    </h1>

                    <img
                      src="/avatar.png"
                      alt="icon"
                      className="w125 right-15 top-0 position-absolute d-none d-xl-block mt-3"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div class="form-group mt-lg-4 py-2 rounded-lg ">
                    <div class="row">
                      <div class="col-md-3">
                        <Dropdown
                          onChange={handleDropdownSelect}
                          options={childrenDropdown}
                          value={selectedStudent}
                          placeholder="Select a child"
                          column_name="child"
                          className="form-select"
                        />
                      </div>
                      {selectedStudent && (
                        <div class="col-md-9 d-flex justify-end ">
                          <Link
                            to={"/student/" + selectedStudent}
                            class="px-4 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase "
                          >
                            {studentInfo.name}
                            {"'s Profile"}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedStudent && studentInfo ? (
                <>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                        <div className="card-body p-4">
                          <div className="row">
                            <div className="col-4">
                              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentInfo.last_login
                                  ? studentInfo.last_login
                                  : "0"}
                              </h2>
                              <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                                Last Login
                              </h4>
                            </div>
                            <div className="col-4">
                              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentInfo.total_watch_time
                                  ? studentInfo.total_watch_time
                                  : "0"}
                              </h2>
                              <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                                Total Watch Time
                              </h4>
                            </div>
                            <div className="col-4">
                              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentInfo.avg_assessment_score
                                  ? studentInfo.avg_assessment_score
                                  : "0"}
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
                                {studentInfo.first_term_results
                                  ? studentInfo.first_term_results + "/1000"
                                  : "0"}
                              </h2>
                              <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                                Term 1 Score
                              </h4>
                            </div>
                            <div className="col-4">
                              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentInfo.second_term_results
                                  ? studentInfo.second_term_results + "/1000"
                                  : "0"}
                              </h2>
                              <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                                Term 2 Score
                              </h4>
                            </div>
                            <div className="col-4">
                              <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                                {studentInfo.third_term_results
                                  ? studentInfo.third_term_results + "/1000"
                                  : "0"}
                              </h2>
                              <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                                Term 3 Score
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
                </>
              ) : (
                <>{loading && <Spinner animation="border" />}</>
              )}
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default ParentHome;
