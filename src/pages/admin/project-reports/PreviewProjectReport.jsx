import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import { Accordion } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Loader from "../../../components/common/Loader.jsx";
import Paragraph from "../ebook/ebook-elements/Paragraph.jsx";

function PreviewProjectReport() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { projectReportId } = useParams();
  // Define a state for toggling the navigation menu
  const [isNavOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        });
      }
    );
  }
  useEffect(() => {
    getProjectReport();
  }, []);

// for nav dropdowsns
  const [visibleModule, setVisibleModule] = useState(null);

  const toggleSections = (moduleId) => {
    // Toggle the visibility of sections for the clicked module
    setVisibleModule((prevVisibleModule) =>
      prevVisibleModule === moduleId ? null : moduleId
    );
  };
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
          className="side-nav left-nav navbar-expand-lg nav bg-white p-1"
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
            <ul
              className="list-unstyled"
              id="main-collapse"
              style={{
                margin: 0,
                padding: 0,
                height: "100%",
                overflowY: "auto",
                transition: "height 0.3s ease-in-out",
              }}
            >
              <img
                src="/assets_ebook/images/project_report.png"
                alt=""
                style={{ width: "100%", height: "auto" }}
                className="p-4"
              />
              {projectReport.project_report_modules
                ? projectReport.project_report_modules.map((module) => (
                    <li
                      key={module.id}
                      className="mb-3"
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        onClick={() => toggleSections(module.id)}
                        style={{
                          fontWeight: 700,
                          fontSize: "14px",
                        }}
                      >
                        {module.module_title}
                      </div>

                      {visibleModule === module.id && (
                        <ul style={{ paddingLeft: "10px" }}>
                          {module.project_report_sections.map((section) => (
                            <li key={section.id}>
                              <ScrollLink
                                to={section.id}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                                style={{
                                  fontWeight: 500,
                                  fontSize: "12px",
                                  color: "#555",
                                  cursor: "pointer",
                                }}
                              >
                                {section.section_title}
                              </ScrollLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </nav>
        

        <div className="page-container">
          {loading ? (
            <Loader />
          ) : (
            <div className="doc-container">
              <div className="d-flex rounded-lg justify-content-between">
                <h4 id="getting-started" className="doc-main-title">
                  {projectReport.title}
                </h4>
              </div>
              <div id="" className="doc-wrapper">
                <div className="doc-preview d-flex justify-content-center">
                  <img
                    src={baseUrl + projectReport.image}
                    alt="preview"
                    className="introduction-img"
                    style={{ width: "60%", height: "auto" }}
                  />
                </div>
              </div>
              {projectReport.project_report_modules
                ? projectReport.project_report_modules.map((module, index) => (
                    <div key={index}>
                      <h4 id="content" className="doc-main-title">
                        {module.module_title}
                      </h4>
                      {module.project_report_sections.map(
                        (section, sectionIndex) => (
                          <div
                            className="doc-wrapper"
                            key={sectionIndex}
                            id={section.id}
                          >
                            <div className="d-flex justify-content-center">
                              <h6 className="doc-title custom-h6">
                                {section.section_title}{" "}
                              </h6>
                            </div>
                              {section.project_report_elements.map(
                                (element, elementIndex) => (
                                  <div
                                    key={elementIndex}
                                  >
                                      {element.element_id === 2 && (
                                        <Paragraph element={element} />
                                      )}
                                  </div>
                                )
                              )}
                          </div>
                        )
                      )}
                    </div>
                  ))
                : ""}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PreviewProjectReport;
