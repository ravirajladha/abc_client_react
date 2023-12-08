import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function Assessments() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState([]);

  function getSubjects() {
    return fetch(baseUrl + "api/get-classes-and-subjects")
      .then(function (result) {
        return result.json();
      })
      .then(function (res) {
        setData(res);
      })
      .catch(function (error) {
        console.error("Error fetching subjects:", error);
      });
  }

  //filter to show classses which have subjects
  const classesWithSubjects = data.filter(
    (classItem) => classItem.subjects.length > 0
  );

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="custom-middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      <b> Assessments</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to={"/assessments/create_assessments"}
                      className="px-3 py-2 me-2  d-inline-block text-white fw-700 lh-30 rounded-lg uppercase text-center font-xsssss ls-3 bg-current"
                    >
                      Create Assessments
                    </Link>
                    <BackButton />
                  </div>
                </div>

                {classesWithSubjects
                  ? classesWithSubjects.map((classItem, index) => (
                      <div key={classItem.id}>
                        <h2 className="fw-400 font-lg d-block mt-2 mb-4 capitalize fw-bolder">
                          {classItem.class}
                        </h2>
                        <div className="row">
                          {classItem.subjects.map((subject) => (
                            <div
                              className="col-xl-4 col-lg-6 col-md-6"
                              key={subject.id}
                            >
                              <div className="card mb-4 w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center d-flex align-items-center justify-content-center">
                                <Link
                                  to="#"
                                  className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                                >
                                  <img
                                    src={baseUrl + subject.subject_image}
                                    alt="icon"
                                    className="p-1"
                                  />
                                </Link>
                                <h4 className="fw-700 font-xs mt-4 capitalize">
                                  {subject.subject_name}
                                </h4>
                                <div className="clearfix"></div>
                                <div className="mt-2">
                                  <span className="font-xsssss fw-700 px-3 py-2 text-uppercase rounded-lg alert-success d-inline-block text-success mb-1 mr-1">
                                    Full Time
                                  </span>

                                  <span className="font-xsssss fw-700 px-3 py-2 text-uppercase rounded-lg alert-info d-inline-block text-info mb-1">
                                    30 Min
                                  </span>
                                  <div className="clearfix mt-3"></div>
                                </div>

                                <div className="mt-2">
                                  <Link
                                    to={"/assessments/" + subject.id + "/list"}
                                    className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                  >
                                    ALL ASSESSMENTS
                                  </Link>
                                  <Link
                                    to={
                                      "/assessments/" + subject.id + "/results"
                                    }
                                    className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                  >
                                   OVERALL RESULTS
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default Assessments;
