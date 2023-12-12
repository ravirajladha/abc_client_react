import React from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";

const iconlList = [
  {
    name: "325",
    count: "Courses complete",
    status: "warning",
    icon: "feather-hard-drive",
    des: "20% Increase from Last Week",
  },
  {
    name: "43",
    count: "Active Courses",
    status: "success",
    icon: "feather-box",
    des: "20% Increase from Last Week",
  },
  {
    name: "5444",
    count: "Enrolled Students",
    status: "info",
    icon: "feather-award",
    des: "20% Increase from Last Week",
  },
  {
    name: "354",
    count: "Activity Points",
    status: "secondary",
    icon: "feather-flag",
    des: "20% Increase from Last Week",
  },
];

function AdminHome() {
  const userDetails = useContext(AuthContext).user;
  if (!userDetails) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
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
                  <div className="card w-100 bg-lightblue shadow-xs p-lg-5 p-4 border-0 rounded-lg d-block float-left">
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
                      ></span>
                    </h1>

                    <img
                      src="/avatar.png"
                      alt="icon"
                      className="w125 right-15 top-0 position-absolute d-none d-xl-block mt-3"
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Schools
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-layers bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Classes
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-package bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Subjects
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-command bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Videos
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-tv bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Assessments
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-help-circle bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Tests
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-help-circle bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            eLabs
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-code bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            eBooks
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-book bg-current"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            4563
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Mini Projects
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-codepen bg-current"></i>
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

export default AdminHome;
