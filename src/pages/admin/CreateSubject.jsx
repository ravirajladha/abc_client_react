import React, { useRef, useState, useEffect } from "react";
import BackButton from "../../components/navigation/BackButton";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function CreateSubject() {
  const navigate = useNavigate();
  const { class_id } = useParams();
  const fileInputRef = useRef();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getClasses();
  }, []);

  const [classes, setClasses] = useState(class_id);
  const [selectedClass, setSelectedClass] = useState(class_id);
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  function getClasses() {
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setClasses(jsonbody);
      });
    });
  }

  const createSubject = (e) => {
    const formData = new FormData();
    formData.append("class", selectedClass);
    formData.append("subject", subject);
    formData.append("image", image);
    formData.append("description", description);
    e.preventDefault();
    setIsSubmitting(true);
    fetch(baseUrl + "api/create_subject", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setImage("");
        setSubject("");
        toast.success(resp.msg);
      })
      .catch((err) => {
        toast.error("Could not submit question :" + err.message);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the submit button
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      });
  };



  return (
    <>
    
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <ToastContainer autoClose={3000} />
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      Create <b>Subject</b>
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
                      onSubmit={createSubject}
                    >
                      <div className="row mb-6">
                        <div className="col-lg-6">
                          <label className="mont-font fw-600 font-xsss">
                            {" "}
                            Name
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
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              {" "}
                              Image
                            </label>
                            <br />
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control"
                              required
                              ref={fileInputRef}
                              accept="image/*"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label className="mont-font fw-600 font-xsss">
                            {" "}
                            Description
                          </label>
                          <br />
                          <textarea
                            rows="4"
                            cols="70"
                            className="form-control"
                            placeholder="Enter Description.."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
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
       
    </>
  );
}

export default CreateSubject;
