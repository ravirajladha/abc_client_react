import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";

function CreateTest() {
  const terms = [
    { id: "1", term: "Term 1" },
    { id: "2", term: "Term 2" },
    { id: "3", term: "Term 3" },
  ];

  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getClasses();
  }, []);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedStartTime = `${startTime}:00`;
  const formattedEndTime = `${endTime}:00`;

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  function getClasses() {
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setClasses(jsonbody);
      });
    });
  }
  async function getSubjects() {
    try {
      const response = await fetch(
        baseUrl + "api/get_subjects_by_class/" + selectedClass
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonbody = await response.json();
      console.warn("subject", jsonbody);
      setSubjects(jsonbody);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  }

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
  };
  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };
  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  useEffect(() => {
    getSubjects();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSubject) {
      fetchNumberOfQuestions(selectedSubject);
    }
  }, [selectedSubject]);

  function fetchNumberOfQuestions(subjectId) {
    fetch(`${baseUrl}api/get_number_of_questions/${subjectId}`)
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

  const navigate = useNavigate();
  const createTest = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("term", selectedTerm);
    formData.append("startTime", formattedStartTime);
    formData.append("endTime", formattedEndTime);
    formData.append("duration", duration);

    e.preventDefault();
    setIsSubmitting(true);

    fetch(baseUrl + "api/create_test", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        navigate("/tests/add_question_to_test", {
          state: { subjectId: selectedSubject, testId: resp.test.id },
        });
      })
      .catch((err) => {
        toast.error("Could not submit question: " + err.message);
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
                <div className="col">
                  <span className="fw-400 font-lg ml-2">
                    Create <b> Test</b>
                  </span>
                  <span className="float-right">
                    <BackButton />
                  </span>
                </div>
                <ToastContainer autoClose={3000} />
                <div className="card w-100 border-0 bg-white shadow-xs p-0 my-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form encType="multipart/form-data" onSubmit={createTest}>
                      <div className="row mb-6">
                        <div className="col-lg-4">
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
                        <div className="col-lg-4">
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
                        <div className="col-lg-4">
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
                            Test Name
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
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Test Image
                          </label>
                          <br />
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control"
                            required
                            accept="image/*"
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Select Term
                          </label>
                          <br />
                          <Dropdown
                            options={terms}
                            column_name="term"
                            value={selectedTerm}
                            onChange={handleTermChange}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Start Time
                          </label>
                          <br />
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            End Time
                          </label>
                          <br />
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            Duration (in seconds)
                          </label>
                          <br />
                          <input
                            type="number"
                            className="form-control"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <label className="mont-font fw-600 font-xsss">
                            Description
                          </label>
                          <br />
                          <textarea
                            rows="4"
                            cols="70"
                            className="form-control"
                            placeholder="Enter Description.."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group float-right">
                            <label className="mont-font fw-600 font-xsss"></label>
                            <br />
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="mt-1 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
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

export default CreateTest;
