import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import { Accordion } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Loader from "../../../components/common/Loader.jsx";
import Paragraph from "../ebook/ebook-elements/Paragraph.jsx";
import List from "../ebook/ebook-elements/List.jsx";

function PreviewCaseStudy() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { caseStudyId } = useParams();
  // Define a state for toggling the navigation menu
  const [isNavOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Toggle function
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const location = useLocation();

  const [caseStudy, setCaseStudy] = useState([]);
  const [moduleRefs, setModuleRefs] = useState({});

  function getCaseStudy() {
    fetch(baseUrl + "api/get-case-study-details/" + caseStudyId).then(function (
      result
    ) {
      result.json().then(function (jsonData) {
        console.warn(jsonData);
        setCaseStudy(jsonData.caseStudy);
        setLoading(false);
      });
    });
  }
  useEffect(() => {
    getCaseStudy();
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
        {/* <nav
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
            <ul
              className=""
              id="main-collapse"
              style={{margin: 0, padding: 0,height: "100%", 
              overflowY: "auto", }}
            >
              <img
                src="/assets_ebook/images/use_case.png"
                alt=""
                style={{ width: "100%", height: "auto" }}
                className="p-4"
              />
              {caseStudy.case_study_modules
                ? caseStudy.case_study_modules &&
                  caseStudy.case_study_modules.map((module, moduleIndex) => (
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
                  ))
                : ""}
            </ul>
          </div>
        </nav> */}

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
                src="/assets_ebook/images/use_case.png"
                alt=""
                style={{ width: "100%", height: "auto" }}
                className="p-4"
              />
              {caseStudy.case_study_modules
                ? caseStudy.case_study_modules.map((module) => (
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
                          {module.case_study_sections.map((section) => (
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
                  {caseStudy.title}
                </h4>
              </div>
              <div id="" className="doc-wrapper">
                <div className="doc-preview d-flex justify-content-center">
                  <img
                    src={baseUrl + caseStudy.image}
                    alt="preview"
                    className="introduction-img"
                    style={{ width: "60%", height: "auto" }}
                  />
                </div>
              </div>
              {caseStudy.case_study_modules
                ? caseStudy.case_study_modules.map((module, index) => (
                    <div key={index}>
                      <h4 id="content" className="doc-main-title">
                        {module.module_title}
                      </h4>
                      {module.case_study_sections.map(
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

                              {section.case_study_elements.map(
                                (element, elementIndex) => (
                                  <div
                                    key={elementIndex}
                                  >
                                      {element.element_id === 1 && (
                                        <Paragraph element={element} />
                                      )}
                                      {element.element_id === 2 && (
                                        <ul
                                          className={`list-unstyled list-icon list-${element.list_type} list-success mb-25`}
                                        >
                                          {element.list_points
                                            .split("#@#")
                                            .map((point, index) => (
                                              <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                      )}
                                      {element.element_id === 3 && (
                                        <ul
                                          className={`list-unstyled list-icon list-${element.list_type} list-success mb-25`}
                                        >
                                          {element.list_points
                                            .split("#@#")
                                            .map((point, index) => (
                                              <React.Fragment key={index}>
                                                <li>
                                                  <h6
                                                    style={{
                                                      fontWeight: "600",
                                                    }}
                                                  >
                                                    {point}
                                                  </h6>
                                                </li>
                                                <p
                                                  className="pt-2 ms-4"
                                                  style={{ fontSize: "18px" }}
                                                >
                                                  {
                                                    element.list_description.split(
                                                      "#@#"
                                                    )[index]
                                                  }
                                                </p>
                                              </React.Fragment>
                                            ))}
                                        </ul>
                                      )}
                                      {element.element_id === 4 &&
                                        element.appendices_heading
                                          .split("#@#")
                                          .map((heading, index) => (
                                            <React.Fragment key={index}>
                                              <h6 style={{ fontWeight: "600" }}>
                                                {heading}:{" "}
                                                <span
                                                  style={{ fontWeight: "400" }}
                                                >
                                                  {
                                                    element.appendices_sub_heading.split(
                                                      "#@#"
                                                    )[index]
                                                  }
                                                </span>
                                              </h6>
                                              <p
                                                className="pt-2 ms-4"
                                                style={{ fontSize: "18px" }}
                                              >
                                                {
                                                  element.appendices_desc.split(
                                                    "#@#"
                                                  )[index]
                                                }
                                              </p>
                                            </React.Fragment>
                                          ))}
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

export default PreviewCaseStudy;
