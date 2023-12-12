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
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b> Assesments</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to={"/assessments/create_question"}
                      className="px-3 py-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ADD QUESTIONS
                    </Link>
                    <Link
                      to={"/assessments/all_questions"}
                      className="px-3 py-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ALL QUESTIONS
                    </Link>
                    <Link
                      to={"/assessments/create_assessments"}
                      className="px-3 py-2 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg  uppercase text-center font-xsssss ls-3 bg-current"
                    >
                      Create Assesments
                    </Link>
                    <BackButton />
                  </div>
                </div>
                <div className="row my-2">
                  {classesWithSubjects
                    ? classesWithSubjects.map((classItem, index) => (
                        <div className="row" key={classItem.id}>
                          {classItem.subjects.map((subject) => (
                            <div
                              className="col-xl-4 col-lg-6 col-md-6"
                              key={subject.id}
                            >
                              <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                                <a
                                  href="#"
                                  className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                                >
                                  <img
                                    src={baseUrl + subject.subject_image}
                                    alt="icon"
                                    className="p-1"
                                  />
                                </a>
                                <h4 className="fw-700 font-xs mt-4 capitalize mb-2">
                                  {subject.subject_name}
                                </h4>
                                <div className="clearfix"></div>
                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                  Full Time
                                </span>

                                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                                  30 Min
                                </span>
                                <div className="clearfix"></div>

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
                      ))
                    : ""}
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

export default Assessments;
