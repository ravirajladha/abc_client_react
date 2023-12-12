import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";

import { Accordion } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import Heading from "./ebook-elements/Heading";
import Paragraph from "./ebook-elements/Paragraph";
import Image from "./ebook-elements/Image";
import Image_2_1 from "./ebook-elements/Image_2_1";
import Image_2_4 from "./ebook-elements/Image_2_4";
import Image_2_3 from "./ebook-elements/Image_2_3";
import Image_2_2 from "./ebook-elements/Image_2_2";
import Image_3_1 from "./ebook-elements/Image_3_1";
import Image_3_2 from "./ebook-elements/Image_3_2";
import Image_4_1 from "./ebook-elements/Image_4_1";
import Image_4_2 from "./ebook-elements/Image_4_2";
import Image_4_3 from "./ebook-elements/Image_4_3";
import Image_5_1 from "./ebook-elements/Image_5_1";
import Image_5_2 from "./ebook-elements/Image_5_2";
import Image_6_1 from "./ebook-elements/Image_6_1";
import Image_6_2 from "./ebook-elements/Image_6_2";
import Image_6_3 from "./ebook-elements/Image_6_3";
import Image_7_1 from "./ebook-elements/Image_7_1";
import Image_7_2 from "./ebook-elements/Image_7_2";
import Image_8_1 from "./ebook-elements/Image_8_1";
import Image_8_2 from "./ebook-elements/Image_8_2";
import Image_10_1 from "./ebook-elements/Image_10_1";
import Image_10_2 from "./ebook-elements/Image_10_2";
import Image_10_3 from "./ebook-elements/Image_10_3";
import Examples from "./ebook-elements/Examples";
import GifFile from "./ebook-elements/GifFile";
import ExamplePractice from "./ebook-elements/ExamplePractice";
import ExampleVideoPractice from "./ebook-elements/ExampleVideoPractice";
import List from "./ebook-elements/List";
import ExampleImagePractice from "./ebook-elements/ExampleImagePractice";
import Buttons from "./ebook-elements/Buttons";
import TextBox from "./ebook-elements/TextBox";
import SingleButton from "./ebook-elements/SingleButton";
import BackButton from "../../../components/navigation/BackButton";

function PreviewEbook() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { ebook_id } = useParams();

  const location = useLocation();

  useEffect(() => {
    getEbookModules();
    getEbook();
    getEbookElements();
  });

  const [ebookModules, setEbookModules] = useState([]);

  function getEbookModules() {
    fetch(baseUrl + "api/get_ebook_modules/" + ebook_id).then(function (
      result
    ) {
      result.json().then(function (json) {
        setEbookModules(json.ebook_modules);
      });
    });
  }

  const [ebook, setEbook] = useState([]);

  function getEbook() {
    fetch(baseUrl + "api/get_ebook_by_id/" + ebook_id).then(function (result) {
      result.json().then(function (jsonRes) {
        setEbook(jsonRes);
      });
    });
  }

  const [ebookElements, setEbookElements] = useState([]);
  const [moduleRefs, setModuleRefs] = useState({});

  function getEbookElements() {
    fetch(baseUrl + "api/get_elements_by_ebook/" + ebook_id).then(function (
      result
    ) {
      result.json().then(function (ebookElements) {
        setEbookElements(ebookElements);
      });
    });
  }

  function generateId(sectionTitle) {
    if (sectionTitle) {
      const title = sectionTitle.replace(/[^a-zA-Z0-9\s]/g, "");

      const id = title.toLowerCase().replace(/\s+/g, "-");

      return id;
    }
  }

  useEffect(() => {
    const refs = {};
    ebookModules.forEach((module, moduleIndex) => {
      refs[moduleIndex] = module.ebook_sections.map(() => React.createRef());
    });
    setModuleRefs(refs);
  }, [ebookModules]);

  const handleScroll = (moduleIndex, sectionIndex) => () => {
    if (moduleRefs[moduleIndex] && moduleRefs[moduleIndex][sectionIndex]) {
      const sectionRef = moduleRefs[moduleIndex][sectionIndex];
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      console.error(
        "Ref not found or not loaded for module:",
        moduleIndex,
        "section:",
        sectionIndex
      );
    }
  };

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");

      const interval = setInterval(() => {
        const element = document.getElementById(id);
        console.log(element); // Logging the element for debugging
        if (element) {
          clearInterval(interval); // Clear the interval once the element is found
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 10); // Check every 100 milliseconds

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [location]);

  if (!ebookModules || !Object.keys(moduleRefs).length) {
    return (
      <div className="vh-100">
        {/* <Spinner
          animation="border"
          variant="current"
          className="d-flex align-items-center"
        > */}
        <span className="visually-hidden">Loading...</span>
        {/* </Spinner> */}
      </div>
    );
  }

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

      {/* <div id="#top"></div> */}

      <nav
        id="nav-scroll"
        className="side-nav left-nav navbar-expand-lg nav bg-white"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggle"
          aria-controls="navbar-toggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar top-bar"></span>
          <span className="icon-bar middle-bar"></span>
          <span className="icon-bar bottom-bar"></span>
        </button>

        <Accordion
          defaultActiveKey="0"
          className="accordion mb-0 accordion-course"
        >
          <img src={baseUrl + ebook.image} alt="" />
          {ebookModules ? (
            ebookModules &&
            ebookModules.map((module, moduleIndex) => (
              <Accordion.Item
                key={moduleIndex}
                eventKey={moduleIndex}
                className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
              >
                <Accordion.Header>{module.module_title}</Accordion.Header>
                <Accordion.Body className="py-0">
                  {module.ebook_sections ? (
                    module.ebook_sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <Link
                          className="nav-link sidenav-sub-item"
                          onClick={handleScroll(moduleIndex, sectionIndex)}
                          to={`#${generateId(section.section_title)}`}
                          style={{ padding: "12px 0px" }}
                        >
                          {section.section_title}
                        </Link>
                        <hr style={{ margin: 0 }} />
                      </div>
                    ))
                  ) : (
                    <h2 className="fw-400 font-lg d-block">Loading ... </h2>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <Accordion.Item
              eventKey="0"
              className="accordion-item border-0 mb-0 shadow-xss rounded-sm bg-white"
            ></Accordion.Item>
          )}
        </Accordion>
      </nav>
      <div className="page-container">
        <div className="doc-container">
          <div className="d-flex rounded-lg justify-content-between">
            <h4 id="getting-started" className="doc-main-title">
              {ebook.title}
              <Link to={`#${generateId(ebook.title)}`}>
                <i className="fas fa-hashtag"></i>
              </Link>
            </h4>
            <div className="float-right">
              <BackButton />
            </div>
          </div>

          <div id="" className="doc-wrapper">
            <div className="doc-preview d-flex justify-content-center">
              <img
                src={baseUrl + ebook.image}
                alt="preview"
                className="introduction-img"
                style={{ width: "60%", height: "auto" }}
              />
            </div>
          </div>
          {ebookModules
            ? ebookModules &&
              ebookModules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  id={`#${generateId(module.module_title)}`}
                >
                  <h4 id="content" className="doc-main-title">
                    {module.module_title}
                    <Link to={`#${generateId(module.module_title)}`}>
                      <i className="fas fa-hashtag"></i>
                    </Link>
                  </h4>

                  {module.ebook_sections ? (
                    module.ebook_sections.map((section, sectionIndex) => (
                      <div
                        ref={moduleRefs[moduleIndex][sectionIndex]}
                        id={generateId(section.section_title)}
                        className="doc-wrapper"
                        key={sectionIndex}
                      >
                        <div className="d-flex justify-content-center">
                          <h6 className="doc-title custom-h6">
                            {section.section_title}{" "}
                          </h6>
                        </div>

                        {ebookElements
                          ? ebookElements &&
                            ebookElements.map((element, j) => (
                              <div key={j}>
                                {element.section_id === section.id &&
                                  element.element_id === 1 && (
                                    <Heading element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 2 && (
                                    <Paragraph element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 4 && (
                                    <Image element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 5 &&
                                  element.image_type === "image_2_1" && (
                                    <Image_2_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 5 &&
                                  element.image_type === "image_2_2" && (
                                    <Image_2_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 5 &&
                                  element.image_type === "image_2_3" && (
                                    <Image_2_3 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 5 &&
                                  element.image_type === "image_2_4" && (
                                    <Image_2_4 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 6 &&
                                  element.image_type === "image_3_1" && (
                                    <Image_3_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 6 &&
                                  element.image_type === "image_3_2" && (
                                    <Image_3_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 7 &&
                                  element.image_type === "image_4_1" && (
                                    <Image_4_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 7 &&
                                  element.image_type === "image_4_2" && (
                                    <Image_4_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 7 &&
                                  element.image_type === "image_4_3" && (
                                    <Image_4_3 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 8 &&
                                  element.image_type === "image_5_1" && (
                                    <Image_5_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 8 &&
                                  element.image_type === "image_5_2" && (
                                    <Image_5_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 9 &&
                                  element.image_type === "image_6_1" && (
                                    <Image_6_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 9 &&
                                  element.image_type === "image_6_2" && (
                                    <Image_6_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 9 &&
                                  element.image_type === "image_6_3" && (
                                    <Image_6_3 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 10 &&
                                  element.image_type === "image_7_1" && (
                                    <Image_7_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 10 &&
                                  element.image_type === "image_7_2" && (
                                    <Image_7_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 11 &&
                                  element.image_type === "image_8_1" && (
                                    <Image_8_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 11 &&
                                  element.image_type === "image_8_2" && (
                                    <Image_8_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 13 &&
                                  element.image_type === "image_10_1" && (
                                    <Image_10_1 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 13 &&
                                  element.image_type === "image_10_2" && (
                                    <Image_10_2 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 13 &&
                                  element.image_type === "image_10_3" && (
                                    <Image_10_3 element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 15 && (
                                    <Examples element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 14 && (
                                    <List element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 18 && (
                                    <GifFile element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 19 && (
                                    <ExamplePractice element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 20 && (
                                    <ExampleVideoPractice element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 21 && (
                                    <ExampleImagePractice element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 22 && (
                                    <Buttons element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 23 && (
                                    <TextBox element={element} />
                                  )}
                                {element.section_id === section.id &&
                                  element.element_id === 24 && (
                                    <SingleButton element={element} />
                                  )}
                              </div>
                            ))
                          : ""}
                      </div>
                    ))
                  ) : (
                    <h2 className="fw-400 font-lg d-block">Loading ... </h2>
                  )}
                </div>
              ))
            : ""}
        </div>
      </div>

      {/* <!-- Core JavaScript --> */}
      <script src="/assets_ebook/js/bootstrap.bundle.min.js"></script>
      <script src="/assets_ebook/js/theme.js"></script>

      {/* <!-- aos --> */}
      <script src="/assets_ebook/js/aos.js"></script>
      {/* <script>
        AOS.init({
            duration: 1200,
        })
    </script> */}
      {/* <!-- / aos --> */}

      {/* <!-- prism --> */}
      <script src="/assets_ebook/js/prism.js"></script>
      {/* <!-- / prism --> */}

      {/* <!-- copy-to-clipboard --> */}
      <script src="/assets_ebook/js/clipboard.min.js"></script>

      <script src="/assets_ebook/js/audio.js"></script>
    </>
  );
}

export default PreviewEbook;
