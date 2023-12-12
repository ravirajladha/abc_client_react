import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../lib/AuthContext.js";
import Timer from "../../components/common/Timer.jsx";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";

function TakeTest() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { subject_id, test_id } = useParams();
  const user = useContext(AuthContext).user;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [testStartTime, setTestStartTime] = useState(null);
  const [testEndTime, setTestEndTime] = useState(null);
  const [testDuration, setTestDuration] = useState(null);
  const user_id = user.user.id;
  const currentQuestion = questions[currentQuestionIndex];
  const [activeOption, setActiveOption] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const hideStyle = {
    display: "none",
  };

  const get_tests = () => {
    fetch(baseUrl + "api/get_tests/" + test_id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setQuestions(resp);
      })
      .catch((err) => {
        console.error("Error fetching test questions:", err);
      });
  };

  const getTestDetails = () => {
    fetch(baseUrl + "api/get_test_duration/" + test_id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        setTestStartTime(resp.start_time);
        setTestEndTime(resp.end_time);
        setTestDuration(resp.duration);
      })
      .catch((err) => {
        console.error("Error fetching test details:", err);
      });
  };

  const updateElapsedTime = (elapsedTime) => {
    setTimeTaken(elapsedTime);
  };

  const submitForm = () => {
    // if (formIsSubmitting) {
    const formData = new FormData();
    formData.append("selectedAnswers", selectedAnswers);
    formData.append("selectedQuestionIds", selectedQuestionIds);
    formData.append("test_id", test_id);
    formData.append("user_id", user_id);
    formData.append("timeTaken", timeTaken);

    fetch(baseUrl + "api/test-submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        console.warn(resp);
        navigate(`/subject_stream/view_test_score/${subject_id}/${test_id}`);
      })
      .catch((err) => {
        console.error("Error submitting answers:", err);
        setFormIsSubmitting(false);
      });
    // }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedQuestionIds((prevSelectedQuestionIds) => [
      ...prevSelectedQuestionIds,
      currentQuestion.id,
    ]);
    setActiveOption(null);
    if (selectedOption) {
      setSelectedAnswers((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        selectedOption,
      ]);
    }
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedQuestionIds((prevSelectedQuestionIds) => [
        ...prevSelectedQuestionIds,
        currentQuestion.id,
      ]);
      setActiveOption(null);
      if (selectedOption) {
        setSelectedAnswers((prevSelectedAnswers) => [
          ...prevSelectedAnswers,
          selectedOption,
        ]);
      }
      setSelectedOption(null);
    }

    // setFormIsSubmitting(true);
    submitForm();
  };

  const endTest = () => {
    handleSubmit();
    navigate(`/subject_stream/view_test_score/${subject_id}/${test_id}`);
  };

  // useEffect(() => {
  //   // Add an event listener for the browser's back button
  //   window.onpopstate = function (event) {
  //     if (!formIsSubmitting) {
  //       // Submit the form if not already submitted
  //       handleSubmit();
  //       setFormIsSubmitting(true);
  //       console.log(formIsSubmitting);
  //       submitForm();
  //     }
  //     if (
  //       window.location.pathname !==
  //       `/subject_stream/view_test_score/${subject_id}/${test_id}`
  //     ) {
  //       // Redirect to the scores page when back is clicked
  //       navigate(`/subject_stream/view_test_score/${subject_id}/${test_id}`);
  //     }
  //   };

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.onpopstate = null;
  //   };
  // }, [formIsSubmitting, questions, subject_id, test_id]);

  // Fetch test details only once when the component mounts
  useEffect(() => {
    getTestDetails();
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    get_tests();
  }, []);

  useEffect(() => {
    const handleBackButtonClick = (event) => {
      event.preventDefault();
      console.log("back button clicked");
      if (!formIsSubmitting) {
        handleSubmit();
      }
    };

    window.addEventListener("popstate", handleBackButtonClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleBackButtonClick);
    };
  });

  // useEffect(() => {
  //   submitForm();
  // }, [
  //   formIsSubmitting,
  //   selectedAnswers,
  //   currentQuestionIndex,
  //   test_id,
  //   user_id,
  // ]);

  useEffect(() => {
    if (formIsSubmitting) {
      submitForm();
    }
  }, [formIsSubmitting]);

  if (!user) {
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <ToastContainer autoClose={3000} />
              {currentQuestion ? (
                <>
                  <div className="d-flex flex-column question-div">
                    {testDuration !== null ? (
                      <span className="timer-card text-end">
                        <Timer
                          initialDuration={testDuration}
                          onComplete={endTest}
                          onUpdate={updateElapsedTime}
                        />
                      </span>
                    ) : (
                      <p className="text-end">Loading test duration...</p>
                    )}
                    <h4 className="font-xssss text-uppercase text-current fw-700 ls-3">{`Question ${
                      currentQuestionIndex + 1
                    }`}</h4>
                    <h3 className="font-sm text-grey-800 fw-700 lh-32 mt-4 mb-4">
                      {currentQuestion.question}
                    </h3>
                    {["option1", "option2", "option3", "option4"].map(
                      (option, index) => (
                        <React.Fragment key={index}>
                          <input
                            type="radio"
                            id={`${option}_${index}`}
                            value={option}
                            style={hideStyle}
                            checked={selectedOption === option}
                            onChange={(e) => {
                              setSelectedOption(option);
                              setSelectedAnswers((prevSelectedAnswers) => [
                                ...prevSelectedAnswers,
                                e.target.value,
                              ]);
                            }}
                          />
                          <p
                            className={`bg-lightblue theme-dark-bg p-2 mt-3 question-ans style2 rounded-lg font-xssss fw-600 lh-28 text-grey-700 mb-0 p-2 ${
                              selectedOption === option ? "active" : ""
                            }`}
                            onClick={() => setSelectedOption(option)}
                          >
                            <span className="pt-2 pb-2 pl-3 pr-3 mr-4 d-inline-block rounded-lg bg-current text-white font-xssss fw-600">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {currentQuestion[option]}
                          </p>
                        </React.Fragment>
                      )
                    )}

                    {currentQuestionIndex === questions.length - 1 ? (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0"
                      >
                        SUBMIT
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="next-bttn p-2 mt-3 d-inline-block text-white fw-700 lh-30 rounded-lg w200 text-center font-xsssss ls-3 bg-current border-0"
                      >
                        NEXT
                      </button>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <StudentSidebar />
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default TakeTest;
