import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppHeader from "../../../components/includes/AppHeader";
import AppFooter from "../../../components/includes/AppFooter";
import BackButton from "../../../components/navigation/BackButton";

import "../../../css/custom.css";

function EbookModules() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { ebook_id } = useParams();
  const [activeKey] = useState("0");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  if (message) {
    toast.success(message);
  }

  const [ebookModules, setEbookModules] = useState([]);
  function getEbookModules() {
    fetch(baseUrl + "api/get_ebook_modules/" + ebook_id).then(function (
      result
    ) {
      result.json().then(function (jsonData) {
        console.warn(jsonData);
        setEbookModules(jsonData.ebook_modules);
      });
    });
  }
  useEffect(() => {
    getEbookModules();
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
                      Ebook <b> Contents </b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to={"/ebooks/" + ebook_id + "/create-module"}
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
                    {ebookModules ? (
                      ebookModules &&
                      ebookModules.map((module, index) => (
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
                              to={"/ebooks/add_sections/" + module.id}
                              className="p-2 text-current fw-700 rounded-lg text-center font-xss position-absolute top-50 end-0 translate-middle mr-5"
                            >
                              <i className="feather-edit me-0"></i>
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body>
                            {module.ebook_sections ? (
                              module.ebook_sections.map((section, i) => (
                                <div key={i}>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h5 className="font-xss fw-500 text-dark-500 ml-2">
                                      {section.section_title}
                                    </h5>
                                    <Link
                                      to={"/ebooks/add_elements/" + section.id}
                                      className="btn btn-icon btn-sm text-white rounded-lg text-center font-xsss bg-current float-right mr-3" title="Add new element"
                                    >
                                      <i className="feather-plus"></i>
                                    </Link>
                                  </div>
                                  <hr className="my-2" />
                                </div>
                              ))
                            ) : (
                              <h2 className="fw-400 font-lg d-block">
                                Loading ...
                              </h2>
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
                </div>
              </div>
            </div>
          </div>
      
    </>
  );
}

export default EbookModules;
