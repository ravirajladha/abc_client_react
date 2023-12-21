import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function AllQuestions() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [questions, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  function getClasses() {
    setLoading(true);
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        setClasses(jsonbody);
        setLoading(false);
      });
    });
  }

  function getSubjects() {
    setLoading(true);
    let result = fetch(
      baseUrl + "api/get_subjects_by_class/" + selectedClass
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        setSubjects(jsonbody);
        setLoading(false);
      });
    });
  }

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
  };

  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };

  const filterQuestions = (e) => {
    setLoading(true);
    fetch(baseUrl + "api/get_questions_by_subject/" + selectedSubject)
      .then(function (result) {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then(function (jsonbody) {
        setQuestion(jsonbody);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getSubjects();
    }
  }, [selectedClass]);

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div className="">
                <h2 className="fw-400 font-lg d-block">
                  Search <b> Questions</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/tests/create_question"}
                  className="px-3 py-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  ADD QUESTIONS
                </Link>
                <BackButton />
              </div>
            </div>

            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <div className="row mb-6">
                  <div className="col-lg-5">
                    <label className="mont-font fw-600 font-xsss">
                      Select Class
                    </label>
                    <br />
                    <Dropdown
                      options={classes}
                      column_name="class"
                      value={selectedClass}
                      onChange={handleClassChange}
                    />
                  </div>
                  <div className="col-lg-5">
                    <label className="mont-font fw-600 font-xsss">
                      Select Subject
                    </label>
                    <br />
                    <Dropdown
                      options={subjects}
                      column_name="subject_name"
                      value={selectedSubject}
                      onChange={handleSubjectChange}
                    />
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss"></label>
                      <br />
                      <button
                        type="button"
                        className="mt-1 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                        onClick={filterQuestions}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : questions && questions.length > 0 ? (
              questions.map((question, index) => (
                <div className="col-xl-6 col-lg-6 col-md-6" key={index}>
                  <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-2">
                    <div className="card-body p-4 w-100 border-0 rounded-lg">
                      <h4 class="fw-600 font-xss mt-4">
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
                          question.answer === "option1" ? "text-success" : ""
                        }`}
                      >
                        A. {question.option1}
                      </p>
                      <p
                        className={`fw-500 font-xsss mt-3 ${
                          question.answer === "option2" ? "text-success" : ""
                        }`}
                      >
                        A. {question.option2}
                      </p>
                      <p
                        className={`fw-500 font-xsss mt-3 ${
                          question.answer === "option3" ? "text-success" : ""
                        }`}
                      >
                        A. {question.option3}
                      </p>
                      <p
                        className={`fw-500 font-xsss mt-3 ${
                          question.answer === "option4" ? "text-success" : ""
                        }`}
                      >
                        A. {question.option4}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="questions" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllQuestions;
