import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import { useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function SingleAssessmentDetails() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [assessmentDetails, setAssessmentDetails] = useState([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const { assessmentId } = useParams();

  const getAssessmentDetails = (e) => {
    let result = fetch(
      baseUrl + "api/get_assessment_details/" + assessmentId
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        console.warn(jsonbody.assessment.class.class);
        setAssessmentDetails(jsonbody.assessment);
        setAssessmentQuestions(jsonbody.assessment_questions);
      });
    });
  };

  useEffect(() => {
    getAssessmentDetails();
  }, []);

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
                      Assessment <b> Details</b>
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
                          src={baseUrl + assessmentDetails.image}
                          alt="image"
                          className="w-50"
                          style={{ height: "auto" }}
                        />
                      </div>
                      {assessmentDetails && assessmentDetails.class ? (
                        <div className="col-lg-4">
                          <h4 className="fw-700 font-xss mt-4">
                            Class:{" "}
                            <span className="fw-500">
                              {assessmentDetails.class.class}
                            </span>
                          </h4>
                          <h4 className="fw-700 font-xss mt-4">
                            Subject:{" "}
                            <span className="fw-500">
                              {assessmentDetails.subject.subject_name}
                            </span>
                          </h4>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="col-lg-4">
                        <h4 className="fw-700 font-xss mt-4">
                          Assessment Name:{" "}
                          <span className="fw-500">
                            {assessmentDetails.name}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                {assessmentQuestions
                  ? assessmentQuestions &&
                    assessmentQuestions.map((question, index) => (
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
                              A. {question.option2}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option3"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              A. {question.option3}
                            </p>
                            <p
                              className={`fw-500 font-xsss mt-3 ${
                                question.answer === "option4"
                                  ? "text-success"
                                  : ""
                              }`}
                            >
                              A. {question.option4}
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

export default SingleAssessmentDetails;
