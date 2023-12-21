import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import "react-toastify/dist/ReactToastify.css";
import DashboardItem from "../../components/common/DashboardItem";
import Loader from "../../components/common/Loader.jsx";

function SchoolHome() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userDetails = useContext(AuthContext).user;
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = () => {
      if (userDetails) {
        fetch(baseUrl + "api/get-school-dashboard/" + userDetails.user.id)
          .then(function (result) {
            return result.json();
          })
          .then(function (res) {
            setDashboardInfo(res);
            setLoading(false);
          });
      }
    };

    if (userDetails) {
      getDashboard();
    } else {
      setLoading(false);
    }
  }, [userDetails, baseUrl]);

  if (!userDetails) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  return (
    <>
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
                  dashboardItemIcon="package"
                  dashboardInfo={dashboardInfo.class}
                  dashboardItemName="Classes"
                ></DashboardItem>

                <DashboardItem
                  dashboardItemIcon="user"
                  dashboardInfo={dashboardInfo.students}
                  dashboardItemName="Students"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="user"
                  dashboardInfo={dashboardInfo.teachers}
                  dashboardItemName="Teachers"
                ></DashboardItem>
                <DashboardItem
                  dashboardItemIcon="file-text"
                  dashboardInfo={dashboardInfo.admissions}
                  dashboardItemName="Admissions"
                ></DashboardItem>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolHome;
