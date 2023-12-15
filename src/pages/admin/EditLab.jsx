import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";
import "react-toastify/dist/ReactToastify.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

function EditLab() {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLabDetails = async () => {
    try {
      const response = await fetch(baseUrl + "api/get_elab_details/" + id);
      const data = await response.json();
      console.log("data", data);
      // Update the state with the fetched data
      setFormData(data);
      setSelectedClass(data.class_id); // Replace 'class_id' with the actual property name from the fetched data
      setSelectedSubject(data.subject_id); // Replace 'subject_id' with the actual property name from the fetched data
    } catch (error) {
      console.error("Error fetching lab details:", error);
    }
  };

  useEffect(() => {
    fetchLabDetails();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(baseUrl + "api/get_classes");
      const data = await response.json();
      setClasses(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await fetch(
        `${baseUrl}api/get_subjects_by_class/${classId}`
      );
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
    console.log("Updated classes state:", classes);
  }, [classes]);

  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
    fetchSubjects(selectedValue);
  };

  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    course: "",
    subject_id: "",
    description: "",
    io_format: "",
    constraints: "",
    io_sample: "",
    psuedo_code: "",
    template1: "",
    template2: "",
    data_harness_code: "",
    testcases: "",
    language_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "language_id") {
      const languageDetails = languages[value];
      const languageDetailsString = JSON.stringify(languageDetails);
      setFormData({
        ...formData,
        [name]: languageDetailsString,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(baseUrl + "api/update_lab/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("formData", formData);
      const data = await response.json();
      if (data.success) {
        setFormData({
          name: "",
          code: "",
          course: "",
          subject_id: "",
          description: "",
          io_format: "",
          constraints: "",
          io_sample: "",
          psuedo_code: "",
          template1: "",
          template2: "",
          data_harness_code: "",
          testcases: "",
          language_id: "",
        });
        toast.success(data.message || "Lab updated successfully!");

        navigate("/all_labs");
      } else {
        toast.error("Failed to update lab");
      }
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  const handleEditorChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const languages = {
    62: {
      id: 62,
      name: "Java (OpenJDK 13.0.1)",
      label: "Java (OpenJDK 13.0.1)",
      value: "java",
    },
    75: {
      id: 75,
      name: "C (Clang 7.0.1)",
      label: "C (Clang 7.0.1)",
      value: "c",
    },
    71: {
      id: 71,
      name: "Python (3.8.1)",
      label: "Python (3.8.1)",
      value: "python",
    },
    82: {
      id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="admin-middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      Edit <b>E-Labs</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <div className="col-lg-12 mb-3">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                      <form
                        method="POST"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        autoComplete="off"
                      >
                        <div className="card-box">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                <label className="mont-font fw-600 font-xsss">
                                  Select Class
                                </label>
                                <br />
                                <select
                                  name="course"
                                  id="course"
                                  className="form-control"
                                  onChange={handleClassChange}
                                  value={selectedClass}
                                >
                                  <option disabled value="">
                                    -Select-
                                  </option>
                                  {classes.map((classDetail) => (
                                    <option
                                      key={classDetail.id}
                                      value={classDetail.id}
                                    >
                                      {classDetail.class}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                <label className="mont-font fw-600 font-xsss">
                                  Select Subject
                                </label>
                                <br />
                                <select
                                  name="subject_id"
                                  id="subject"
                                  className="form-control"
                                  onChange={handleSubjectChange}
                                  value={selectedSubject}
                                >
                                  <option disabled value="">
                                    -Select a Subject-
                                  </option>
                                  {subjects.map((subjectDetail) => (
                                    <option
                                      key={subjectDetail.id}
                                      value={subjectDetail.id}
                                    >
                                      {subjectDetail.subject_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                <label className="mont-font fw-600 font-xsss">
                                  Select Language
                                </label>
                                <br />
                                <select
                                  name="language_id"
                                  id="language_id"
                                  className="form-control"
                                  onChange={handleInputChange}
                                  value={formData.language_id}
                                >
                                  <option disabled value="">
                                    -Select-
                                  </option>
                                  {Object.keys(languages).map((languageId) => (
                                    <option key={languageId} value={languageId}>
                                      {languages[languageId].name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Other input fields */}
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter Name"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  Code
                                </label>
                                <input
                                  type="text"
                                  name="code"
                                  value={formData.code}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter Code"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter description"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  I/O Format
                                </label>
                                <input
                                  type="text"
                                  name="io_format"
                                  value={formData.io_format}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter io_format"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  Constraints
                                </label>
                                <input
                                  type="text"
                                  name="constraints"
                                  value={formData.constraints}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter constraints"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                  Sample I/O
                                </label>
                                <input
                                  type="text"
                                  name="io_sample"
                                  value={formData.io_sample}
                                  onChange={handleInputChange}
                                  className="form-control"
                                  placeholder="Enter io_sample"
                                />
                              </div>
                            </div>

                            <div className="form-group col-lg-6">
                              <label className="mont-font fw-600 font-xsss">
                                Psuedo Code
                              </label>
                              <AceEditor
                                mode="java"
                                theme="github"
                                name="psuedo_code"
                                editorProps={{ $blockScrolling: true }}
                                value={formData.psuedo_code}
                                onChange={(value) =>
                                  handleEditorChange("psuedo_code", value)
                                }
                                setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: true,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}
                                style={{ height: "200px", width: "100%" }}
                              />
                            </div>

                            <div className="form-group col-lg-6">
                              <label className="mont-font fw-600 font-xsss">
                                Template 1(Easy)
                              </label>
                              <AceEditor
                                mode="java"
                                theme="github"
                                name="template1"
                                editorProps={{ $blockScrolling: true }}
                                value={formData.template1}
                                onChange={(value) =>
                                  handleEditorChange("template1", value)
                                }
                                setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: true,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}
                                style={{ height: "200px", width: "100%" }}
                              />
                            </div>
                            <div className="form-group col-lg-6">
                              <label className="mont-font fw-600 font-xsss">
                                Template 2 (Medium)
                              </label>
                              <AceEditor
                                mode="java"
                                theme="github"
                                name="template2"
                                editorProps={{ $blockScrolling: true }}
                                value={formData.template2}
                                onChange={(value) =>
                                  handleEditorChange("template2", value)
                                }
                                setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: true,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}
                                style={{ height: "200px", width: "100%" }}
                              />
                            </div>
                            <div className="form-group col-lg-6">
                              <label className="mont-font fw-600 font-xsss">
                                Data Harness Code
                              </label>
                              <AceEditor
                                mode="java"
                                theme="github"
                                name="data_harness_code"
                                editorProps={{ $blockScrolling: true }}
                                value={formData.data_harness_code}
                                onChange={(value) =>
                                  handleEditorChange("data_harness_code", value)
                                }
                                setOptions={{
                                  enableBasicAutocompletion: true,
                                  enableLiveAutocompletion: true,
                                  enableSnippets: true,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}
                                style={{ height: "200px", width: "100%" }}
                              />
                            </div>

                            <div className="form-group col-lg-12">
                              <label className="mont-font fw-600 font-xsss">
                                Testcases
                              </label>
                              <br />
                              <textarea
                                name="testcases"
                                value={formData.testcases}
                                onChange={handleInputChange}
                                placeholder="Paste your JSON here"
                                rows={10}
                                cols={100}
                                className="border-black border-2"
                              />
                            </div>

                            <div className="col-lg-12">
                              <button
                                type="submit" disabled={isSubmitting} 
                                className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                              >
                                Proceed
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
      </div>
    </>
  );
}

export default EditLab;
