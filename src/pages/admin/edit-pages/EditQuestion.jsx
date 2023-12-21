import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "../../components/inputs/Dropdown";
import BackButton from "../../components/navigation/BackButton";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
function EditQuestion() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  function getClasses() {
    fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonBody) {
        setClasses(jsonBody);
      });
    });
  }

  useEffect(() => {
    getClasses();
  }, []);

  function getSubjects() {
    fetch(baseUrl + "api/get_subjects_by_class/" + selectedClass).then(
      function (result) {
        result.json().then(function (json) {
          setSubjects(jsonbody);
        });
      }
    );
  }

  useEffect(() => {
    if (selectedClass) {
      getSubjects();
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
  };
  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const [inputs, setInputs] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  const createQuestion = (e) => {
    if (!selectedOption) {
      toast.warn("select one option");
    }
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("question", question);
    formData.append("code", code);
    formData.append("selectedOption", selectedOption);
    formData.append("option1", inputs.option1);
    formData.append("option2", inputs.option2);
    formData.append("option3", inputs.option3);
    formData.append("option4", inputs.option4);

    e.preventDefault();
    setIsSubmitting(true);
    console.log(selectedOption);
    fetch(baseUrl + "api/create_question", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setSelectedClass("");
        setSelectedSubject("");
        setSelectedOption("");
        setQuestion("");
        setCode("");
        setShowCode(false);
        setInputs({
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        });
        setSubjects([]);
        toast.success(resp.msg);
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
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
              <div className="">
                <h2 className="fw-400 font-lg d-block">
                  Create <b> Question</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <ToastContainer autoClose={3000} />

              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <form encType="multipart/form-data" onSubmit={createQuestion}>
                  <div className="row g-2 mb-6">
                    <div className="form-group col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        Select Class
                      </label>
                      <br />
                      <Dropdown
                        options={classes}
                        column_name="class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        required={true}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        Select Subject
                      </label>
                      <br />
                      <Dropdown
                        options={subjects}
                        column_name="subject_name"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        required={true}
                      />
                    </div>

                    <div className="col-md-12 col-sm-12 mt-2">
                      <div className="d-flex justify-content-start align-items-center">
                        <label className="mont-font fw-600 font-xsss">
                          Question
                        </label>
                        <p
                          className={`btn btn-sm ${
                            showCode ? "bg-danger" : "bg-success"
                          } text-white ml-2 mb-2`}
                          onClick={() => setShowCode(!showCode)}
                        >
                          {showCode ? " - Hide" : "+ Add"} Code
                        </p>
                      </div>
                      <textarea
                        rows="4"
                        cols="70"
                        className="form-control"
                        placeholder="Enter Question.."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                      ></textarea>

                      {showCode && (

                        <AceEditor
                          mode="java"
                          theme="github"
                          name="code"
                          editorProps={{ $blockScrolling: true }}
                          value={code}
                          onChange={(newValue) => setCode(newValue)} // Updated line
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                          }}
                          style={{
                            height: "200px",
                            width: "100%",
                            margin: "13px",
                          }}
                        />
                      )}
                    </div>
                    {[...Array(4)].map((_, index) => {
                      const number = index + 1;
                      const optionName = `option${number}`;
                      return (
                        <div className="form-group col-lg-6 mt-2" key={optionName}>
                          <input
                            type="radio"
                            id={optionName}
                            name="option"
                            value={optionName}
                            checked={selectedOption === optionName}
                            onChange={handleOptionChange}
                          />
                          <label
                            className="mont-font fw-600 font-xsss ml-2"
                            htmlFor={optionName}
                          >{`Option ${number}*`}</label>
                          <textarea
                            className="form-control"
                            name={optionName}
                            placeholder={`Enter Option ${number}`}
                            value={inputs[optionName]}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="row g-2 mt-4">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditQuestion;
