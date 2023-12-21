import React, { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../../../components/navigation/BackButton";

function EditSubject() {
  const navigate = useNavigate();
  const { classId, subjectId } = useParams();
  const fileInputRef = useRef();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");

  const fetchSubjectDetails = async () => {
    try {
      const response = await fetch(
        baseUrl + `api/get-subject-details/${subjectId}`
      );
      const data = await response.json();
      setSubject(data.subject_name);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchSubjectDetails();
  }, []);

  const updateSubject = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("subject", subject);
    formData.append("image", image);

    fetch(`${baseUrl}api/update-subject-details/${subjectId}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        setImage("");
        toast.success(resp.msg);
        navigate(`/all_classes/all_subjects/${classId}`);
      })
      .catch((err) => {
        toast.error("Could not update subject: " + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      });
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
                  Edit <b>Subject</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-sm-12">
                <div className="card w-100 mt-4 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={updateSubject}
                    >
                      <div className="row g-4">
                        <div className="col-lg-5">
                          <label className="mont-font fw-600 font-xsss">
                            Subject Name
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Subject Name"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-7">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Subject Image
                            </label>
                            <br />
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control"
                              ref={fileInputRef}
                              accept="image/*"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right mt-2"
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

export default EditSubject;
