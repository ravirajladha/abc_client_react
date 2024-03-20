import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import BackButton from "../../components/navigation/BackButton";

function CreateLab(props) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [languages, setLanguages] = useState([
    { id: "62", name: "Java (OpenJDK 13.0.1)" },
    { id: "75", name: "C (Clang 7.0.1)" },
    { id: "71", name: "Python (3.8.1)" },
    { id: "82", name: "SQL (SQLite 3.27.2)" },
  ]);
  
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // useEffect to call the fetch function when the component mounts
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
  useEffect(() => {
    if (selectedSubject) {
      fetchChapters(selectedSubject);
    }
  }, [selectedSubject]);

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

  // Use this function when the selected language changes
  // const handleLanguageChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedLanguage(selectedValue);
  //   setFormData({ ...formData, language_id: selectedValue });
  // };
  const handleLanguageChange = (e) => {
    const selectedId = e.target.value;
    // Find the selected language object from the languageslist by ID
    const selectedLanguageObject = languageslist[selectedId];
  
    // Convert the language object to a JSON string
    const languageJsonString = JSON.stringify(selectedLanguageObject);
  
    // Set the selected language id to the state that tracks the selected language
    setSelectedLanguage(selectedId);
  
    // Update the formData state with the language JSON string
    setFormData(prevFormData => ({ 
      ...prevFormData, 
      language_id: languageJsonString
    }));
  };
  
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the change is for the language selection
    if (name === "language_id") {
      // No need to stringify language details, only update the language_id
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For all other inputs, handle them as before
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
          description: "",
          io_format: "",
          constraints: "",
          io_sample: "",
          psuedo_code: "",
          template1: "", // State for Template 1 AceEditor
          template2: "", // State for Template 2 AceEditor
          data_harness_code: "", // State for Data Harness Code AceEditor
          testcases: "", // State for the textarea
          language_id: "", 
        });

        setSelectedClass("");
        setSelectedSubject("");
        setSelectedLanguage("");
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

  const languageslist = {
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
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="card-body p-lg-5 px-4 w-100 border-0 d-flex rounded-lg justify-content-between">
              <div className="">
                <h2 className="fw-400 font-lg d-block">
                  Create <b> E-Lab</b>{" "}
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
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
  value={selectedLanguage}
  onChange={handleLanguageChange}
>
  <option disabled value="">
    -Select-
  </option>
  {languages.map((language) => (
    <option key={language.id} value={language.id}>
      {language.name}
    </option>
  ))}
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
                          <textarea
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter Code"
                            rows={3} // You can set the number of rows to define the height of the textarea
                          >
                            {formData.code}
                          </textarea>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter description"
                            rows={3} // Adjust the number of rows as needed
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            I/O Format
                          </label>
                          <textarea
                            name="io_format"
                            value={formData.io_format}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter io_format"
                            rows={3} // Adjust the number of rows as needed
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Constraints
                          </label>
                          <textarea
                            name="constraints"
                            value={formData.constraints}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter constraints"
                            rows={3} // Adjust the number of rows as needed
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Sample I/O
                          </label>
                          <textarea
                            name="io_sample"
                            value={formData.io_sample}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter io_sample"
                            rows={3} // Adjust the number of rows as needed
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
                      <div className="form-group col-lg-6">
                        <label className="mont-font fw-600 font-xsss">
                          Testcases
                        </label>
                        <br />
                        <textarea
                          name="testcases"
                          value={formData.testcases}
                          onChange={handleInputChange}
                          placeholder="Paste your JSON here"
                          rows={3}
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-12">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                        >
                          Procced
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
    </>
  );
}
export default CreateLab;
