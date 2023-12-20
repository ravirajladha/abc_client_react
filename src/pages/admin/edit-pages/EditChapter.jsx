import React, { useEffect, useState } from "react";
import BackButton from "../../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function EditChapter() {
  const navigate = useNavigate();
  const { subjectId, chapterId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [chapterName, setChapterName] = useState("");

  const fetchClass = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-chapter-details/${chapterId}`
      );
      const data = await response.json();
      setChapterName(data.chapter_name);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const editChapter = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (!chapterName) {
        toast.error("Chapter name is empty");
      }
  
      const formData = new FormData();
      formData.append("chapter_name", chapterName);
  
      const response = await fetch(
        `${baseUrl}api/update-chapter-details/${chapterId}`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.ok) {
        toast.success("Chapter updated successfully");
        navigate(`/all_classes/all_subjects/all_chapters/${subjectId}`);
      } else {
        throw new Error("Failed to update chapter");
      }
    } catch (error) {
      toast.error("Could not update chapter: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                  Edit <b>Chapter</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-md-12">
                <div className="card w-100 mt-4 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form encType="multipart/form-data" onSubmit={editChapter}>
                      <div className="row g-2">
                        <div className="col-lg-12">
                          <label className="mont-font fw-600 font-xsss">
                            Chapter Name
                          </label>
                          <br />
                          <div className="d-flex mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              value={chapterName}
                              onChange={(e) => setChapterName(e.target.value)}
                              required
                            />
                          </div>
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
        </div>
      </div>
    </>
  );
}

export default EditChapter;
