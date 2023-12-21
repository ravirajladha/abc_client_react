import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "../../../components/inputs/Dropdown";
import BackButton from "../../../components/navigation/BackButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

function EditVideo() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { classId, subjectId, chapterId, videoId } = useParams();
  const [loading, setLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [uploadELab, setUploadELab] = useState(false);
  const [eLabOptions, setELabOptions] = useState([]);

  const [uploadEbook, setUploadEbook] = useState(false);
  const [ebookOptions, setEbookOptions] = useState([]);
  const [ebookModuleOptions, setEbookModuleOptions] = useState([]);
  const [ebookSectionOptions, setEbookSectionOptions] = useState([]);

  const [uploadAssessment, setUploadAssessment] = useState(false);
  const [assessmentOptions, setAssessmentOptions] = useState([]);

  const [selectedELab, setSelectedELab] = useState("");
  const [selectedEbook, setSelectedEbook] = useState("");
  const [selectedEbookModule, setSelectedEbookModule] = useState("");
  const [selectedEbookSections, setSelectedEbookSections] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState("");

  const [videoName, setVideoName] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [videoDescription, setVideoDescription] = useState("");

  async function getELabs(classId, subjectId) {
    try {
      const response = await fetch(
        `${baseUrl}api/get_elabs_by_chapter_video/${classId}/${subjectId}`
      );
      const jsonRes = await response.json();
      const eLabDropdownOptions = jsonRes.data.map((lab) => ({
        id: lab.id,
        eLab: lab.name,
      }));
      setELabOptions(eLabDropdownOptions);
    } catch (error) {
      console.error("Failed to fetch eLabs:", error);
      setELabOptions([]);
    }
  }

  async function getEbooks(classId, subjectId) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-ebooks/${classId}/${subjectId}`
      );
      const jsonRes = await response.json();
      const eBookDropdownOptions = jsonRes.data.map((eBook) => ({
        id: eBook.id,
        eBook: eBook.title,
      }));
      setEbookOptions(eBookDropdownOptions);
    } catch (error) {
      setEbookOptions([]);
      toast.error("Failed to fetch eBooks. Please try again.");
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
        eBookModule: eBookModule.module_title,
      }));
      setEbookModuleOptions(eBookModuleDropdownOptions);
    } catch (error) {
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
      setEbookSectionOptions([]);
      toast.error("Failed to fetch eBook Sections. Please try again.");
    }
  }

  async function getAssessments(classId, subjectId) {
    try {
      const response = await fetch(
        `${baseUrl}api/get-all-assessments/${classId}/${subjectId}`
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

  useEffect(() => {
    if (classId && subjectId && uploadELab) {
      getELabs(classId, subjectId);
    }
  }, [
    uploadELab,
  ]);

  useEffect(() => {
    if (classId && subjectId && uploadAssessment) {
      getAssessments(classId, subjectId);
    }
  }, [
    uploadAssessment,
  ]);

  useEffect(() => {
    if (classId && subjectId && uploadEbook) {
      getEbooks(classId, subjectId);
    }

    if (selectedEbook) {
      getEbookModules(selectedEbook);
    }

    if (selectedEbook && selectedEbookModule) {
      getEbookSections(selectedEbook, selectedEbookModule);
    }
  }, [
    uploadEbook,
    selectedEbook,
    selectedEbookModule,
  ]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        baseUrl + `api/get-video-details/${videoId}`
      );
      const data = await response.json();
      setVideoName(data.video_name);
      setUploadAssessment(!!data.assessment_id);
      setUploadELab(!!data.lab_link);
      setVideoDescription(data.description);
      setSelectedELab(data.lab_link);
      setSelectedAssessment(data.assessment_id);
      setUploadEbook(!!data.ebook_sections);
      if (data.ebook_sections !== null) {
        setSelectedEbook(data.ebook_id);
        setSelectedEbookModule(data.ebook_module_id);
        // setSelectedEbookSections(JSON.parse(data.ebook_sections));
        setSelectedEbookSections(
          JSON.parse(data.ebook_sections).map((section) => section.id)
        );
        // console.log(JSON.parse(data.ebook_sections));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleElabChange = (e) => {
    e.preventDefault();
    setSelectedELab(e.target.value);
  };

  const handleEbookChange = (e) => {
    e.preventDefault();
    setSelectedEbook(e.target.value);
    setSelectedEbookModule("");
  };

  const handleEbookModuleChange = (e) => {
    e.preventDefault();
    setSelectedEbookModule(e.target.value);
    setSelectedEbookSections([]);
  };

  const handleAssessmentChange = (e) => {
    e.preventDefault();
    setSelectedAssessment(e.target.value);
  };

  const handleAddSection = (event) => {
    event.preventDefault();
    setSelectedEbookSections([...selectedEbookSections, ""]);
    console.log(selectedEbookSections);

  };

  const handleEbookSectionChange = (index, value) => {
    const updatedSections = [...selectedEbookSections];
    updatedSections[index] = value;
    setSelectedEbookSections(updatedSections);
    console.log(selectedEbookSections);

  };

  const handleRemoveSection = (e, index) => {
    e.preventDefault();
    const updatedSections = selectedEbookSections.filter(
      (section, i) => i !== index
    );
    setSelectedEbookSections(updatedSections);
  };

  const updateContent = (e) => {
    e.preventDefault();
    if (videoFile) {
      const allowedVideoTypes = [
        "video/mp4",
        "video/mov",
        "video/avi",
        "video/wmv",
        "video/flv",
        "video/mkv",
        "video/webm",
        "video/3gp",
      ];
      if (!allowedVideoTypes.includes(videoFile.type)) {
        toast.error("Please upload a valid video file.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("class", classId);
    formData.append("subject", subjectId);
    formData.append("chapter", chapterId);
    formData.append("videoName", videoName);
    formData.append("videoDescription", videoDescription);

    if (uploadELab) {
      formData.append("eLab", selectedELab);
    } else{
      formData.append("eLab", null);
    }

    if (uploadAssessment) {
      formData.append("assessmentId", selectedAssessment);
    } else {
      formData.append("assessmentId", null);
    }

    // formData.append("eBookId", selectedEbook);
    // formData.append("eBookModuleId", selectedEbookModule);
    // selectedEbookSections.forEach((section, index) => {
    //   formData.append(`eBookSections[${index}]`, section);
    // });

    // if (uploadEbook === false) {
    //   formData.append("eBookId", null);
    //   formData.append("eBookModuleId", null);
    //   formData.append("eBookSections", null);
    // }

    console.log(selectedEbookSections);
    if (uploadEbook) {
      formData.append("eBookId", selectedEbook);
      formData.append("eBookModuleId", selectedEbookModule);
      selectedEbookSections.forEach((section, index) => {
        formData.append(`eBookSections[${index}]`, section);
      });
    } else {
      formData.append("eBookId", null);
      formData.append("eBookModuleId", null);
      formData.append("eBookSections", null);
    }

    if (videoFile) {
      formData.append("videoFile", videoFile);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    setIsSubmitting(true);
    e.preventDefault();
    fetch(baseUrl + "api/update-video-details/" + videoId, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        setSelectedELab("");
        setVideoName([""]);
        setVideoFile([""]);
        setVideoDescription("");
        setUploadAssessment(false);
        setSelectedAssessment("");
        setUploadELab(false);
        setSelectedELab("");
        setSelectedEbook("");
        setUploadEbook(false);
        setSelectedEbookModule("");
        setSelectedEbookSections([]);

        toast.success(resp.msg);
        if (formRef.current) {
          formRef.current.reset();
        }
        navigate(
          `/all_classes/all_subjects/all_chapters/all_videos/${chapterId}`
        );
      })
      .catch((err) => {
        toast.error("Could not add the video: " + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="vh-100">
        <div className="d-flex vh-100 align-items-center justify-content-center">
          <Spinner animation="border" variant="current">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="custom-middle-sidebar-bottom theme-dark-bg p-3">
        <div className="middle-sidebar-left">
          <div className="row">
            <ToastContainer autoClose={3000} />
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  Edit <b>Content</b>
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
                  onSubmit={updateContent}
                  ref={formRef}
                >
                  <div className="row g-2">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          Content Name
                        </label>
                        <br />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          value={videoName}
                          onChange={(e) => setVideoName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss form-label">
                          Content File
                        </label>
                        <br />
                        <input
                          type="file"
                          className="form-control lh-lg"
                          onChange={(e) => setVideoFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="mont-font fw-600 font-xsss">
                        Content Description
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
                        value={videoDescription}
                        onChange={(e) => setVideoDescription(e.target.value)}
                      />
                    </div>

                    <div className="row my-2">
                      <div className="col-lg-3">
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
                              column_name="assessment"
                              value={selectedAssessment}
                              onChange={handleAssessmentChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row my-2">
                      <div className="col-lg-3">
                        <label className="mono-font fw-600 font-xsss ">
                          Has eLab :
                        </label>
                        &nbsp;
                        <input
                          type="checkbox"
                          checked={uploadELab}
                          onChange={(e) => setUploadELab(e.target.checked)}
                        />
                      </div>
                      <div className="col-lg-6">
                        {uploadELab && (
                          <div>
                            <label className="fw-600 font-xsss">
                              Select eLab
                            </label>
                            <br />
                            <Dropdown
                              options={eLabOptions}
                              column_name="eLab"
                              value={selectedELab}
                              onChange={handleElabChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Add Ebook to Video */}
                    <div className="row mt-2">
                      <div className="col-lg-3">
                        <label className="mont-font fw-600 font-xsss">
                          Has eBook :
                        </label>
                        &nbsp;
                        <input
                          type="checkbox"
                          name="eBook"
                          checked={uploadEbook}
                          onChange={(e) => setUploadEbook(e.target.checked)}
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
                            <div className="col-lg-4">
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
                        <div className="col-3"></div>
                        <div className="col-4 d-flex align-items-center">
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
                        <div key={index} className="row mt-2">
                          <div className="col-3"></div>
                          <div className="col-lg-4">
                            <Dropdown
                              options={ebookSectionOptions}
                              column_name="eBookSection"
                              value={section}
                              onChange={(e) =>
                                handleEbookSectionChange(index, e.target.value)
                              }
                              required={uploadEbook}
                            />
                          </div>
                          <div className="col-lg-2 d-flex align-items-center">
                            <button
                              className="btn bg-danger text-center text-white font-xsss fw-600 rounded-lg d-inline-block border-0"
                              title="Remove Section"
                              onClick={(e) => handleRemoveSection(e, index)}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVideo;
