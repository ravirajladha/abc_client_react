import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";

import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Jobs() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const userId = user.user.id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    setLoading(true);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${baseUrl}api/get-jobs`
      );
      const data = await response.json();
      setJobs(data.jobs);
      setLoading(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error fetching Jobs:", error);
      setLoading(false);
    }
  };
  const applyJob = async (e, jobId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("userId", userId);
    try {
      const response = await fetch(`${baseUrl}api/apply-job`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      toast.success(data.msg);
      console.log(data);

    } catch (error) {
      console.error('Error applying for the job:', error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b>Jobs</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/all-jobs/create-job"}
                  className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                >
                  {" "}
                  CREATE JOBS
                </Link>
                <BackButton />
              </div>
            </div>
            <ToastContainer autoClose={3000} />

            {loading ? (
              <Loader />
            ) : jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                  <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                   
                    <a
                      href="#"
                      className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                    >
                      <img
                        src={baseUrl + job.image}
                        alt="image"
                        className="p-1"
                        
                      />
                    </a>
                    <h4 className="fw-700 font-xs my-3">{job.title}</h4>

                    <div className="clearfix"></div>
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-dark mb-1 mr-1">
                    ₹&emsp;{job.annual_ctc}LPA
                    </span>
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1"></span>
                    <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-dark mb-1">
                      <i className="feather-map-pin"></i>&emsp;
                      {job.location}
                    </span>
                    <div className="clearfix"></div>
                    <div className="col-lg-12">
                        <form onSubmit={(e) => applyJob(e, job.id)}>
                        <button
                        type="submit"
                        className="btn mt-4 bg-current text-center text-white font-xsss fw-600 p-2 w175 rounded-lg d-inline-block border-0"
                        disabled={isSubmitting}
                      >
                        Apply
                      </button>
                        </form>
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="jobs" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;
