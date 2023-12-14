import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateVideos() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { class_id, subject_id, chapter_id } = useParams();

  const [selectedClass, setSelectedClass] = useState(() => class_id);
  const [selectedSubject, setSelectedSubject] = useState(() => subject_id);
  const [selectedChapter, setSelectedChapter] = useState(() => chapter_id);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [uploadElab, setUploadElab] = useState(false);
  const [elabOptions, setElabOptions] = useState([]);

  const [uploadEbook, setUploadEbook] = useState(false);
  const [ebookOptions, setEbookOptions] = useState([]);
  const [ebookModuleOptions, setEbookModuleOptions] = useState([]);
  const [ebookSectionOptions, setEbookSectionOptions] = useState([]);

  const [uploadAssessment, setUploadAssessment] = useState(false);
  const [assessmentOptions, setAssessmentOptions] = useState([]);

  const [videoNames, setVideoNames] = useState([""]); // Array to store video names
  const [videoFiles, setVideoFiles] = useState([""]); // Array to store video files
  const [selectedElab, setSelectedElab] = useState(""); // Array to store video files
  const [selectedEbook, setSelectedEbook] = useState(""); // Array to store ebookId
  const [selectedEbookModule, setSelectedEbookModule] = useState(""); // Array to store ebookModule
  const [selectedEbookSection, setSelectedEbookSection] = useState("");
  const [selectedEbookSections, setSelectedEbookSections] = useState([]); // Array to store ebookSection
  const [selectedAssessment, setSelectedAssessment] = useState(""); // Array to store Assessments

  const [videoName, setVideoName] = useState(""); // State to store video name

  const [videoFile, setVideoFile] = useState(null);
  const [videoDescription, setVideoDescription] = useState("");

  useEffect(() => {
    if (selectedClass && selectedSubject && uploadElab) {
      // API call to fetch eLabs
      getElabs(selectedClass, selectedSubject);
    }
  }, [selectedClass, selectedSubject, uploadElab]);

  async function getElabs(selectedClass, selectedSubject) {
    try {
      const response = await fetch(
        `${baseUrl}api/get_elabs_by_chapter_video/${selectedClass}/${selectedSubject}`
      );
      const jsonRes = await response.json();
      console.log("eLabs", jsonRes);
      // Map through the data array and construct the options array for the dropdown
      const elabDropdownOptions = jsonRes.data.map((lab) => ({
        id: lab.id,
        elab: lab.name, // assuming this is the correct path to the label
      }));
      setElabOptions(elabDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch elabs:", error);
      setElabOptions([]);
    }
  }

  async function getEbooks(selectedClass, selectedSubject) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-ebooks/${selectedClass}/${selectedSubject}`
      );
      const jsonRes = await response.json();
      const eBookDropdownOptions = jsonRes.data.map((eBook) => ({
        id: eBook.id,
        eBook: eBook.title, // assuming this is the correct path to the label
      }));
      setEbookOptions(eBookDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch ebooks:", error);
      setEbookOptions([]);
    }
  }

  async function getEbookModules(selectedEbook) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-ebook-modules/${selectedEbook}`
      );
      const jsonRes = await response.json();
      const eBookModuleDropdownOptions = jsonRes.data.map((eBookModule) => ({
        id: eBookModule.id,
        eBookModule: eBookModule.module_title, // assuming this is the correct path to the label
      }));
      setEbookModuleOptions(eBookModuleDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch ebook module:", error);
      setEbookModuleOptions([]);
      toast.error("Failed to fetch eBook Modules. Please try again.");
    }
  }

  async function getEbookSections(selectedEbook, selectedEbookModule) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-ebook-sections/${selectedEbook}/${selectedEbookModule}`
      );
      const jsonRes = await response.json();
      const eBookSectionDropdownOptions = jsonRes.data.map((eBookSection) => ({
        id: eBookSection.id,
        eBookSection: eBookSection.section_title,
      }));
      setEbookSectionOptions(eBookSectionDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch ebooks sections:", error);
      setEbookSectionOptions([]);
      toast.error("Failed to fetch eBook Sections. Please try again.");
    }
  }

  useEffect(() => {
    if (selectedClass && selectedSubject && uploadAssessment) {
      getAssessments(selectedClass, selectedSubject);
    }
    if (selectedClass && selectedSubject && uploadEbook) {
      getEbooks(selectedClass, selectedSubject);
    }

    if (selectedEbook) {
      getEbookModules(selectedEbook);
    }

    if (selectedEbook && selectedEbookModule) {
      getEbookSections(selectedEbook, selectedEbookModule);
    }
  }, [
    selectedClass,
    selectedSubject,
    uploadAssessment,
    uploadEbook,
    selectedEbook,
    selectedEbookModule,
  ]);

  async function getAssessments(selectedClass, selectedSubject) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-all-assessments/${selectedClass}/${selectedSubject}`
      );
      const jsonRes = await response.json();
      const assessmentDropdownOptions = jsonRes.data.map((assessment) => ({
        id: assessment.id,
        assessment: assessment.name,
      }));
      setAssessmentOptions(assessmentDropdownOptions);
    } catch (error) {
      toast.error("Could not fetch assessments " + error);
      setAssessmentOptions([]);
    }
  }
  // const handleClassChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedClass(selectedValue);
  // };
  // const handleSubjectChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedSubject(selectedValue);
  // };
  // const handleChapterChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedChapter(selectedValue);
  // };
  const handleElabChange = (e) => {
    // 'e.target.value' will be the selected eLab ID
    setSelectedElab(e.target.value);
  };
  const handleEbookChange = (e) => {
    setSelectedEbook(e.target.value);
    setSelectedEbookModule("");
  };

  const handleEbookModuleChange = (e) => {
    setSelectedEbookModule(e.target.value);
    setSelectedEbookSections([]);
  };

  // const handleEbookSectionChange = (e) => {
  //   setSelectedEbookSection(e.target.value);
  // };

  const handleAssessmentChange = (e) => {
    // 'e.target.value' will be the selected eLab ID
    setSelectedAssessment(e.target.value);
  };

  //Clone Form for eBook Section
  const handleAddSection = () => {
    setSelectedEbookSections([...selectedEbookSections, ""]);
  };

  const handleEbookSectionChange = (index, value) => {
    const updatedSections = [...selectedEbookSections];
    updatedSections[index] = value;
    setSelectedEbookSections(updatedSections);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = selectedEbookSections.filter(
      (section, i) => i !== index
    );
    setSelectedEbookSections(updatedSections);
  };

  const createVideo = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("chapter", selectedChapter);
    formData.append("elab", selectedElab);
    formData.append("assessmentId", selectedAssessment);
    formData.append("eBookId", selectedEbook);
    if (uploadEbook) {
      selectedEbookSections.forEach((section, index) => {
        formData.append(`eBookSections[${index}]`, section);
      });
    }
    formData.append("videoDescription", videoDescription);
    formData.append("videoName", videoName);

    // formData.append('videoFiles', videoFiles);
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }
    setIsSubmitting(true);
    e.preventDefault();
    console.log(formData);
    console.log(videoFiles);
    fetch(baseUrl + "api/create_video", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        setSelectedElab("");
        setVideoName([""]);
        setVideoFiles([""]);
        setVideoDescription("");
        setUploadAssessment(false);
        setSelectedAssessment("");
        setUploadElab(false);
        setSelectedElab("");
        setSelectedEbook("");
        setUploadEbook(false);
        setSelectedEbookModule("");
        setSelectedEbookSections([]);

        toast.success(resp.msg);
        if (formRef.current) {
          formRef.current.reset(); // This will reset the file input
        }
      })
      .catch((err) => {
        toast.error("Could not add the video: " + err.message);
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
                      Add <b>Content</b>
                    </h2>
                  </div>
                  <div className="float-right">
                  <BackButton />
                  </div>
                </div>
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={createVideo}
                      ref={formRef}
                    >
                      <div className="row mb-6">
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-4">
                              <label className="mont-font fw-600 font-xsss">
                                Content Name
                              </label>
                              <br />

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={videoName} // Bind the input to the videoName state
                                onChange={(e) => setVideoName(e.target.value)} // Update the state when input changes
                                required
                              />
                            </div>
                            <div className="col-lg-8">
                              <label className="mont-font fw-600 font-xsss">
                                Content File
                              </label>
                              <br />
                              <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                  setVideoFile(e.target.files[0])
                                }
                                required
                              />
                            </div>
                            <div className="col-lg-12">
                              <label className="mont-font fw-600 font-xsss">
                              Content Description
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Enter Description"
                                value={videoDescription}
                                onChange={(e) =>
                                  setVideoDescription(e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>

                          <div className="row my-2">
                            <div className="col-lg-2">
                              <label className="mono-font fw-600 font-xsss ">
                                Has Assessment :
                              </label>{" "}
                              &nbsp;
                              <input
                                type="checkbox"
                                checked={uploadAssessment}
                                onChange={(e) =>
                                  setUploadAssessment(e.target.checked)
                                }
                              />
                            </div>
                            <div className="col-lg-6">
                              {uploadAssessment && (
                                <div>
                                  <label className="fw-600 font-xsss">
                                    Select Assessment
                                  </label>
                                  <br />
                                  <Dropdown
                                    options={assessmentOptions}
                                    column_name="assessment" // This is the property to be displayed in the dropdown
                                    value={selectedAssessment}
                                    onChange={handleAssessmentChange}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="row my-2">
                            <div className="col-lg-2">
                              <label className="mono-font fw-600 font-xsss ">
                                Has eLab :
                              </label>{" "}
                              &nbsp;
                              <input
                                type="checkbox"
                                checked={uploadElab}
                                onChange={(e) =>
                                  setUploadElab(e.target.checked)
                                }
                              />
                            </div>
                            <div className="col-lg-6">
                              {uploadElab && (
                                <div>
                                  <label className="fw-600 font-xsss">
                                    Select eLab
                                  </label>
                                  <br />
                                  <Dropdown
                                    options={elabOptions}
                                    column_name="elab" // This is the property to be displayed in the dropdown
                                    value={selectedElab}
                                    onChange={handleElabChange}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Add Ebook to Video */}
                          <div className="row mt-2">
                            <div className="col-lg-2">
                              <label className="mont-font fw-600 font-xsss">
                                Has eBook :
                              </label>
                              &nbsp;
                              <input
                                type="checkbox"
                                name="eBook"
                                checked={uploadEbook}
                                onChange={(e) =>
                                  setUploadEbook(e.target.checked)
                                }
                              />
                            </div>

                            {uploadEbook && (
                              <>
                                <div className="col-lg-5">
                                  <label className="mont-font fw-600 font-xsss">
                                    Select eBook
                                  </label>
                                  <br />
                                  <Dropdown
                                    options={ebookOptions}
                                    column_name="eBook"
                                    value={selectedEbook}
                                    onChange={handleEbookChange}
                                    required={uploadEbook}
                                  />
                                </div>
                                {selectedEbook && (
                                  <div className="col-lg-5">
                                    <label className="mont-font fw-600 font-xsss">
                                      Select a Module
                                    </label>
                                    <br />
                                    <Dropdown
                                      options={ebookModuleOptions}
                                      column_name="eBookModule"
                                      value={selectedEbookModule}
                                      onChange={handleEbookModuleChange}
                                      required={uploadEbook}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          {uploadEbook && selectedEbookModule && (
                            <div className="row my-2">
                              <div className="col-2"></div>
                              <div className="col-5 d-flex align-items-center">
                                <label className="mont-font fw-600 font-xsss">
                                  Add Ebook Section(s)
                                </label>
                              </div>
                              <div className="col-5">
                                <button
                                  onClick={handleAddSection}
                                  className="btn bg-current text-center text-white font-xsss fw-600 rounded-lg d-inline-block border-0 float-right mt-2 float-end"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          {uploadEbook &&
                            selectedEbookSections.map((section, index) => (
                              <div className="row mt-2">
                                <div className="col-2"></div>
                                <div key={section.id} className="col-lg-5">
                                  <Dropdown
                                    options={ebookSectionOptions}
                                    column_name="eBookSection"
                                    value={section}
                                    onChange={(e) =>
                                      handleEbookSectionChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    required={uploadEbook}
                                  />
                                </div>
                                <div className="col-lg-2 d-flex align-items-center">
                                  <button
                                    className="btn bg-danger text-center text-white font-xsss fw-600 rounded-lg d-inline-block border-0"
                                    title="Remove Section"
                                    onClick={() => handleRemoveSection(index)}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            ))}

                          <div className="col-lg-12">
                            <button
                              type="submit"
                              className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right mt-2"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Uploading..." : "Submit"}
                              {isSubmitting && <span className="loader"></span>}
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

export default CreateVideos;
