import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import { Accordion } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function PreviewProjectReport() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { projectReportId } = useParams();
  // Define a state for toggling the navigation menu
  const [isNavOpen, setNavOpen] = useState(false);

  // Toggle function
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const location = useLocation();

  const [projectReport, setProjectReport] = useState([]);
  const [moduleRefs, setModuleRefs] = useState({});

  function getProjectReport() {
    fetch(baseUrl + "api/get-project-report-details/" + projectReportId).then(
      function (result) {
        result.json().then(function (jsonData) {
          console.warn(jsonData);
          setProjectReport(jsonData.projectReport);
        });
      }
    );
  }
  useEffect(() => {
    getProjectReport();
  }, []);
  return (
    <>
      {/* <!-- Bootstrap 5 Core CSS --> */}
      <link href="/assets_ebook/css/bootstrap.min.css" rel="stylesheet" />
      {/* <!-- Custom Styles --> */}
      <link rel="stylesheet" href="/assets_ebook/css/animate.min.css" />
      <link rel="stylesheet" href="/assets_ebook/css/aos.css" />
      <link rel="stylesheet" href="/assets_ebook/css/style.css" />
      <link rel="stylesheet" href="/assets_ebook/css/prism.css" />
      <link rel="stylesheet" href="/assets_ebook/css/doc.css" />
      {/* <!-- custom image css  --> */}
      <link rel="stylesheet" href="/assets_ebook/css/image.css" />

      {/* Fonts */}
      <link
        rel="stylesheet"
        href="/assets_ebook/css/fontawesome-all.min.css"
        type="text/css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* <!-- Fonts --> */}
      <link
        rel="stylesheet"
        href="/assets_ebook/css/fontawesome-all.min.css"
        type="text/css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* <!-- script --> */}
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

      {/* <!-- video player --> */}
      <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />

      {/* <!-- audio --> */}
      <link
        href="https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,600,600i,700,700i"
        rel="stylesheet"
      />
      <link
        rel="prefetch"
        href="https://rpsthecoder.github.io/js-speech-synthesis/pause1.svg"
      />
      <link
        rel="prefetch"
        href="https://rpsthecoder.github.io/js-speech-synthesis/stop1.svg"
      />
      <link
        rel="prefetch"
        href="https://rpsthecoder.github.io/js-speech-synthesis/play1.svg"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"
      />
      <div className="doc-body doc-white-body">
        <nav
          id="nav-scroll"
          className="side-nav left-nav navbar-expand-lg nav bg-white p-3"
        >
          <button
            className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
            onClick={toggleNav}
            type="button"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbar-toggle"
          >
            <ul className="" id="main-collapse" style={{margin: 0, padding: 0,height: "100%", 
              overflowY: "auto", }} >
              <img src="/assets_ebook/images/project_report.png" alt=""
              style={{width:"100%", height:"auto"}}
              className="p-4" />
              {projectReport.project_report_modules
                ? projectReport.project_report_modules &&
                  projectReport.project_report_modules.map(
                    (module, moduleIndex) => (
                      <li
                      key={moduleIndex}
                        className="nav-item mb-3"
                        style={{
                          borderBottom: "3px solid #273078",
                          borderRadius: "10px",
                          backgroundColor: "#f0f0f0",
                          fontWeight: 700,
                        }}
                      >
                         <ScrollLink
                    to={module.module_title}
                    spy={true}
                    smooth={true}
                    offset={-70} // adjust the offset as needed
                    duration={500}
                    className="nav-link"
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#000",
                    }}
                  >
                    <span>{module.module_title}</span>
                  </ScrollLink>
                      </li>
                    )
                  )
                : ""}
            </ul>
          </div>
        </nav>
        <div className="page-container" style={{backgroundColor:"#f0f0f0"}}>
          <div className="doc-container">
            <h2
              id="getting-started"
              className="text-center mb-4"
              style={{
                fontFamily: "'Raleway','Poppins', 'sans-serif'",
                fontWeight: 800,
              }}
            >
              {projectReport.title}
            </h2>
            {projectReport.project_report_modules
              ? projectReport.project_report_modules.map((module) => (
                  <div
                    key={module.id}
                    className="mb-2"
                    style={{
                      backgroundColor: "#ffff",
                      border: "2px solid #273078",
                      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
                    }}
                    id={module.module_title}

                  >
                    <div
                      className="p-1 position-relative"
                      style={{
                        marginLeft: "65px",
                        marginRight: "65px",
                        border: "2px solid #273078",
                      }}
                    >
                      <div
                        className="p-1 position-absolute translate-middle-y d-flex justify-content-center align-items-center"
                        style={{
                          width: "63px",
                          height: "105%",
                          top: "50%",
                          left: "-68px",
                          fontSize: "35px",
                          border: "2px solid #273078",
                        }}
                      >
                        <i
                          className="feather-edit p-2 text-light"
                          style={{ backgroundColor: "#273078" }}
                        ></i>
                      </div>
                      <h4
                        id={module.module_title}
                        className="doc-main-title text-center bg-secondary p-2"
                      >
                        {module.module_title}
                      </h4>
                      <div
                        className="p-1 position-absolute translate-middle-y d-flex justify-content-center align-items-center"
                        style={{
                          width: "63px",
                          height: "105%",
                          top: "50%",
                          right: "-68px",
                          fontSize: "31px",
                          border: "2px solid #273078",
                        }}
                      >
                        <i
                          className="feather-volume-2 p-2 text-light"
                          style={{ backgroundColor: "#273078" }}
                        ></i>
                      </div>
                    </div>

                    <div className="element-container p-4">
                        
                      {module.project_report_elements.map(
                          (element) => (
                            <React.Fragment key={element.id}>
                              {element.element_id === 1 && (
                                <h6
                                  id={`${element.content}-link`}
                                  style={{
                                    fontWeight: 600,
                                    color: "#273078",
                                    fontSize: "18px",
                                  }}
                                >
                                  {element.content}
                                </h6>
                              )}

                              {element.element_id === 2 && (
                                <p
                                  className="pt-2"
                                  style={{ fontSize: "15px" }}
                                >
                                  {element.content}
                                </p>
                              )}
                            </React.Fragment>
                          )
                        )}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewProjectReport;
