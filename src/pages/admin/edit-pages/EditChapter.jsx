import React, { useState } from "react";
import BackButton from "../../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function EditChapter() {
  const navigate = useNavigate();
  const { class_id, subject_id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [selectedClass, setSelectedClass] = useState(class_id);
  const [selectedSubject, setSelectedSubject] = useState(subject_id);
  const [chapterNames, setChapterNames] = useState([""]); // Array to store chapter names

  const addChapterField = () => {
    setChapterNames([...chapterNames, ""]);
  };

  const deleteChapterField = (index) => {
    const updatedChapterNames = [...chapterNames];
    updatedChapterNames.splice(index, 1);
    setChapterNames(updatedChapterNames);
  };
  const createChapter = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("chapterNames", JSON.stringify(chapterNames));
    e.preventDefault();
    setIsSubmitting(true);
    fetch(baseUrl + "api/create_chapter", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        setChapterNames([""]); // Reset chapterNames to initial state
        toast.success(resp.msg);
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
      <div className="custom-middle-sidebar-bottom p-3 theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <ToastContainer autoClose={3000} />
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  Create <b>Chapter</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <form encType="multipart/form-data" onSubmit={createChapter}>
                  <div className="row mb-2">
                    <div className="col-lg-12">
                      <label className="mont-font fw-600 font-xsss">
                        Chapter Name
                      </label>
                      <br />
                      {chapterNames.map((name, index) => (
                        <div key={index} className="d-flex mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => {
                              const updatedChapterNames = [...chapterNames];
                              updatedChapterNames[index] = e.target.value;
                              setChapterNames(updatedChapterNames);
                            }}
                            required
                          />
                          {/* <button
                                                                type="button"
                                                                className="btn btn-danger bg-red ml-2"
                                                                onClick={() => deleteChapterField(index)}
                                                            > */}

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteChapterField(index)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              marginLeft: "2px",
                            }} // Added marginLeft for the "ml-2" class
                          >
                            <i class="feather-minus"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn bg-current mt-2 text-white"
                        onClick={addChapterField}
                      >
                        Add Chapter
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-3 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right mt-2"
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

export default EditChapter;
