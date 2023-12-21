import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function ViewInternship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getInternshipDetails();
  }, []);

  function getInternshipDetails() {
    setLoading(true);

    fetch(baseUrl + "api/get_internships")
      .then(function (result) {
        return result.json();
      })
      .then(function (jsonbody) {
        console.log(jsonbody);
        setInternships(jsonbody);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching internships:", error);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Internships</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/addInternship"}
                  className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  Add Internship
                </Link>
                <BackButton />
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : internships && internships.length > 0 ? (
              internships.map((internship, index) => (
                <div className="row  mb-3">
                  <div className="col-xl-4 col-lg-3 col-md-3" key={index}>
                    <div className="item m-1">
                      <div className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                        <div className="card-image w-100">
                          <img
                            src={baseUrl + internship.project_image}
                            alt="image"
                            className="w-100"
                            style={{ height: 100 }}
                          />
                        </div>
                        <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xss mt-3 mb-1">
                            {internship.project_name}
                          </h4>
                          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-2">
                            {internship.description}
                          </p>
                          <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success my-1 mr-1">
                            Count
                          </span>
                          <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                            {internship.internship_tasks_count}
                          </span>
                          <Link
                            to={`/internshipTasks/${internship.id}`}
                            className="d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                          >
                            View Tasks
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoContent contentName="internships" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewInternship;
