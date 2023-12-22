import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import BackButton from "../../components/navigation/BackButton";
import Loader from "../../components/common/Loader.jsx";
import NoContent from "../../components/common/NoContent.jsx";

function MiniProjects() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [miniProjects, setMiniProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  function getMiniProjects() {
    setLoading(true);
    fetch(baseUrl + "api/get_mini_projects")
      .then(function (result) {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then(function (jsonbody) {
        setMiniProjects(jsonbody);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching mini projects:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getMiniProjects();
  }, []);

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Mini Projects</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/mini_projects/create_project"}
                  className="p-2 d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  CREATE PROJECT
                </Link>

                <BackButton />
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : miniProjects && miniProjects.length > 0 ? (
              miniProjects.map((miniProject, index) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                  {/* <div className="item m-1"> */}
                  <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                  <a
                            href="#"
                            className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                          >
                        <img
                          src={baseUrl + miniProject.project_image}
                          alt="icon"
                              className="p-1"
                        />
                      </a>
                      <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xss mt-3 mb-1">
                          {miniProject.project_name}
                        </h4>
                        <p className="fw-500 font-xssss text-grey-500 mt-0 mb-2">
                          {miniProject.description}
                        </p>

                        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                        Count
                          </span>

                          <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                          {miniProject.project_tasks_count}
                          </span>


                          <div className="mt-2">
                      
                        <Link
                          to={`/all-tasks/${miniProject.id}`}
                          className="d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current"
                        >
                          View Tasks
                        </Link>
                      </div>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              ))
            ) : (
              <NoContent contentName="mini projects" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MiniProjects;
