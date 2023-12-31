import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton.jsx";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import { useParams } from "react-router-dom";

function Tests() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { subject_id } = useParams();

  function getTests() {
    let result = fetch(baseUrl + "api/get_assessment_subject_wise/"+subject_id).then(function (result) {
      result.json().then(function (jsonbody) {
        setTests(jsonbody);
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    getTests();
  }, []);

  return (
    <>
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
            {loading ? (
              <Loader />
            ) : tests && tests.length > 0 ? (
              tests.map((test, index) => (
                <div className="col-lg-3 col-md-6 col-12 col-sm-6" key={index}>
                  <div className="item">
                    <div className="card mb-4 w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center d-flex align-items-center justify-content-center">
                      {/* <Link
                        to={`/tests/test/${test.id}/edit`}
                        className="position-absolute right-0 mr-4 top-0 mt-2"
                      >
                        <i className="ti-pencil-alt text-grey-500 font-xsss"></i>
                      </Link> */}
                      <Link
                        to=""
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                      >
                        <img
                          src='/assessment.png'
                          alt="test"
                          className="p-1"
                        />
                      </Link>
                      <div className="card-body pt-0 text-center">
                        {/* <span
              className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-danger d-inline-block text-danger mr-1">
              {test.subject.subject_name}
            </span> */}
                        <h4 className="fw-700 font-xss mt-3 lh-28 mt-0">
                          <a
                            href="default_course_details"
                            className="text-dark text-grey-900"
                          >
                            {test.name}
                          </a>
                        </h4>

                        <div className="text-center mt-2">
                          <Link
                            to={`/assessments/assessment_details/${test.id}`}
                            className="px-3 py-1 me-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                          >
                            DETAILS
                          </Link>
                          {/* <Link
                            to={`/tests/test_results/${test.id}`}
                            className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                          >
                            RESULTS
                          </Link> */}
                          <Link
                            to={`/tests/${test.class_id}/results1`}
                            className="px-3 py-1 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss bg-current"
                          >
                            Overall Results
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="tests" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tests;
