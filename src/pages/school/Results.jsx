import React, { useEffect, useState } from "react";
import AppFooter from "../../components/includes/AppFooter";
import BackButton from "../../components/navigation/BackButton";
import { Link } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";

const Results = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [classes, setClasses] = useState([]);

  function getClasses() {
    fetch(baseUrl + "api/get_classes")
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }

  useEffect(() => {
    getClasses();
  }, []);
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
                      <b>Results</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <BackButton />
                  </div>
                </div>

                <div className="card-body p-2 w-100 border-0 ">
                  <div className="row">
                    {classes.length > 0 ? (
                      classes.map((singleClass, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                          <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <h4 className="fw-700 font-xs mt-4 capitalize">
                              {singleClass.class}
                            </h4>
                            {/* Additional details about the class can be listed here */}
                            <div className="card-footer bg-transparent border-top-0 row">
                              <div className="col-lg-12">
                              <Link
                                to={`/school/class/${singleClass.id}/subjects`}
                                className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-600 lh-30 rounded-lg w100 text-center font-xssss mr-2 ls-3 bg-current"
                              >
                                Subjects
                              </Link>
                              {/* <Link
                                to={`/school/class/${singleClass.id}/results`}
                                className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-600 lh-30 rounded-lg w100 text-center font-xssss ls-3 bg-current"
                              >
                                 Old Results
                              </Link> */}
                              <Link
                                to={`/school/class/${singleClass.id}/results1`}
                                className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-600 lh-30 rounded-lg w100 text-center font-xssss mr-2 ls-3 bg-current"
                              >
                                  Results
                              </Link>
                              </div>
                             
                              
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h2 className="fw-400 font-lg d-block text-center">
                        Loading classes...
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

export default Results;
