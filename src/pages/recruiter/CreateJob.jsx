import React, { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";
function CreateJob() {
  const user = useContext(AuthContext).user;
  const userId = user.user.id;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [annualCtc, setAnnualCtc] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");

  const createJob = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("annual_ctc", annualCtc);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("criteria", criteria);
    formData.append("created_by", userId);

    fetch(baseUrl + "api/create-job", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        setTitle("");
        setImage("");
        setAnnualCtc("");
        setLocation("");
        setDescription("");
        setCriteria("");
        toast.success(resp.msg);
        navigate(`/all-jobs`);
      })
      .catch((err) => {
        toast.error("Could not create class: " + err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  if (!user) {
    // Handle the case when there is no user. You might want to redirect
    // to a login page or return null or some placeholder content.
    console.log("No user found. User might be logged out.");
    return <div>User is not logged in</div>;
  }
    return (
        <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  Create <b>Job</b>
                </h2>
              </div>
              <div className="float-right">
             
                <BackButton />
              </div>
            </div>
            <ToastContainer autoClose={3000} />
            <div className="card w-100 mt-4 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <form onSubmit={createJob}>
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        Job Title
                      </label>
                      <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                            />
                    </div>
                    <div className="col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        Job Image
                      </label>
                      <input
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control"
                              required
                              accept="image/*"
                            />
                    </div>
                    <div className="col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        CTC
                      </label>
                      <input
                              type="number"
                              className="form-control"
                              placeholder="1.00" step="0.01" min="0" max="100"
                              value={annualCtc}
                              onChange={(e) => setAnnualCtc(e.target.value)}
                              required
                            />
                    </div>
                    <div className="col-lg-6">
                      <label className="mont-font fw-600 font-xsss">
                        Job Location
                      </label>
                      <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required
                            />
                    </div>
                    <div className="col-lg-12">
                      <label className="mont-font fw-600 font-xsss">
                        Description
                      </label>
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
                      <label className="mont-font fw-600 font-xsss">
                        Criteria
                      </label>
                      <textarea
                              rows="4"
                              cols="70"
                              className="form-control"
                              placeholder="Enter Criteria.."
                              value={criteria}
                              onChange={(e) => setCriteria(e.target.value)}
                              required
                            ></textarea>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 mt-3 float-end"
                        disabled={isSubmitting}
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
    )
}

export default CreateJob
