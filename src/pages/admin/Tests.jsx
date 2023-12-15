import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function Tests() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getTests();
  }, []);

  const [tests, setTests] = useState([]);
  function getTests() {
    let result = fetch(baseUrl + "api/get_tests").then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setTests(jsonbody);
      });
    });
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
                      All <b> Tests</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to={"/tests/all_questions"}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ALL QUESTIONS
                    </Link>
                    <Link
                      to={"/tests/create_test"}
                      className="p-2 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      CREATE TEST
                    </Link>
                    <BackButton />
                  </div>
                </div>
                {tests
                  ? tests &&
                    tests.map((test, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-12 col-sm-6"
                        key={index}
                      >
                        <div className="item">
                          <div className="card mb-4 w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center d-flex align-items-center justify-content-center">
                            <Link
                              to=""
                              className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                            >
                              <img
                                src={baseUrl + test.image}
                                alt="test"
                                className="p-1"
                              />
                            </Link>
                            <div className="card-body pt-0 text-center">
                              {/* <span
                                                                className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-danger d-inline-block text-danger mr-1">{test.subject.subject_name}</span> */}
                              <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                                <a
                                  href="default_course_details"
                                  className="text-dark text-grey-900"
                                >
                                  {test.title}
                                </a>
                              </h4>

                              <div className="text-center mt-2">
                                <Link
                                  to={"/tests/test_details/" + test.id}
                                  className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current me-2"
                                >
                                  DETAILS
                                </Link>
                                <Link
                                  to={"/tests/test_results/" + test.id}
                                  className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                                >
                                  RESULTS
                                </Link>
                                <Link
                             to={`/tests/${test.class_id}/results1`}
                            className="px-2 py-1 mt-2 fw-500 d-inline-block text-white fw-300 lh-10 rounded-lg w100 text-center font-xssss ls-3 bg-current"
                          >
                           Overall Results
                          </Link>
                              </div>
                            </div>
                          </div>
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

export default Tests;
