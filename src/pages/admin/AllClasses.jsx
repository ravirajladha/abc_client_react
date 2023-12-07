import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppHeader from "../../components/includes/AppHeader";
import AppFooter from "../../components/includes/AppFooter";

function AllClasses() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-content menu-active">
          <AppHeader />
          <div className="middle-sidebar-bottom theme-dark-bg">
            <div className="custom-middle-sidebar-left">
              <div className="row">
                <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
                  <div>
                    <h2 className="fw-400 font-lg d-block">
                      All <b>Classes</b>
                    </h2>
                  </div>
                  <div className="float-right">
                    <Link
                      to={"/all_subjects/create_class"}
                      className="px-3 py-1  d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ADD CLASS
                    </Link>
                    <Link
                      to={"/all_subjects/create_subject"}
                      className="px-3 py-1  d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ADD SUBJECT
                    </Link>
                    <Link
                      to={"/all_subjects/create_chapters"}
                      className="px-3 py-1  d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ADD CHAPTERS
                    </Link>
                    <Link
                      to={"/all_subjects/create_videos"}
                      className="px-3 py-1  d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      ADD VIDEOS
                    </Link>
                    <button
                      onClick={goBack}
                      className="px-3 py-1   d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                    >
                      Back
                    </button>
                  </div>
                </div>
                {classes.length > 0 ? (
                  classes.map((singleClass, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="card mb-4 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                        <h4 className="fw-700 font-xs mt-4">
                          {singleClass.class}
                        </h4>
                        {/* Additional details about the class can be listed here */}
                        <div className="card-footer bg-transparent border-top-0">
                          <Link
                            to={`/all_subjects/${singleClass.id}`}
                            className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-300 lh-30 rounded-lg w100 text-center font-xssss mr-2 ls-3 bg-current"
                          >
                            Subjects
                          </Link>
                          <Link
                            to={`/${singleClass.id}/results`}
                            className="px-2 py-1 mt-4 fw-500 d-inline-block text-white fw-300 lh-30 rounded-lg w100 text-center font-xssss ls-3 bg-current"
                          >
                            Results
                          </Link>
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
        <AppFooter />
      </div>
    </>
  );
}

export default AllClasses;
