import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";
import { useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateVideos() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { class_id, subject_id, chapter_id } = useParams();

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedClass, setSelectedClass] = useState(class_id);
  const [selectedSubject, setSelectedSubject] = useState(subject_id);
  const [selectedChapter, setSelectedChapter] = useState(chapter_id);
  const [uploadElab, setUploadElab] = useState(false);
  const [elabOptions, setElabOptions] = useState([]);

  const [uploadEbook, setUploadEbook] = useState(false);
  const [ebookOptions, setEbookOptions] = useState([]);
  
  const [uploadAssessment, setUploadAssessment] = useState(false);
  const [assessmentOptions, setAssessmentOptions] = useState([]);

  const [videoNames, setVideoNames] = useState([""]); // Array to store video names
  const [videoFiles, setVideoFiles] = useState([""]); // Array to store video files
  const [selectedElab, setSelectedElab] = useState(""); // Array to store video files
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
      const jsonbody = await response.json();
      console.log("elababs", jsonbody);
      // Map through the data array and construct the options array for the dropdown
      const elabDropdownOptions = jsonbody.data.map((lab) => ({
        id: lab.id,
        elab: lab.name, // assuming this is the correct path to the label
      }));
      setElabOptions(elabDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch elabs:", error);
      setElabOptions([]);
    }
  }

  // get assessments for the subject
  useEffect(() => {
    if (selectedClass && selectedSubject && uploadAssessment) {
      // API call to fetch assessmets
      getAssessments(selectedSubject);
    }
  }, [selectedClass, selectedSubject, uploadAssessment]);

  async function getAssessments(selectedSubject) {
    try {
      const response = await fetch(
        `${baseUrl}api/get_assessments/${selectedSubject}`
      );
      const jsonbody = await response.json();
      console.log(jsonbody);
      // Map through the data array and construct the options array for the dropdown
      const assessmentDropdownOptions = jsonbody.data.map((assessment) => ({
        id: assessment.id,
        assessment: assessment.name, // assuming this is the correct path to the label
      }));
      setAssessmentOptions(assessmentDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch elabs:", error);
      setAssessmentOptions([]);
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
  const handleChapterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedChapter(selectedValue);
  };
  const handleElabChange = (e) => {
    // 'e.target.value' will be the selected eLab ID
    setSelectedElab(e.target.value);
  };
  const handleAssessmentChange = (e) => {
    // 'e.target.value' will be the selected eLab ID
    setSelectedAssessment(e.target.value);
  };

  const createVideo = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("chapter", selectedChapter);
    formData.append("elab", selectedElab);
    formData.append("videoDescription", videoDescription);
    formData.append("videoName", videoName); // Change the key to match Laravel's expected request field

    // formData.append('videoFiles', videoFiles);
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }
    setIsSubmitting(true);
    e.preventDefault();
console.log(formData)
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
        toast.success(resp.msg);
        if (formRef.current) {
          formRef.current.reset(); // This will reset the file input
        }
      })
      .catch((err) => {
        toast.error("Could not submit chapter names: " + err.message);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the submit button
      });
  };
  const goBack = () => {
    navigate(-1);
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
                    <button
                      onClick={goBack}
                      className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      Back
                    </button>
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
                                Video Name
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
                                Video File
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
  <label className="mont-font fw-600 font-xsss">Video Description</label>
  <textarea
    className="form-control"
    placeholder="Enter Description"
    value={videoDescription}
    onChange={(e) => setVideoDescription(e.target.value)}
    required
  />
</div>

                          <div className="col-lg-2">
                          <label className="mont-font fw-600 font-xsss">
                            Has eLab
                          </label>
                         &ensp;
                          <input
                            type="checkbox"
                            checked={uploadElab}
                            onChange={(e) => setUploadElab(e.target.checked)}
                          />
                        </div>
                        {uploadElab && (
                          <div className="col-lg-6">
                            <label className="mont-font fw-600 font-xsss">
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
