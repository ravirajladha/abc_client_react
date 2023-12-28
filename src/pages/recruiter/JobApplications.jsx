import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../lib/AuthContext.js";

import BackButton from "../../components/navigation/BackButton.jsx";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function JobApplications() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = useContext(AuthContext).user;
  const userId = user.user.id;
  const { jobId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const fetchJobApplications = async () => {
    setLoading(true);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${baseUrl}api/get-job-applications/${jobId}`
      );
      const data = await response.json();
      console.log(data);
      setApplications(data.jobApplications);
      setLoading(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error fetching Job Applications:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobApplications();
  }, []);
  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b>Job Applications</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : applications.length > 0 ? (
              <div className="card-body p-lg-5 px-4 w-100 border-0 ">
                <div className="table-responsive">
                  <table className="table table-admin mb-0">
                    <thead className="bg-greylight rounded-10 ovh">
                      <tr>
                        <th className="border-0">Sl no.</th>
                        <th className="border-0">Name</th>
                        <th className="border-0" scope="col">
                          Time
                        </th>
                        <th className="border-0" scope="col">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <b>{application.student.name}</b>
                          </td>
                          <td>
                            <b>{moment(application.created_at).format('h:mm A')}
                          </b>
                          </td>
                          <td>
                            <b>{moment(application.created_at).format('Do MMM YYYY')}</b>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <NoContent contentName="applications" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobApplications;
