import React, { useEffect, useState } from "react";
import AppFooter from "../../components/includes/AppFooter";
import AppHeader from "../../components/includes/AppHeader";
import StudentSidebar from "../../components/includes/StudentSidebar";
import BackButton from "../../components/navigation/BackButton";
import { Bars } from "react-loader-spinner";
import { Link} from "react-router-dom";

function Internship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}api/get_student_internships`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInternships(data.internships);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching internships:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Bars
        height="50"
        width="50"
        color="#ff9500"
        ariaLabel="bars-loading"
        wrapperClass="d-flex justify-content-center align-items-center vh-100"
        visible={true}
      />
    );
  }

  return (
   
        <div className="middle-sidebar-bottom theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  <b>Internship</b>
                </h2>
              </div>
              <div className="float-right">
                <BackButton />
              </div>
            </div>
            <div className="row">
              {internships.map((internship, index) => (
                <div className="col-4" key={index}>
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card w-100 shadow-xss rounded-10 overflow-hidden border-0 mb-3 mt-0 p-4">
                      <div className="card-body d-block pt-4 text-center">
                        <figure className="avatar position-relative w-110 z-index-1 w100 z-index-1 mr-auto ml-auto">
                          <img
                            src={`${baseUrl}${internship.project_image}`}
                            alt={`Image ${index + 1}`}
                            className="p-3 bg-greylight rounded-lg w-100"
                          />
                        </figure>
                        <h4 className="font-xs ls-1 fw-700 text-grey-900">
                          {internship.project_name}
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            {internship.internship_tasks_count} Stages
                          </span>
                        </h4>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-center pl-1 pr-1 pt-0">
                      <Link to={`/internship/${internship.id}`}>
                        <button
                          className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase"
                          // onClick={() =>
                          //   handleParticipateClick(internship.project_image)
                          // }
                        >
                          Participate
                        </button>
                        </Link>
                        <button
                          onClick={() => {
                            const downloadUrl = `${baseUrl}api/download-image/${internship.id}`;
                            window.location.href = downloadUrl;
                          }}
                          className="bg-success text-white rounded-xl btn-cart w125 d-inline-block text-center font-xsssss p-3 fw-700 ls-3 text-uppercase"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => {
                            const downloadUrl = `${baseUrl}api/download-image/${internship.id}`;
                            window.location.href = downloadUrl;
                          }}
                          className="bg-greylight theme-white-bg btn-round-lg ml-1 rounded-3 text-grey-700"
                        >
                          <i className="feather-download-cloud"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <StudentSidebar />
          </div>
      
    </div>
  );
}

export default Internship;
