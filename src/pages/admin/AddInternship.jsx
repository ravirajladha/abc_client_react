import React, { useState, useEffect, useRef } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import Dropdown from "../../components/inputs/Dropdown";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/navigation/BackButton";

function AddInternship() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getClasses();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef();

  function getClasses() {
    let result = fetch(baseUrl + "api/get_classes").then(function (result) {
      result.json().then(function (jsonbody) {
        setClasses(jsonbody);
      });
    });
  }

  function getSubjects() {
    let result = fetch(
      baseUrl + "api/get_subjects_by_class/" + selectedClass
    ).then(function (result) {
      result.json().then(function (jsonbody) {
        //console.warn(jsonbody);
        setSubjects(jsonbody);
      });
    });
  }

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedClass(selectedValue);
  };

  const handleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSubject(selectedValue);
  };

  useEffect(() => {
    getSubjects();
  }, [selectedClass]);

  const createProject = (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("class", selectedClass);
    formData.append("subject", selectedSubject);
    formData.append("image", image);
    e.preventDefault();
    setIsSubmitting(true);

    fetch(baseUrl + "api/create_internship", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setSelectedClass("");
        setSelectedSubject("");

        setName("");
        setDescription("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setImage(null);
        toast.success(resp.msg);
      })
      .catch((err) => {
        toast.error("Could not submit question :" + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <>

          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                    <div className="">
                      <h2 className="fw-400 font-lg d-block">
                        Add <b> Internship</b>
                      </h2>
                    </div>
                    <div className="float-right">
                      <BackButton />
                    </div>
                  </div>
                  <ToastContainer autoClose={3000} />

                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <form
                      encType="multipart/form-data"
                      onSubmit={createProject}
                    >
                      <div className="row mb-6">
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Internship Name
                            </label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
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
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Select Class
                            </label>
                            <br />
                            <Dropdown
                              options={classes}
                              column_name="class"
                              value={selectedClass}
                              onChange={handleClassChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
                              Select Subject
                            </label>
                            <br />
                            <Dropdown
                              options={subjects}
                              column_name="subject_name"
                              value={selectedSubject}
                              onChange={handleSubjectChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="">
                            <label className="mont-font fw-600 font-xsss">
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-3 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0"
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

export default AddInternship;
