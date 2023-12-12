import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import { Link } from "react-router-dom";
import ApexChart from "../../components/common/ApexChart.jsx";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ParentHome() {
  const [parentCode, setParentCode] = useState("");
  const [children, setChildren] = useState([]);

  const dynamicSeries = [30, 40];

  const userDetails = useContext(AuthContext).user;
  const fetchUserDetails = async () => {
    try {
      if (!userDetails) {
        console.log("No user found. User might be logged out.");
        return;
      }

      const userId = userDetails.user.id;
      const response = await axios.get(
        `${baseUrl}api/getParentCode?user_id=${userId}`
      );

      if (response.data.success) {
        console.log("Parent code:", response.data.data.parent_code);
        setParentCode(response.data.data.parent_code);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getChildren = () => {
    fetch(baseUrl + `api/get_child/${userDetails.user.id}`)
      .then((result) => result.json())
      .then((res) => {
        console.warn(res);
        setChildren(res);
      })
      .catch((error) => {
        console.error("Error fetching messages for student:", error);
      });
  };

  useEffect(() => {
    fetchUserDetails();
    getChildren();
  }, [userDetails]);

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

              {/* <div className="row">
                <div className="col-lg-12">
                  <div class="form-group mt-lg-4 p-3 p-2 rounded-lg ">
                    {children
                      ? children.map((child, index) => (
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group icon-input mb-0">
                                <i class="ti-user font-xs text-grey-400"></i>
                                <select
                                  class="style1-select bg-transparent border-0 pl-5"
                                  key={index}
                                >
                                  <option value="Bootstrap">
                                    {child.name}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-9 d-flex justify-end ">
                              <Link
                                to={"/student/" + child.id}
                                class="px-4 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase "
                              >
                                View Selected
                                {"'s Profile"}
                              </Link>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            100
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Last Login
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            100
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Total Watch Time
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            100
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
                            100
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 1
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            100
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">
                            Term 2
                          </h4>
                        </div>
                        <div className="col-4">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            100
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
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default ParentHome;
