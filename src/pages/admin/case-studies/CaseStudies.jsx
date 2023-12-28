import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../../components/navigation/BackButton";
import Loader from "../../../components/common/Loader";
import NoContent from "../../../components/common/NoContent";

function CaseStudies() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectReports();
  }, []);

  function getProjectReports() {
    setLoading(true);

    let result = fetch(baseUrl + "api/get-case-studies")
      .then(function (result) {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then(function (jsonbody) {
        setCaseStudies(jsonbody.caseStudy);
      })
      .catch(function (error) {
        console.error("Error fetching project reports:", error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="middle-sidebar-bottom theme-dark-bg">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-lg-12 pt-0 mb-3 d-flex justify-content-between">
              <div>
                <h2 className="fw-400 font-lg d-block">
                  All <b> Case Studies</b>
                </h2>
              </div>
              <div className="float-right">
                <Link
                  to={"/case-studies/create-case-study"}
                  className="p-2  d-inline-block text-white fw-700 lh-30 rounded-lg  text-center font-xsssss ls-3 bg-current mx-1"
                >
                  CREATE CASE STUDY
                </Link>
                <BackButton />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : caseStudies && caseStudies.length > 0 ? (
                caseStudies.map((caseStudy, index) => (
                // <div className="col-lg-12 mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                    <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                      <a
                        href="#"
                        className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                      >
                        <img
                          src={baseUrl + caseStudy.image}
                          alt="icon"
                          className="p-1"
                        />
                      </a>
                      <h4 className="fw-700 font-xs mt-4">{caseStudy.title}</h4>

                      <div className="text-center">
                        <Link
                          to={"/case-studies/preview_case-study-admin/" + caseStudy.id}
                          className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1"
                        >
                          VIEW
                        </Link>
                        <Link
                          to={"/case-studies/case-study-modules/" + caseStudy.id}
                          className="p-2 mt-4 d-inline-block text-white fw-700 lh-30 rounded-lg w100 text-center font-xsssss ls-3 bg-current mx-1"
                        >
                          CONTENT
                        </Link>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              ))
            ) : (
              <NoContent contentName="Project Reports" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CaseStudies;
