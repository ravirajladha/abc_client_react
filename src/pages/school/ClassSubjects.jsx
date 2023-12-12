import React, { useState, useEffect } from "react";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";

import { useParams, Link, useNavigate } from "react-router-dom";

const ClassSubjects = () => {
  const { classId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [subjects, setSubjects] = useState([]);
  function getSubjects(classId) {
    fetch(baseUrl + "api/admin/get_subjects/" + classId).then(function (
      result
    ) {
      result.json().then(function (jsonBody) {
        console.warn(jsonBody);
        setSubjects(jsonBody);
        setIsLoading(false);
      });
    });
  }

  useEffect(() => {
    if (classId) {
      getSubjects(classId);
    }
  });


  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      <b> Subjects</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>

                <div className="card-body p-2 w-100 border-0 ">
                  <div className="row">
                    {subjects ? (
                      subjects.map((subject, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                          <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <div className="position-absolute right-0 mr-4 top-0 mt-3">
                              <i className="ti-more text-grey-500 font-xs"></i>
                            </div>
                            <Link
                              to={`/subject/${subject.id}`}
                              className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                            >
                              <img
                                src={baseUrl + subject.subject_image}
                                alt="subject"
                                className="p-1"
                              />
                            </Link>
                            <h4 className="fw-700 font-xs mt-4 capitalize">
                              {subject.subject_name}
                            </h4>
                            <div className="card-footer bg-transparent border-top-0">
                              <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                Full Time
                              </span>
                              <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-lg ls-2 alert-info d-inline-block text-info mb-1">
                                30 Min
                              </span>
                            </div>
                            <div className="card-footer bg-transparent border-top-0 d-flex align-items-center justify-content-center gap-2">
                              <Link
                                to={`/school/class/${classId}/subject/${subject.id}/results/`}
                                className="px-1 py-2 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xssss ls-3 bg-current"
                              >
                                Results
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : subjects.length > 0 ? (
                      subjects.map((video, index) => (
                        // ...video card JSX
                        <h1>Subjects Loading...</h1>
                      ))
                    ) : (
                      <h2 className="fw-400 font-lg d-block text-center">
                        No Subjects
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default ClassSubjects;
