import React, { useState, useEffect, useContext } from "react";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";

const Subjects = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;

  const classId = user.student.class_id;
  const studentId = user.student.auth_id;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubjects()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    fetchUserTestResults();
  }, []);

  function getSubjects() {
    return fetch(
      baseUrl + "api/get_subjects/" + classId + "/" + studentId
    ).then(function (result) {
      return result.json().then(function (jsonBody) {
        console.log(jsonBody);
        setSubjects(jsonBody);
      });
    });
  }

  // Fetch test details and results for the user to show the term scores
  const [userTestResults, setUserTestResults] = useState([]);
  const fetchUserTestResults = async () => {
    try {
      const response = await fetch(
        baseUrl + "api/get_student_test_results/" + userId
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user test results");
      }
      const data = await response.json();
      setUserTestResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user test results:", error);
    }
  };

  const getTermScore = (subjectId, term) => {
    const subjectResult = userTestResults.find(
      (result) => result.subject_id === subjectId && result.term === term
    );
    if (subjectResult) {
      return `${subjectResult.score}`;
    }
    return "N/A";
  };

  const getTestIdForTerm = (subjectId, term) => {
    const result = userTestResults.find(
      (result) => result.subject_id === subjectId && result.term === term
    );
    return result ? result.test_id : null;
  };

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  const userId = user.user.id;

  return (
    <>
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
            {loading ? (
              <Loader />
            ) : subjects.length > 0 ? (
              <div className="row">
                {subjects.map((value, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                      <div className="d-flex justify-content-between ">
                        <div>
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
                        </div>
                        <div>
                          <div>
                            {[1, 2, 3].map((term) => {
                              const testId = getTestIdForTerm(value.id, term);
                              const isLinkDisabled = testId === null;
                              return (
                                <div key={term}>
                                  <Link
                                    to={
                                      isLinkDisabled
                                        ? "#"
                                        : `/subjects/test_details/${testId}`
                                    }
                                    style={
                                      isLinkDisabled
                                        ? {
                                            pointerEvents: "none",
                                            cursor: "not-allowed",
                                          }
                                        : {}
                                    }
                                  >
                                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-dark mb-1 mr-1">
                                      {`TERM${term}`}
                                    </span>
                                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-dark">
                                      Score: {getTermScore(value.id, term)}
                                    </span>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <Link
                            to={"/subject_stream/" + value.id}
                            className="px-2 py-1 mt-4 mr-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                          >
                            LEARN
                          </Link>
                        </div>
                        <div>
                          <Link
                            to={
                              value.latest_test_id
                                ? `/subject_stream/take_test/${value.id}/${value.latest_test_id}`
                                : "#"
                            }
                            className={`px-2 py-1 mt-4 d-inline-block fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3  ${
                              value.latest_test_id
                                ? "bg-current text-white"
                                : "d-none "
                            }`}
                            style={
                              value.latest_test_id
                                ? {}
                                : {
                                    pointerEvents: "none",
                                    cursor: "not-allowed",
                                  }
                            }
                          >
                            {value.latest_test_id &&
                              (value.latest_term === 1
                                ? "Term test 1"
                                : value.latest_term === 2
                                ? "Term test 2"
                                : "Term test 3")}
                          </Link>
                          <Link
                            to={"/subject/" + value.id + "/results"}
                            className={`px-2 py-1 ml-2 mt-4 d-inline-block fw-700 lh-30 bg-current text-white rounded-lg w100 text-center font-xsssss text-uppercase ls-3 ${
                              value.results ? "" : "d-none "
                            }`}
                          >
                            Results
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoContent contentName="subjects" />
            )}
          </div>
        </div>
        <StudentSidebar />
      </div>
    </>
  );
};

export default Subjects;
