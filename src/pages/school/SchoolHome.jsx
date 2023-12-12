import React from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";

function SchoolHome() {
  const userDetails = useContext(AuthContext).user;
  if (!userDetails) {
    // Handle the case when there is no user. You might want to redirect
    // to a login page or return null or some placeholder content.
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
                            Class
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-box bg-current"></i>
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
                            Students
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-user bg-current"></i>
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
                            Teachers
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-user bg-current"></i>
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
                            Admissions
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i className="psor text-white btn-round-md font-xs feather-file-text bg-current"></i>
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

export default SchoolHome;
