import React, { useState, useEffect } from 'react';
import AppHeader from '../../../components/includes/AppHeader';
import AppFooter from '../../../components/includes/AppFooter';
import { useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../../components/navigation/BackButton';


function AddCaseStudySections() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { moduleId } = useParams();
  
    const [sectionTitles, setSectionTitles] = useState([""]); // Array to store video names
  
    const addSection = () => {
      setSectionTitles([...sectionTitles, ""]);
    };
  
    const deleteSection = (index) => {
      const updatedSectionTitles = [...sectionTitles];
      updatedSectionTitles.splice(index, 1);
      setSectionTitles(updatedSectionTitles);
    };
    useEffect(() => {
      getCaseStudyModule();
    }, []);
  
    const [caseStudyModule, setcaseStudyModule] = useState([]);
    function getCaseStudyModule() {
      let result = fetch(
        baseUrl + "api/get-case-study-module-by-id/" + moduleId
      ).then(function (result) {
        result
          .json()
          .then(function (jsonbody) {
            console.warn(jsonbody);
            setcaseStudyModule(jsonbody.caseStudyModules);
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
          });
      });
    }
    const addSections = (e) => {
      const formData = new FormData();
      formData.append("caseStudyId", caseStudyModule.case_study.id);
      formData.append("moduleId", caseStudyModule.id);
      formData.append("sectionTitles", JSON.stringify(sectionTitles));
      e.preventDefault();
  
      fetch(baseUrl + "api/add-case-study-sections", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((resp) => {
          setSectionTitles([""]);
          toast.success(resp.msg);
        })
        .catch((err) => {
          toast.error("Could not submit Ebook: " + err.message);
        });
    };
    return (
        <>
        <div className="middle-sidebar-bottom theme-dark-bg">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="card w-100 border-0 bg-white shadow-lg p-0 mb-4">
                <div className="card-body p-4 w-100 border-0 d-flex rounded-lg justify-content-between">
                  <h2 className="fw-400 font-lg d-block">
                    Add <b>Case Study Sections</b>{" "}
                  </h2>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>
                <ToastContainer autoClose={3000} />
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form encType="multipart/form-data" onSubmit={addSections}>
                    <div className="row mb-6">
                      <div className="col-lg-6">
                        <div className="">
                          <label className="mont-font fw-600 font-xsss">
                          Case Study title
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Ebook title"
                            value={
                              caseStudyModule.case_study &&
                              caseStudyModule.case_study.title
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="">
                          <label className="mont-font fw-600 font-xsss">
                          Case Study Module title
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Ebook title"
                            value={
                                caseStudyModule &&
                                caseStudyModule.module_title
                            }
                            readOnly
                          />
                        </div>
                      </div>
  
                      <div className="col-lg-12 my-4">
                        <h2 className="fw-400 font-xs d-block">
                          Add <b> Sections</b>{" "}
                        </h2>
                      </div>
                      <div className="col-lg-12">
                        {sectionTitles.map((title, index) => (
                          <div className="row align-items-center" key={index}>
                            {" "}
                            {/* Added align-items-center to align items vertically */}
                            <div className="col-lg-10">
                              <label className="mont-font fw-600 font-xsss">
                                Section Title
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Section Title"
                                value={title}
                                onChange={(e) => {
                                  const updatedSectionTitles = [...sectionTitles];
                                  updatedSectionTitles[index] = e.target.value;
                                  setSectionTitles(updatedSectionTitles);
                                }}
                                required
                              />
                            </div>
                            <div className="col-lg-2">
                              <label className="mont-font fw-600 font-xsss">
                                {" "}
                              </label>
                              <br />
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteSection(index)}
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                              >
                                <i className="feather-minus"></i>{" "}
                                {/* Changed class to className */}
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2">
                          {" "}
                          {/* Add a gap between the add button and the list */}
                          <button
                            type="button"
                            className="btn bg-success text-white"
                            onClick={addSection}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default AddCaseStudySections
