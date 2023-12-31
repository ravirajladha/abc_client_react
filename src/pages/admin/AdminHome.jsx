import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../lib/AuthContext.js";

import DashboardItem from "../../components/common/DashboardItem";
import Loader from "../../components/common/Loader.jsx";

function AdminHome() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userDetails = useContext(AuthContext).user;
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = () => {
      if (userDetails) {
        axios
          .get(baseUrl + "api/get-admin-dashboard", {
            headers: {
              "Access-Control-Allow-Origin": "https://avatoms.kods.app",
            },
          })
          .then((response) => {
            setDashboardInfo(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching dashboard info:", error);
            setLoading(false);
          });
      }
    };
    if (userDetails) {
      getDashboard();
    } else {
      return;
    }
  },[]);

  if (!userDetails) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  return (
    <>
      {/* <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader /> */}

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

            {loading ? (
              <Loader />
            ) : (
              <>
                <DashboardItem
                  dashboardItemIcon="layers"
                  dashboardInfo={dashboardInfo.schools}
                  dashboardItemName="Schools"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="package"
                  dashboardInfo={dashboardInfo.class}
                  dashboardItemName="Classes"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="command"
                  dashboardInfo={dashboardInfo.subjects}
                  dashboardItemName="Subjects"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="tv"
                  dashboardInfo={dashboardInfo.videos}
                  dashboardItemName="Videos"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="help-circle"
                  dashboardInfo={dashboardInfo.assessments}
                  dashboardItemName="Assessments"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="help-circle"
                  dashboardInfo={dashboardInfo.tests}
                  dashboardItemName="Tests"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="code"
                  dashboardInfo={dashboardInfo.eLabs}
                  dashboardItemName="eLabs"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="book"
                  dashboardInfo={dashboardInfo.eBooks}
                  dashboardItemName="eBooks"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="codepen"
                  dashboardInfo={dashboardInfo.mini_projects}
                  dashboardItemName=" Mini Projects"
                ></DashboardItem>
              </>
            )}
          </div>
        </div>
      </div>
      {/* </div>
        <AppFooter />
      </div> */}
    </>
  );
}

export default AdminHome;
