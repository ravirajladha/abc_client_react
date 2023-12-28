import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import BackButton from "../../../components/navigation/BackButton";

import "../../../css/custom.css";

function ProjectReportModules() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { projectReportId } = useParams();
  const [activeKey] = useState("0");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  if (message) {
    toast.success(message);
  }

  const [projectReportModules, setProjectReportModules] = useState([]);
  function getProjectReportModules() {
    fetch(baseUrl + "api/get-project-report-modules/" + projectReportId).then(function (
      result
    ) {
      result.json().then(function (jsonData) {
        console.warn(jsonData);
        setProjectReportModules(jsonData.projectReportModules);
      });
    });
  }
  useEffect(() => {
    getProjectReportModules();
  },[]);

  return (
    <>
    
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="middle-sidebar-left">
              <div className="row">
                <ToastContainer autoClose={3000} />
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                        Project Report <b> Contents </b>
                    </h2>
                  </div>
                  <div className="float-right">
                  <Link
                          to={"/project-reports/preview_project-report-admin/" + projectReportId}
                          className="px-3 py-2 me-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                        >
                          VIEW
                        </Link>
                        <Link
                      to={"/project-reports/" + projectReportId + "/create-module"}
                      className="px-3 py-2 me-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      CREATE MODLUE
                    </Link>
                    <BackButton />
                  </div>
                </div>

                <div>
                  <Accordion
                    defaultActiveKey={activeKey}
                    alwaysOpen
                    className="accordion accordion-course shadow-sm"
                  >
                    {projectReportModules ? (
                      projectReportModules &&
                      projectReportModules.map((module, index) => (
                        <Accordion.Item
                          key={index}
                          eventKey={String(index)}
                          className="accordion-item border-0 mb-0 rounded-sm bg-white"
                        >
                          <Accordion.Header
                            style={{ position: "relative" }}
                            className="fw-bold"
                          >
                            {module.module_title}
                            <Link
                              to={"/project-reports/add-elements/" + module.id}
                              className="p-2 text-current fw-700 rounded-lg text-center font-xss position-absolute top-50 end-0 translate-middle mr-5"
                            >
                              <i className="feather-edit me-0"></i>
                            </Link>
                          </Accordion.Header>
                          
                        </Accordion.Item>
                      ))
                    ) : (
                      <Accordion.Item
                        eventKey="0"
                        className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
                      ></Accordion.Item>
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
      
    </>
  );
}

export default ProjectReportModules;
