import React, { useState, useEffect } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";

import { Link } from "react-router-dom";

function Subjects() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const userString = localStorage.getItem("rexkod_user");
  const user = JSON.parse(userString);
  const classId = user.student.class_id;
  const studentId = user.student.auth_id;

  useEffect(() => {
    getSubjects();
  }, []);

  const [subjects, setSubjects] = useState([]);

  function getSubjects() {
    fetch(baseUrl + "api/get_subjects/" + classId + "/" + studentId).then(
      function (result) {
        result.json().then(function (jsonBody) {
          // console.warn(jsonBody);
          console.log(jsonBody);
          setSubjects(jsonBody);
        });
      }
    );
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      <b> Subjects</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                {
                subjects.map((value, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                      <Link to={"#"} className="position-absolute right-0 mr-4 top-0 mt-3" >
                        <i className="ti-more text-grey-500 font-xs"></i>
                      </Link>
                      <Link
                        to={"/subject_stream/" + value.id}
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                      >
                        <img
                          src={baseUrl + value.subject_image}
                          alt="icon"
                          className="p-1 w-100"
                        />
                      </Link>
                      <h4 className="fw-700 font-xs my-2 text-capitalize">
                        {value.subject_name}
                      </h4>
                      <div className="clearfix"></div>
                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mr-1">
                        FULL TIME
                      </span>
                      <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info">
                        30 MIN
                      </span>

                      <div className="clearfix"></div>
                      <Link
                        to={"/subject_stream/" + value.id}
                        className="px-2 py-1 mt-4 mr-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current" >
                        LEARN
                      </Link>
                      <Link 
                        to={ value.latest_test_id ? `/subject_stream/take_test/${value.id}/${value.latest_test_id}` : "#" }
                        className={`px-2 py-1 mt-4 d-inline-block fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3  ${value.latest_test_id ? "bg-current text-white" : "d-none " }`}
                        style={ value.latest_test_id ? {} : { pointerEvents: "none", cursor: "not-allowed" } }
                      >
                        {value.latest_test_id ? "TAKE TEST" : "Coming Soon"}
                      </Link>
                      <Link to={"/subject/" + value.id + "/results"}
                        className={`px-2 py-1 ml-2 mt-4 d-inline-block fw-700 lh-30 bg-current text-white rounded-lg w100 text-center font-xsssss text-uppercase ls-3 ${value.results ? "" : "d-none " }`} >
                        Results
                      </Link>
                    </div>
                  </div>
                ))}
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

export default Subjects;
