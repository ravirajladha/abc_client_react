import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/navigation/BackButton";
function CreateAssessments() {
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [name, setName] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  function getClasses() {
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setClasses(jsonbody);
      });
    });
  }
  function getSubjects() {
    let result = fetch(
      baseUrl + "api/get_subjects_by_class/" + selectedClass
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setSubjects(jsonbody);
      });
    });
  }

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue);
    setSelectedClass(selectedValue);
    // getSubjects();
  };
  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
    getNumberOfQuestions(selectedValue);
  };

  function getNumberOfQuestions(selectedSubject) {
    fetch(`${baseUrl}api/get_number_of_questions/${selectedSubject}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.questionsCount === 0) {
          setNumberOfQuestions(data.questionsCount);
          toast.warn("There are no questions for this subject.");
        } else {
          setNumberOfQuestions(data.questionsCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching number of questions:", error);
        setNumberOfQuestions(0);
      });
  }

  useEffect(() => {
    getSubjects();
  }, [selectedClass]);

  useEffect(() => {
    getClasses();
  }, []);

  const createAssessment = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("name", name);

    e.preventDefault();
    setIsSubmitting(true);

    fetch(baseUrl + "api/create_assessment", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setSelectedClass("");
        setSelectedSubject("");
        setName("");

        // Additional response handling
        navigate("/assessments/add-question-to-assessment", {
          state: {
            subjectId: selectedSubject,
            assessmentId: resp.assessment.id,
          },
        });
      })
      .catch((err) => {
        toast.error("Could not submit question :" + err.message);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the submit button
      });
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <ToastContainer autoClose={3000} />
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      Create <b>Assessment</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <ToastContainer autoClose={3000} />
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                    {/* <h2 className="fw-400 font-lg d-block">Create <b> Assessments</b> </h2> */}
                  </div>

                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={createAssessment}
                    >
                      <div className="row mb-6">
                        <div className="col-lg-6">
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
                        <div className="col-lg-6">
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
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Number of Questions
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={numberOfQuestions}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Assessment Name
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group float-right">
                            <button
                              type="submit"
                              className="mt-5 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
                              disabled={isSubmitting}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
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

export default CreateAssessments;
