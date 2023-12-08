import React, { useEffect, Component, Fragment, useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import Adminsidebar from "../../components/Adminsidebar";
// import AdminTopnav from "../../components/AdminTopnav";
// import Adminfooter from "../../components/Adminfooter";

import AppHeader from '../../components/includes/AppHeader';
import AppFooter from '../../components/includes/AppFooter';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import BackButton from "../../components/navigation/BackButton";
function CreateLab(props) {
  //fetch the records from api and store in classes dropdown
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  // const [selectedChapter, setSelectedChapter] = useState("");
  // const [selectedVideo, setSelectedVideo] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchClasses = async () => {
    try {
      const response = await fetch(baseUrl + "api/get_classes");
      const data = await response.json();
      setClasses(data); // Assuming the API returns an array of class details
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Use this function when the selected class changes
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

  // Use this function when the selected subject changes
  const fetchChapters = async (subjectId) => {
    try {
      const response = await fetch(
        `${baseUrl}api/get_chapters_by_subject/${subjectId}`
      );
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // Use this function when the selected video changes
  const fetchVideos = async (chapterId) => {
    try {
      const response = await fetch(
        `${baseUrl}api/get_video_by_chapter/${chapterId}`
      );
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // Similarly, create a fetchVideos function if needed

  // useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
    console.log("Updated classes state:", classes);
  }, [classes]);

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);
    fetchSubjects(selectedValue); // Fetch subjects when a class is selected
    // Update formData with the selected class
    setFormData({ ...formData, course: selectedValue });
  };

  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
    fetchChapters(selectedValue); // Fetch chapters when a subject is selected
    setFormData({ ...formData, subject_id: selectedValue });
  };
  // const handleChapterChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedChapter(selectedValue);
  //   fetchVideos(selectedValue); // Fetch chapters when a subject is selected
  //   setFormData({ ...formData, chapter_id: selectedValue });
  // };

  // Initial fetch for classes
  useEffect(() => {
    fetchClasses();
  }, []);

  // Side effect for when selectedClass changes
  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  // Side effect for when selectedSubject changes
  useEffect(() => {
    if (selectedSubject) {
      fetchChapters(selectedSubject);
    }
  }, [selectedSubject]);

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    course: "",
    subject_id: "",
    // chapter_id: "",
    // video_id: "",
    description: "",
    io_format: "",
    constraints: "",
    io_sample: "",
    psuedo_code: "",
    template1: "", // State for Template 1 AceEditor
    template2: "", // State for Template 2 AceEditor
    data_harness_code: "", // State for Data Harness Code AceEditor
    testcases: "", // State for the textarea
    language_id: "", // State for the textarea
  });

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the change is for the language selection
    if (name === "language_id") {
      const languageDetails = languages[value];
      const languageDetailsString = JSON.stringify(languageDetails);

      // Now, update the form data with the language details
      setFormData({
        ...formData,
        [name]: languageDetailsString, // You can keep this if you just want to store the ID
      });
    
    } else {
      // For all other inputs, handle them as before
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl + "api/add_lab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers if needed, like authorization headers
        },
        body: JSON.stringify(formData),
      });
      console.log("formData", formData);
      const data = await response.json();
      // Handle response data
      if (data.success) {
        // Reset the form if submission was successful
        setFormData({
          name: "",
          code: "",
          course: "",
          subject_id: "",
          // chapter_id: "",
          // video_id: "",
          description: "",
          io_format: "",
          constraints: "",
          io_sample: "",
          psuedo_code: "",
          template1: "", // State for Template 1 AceEditor
          template2: "", // State for Template 2 AceEditor
          data_harness_code: "", // State for Data Harness Code AceEditor
          testcases: "", // State for the textarea
          language_id: "", // State for the langauge
        });

        // Display a success toast notification
        toast.success(data.message || "Lab added successfully!");
      } else {
        // Handle the case where the server did not return a success response
        toast.error("Failed to add lab");
      }
      // Handle response data
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
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
  };

  return (
    <>
      <ToastContainer />
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="card-body p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <div className="">
                    <h2 className="fw-400 font-lg d-block">Create <b> E-Lab</b> </h2>
                  </div>
                  <div className="float-right">
                    <BackButton/>
                  </div>
                </div>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <form
                      method="POST"
                      onSubmit={handleSubmit}
                      enctype="multipart/form-data"
                      autocomplete="OFF"
                    >
                      <div className="card-box">
                        <div className="row">
                          {/* <div className=" col-sm-12"> */}

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
                              >
                                <option readonly disabled selected value="">
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
                                onChange={handleSubjectChange}
                                value={selectedSubject}
                                name="subject_id"
                                id="subject"
                                className="form-control"
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
                          {/* <div className="col-lg-6">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                              <label className="mont-font fw-600 font-xsss">
                                Select Chapter
                              </label>
                              <br />
                              <select
                                onChange={handleChapterChange}
                                value={selectedChapter}
                                name="chapter_id"
                                id="chapter"
                                className="form-control"
                              >
                                <option disabled value="">
                                  -Select a Chapter-
                                </option>
                                {chapters.map((chapterDetail) => (
                                  <option
                                    key={chapterDetail.id}
                                    value={chapterDetail.id}
                                  >
                                    {chapterDetail.chapter_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                              <label className="mont-font fw-600 font-xsss">
                                Select Video
                              </label>
                              <br />
                              <select
                                onChange={handleInputChange} // or use a dedicated handler like handleVideoChange
                                value={selectedVideo} // Control the select's value with state
                                name="video_id"
                                className="form-control"
                                id="video"
                              >
                                <option disabled value="">
                                  -Select a Video-
                                </option>
                                {videos.map((videoDetail) => (
                                  <option
                                    key={videoDetail.id}
                                    value={videoDetail.id}
                                  >
                                    {videoDetail.video_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div> */}
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
                              >
                                <option readonly disabled selected value="">
                                  -Select-
                                </option>
                                <option key="62" value={"62"}>
                                  Java
                                </option>
                                <option key="75" value={"75"}>
                                  C
                                </option>
                                <option key="71" value={"71"}>
                                  Python
                                </option>
                              </select>
                            </div>
                          </div>

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
                              type="submit"
                              className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                            >
                              Procced
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <AppFooter />
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateLab;
