import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function TestResultDetails() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [testDetails, setTestDetails] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [testResult, setTestResult] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const { testId, studentId } = useParams();
  const getTestDetails = (e) => {
    fetch(baseUrl + "api/get-test-result-details/" + studentId + "/" + testId).then(function (
      result
    ) {
      result.json().then(function (json) {
        console.warn(json);
        setTestDetails(json.test);
        setTestQuestions(json.test_questions);
        setTestResult(json.test_result);
        const answers = json.test_result.user_answer.split(",");
        console.log(answers);
        setUserAnswer(answers);
      });
    });
  };
  useEffect(() => {
    getTestDetails();
  });
  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="w-100 border-0 d-flex rounded-lg justify-content-between">
                  <div className="">
                    <h2 className="fw-400 font-lg d-block">
                      Test <b> Details</b>{" "}
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <div className="row mb-6">
                      <div className="col-lg-4">
                        <img
                          src={baseUrl + testDetails.image}
                          alt="Test"
                          className="w-50"
                          style={{ height: "auto" }}
                        />
                      </div>
                      {testDetails && testDetails.classes ? (
                        <div className="col-lg-4">
                          <h4 className="fw-700 font-xss mt-4">
                            Class:{" "}
                            <span className="fw-500">
                              {testDetails.classes.class}
                            </span>
                          </h4>
                          <h4 className="fw-700 font-xss mt-4">
                            Subject:{" "}
                            <span className="fw-500">{testDetails.title}</span>
                          </h4>
                          <h4 className="fw-700 font-xss mt-4">
                            Term:
                            <span className="fw-500">
                              {testDetails.term === "1" && " Term 1"}
                              {testDetails.term === "2" && " Term 2"}
                              {testDetails.term === "3" && " Term 3"}
                              {/* Add more conditions here if you have more terms */}
                            </span>
                          </h4>
                          <h4 className="fw-700 font-xss mt-4">
                            Score:{" "}
                            <span className="fw-500">
                              {testResult && testResult.score}
                            </span>
                          </h4>
                          <h4 className="fw-700 font-xss mt-4">
                            Percentage:{" "}
                            <span className="fw-500">
                              {testResult && testResult.score_percentage}
                            </span>
                          </h4>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="col-lg-4">
                        <h4 className="fw-700 font-xss mt-4">
                          Test Name:{" "}
                          <span className="fw-500">{testDetails.title}</span>
                        </h4>
                        <h4 className="fw-700 font-xss mt-4">
                          Description:{" "}
                          <span className="fw-500">
                            {testDetails.description}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {testQuestions
                  ? testQuestions &&
                    testQuestions.map((question, index) => (
                      <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                        <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-2">
                          <div className="card-body p-4 w-100 border-0 rounded-lg">
                            <h4 className="fw-600 font-xss mt-4">
                              {`Q ${index + 1}. ${question.question}`}{" "}
                            </h4>
                            {question.question_code ? (
                              <pre className="text-wrap bg-grey p-2">
                                {question.question_code}
                              </pre>
                            ) : (
                              ""
                            )}
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option1"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              A. {question.option1}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option2"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              B. {question.option2}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option3"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              C. {question.option3}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option4"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              D. {question.option4}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                userAnswer[index] === question.answer
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              Your Answer:{" "}
                              {userAnswer[index] === "option1" &&
                                question.option1}
                              {userAnswer[index] === "option2" &&
                                question.option2}
                              {userAnswer[index] === "option3" &&
                                question.option3}
                              {userAnswer[index] === "option4" &&
                                question.option4}
                            </p>
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

export default TestResultDetails;
