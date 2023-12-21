import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../lib/AuthContext.js";
import "react-toastify/dist/ReactToastify.css";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import DashboardItem from "../../components/common/DashboardItem";

function TeacherHome() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userDetails = useContext(AuthContext).user;
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [teacherClassInfo, setTeacherClassInfo] = useState([]);

  useEffect(() => {
    const getDashboard = () => {
      if (userDetails) {
        fetch(
          baseUrl + "api/get-trainer-dashboard/" + userDetails.user.id
        ).then(function (result) {
          result.json().then(function (res) {
            console.warn("dashboard info", res);
            setDashboardInfo(res);
            setTeacherClassInfo(res.teacher_subjects);
          });
        });
      }
    };
    if (userDetails) {
      getDashboard();
    } else {
      return;
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
            <div className="row">
              <DashboardItem
                dashboardItemIcon="package"
                dashboardInfo={dashboardInfo.teacher_classes_count}
                dashboardItemName="My Classes"
              ></DashboardItem>

              <DashboardItem
                dashboardItemIcon="book"
                dashboardInfo={dashboardInfo.teacher_subject_count}
                dashboardItemName="My Subjects"
              ></DashboardItem>
              <DashboardItem
                dashboardItemIcon="user"
                dashboardInfo={dashboardInfo.teacher_students_count}
                dashboardItemName="My Students"
              ></DashboardItem>
            </div>
            {teacherClassInfo.map((classInfo) => (
              <div className="row" key={classInfo.class_id}>
                <div className="col-sm-3">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {classInfo ? classInfo.class_name : "-"}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Class
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i
                            className={`psor text-white btn-round-md font-xs feather-package bg-current`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {classInfo ? classInfo.subject_count : "-"}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Subjects in {classInfo ? classInfo.class_name : "-"}
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i
                            className={`psor text-white btn-round-md font-xs feather-book bg-current`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card w-100 p-1 border-0 mt-4 rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-7">
                          <h2 className="text-grey-900 fw-700 display1-size mt-2 mb-2 ls-3 lh-1">
                            {classInfo ? classInfo.student_count : "-"}
                          </h2>
                          <h4 className="fw-700 text-grey-500 font-xsss ls-3 text-uppercase mb-0 mt-0">
                            Students in {classInfo ? classInfo.class_name : "-"}
                          </h4>
                        </div>
                        <div className="col-5 text-end">
                          <i
                            className={`psor text-white btn-round-md font-xs feather-user bg-current`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherHome;
